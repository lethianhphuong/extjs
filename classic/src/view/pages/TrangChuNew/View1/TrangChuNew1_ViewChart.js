Ext.define('DEMO.view.pages.TrangChuNew.View1.TrangChuNew1_ViewChart', {
    extend: 'Ext.container.Container',
    xtype: 'TrangChuNew1_ViewChart',
    requires: [
        'DEMO.view.pages.TrangChuNew.View1.TrangChuNew1_ViewDonVi',
        'DEMO.view.pages.TrangChuNew.View1.TrangChuNew1_ViewDienBienChart'
    ],
    cls: 'tcn-details',
    layout: 'auto',
    listeners: { afterrender: 'onDetailsReady' },
    items: [
        { xtype: 'TrangChuNew1_ViewDonVi', itemId: 'donViCard_IdView' },
        { xtype: 'TrangChuNew1_ViewDienBienChart', itemId: 'dienBienCard_IdView' }
    ]
});
