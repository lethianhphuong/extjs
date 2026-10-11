Ext.define('DEMO.view.pages.ConNguoiDemo2.ConNguoiDemo2_ViewPopup_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.ConNguoiDemo2_ViewPopup_ViewModel',

    data: {
        isSapNhap: false,
        isTronChet: false
    },

    stores: {
        moiQuanHeStore: {
            fields: ['ten', 'nam', 'gt', 'cccd', 'qh', 'noiO'],
            data: []
        },

        tronStore: {
            fields: ['ten', 'xuLy'],
            data: []
        },

        chetStore: {
            fields: ['ten', 'xuLy'],
            data: []
        }
    }
});
