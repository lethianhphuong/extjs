Ext.define('DEMO.view.pages.TrangChuNew.View6.TrangChuNew6_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.TrangChuNew6_ViewModel',
    requires: ['DEMO.view.pages.TrangChuNew.View6.TrangChuNew6_DisplayConfig'],

    data: {
        canBoInfo: {},
        kpiCards: [],
        soHoSo: 0,
        loaiHoSo: { tong: 0, items: [] },
        trangThai: { tong: 0, items: [] }
    },

    stores: {
        trangThaiDonutStore: { fields: ['code', 'name', 'soLuong', 'tyLeText', 'mau'] },
        tienDoThangStore: { fields: ['thang', 'soLuong'] },
        dsHoSoStore: { fields: ['stt', 'maDoiTuong', 'ngayDuaVaoQuanLy', 'loaiHsCode', 'loaiHsText', 'loaiHsTone', 'soDangKy'] }
    }
});
