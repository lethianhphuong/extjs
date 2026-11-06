Ext.define('DEMO.view.pages.TrangChuNew.View2.TrangChuNew2_View', {
    extend: 'Ext.container.Container',
    xtype: 'TrangChuNew2_View',
    requires: [
        'DEMO.view.pages.TrangChuNew.View2.TrangChuNew2_ViewController',
        'DEMO.view.pages.TrangChuNew.View2.TrangChuNew2_ViewModel',
        'DEMO.view.pages.TrangChuNew.View1.TT_TimKiem.TT_TimKiem_View',
        'DEMO.view.pages.TrangChuNew.View2.TrangChuNew2_ViewSoLuong',
        'DEMO.view.pages.TrangChuNew.View2.TrangChuNew2_ViewCoCau',
        'DEMO.view.pages.TrangChuNew.View2.TrangChuNew2_ViewSuuTra'
    ],
    controller: 'TrangChuNew2_ViewController',
    viewModel: 'TrangChuNew2_ViewModel',
    cls: 'trang-chu-new2 dash-page',
    scrollable: 'y',
    layout: { type: 'vbox', align: 'stretch' },
    items: [
        { xtype: 'TT_TimKiem_View' },
        { xtype: 'TrangChuNew2_ViewSoLuong' },
        { xtype: 'TrangChuNew2_ViewCoCau' },
        { xtype: 'TrangChuNew2_ViewSuuTra' },

    ]
});
