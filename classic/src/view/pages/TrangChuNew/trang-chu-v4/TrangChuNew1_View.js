Ext.define('DEMO.view.pages.TrangChuNew.View1.TrangChuNew1_View', {
    extend: 'Ext.container.Container',
    xtype: 'TrangChuNew1_View',
    requires: [
        'DEMO.view.pages.TrangChuNew.View1.TrangChuNew1_ViewController',
        'DEMO.view.pages.TrangChuNew.View1.TrangChuNew1_ViewModel',
        'DEMO.view.pages.TrangChuNew.View1.TT_TimKiem.TT_TimKiem_View',
        'DEMO.view.pages.TrangChuNew.View1.TrangChuNew1_ViewThongKe',
        'DEMO.view.pages.TrangChuNew.View1.TrangChuNew1_ViewPhanTich',
        'DEMO.view.pages.TrangChuNew.View1.TrangChuNew1_ViewChart'
    ],
    controller: 'trangchunew1',
    viewModel: 'trangchunew1',
    cls: 'trang-chu-new1 dash-page',
    scrollable: 'y',
    layout: { type: 'vbox', align: 'stretch' },
    items: [
        { xtype: 'TT_TimKiem_View' },
        { xtype: 'TrangChuNew1_ViewThongKe' },
        { xtype: 'TrangChuNew1_ViewPhanTich' },
        { xtype: 'TrangChuNew1_ViewChart' }
    ]
});
