Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View6.TrangChuNew6_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.TrangChuNew6_ViewModel',
    requires: ['DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View6.TrangChuNew6_DisplayConfig'],

    data: {
        canBoInfo: {},
        kpiCards: [],
        soHoSo: 0,
        loaiHoSo: { tong: 0, items: [] },
        trangThai: { tong: 0, items: [] }
    },

    stores: {
        // Key theo DataView6: trangThaiCongViecTrucTiep / tienDoXuLyTheoThang / danhSachHoSoDuocGiao
        trangThaiCongViecStore: { fields: ['code', 'name', 'val', 'mau'] },
        tienDoThangStore: { fields: ['thang', 'sl'] },
        dsHoSoStore: { fields: ['stt', 'id', 'maDoiTuong', 'loaiDoituongMoi', 'tenLoaiDoituongMoi', 'loaiTone', 'ngayKyDuyet', 'ngayKyDuyetText', 'soDangKy'] }
    }
});
