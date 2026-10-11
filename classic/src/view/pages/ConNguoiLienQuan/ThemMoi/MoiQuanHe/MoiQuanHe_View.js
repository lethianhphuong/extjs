Ext.define('DEMO.view.pages.ConNguoiLienQuan.ThemMoi.MoiQuanHe.MoiQuanHe_View', {
    extend: 'Ext.panel.Panel',
    xtype: 'MoiQuanHe_View',
    requires: [
        'DEMO.view.pages.ConNguoiLienQuan.ThemMoi.MoiQuanHe.MoiQuanHe_ViewController',
        'DEMO.view.pages.ConNguoiLienQuan.ThemMoi.MoiQuanHe.MoiQuanHe_ViewModel',
        'DEMO.view.pages.ConNguoiLienQuan.ThemMoi.MoiQuanHe.MoiQuanHe_ViewForm'
    ],
    controller: 'moiquanhe',
    viewModel: 'moiquanhe',
    layout: 'fit',
    border: false,
    items: [
        { xtype: 'MoiQuanHe_ViewForm', reference: 'relationForm' }
    ],
    bbar: {
        cls: 'cnlq-footer',
        items: [
            '->',
            { text: 'Lưu', cls: 'cnlq-primary', handler: 'onSave' },
            { text: 'Đóng', handler: 'onClose' },
            '->'
        ]
    }
});
