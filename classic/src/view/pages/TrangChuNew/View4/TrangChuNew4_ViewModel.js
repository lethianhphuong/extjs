Ext.define('DEMO.view.pages.TrangChuNew.View4.TrangChuNew4_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.TrangChuNew4_ViewModel',

    data: {
        canBoInfo: {},
        kpiCards: [],
        loaiHoSoCards: [],
        tongSoDonut: 128,
        timKiemNangCao: {}
    },

    stores: {
        trangThaiDonutStore: {
            fields: ['name', 'soLuong', 'tyLe', 'mau'],
            data: []
        },

        tienDoThangStore: {
            fields: ['thang', 'soLuong'],
            data: []
        },

        dsHoSoStore: {
            fields: ['stt', 'maDoiTuong', 'ngayDuaVaoQuanLy', 'loaiHsCode', 'loaiHsText', 'soDangKy'],
            data: []
        }
    }
});
