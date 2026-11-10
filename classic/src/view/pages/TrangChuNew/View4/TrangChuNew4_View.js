Ext.define('DEMO.view.pages.TrangChuNew.View4.TrangChuNew4_View', {
    extend: 'Ext.container.Container',
    xtype: 'TrangChuNew4_View',
    requires: [
        'DEMO.view.pages.TrangChuNew.View1.TT_TimKiem.TT_TimKiem_View',
        'DEMO.view.pages.TrangChuNew.View4.TrangChuNew4_ViewController',
        'DEMO.view.pages.TrangChuNew.View4.TrangChuNew4_ViewModel',
        'DEMO.view.pages.TrangChuNew.View4.TrangChuNew4_ViewCanBo',
        'DEMO.view.pages.TrangChuNew.View4.TrangChuNew4_ViewKetQua'
    ],
    controller: 'TrangChuNew4_ViewController',
    viewModel: 'TrangChuNew4_ViewModel',
    cls: 'trang-chu-new4 dash-page',
    scrollable: 'y',
    flex: 1,
    padding: '0 16 16 16',
    layout: { type: 'vbox', align: 'stretch' },
    items: [
        // 1. Thanh tìm kiếm kế thừa TT_TimKiem_View
        {
            xtype: 'TT_TimKiem_View'
        },
        // 2. Thông tin cán bộ + 6 chỉ số phụ trách + 6 badge loại hồ sơ
        {
            xtype: 'TrangChuNew4_ViewCanBo',
            margin: '10 0 0 0'
        },
        // 3. Kết quả thực hiện (Danh sách hồ sơ + Biểu đồ công việc)
        {
            xtype: 'TrangChuNew4_ViewKetQua',
            margin: '10 0 16 0'
        }
    ]
});
