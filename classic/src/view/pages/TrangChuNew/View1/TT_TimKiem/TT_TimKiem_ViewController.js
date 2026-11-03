Ext.define('DEMO.view.pages.TrangChuNew.View1.TT_TimKiem.TT_TimKiem_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TT_TimKiem_ViewController',

    /** Khởi tạo danh mục mock theo instance ViewModel. */
    init: function () {
        const me = this;
        const vm = me.getViewModel();
        const danhMuc = vm.get('constant.DANHMUC');

        vm.getStore('DM_HeLucLuong_Store').filterBy(function (record) {
            return danhMuc.HE_LUC_LUONG.includes(record.get('code'));
        });
        vm.getStore('DM_LinhVucHoaDongStore').filter('parentCode', danhMuc.LINH_VUC);
        vm.getStore('DM_LoaiHinhStore').filter('parentCode', danhMuc.LOAI_HINH);
        vm.getStore('DM_TinhTrucThuoc_Store').filterBy(function (record) {
            return record.get('code').length === 6;
        });
        me.onRefresh();
    },

    /** Tạo mảng/ngày mới để không chia sẻ state giữa các lần reset. */
    getDefaultFilter: function () {
        const me = this;
        const now = Ext.Date.clearTime(new Date(), true);
        const year = now.getFullYear();

        return {
            capDonVi: me.getViewModel().get('constant.CAPDONVI_BCTK.TOANQUOC'),
            maDonViHeLL: null,
            maTinh: [],
            maCuc: [],
            maPhongTinh: [],
            maPhongCuc: [],
            maDoi: [],
            baoCaoDinhKy: me.getViewModel().get('constant.BAOCAODINHKY.THANG'),
            month: now.getMonth() + 1,
            monthYear: year,
            quarter: Math.floor(now.getMonth() / 3) + 1,
            quarterYear: year,
            toYear: year
        };
    },

    /** Reset qua ViewModel; không gọi API hoặc ghi đè dữ liệu dashboard. */
    onRefresh: function () {
        const me = this;
        const vm = me.getViewModel();

        me.resetting = true;
        try {
            vm.set('tieuChiKhacParams', me.getDefaultFilter());
            vm.getStore('DM_CucTrucThuoc_Store').clearFilter();
            me.updateScope();
            me.filterChildren('DM_PhongThuocTinh_Store', []);
            me.filterChildren('DM_PhongThuocCuc_Store', []);
            me.filterChildren('DM_DoiThuocPhong_Store', []);
            vm.set('readOnlyPhongTinh', true);
            vm.set('readOnlyPhongCuc', true);
            vm.set('readOnlyDoi', true);
            vm.notify();
        } finally {
            me.resetting = false;
        }
        me.getView().getForm().clearInvalid();
    },

    /** Ẩn nhánh đơn vị không thuộc phạm vi được chọn. */
    updateScope: function () {
        const me = this;
        const vm = me.getViewModel();
        const cap = vm.get('constant.CAPDONVI_BCTK');
        const selected = vm.get('tieuChiKhacParams.capDonVi');
        const hideTinh = selected === cap.CAPCUC;
        const hideCuc = selected === cap.TINHTHANH;

        vm.set({
            isHiddenTinhThanh: hideTinh,
            isHiddenPhongTinh: hideTinh,
            isHiddenCuc: hideCuc,
            isHiddenPhongCuc: hideCuc,
            readOnlyTinh: false,
            readOnlyCuc: false
        });
    },

    /** Đổi phạm vi xóa lựa chọn cấp con qua binding. */
    onSelectCapDonVi: function () {
        const me = this;
        const vm = me.getViewModel();

        vm.set('tieuChiKhacParams.maTinh', []);
        vm.set('tieuChiKhacParams.maCuc', []);
        me.updateScope();
        me.updateUnitBranch('tinh', []);
        me.updateUnitBranch('cuc', []);
    },

    /** Lọc Cục theo hệ lực lượng của dữ liệu mock. */
    onChangeHeLL: function (field, value) {
        const me = this;
        const vm = me.getViewModel();
        const store = vm.getStore('DM_CucTrucThuoc_Store');

        if (me.resetting) {
            return;
        }
        vm.set('tieuChiKhacParams.maCuc', []);
        store.removeFilter('heLucLuongMock', true);
        if (value) {
            store.addFilter({ id: 'heLucLuongMock', property: 'maHeLucLuong', value: value, exactMatch: true });
        }
        me.updateUnitBranch('cuc', []);
    },

    /** Chỉ thay filter cha–con, giữ bộ lọc riêng của TagField. */
    filterChildren: function (storeName, parents) {
        const me = this;
        const store = me.getViewModel().getStore(storeName);

        store.removeFilter('parentMock', true);
        store.addFilter({
            id: 'parentMock',
            filterFn: function (record) {
                return parents.length === 1 && record.get('parentCode') === parents[0];
            }
        });
    },

    /** Một cha mới cho phép chọn cấp con; hai nhánh đơn vị loại trừ nhau. */
    updateUnitBranch: function (branch, value) {
        const me = this;
        const vm = me.getViewModel();
        const values = Ext.Array.from(value);
        const isTinh = branch === 'tinh';
        const childKey = isTinh ? 'maPhongTinh' : 'maPhongCuc';

        vm.set('tieuChiKhacParams.' + childKey, []);
        vm.set('tieuChiKhacParams.maDoi', []);
        vm.set(isTinh ? 'readOnlyPhongTinh' : 'readOnlyPhongCuc', values.length !== 1);
        me.filterChildren(isTinh ? 'DM_PhongThuocTinh_Store' : 'DM_PhongThuocCuc_Store', values);
        me.filterChildren('DM_DoiThuocPhong_Store', []);
        vm.set('readOnlyDoi', true);
        if (values.length) {
            vm.set('tieuChiKhacParams.' + (isTinh ? 'maCuc' : 'maTinh'), []);
        }
        vm.set(isTinh ? 'readOnlyCuc' : 'readOnlyTinh', values.length > 0);
    },

    /** Chọn tỉnh cập nhật danh mục phòng thuộc tỉnh. */
    onChangeTinhThanh: function (field, value) {
        const me = this;

        if (!me.resetting) {
            me.updateUnitBranch('tinh', value);
        }
    },

    /** Chọn Cục cập nhật danh mục phòng thuộc Cục. */
    onChangeCuc: function (field, value) {
        const me = this;

        if (!me.resetting) {
            me.updateUnitBranch('cuc', value);
        }
    },

    /** Hai nhánh Phòng dùng chung quy tắc chọn Đội theo một cha. */
    onUpdateDoiSelect: function (field, value) {
        const me = this;
        const vm = me.getViewModel();
        const parents = Ext.Array.from(value);

        if (me.resetting) {
            return;
        }
        vm.set('tieuChiKhacParams.maDoi', []);
        vm.set('readOnlyDoi', parents.length !== 1);
        me.filterChildren('DM_DoiThuocPhong_Store', parents);
    },

    /** Xóa lỗi kỳ cũ sau khi binding chuyển disabled các field không dùng. */
    onPeriodChange: function () {
        const me = this;

        if (!me.resetting) {
            me.getViewModel().notify();
            me.getView().getForm().clearInvalid();
        }
    },

    /** Giữ quy ước báo cáo 15–14, so sánh thời gian bằng Date. */
    getPeriodRange: function (filter) {
        const me = this;
        const ky = me.getViewModel().get('constant.BAOCAODINHKY');
        let start;
        let end;
        let period;

        switch (filter.baoCaoDinhKy) {
            case ky.THANG:
                start = new Date(filter.monthYear, filter.month - 2, 15);
                end = new Date(filter.monthYear, filter.month - 1, 14);
                period = 'M';
                break;
            case ky.QUY:
                start = new Date(filter.quarterYear, (filter.quarter - 1) * 3 - 3, 15);
                end = new Date(filter.quarterYear, (filter.quarter - 1) * 3, 14);
                period = 'Q';
                break;
            case ky.NAM: {
                start = new Date(filter.toYear - 1, 9, 15);
                end = new Date(filter.toYear, 9, 14);
                const yesterday = Ext.Date.clearTime(new Date(), true);

                yesterday.setDate(yesterday.getDate() - 1);
                if (filter.toYear === yesterday.getFullYear() && yesterday < end) {
                    end = yesterday;
                }
                period = 'Y';
                break;
            }
            default:
                return null;
        }
        if (!Ext.isDate(start) || !Ext.isDate(end) || isNaN(start.getTime()) || isNaN(end.getTime())) {
            return null;
        }
        start = Ext.Date.clearTime(start, true);
        end = Ext.Date.clearTime(end, true);
        end.setHours(23, 59, 59, 999);
        return { start: start, end: end, period: period };
    },

    /** Phát điều kiện hợp lệ; chưa kết nối API hoặc thay số liệu dashboard. */
    onSearch: function () {
        const me = this;
        const view = me.getView();
        const vm = me.getViewModel();

        vm.notify();
        if (!view.getForm().isValid()) {
            return;
        }
        const filter = Ext.clone(vm.get('tieuChiKhacParams'));
        const range = me.getPeriodRange(filter);

        if (!range || range.start > range.end) {
            view.down('#baoCaoDinhKy_IdView').markInvalid('Khoảng thời gian không hợp lệ');
            return;
        }
        filter.fromDate = Ext.Date.format(range.start, 'd/m/Y H:i:s');
        filter.toDate = Ext.Date.format(range.end, 'd/m/Y H:i:s');
        filter.period = range.period;
        view.fireEvent('timkiem', view, filter);
        debugger
        notiCommon.show({
            type: 'info',
            message: 'Điều kiện tìm kiếm hợp lệ. Đang dùng dữ liệu mẫu, chưa kết nối API tìm kiếm.'
        });
    },

    /** Listener thuộc vòng đời View, chỉ nhận wheel trong vùng giá trị tagfield. */
    onSearchReady: function (view) {
        const me = this;

        view.mon(view.getEl(), 'wheel', me.onTagWheel, me, {
            delegate: '.x-tagfield',
            passive: false
        });
        me.selectedValuesTip = Ext.create('Ext.tip.ToolTip', {
            target: view.getEl(),
            delegate: '.x-tagfield',
            cls: 'tt-selected-values-tip',
            minWidth: 160,
            maxWidth: 360,
            maxHeight: 260,
            scrollable: 'y',
            showDelay: 400,
            dismissDelay: 0,
            allowOver: true,
            listeners: {
                beforeshow: { fn: me.onSelectedValuesTipBeforeShow, scope: me }
            }
        });
        view.query('tagfield').forEach(function (field) {
            if (field.multiSelect) {
                view.mon(field, {
                    change: me.onSelectedValuesChange,
                    expand: me.onSelectedValuesChange,
                    scope: me
                });
            }
        });
    },

    /** Đọc tên từ records đã chọn, bao gồm cả các tag đang khuất khi cuộn ngang. */
    onSelectedValuesTipBeforeShow: function (tip) {
        const field = Ext.Component.fromElement(tip.triggerElement);

        if (!field || !field.isXType('tagfield') || !field.multiSelect || field.isExpanded) {
            return false;
        }
        const records = field.getValueRecords();

        if (!records.length) {
            return false;
        }
        tip.setTitle(Ext.String.htmlEncode(field.getFieldLabel()) + ' (' + records.length + ')');
        tip.update('<ul class="tt-selected-values-list">' + records.map(function (record) {
            return '<li>' + Ext.String.htmlEncode(String(record.get(field.displayField))) + '</li>';
        }).join('') + '</ul>');
    },

    /** Ẩn nội dung cũ khi lựa chọn thay đổi hoặc danh mục đang mở. */
    onSelectedValuesChange: function () {
        const me = this;

        if (me.selectedValuesTip) {
            me.selectedValuesTip.hide();
        }
    },

    /** Tooltip render ngoài cây DOM của form nên cần hủy theo Controller. */
    destroy: function () {
        const me = this;

        Ext.destroy(me.selectedValuesTip);
        me.selectedValuesTip = null;
        me.callParent(arguments);
    },

    /** Cuộn ngang bằng chuột thường; tới biên thì để trang tiếp tục cuộn. */
    onTagWheel: function (event, element) {
        const nativeEvent = event.browserEvent;
        const maximum = element.scrollWidth - element.clientWidth;

        if (!nativeEvent || nativeEvent.deltaX || !nativeEvent.deltaY || maximum <= 0) {
            return;
        }
        const step = nativeEvent.deltaMode === 1 ? 16 : nativeEvent.deltaMode === 2 ? element.clientWidth : 1;
        const position = Math.max(0, Math.min(maximum, element.scrollLeft + nativeEvent.deltaY * step));

        const previous = element.scrollLeft;

        element.scrollLeft = position;
        // So sánh vị trí thực tế vì browser có thể làm tròn scrollWidth ở mức zoom khác 100%.
        if (Math.abs(element.scrollLeft - previous) > 0.5) {
            event.stopEvent();
        }
    }
});
