Ext.define('DEMO.view.pages.TrangChuNew.TrangChuNew_ViewTab', {
    extend: 'Ext.tab.Panel',
    xtype: 'TrangChuNew_ViewTab',
    requires: ['DEMO.view.pages.TrangChuNew.View1.TrangChuNew1_View'],
    activeTab: 0,
    border: false,
    items: [{
        xtype: 'TrangChuNew1_View',
        title: 'view1',
        closable: false
    }]
});
