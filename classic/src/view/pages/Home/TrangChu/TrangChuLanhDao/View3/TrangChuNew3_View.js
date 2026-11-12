Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.TrangChuNew3_View', {
    extend: 'Ext.container.Container',
    xtype: 'TrangChuNew3_View',
    requires: [
        'DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View1.TT_TimKiem.TT_TimKiem_View',
        'DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.TrangChuNew3_ViewController',
        'DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.TrangChuNew3_ViewModel',
        'DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.TrangChuNew3_ViewThongKe',
        'DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.TrangChuNew3_ViewCharts',
        'DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.DS_Hoso_GridView3.DS_Hoso_GridView3'
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
        // 2. Thống kê KPI: 6 thẻ chỉ số chính
        {
            xtype: 'TrangChuNew3_ViewThongKe',
            margin: '12 0 0 0'
        },
        // 3. Cụm 5 biểu đồ: 8 loại hồ sơ, Biến động, Cơ cấu đơn vị, Diễn biến 12 tháng, Cơ cấu theo hệ lực lượng
        {
            xtype: 'TrangChuNew3_ViewCharts',
            margin: '12 0 0 0'
        },
        // 4. Danh sách hồ sơ (nạp khi click biểu đồ) — grid tách riêng, dùng chung ViewModel
        {
            xtype: 'DS_Hoso_GridView3',
            margin: '12 0 16 0'
        }
    ]
});
