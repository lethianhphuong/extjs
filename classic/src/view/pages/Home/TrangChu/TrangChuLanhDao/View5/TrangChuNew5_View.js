Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View5.TrangChuNew5_View', {
    extend: 'Ext.container.Container',
    xtype: 'TrangChuNew5_View',
    requires: ['DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.DS_Hoso_GridView3.DS_Hoso_GridView3'],
    controller: 'TrangChuNew5_ViewController',
    viewModel: 'TrangChuNew5_ViewModel',
    cls: 'trang-chu-new5 dash-page',
    scrollable: true,
    listeners: { afterrender: 'onChartReady', activate: 'onChartReady' },
    padding: 18,
    layout: { type: 'vbox', align: 'stretch' },
    items: [
        { xtype: 'TrangChuNew5_ViewThongKe', minWidth: 1080 },
        {
            xtype: 'container', minWidth: 1080, height: 800, margin: '18 0 0',
            layout: { type: 'hbox', align: 'stretch' },
            items: [
                { xtype: 'TrangChuNew5_ViewDonVi', flex: 0.45, margin: '0 18 0 0' },
                { xtype: 'TrangChuNew5_ViewLucLuong', flex: 0.55 }
            ]
        },
        // Danh sách hồ sơ dùng chung với View3: ẩn cho tới khi click biểu đồ / thẻ KPI và có dữ liệu
        { xtype: 'DS_Hoso_GridView3', minWidth: 1080, margin: '18 0 0' }
    ]
});
