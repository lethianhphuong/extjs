Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.DS_Hoso_GridView3.DS_Hoso_GridView3Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DS_Hoso_GridView3Controller',
    requires: ['DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.TrangChuNew3_DisplayConfig'],

    /** Màu badge theo mã trạng thái hồ sơ. */
    trangThaiTone: {
        DANG_QUAN_LY: 'blue',
        CHUYEN_MUC: 'amber',
        KET_THUC: 'green',
        QUA_HAN: 'red'
    },


    /** Loại hồ sơ: chấm màu theo loại (màu cột biểu đồ "Loại hồ sơ" trong DisplayConfig). */
    renderLoaiHoSo: function (val, meta, record) {
        const cfgLoai = DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.TrangChuNew3_DisplayConfig.tieuChi.loaiHoSo;
        const def = cfgLoai[record.get('loaiHoSoCode')] || {};
        const color = def.hex || '#94a3b8';
        return '<span class="ds-hoso-grid3-loai"><i style="background:' + color + '"></i>' + Ext.String.htmlEncode(val || '') + '</span>';
    },

    /** Trạng thái hiển thị dạng badge màu. */
    renderTrangThai: function (val, meta, record) {
        const me = this;
        const tone = me.trangThaiTone[record.get('trangThaiCode')] || 'muted';
        return '<span class="ds-hoso-grid3-status ds-hoso-grid3-status-' + tone + '">' + Ext.String.htmlEncode(val || '') + '</span>';
    },

    /** Tên đối tượng: chữ đậm, tooltip đầy đủ khi cột bị cắt chữ. */
    renderTenDoiTuong: function (val, meta) {
        const text = Ext.String.htmlEncode(val || '');
        meta.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(text) + '"';
        return '<span class="ds-hoso-grid3-name">' + text + '</span>';
    },

    /**
     * Nhận sự kiện taiDanhSach khi click biểu đồ và gọi store tải danh sách.
     * @param {Object} params { maThongKe: 'D3_Cxx', json: { code } }
     * @param {Object} thongTin thông tin click đầy đủ (maBieuDo, dataKey, code, record, truong)
     */
    onTaiDanhSach: function (params, thongTin) {
        const me = this;
        window.console.log('[DS_Hoso_GridView3] Tải danh sách', params, thongTin);
        // Biểu đồ mới → danh sách mới: bỏ điều kiện tìm kiếm của lần trước, đổi bộ cột theo mã biểu đồ
        me.getViewModel().set('timKiemNangCao', me.taoDieuKienRong());
        me.apDungBoCot(String((params && params.maThongKe) || '').replace(/_LIST$/, ''));
        me.taiStore(function (store) {
            store.loadDataDanhSach(params, null);
        });
    },

    /** Nút "Tìm kiếm" / Enter trong thanh tìm kiếm: lọc lại danh sách của biểu đồ đang chọn. */
    onTimKiem: function () {
        const me = this;
        const dieuKien = Ext.apply({}, me.getViewModel().get('timKiemNangCao'));
        me.taiStore(function (store) {
            store.timKiem(dieuKien);
        });
    },

    /** Nút "Làm mới": xóa điều kiện và tải lại toàn bộ danh sách của biểu đồ đang chọn. */
    onLamMoi: function () {
        const me = this;
        me.getViewModel().set('timKiemNangCao', me.taoDieuKienRong());
        me.taiStore(function (store) {
            store.timKiem(null);
        });
    },

    /** View cha tải lại dữ liệu: xóa điều kiện tìm kiếm, làm rỗng danh sách, ẩn grid và báo 'dshosoload' (0 hồ sơ). */
    onResetDanhSach: function () {
        const me = this;
        const view = me.getView();
        const store = me.getViewModel().getStore('dsHoSoStore');
        me.getViewModel().set('timKiemNangCao', me.taoDieuKienRong());
        me.apDungBoCot(null);
        if (store) {
            store.lamRong();
        }
        view.setHidden(true);
        view.fireEvent('dshosoload', view, 0, store);
    },

    /**
     * Đổi cột + tiêu đề theo mã biểu đồ (view.boCotTheoMa); mã không khai báo → bộ cột hồ sơ mặc định (columns của class).
     * Bộ cột riêng ẩn thanh tìm kiếm (điều kiện tìm kiếm chỉ áp cho danh sách hồ sơ).
     * @param {String} maBieuDo VD 'D5_C05'
     */
    apDungBoCot: function (maBieuDo) {
        const me = this;
        const view = me.getView();
        const boCot = view.boCotTheoMa[maBieuDo];
        const key = boCot ? maBieuDo : 'HO_SO';
        if (me.boCotHienTai === key || (!me.boCotHienTai && key === 'HO_SO')) {
            return;
        }
        me.boCotHienTai = key;
        const macDinh = Ext.getClass(view).prototype.columns;
        const cot = boCot ? boCot.cot : macDinh.items;
        // Clone để Ext không sửa vào cấu hình gốc của class
        view.reconfigure(null, cot.map(c => Ext.apply({}, Ext.clone(c), macDinh.defaults)));
        me.lookupReference('dsHoSoHeader').setData({ tieuDe: boCot ? boCot.tieuDe : 'Danh sách hồ sơ' });
        me.lookupReference('dsHoSoFilter').setHidden(!!boCot);
    },

    /** Ô chữ thường: mã hóa HTML + tooltip đầy đủ khi bị cắt. */
    renderText: function (val, meta) {
        const text = Ext.String.htmlEncode(val === null || val === undefined ? '' : String(val));
        meta.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(text) + '"';
        return text;
    },

    taoDieuKienRong: function () {
        return { loaiHoSo: null, trangThai: null, tuNgay: null, denNgay: null, tenDoiTuong: '' };
    },

    /**
     * Gọi hàm tải của store; sau khi tải xong cập nhật hiển thị và báo cho view cha (sự kiện 'dshosoload').
     * Mock nạp đồng bộ, API nạp bất đồng bộ: đăng ký 'load' trước khi gọi để bắt đúng lần tải này.
     * @param {Function} taiFn function (store) gọi loadDataDanhSach / timKiem
     */
    taiStore: function (taiFn) {
        const me = this;
        const store = me.getViewModel().getStore('dsHoSoStore');
        if (!store) { return; }
        store.on('load', me.capNhatHienThi, me, { single: true });
        taiFn(store);
    },

    /** Có dữ liệu thì hiện card danh sách, không có thì ẩn cả card; báo số hồ sơ cho view cha. */
    capNhatHienThi: function (store) {
        const view = this.getView();
        const tong = store.getTotalCount();
        view.setHidden(!tong);
        view.fireEvent('dshosoload', view, tong, store);
    },

    /** Đổi số dòng/trang: cập nhật pageSize và quay về trang 1. */
    onPageSizeChange: function (combo) {
        const store = this.getView().getStore();
        if (!store) { return; }
        store.setPageSize(combo.getValue());
        store.loadPage(1);
    },

    /** Nút "Xem chi tiết" ở cột Thao tác; hiện chỉ log bản ghi để kiểm tra. */
    onXemChiTiet: function (view, rowIndex, colIndex, item, event, record) {
        window.console.log('[DS_Hoso_GridView3] Xem chi tiết', record.getData());
    }
});
