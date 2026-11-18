/**
 * Trang chủ View7: Danh sách cán bộ theo chức vụ.
 * Thanh tìm kiếm (TT_TimKiem_View) → 7 thẻ KPI theo chức vụ (click để lọc) → danh sách cán bộ.
 */
Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View7.TrangChuNew7_View', {
    extend: 'Ext.container.Container',
    xtype: 'TrangChuNew7_View',
    requires: [
        'DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View1.TT_TimKiem.TT_TimKiem_View',
        'DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View7.TrangChuNew7_ViewController',
        'DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View7.TrangChuNew7_ViewModel',
        'DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View7.TrangChuNew7_ViewThongKe',
        'DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View7.TrangChuNew7_ViewGrid'
    ],
    controller: 'TrangChuNew7_ViewController',
    viewModel: 'TrangChuNew7_ViewModel',
    cls: 'trang-chu-new7 dash-page',
    scrollable: 'y',
    padding: '0 16 16',
    layout: { type: 'vbox', align: 'stretch' },
    defaults: { margin: '16 0 0' },
    items: [
        // Thanh tìm kiếm dùng chung từ View1; phát sự kiện 'timkiem' khi điều kiện hợp lệ
        { xtype: 'TT_TimKiem_View', listeners: { timkiem: 'onSearch' } },
        { xtype: 'TrangChuNew7_ViewThongKe' },
        // Card danh sách chiếm phần cao còn lại của trang: grid cuộn bên trong, thanh phân trang luôn ở đáy.
        // minHeight: màn thấp thì cả trang cuộn, grid vẫn đủ chỗ hiện vài dòng.
        {
            xtype: 'container',
            cls: 'tcn7-card',
            flex: 1,
            minHeight: 380,
            layout: { type: 'vbox', align: 'stretch' },
            items: [
                {
                    xtype: 'component',
                    cls: 'tcn7-card-header',
                    bind: { data: '{tieuDe}' },
                    // [icon] Danh sách cán bộ | chip chức vụ đang lọc  N cán bộ
                    tpl: '<div class="tcn7-card-title"><span class="tcn7-title-icon"><i class="x-fa fa-id-card-alt"></i></span>' +
                        '<h3>Danh sách cán bộ</h3>' +
                        '<span class="tcn7-title-sep"></span>' +
                        '<span class="tcn7-chip tcn7-tone-{mau}"><i class="tcn7-chip-dot"></i>{ten:htmlEncode}</span>' +
                        '<span class="tcn7-title-count"><b>{soText:htmlEncode}</b> cán bộ</span></div>'
                },
                { xtype: 'TrangChuNew7_ViewGrid', flex: 1 }
            ]
        }
    ]
});
