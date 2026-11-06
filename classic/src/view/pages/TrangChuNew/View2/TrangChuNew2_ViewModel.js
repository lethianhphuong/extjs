Ext.define('DEMO.view.pages.TrangChuNew.View2.TrangChuNew2_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.TrangChuNew2_ViewModel',

    data: {
        tongHoSo: '',
        tongSuuTra: '',
        coCau: null
    },

    stores: {
        hoSoStore: { fields: ['ten', 'soLuong'] },
        dtcbStore: { fields: ['ten', 'soLuong', 'tyLe', 'mau', 'mauColor'] },
        hiemNghiStore: { fields: ['ten', 'soLuong', 'tyLe', 'mau', 'mauColor'] },
        chuyenAnStore: { fields: ['ten', 'soLuong', 'tyLe', 'mau', 'mauColor'] },
        ctvbmStore: { fields: ['ten', 'soLuong', 'tyLe', 'mau', 'mauColor'] },
        phanLoaiStore: { fields: ['ten', 'soLuong', 'tyLe', 'mau', 'mauColor'] },
        danhMucStore: { fields: ['ten', 'soLuong', 'tyLe', 'mau', 'mauColor'] },
        doiTuongStore: { fields: ['ten', 'soLuong', 'tyLe', 'mau', 'mauColor'] }
    }
});
