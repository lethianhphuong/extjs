Ext.define('DEMO.view.pages.TrangChuNew.View1.TT_TimKiem.TT_TimKiem_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tt_timkiem',
    requires: ['DEMO.app.NotiCommon', 'Ext.tip.ToolTip'],

    /** Khởi tạo khoảng ngày theo kỳ mặc định trên instance tìm kiếm. */
    init: function () {
        const me = this;

        me.applyPeriod('nam2026');
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
    },

    /** Chọn kỳ chỉ nhận một mã, kể cả khi TagField trả về mảng. */
    onPeriodChange: function (field, value) {
        const me = this;

        me.applyPeriod(Ext.isArray(value) ? value[0] : value);
    },

    /** Cập nhật ngày theo danh mục kỳ mà không kích hoạt nhánh sửa ngày thủ công. */
    applyPeriod: function (code) {
        const me = this;
        const viewModel = me.getViewModel();
        const period = viewModel.getStore('thoiGianStore').findRecord('ma', code, 0, false, true, true);

        if (!period || code === 'tuyChon') {
            return;
        }
        me.applyingPeriod = true;
        try {
            viewModel.set('timKiemNangCao.tuNgay', new Date(2026, period.get('thangBatDau'), 1));
            viewModel.set('timKiemNangCao.denNgay', new Date(2026, period.get('thangKetThuc') + 1, 0));
            viewModel.notify();
        } finally {
            me.applyingPeriod = false;
        }
    },

    /** Khi người dùng sửa ngày, chuyển kỳ sang Tùy chọn. */
    onDateChange: function (field, value) {
        const me = this;
        const viewModel = me.getViewModel();
        const selected = viewModel.get('timKiemNangCao.thoiGian');
        const code = Ext.isArray(selected) ? selected[0] : selected;
        const period = viewModel.getStore('thoiGianStore').findRecord('ma', code, 0, false, true, true);

        if (me.applyingPeriod || !period || code === 'tuyChon') {
            return;
        }
        const expected = field.getName() === 'tuNgay' ? new Date(2026, period.get('thangBatDau'), 1) :
            new Date(2026, period.get('thangKetThuc') + 1, 0);

        if (!Ext.isDate(value) || value.getTime() !== expected.getTime()) {
            viewModel.set('timKiemNangCao.thoiGian', 'tuyChon');
        }
    },

    /** Phát điều kiện hợp lệ; kết quả dashboard chưa kết nối tìm kiếm API. */
    onSearch: function () {
        const me = this;
        const view = me.getView();
        const form = view.getForm();

        me.getViewModel().notify();
        if (!form.isValid()) {
            return;
        }
        const filter = me.getViewModel().get('timKiemNangCao');

        if (filter.tuNgay > filter.denNgay) {
            view.down('#denNgay_IdView').markInvalid('Đến ngày phải bằng hoặc sau từ ngày');
            return;
        }
        view.fireEvent('timkiem', view, Ext.clone(filter));
        notiCommon.show({
            type: 'info',
            message: 'Điều kiện tìm kiếm hợp lệ. Chưa kết nối API tìm kiếm; số liệu thống kê hiện tại được giữ nguyên.'
        });
    }
});
