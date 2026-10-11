Ext.define('DEMO.view.pages.ConNguoiLienQuan.ThemMoi.ThemMoiConNguoi_View', {
    extend: 'Ext.panel.Panel',
    xtype: 'ThemMoiConNguoi_View',
    requires: [
        'DEMO.view.pages.ConNguoiLienQuan.ThemMoi.ThemMoiConNguoi_ViewController',
        'DEMO.view.pages.ConNguoiLienQuan.ThemMoi.ThemMoiConNguoi_ViewModel',
        'DEMO.view.pages.ConNguoiLienQuan.ThemMoi.ThemMoiConNguoi_ViewForm',
        'DEMO.view.pages.ConNguoiLienQuan.ThemMoi.ThemMoiConNguoi_ViewDiaChi',
        'DEMO.view.pages.ConNguoiLienQuan.ThemMoi.ThemMoiConNguoi_ViewQuanHe',
        'DEMO.view.pages.ConNguoiLienQuan.ThemMoi.ThemMoiConNguoi_ViewTronChet'
    ],
    controller: 'themmoiconguoi',
    viewModel: 'themmoiconguoi',
    layout: 'fit',
    border: false,
    items: [
        {
            xtype: 'form',
            reference: 'personForm',
            cls: 'padding5',
            scrollable: 'y',
            bodyPadding: 14,
            items: [
                { xtype: 'ThemMoiConNguoi_ViewForm', reference: 'personalSection' },
                { xtype: 'ThemMoiConNguoi_ViewDiaChi', reference: 'addressSection' },
                { xtype: 'ThemMoiConNguoi_ViewQuanHe' },
                { xtype: 'ThemMoiConNguoi_ViewTronChet' }
            ],
            layout: { type: 'vbox', align: 'stretch' }
        }
    ],
    bbar: {
        cls: 'cnlq-footer',
        items: [
            '->',
            { text: 'Lưu', cls: 'cnlq-primary', handler: 'onSave' },
            { text: 'Đóng', cls: 'cnlq-danger-button', handler: 'onClose' },
            '->'
        ]
    },
    listeners: { afterrender: 'onReady' }
});
