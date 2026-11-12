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
        const store = this.getView().getStore();
        window.console.log('[DS_Hoso_GridView3] Tải danh sách', params, thongTin);
        if (store && typeof store.loadDataDanhSach === 'function') {
            store.loadDataDanhSach(params);
        }
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
