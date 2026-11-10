Ext.define('DEMO.view.pages.TrangChuNew.View3.TrangChuNew3_View', {
    extend: 'Ext.container.Container',
    xtype: 'TrangChuNew3_View',
    requires: [
        'DEMO.view.pages.TrangChuNew.View1.TT_TimKiem.TT_TimKiem_View',
        'DEMO.view.pages.TrangChuNew.View3.TrangChuNew3_ViewController',
        'DEMO.view.pages.TrangChuNew.View3.TrangChuNew3_ViewModel',
        'DEMO.view.pages.TrangChuNew.View3.TrangChuNew3_ViewThongKe',
        'DEMO.view.pages.TrangChuNew.View3.TrangChuNew3_ViewCharts',
        'DEMO.view.pages.TrangChuNew.View3.TrangChuNew3_ViewMapAlerts',
        'DEMO.view.pages.TrangChuNew.View3.TrangChuNew3_ViewGrid'
    ],
    controller: 'TrangChuNew3_ViewController',
    viewModel: 'TrangChuNew3_ViewModel',
    cls: 'trang-chu-new3 dash-page',
    scrollable: 'y',
    flex: 1,
    padding: '0 16 16 16',
    layout: { type: 'vbox', align: 'stretch' },
    listeners: {
        activate: 'onViewActivate'
    },
    items: [
        // 1. Thanh tìm kiếm kế thừa TT_TimKiem_View
        {
            xtype: 'TT_TimKiem_View'
        },
        // 2. Thống kê KPI: 6 thẻ chỉ số chính + 6 ô loại hồ sơ nghiệp vụ
        {
            xtype: 'TrangChuNew3_ViewThongKe',
            margin: '10 0 0 0'
        },
        // 3. Cụm 3 Biểu đồ: Cơ cấu đơn vị, Biến động theo quý, Tỷ lệ quá hạn
        {
            xtype: 'TrangChuNew3_ViewCharts',
            margin: '12 0 0 0'
        },
        // 4. Cụm Diễn biến 12 tháng + Top địa bàn + Cảnh báo nổi bật
        {
            xtype: 'TrangChuNew3_ViewMapAlerts',
            margin: '12 0 0 0'
        },
        // 5. Bảng dữ liệu chi tiết đa Tab (TabPanel & Grid)
        {
            xtype: 'TrangChuNew3_ViewGrid',
            margin: '12 0 16 0'
        }
    ]
});
