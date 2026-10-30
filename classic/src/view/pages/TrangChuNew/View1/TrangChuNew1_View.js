Ext.define('DEMO.view.pages.TrangChuNew.View1.TrangChuNew1_View', {
    extend: 'Ext.container.Container',
    xtype: 'TrangChuNew1_View',
    requires: [
        'DEMO.view.pages.TrangChuNew.View1.TrangChuNew1_ViewController',
        'DEMO.view.pages.TrangChuNew.View1.TrangChuNew1_ViewModel',
        'DEMO.view.pages.TrangChuNew.View1.TrangChuNew1_ViewFilter',
        'DEMO.view.pages.TrangChuNew.View1.TrangChuNew1_ViewThongKe',
        'DEMO.view.pages.TrangChuNew.View1.TrangChuNew1_ViewPhanTich',
        'DEMO.view.pages.TrangChuNew.View1.TrangChuNew1_ViewChart',
        'DEMO.view.pages.TrangChuNew.View1.TrangChuNew1_ViewCanhBao'
    ],
    controller: 'trangchunew1',
    viewModel: 'trangchunew1',
    cls: 'trang-chu-new1 dash-page',
    scrollable: 'y',
    layout: { type: 'vbox', align: 'stretch' },
    items: [
        { xtype: 'TrangChuNew1_ViewFilter' },
        { xtype: 'TrangChuNew1_ViewThongKe' },
        { xtype: 'TrangChuNew1_ViewPhanTich' },
        { xtype: 'TrangChuNew1_ViewChart' },
        { xtype: 'TrangChuNew1_ViewCanhBao' },
        {
            xtype: 'component',
            cls: 'tcn-footer',
            html: '© 2026 Hệ thống Thông tin Báo cáo Nghiệp vụ Chuyên dùng. Dữ liệu bảo mật cấp ngành.'
        }
    ]
});
