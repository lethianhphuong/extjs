Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View6.TrangChuNew6_View', {
    extend: 'Ext.container.Container',
    xtype: 'TrangChuNew6_View',
    requires: ['DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.DS_Hoso_GridView3.DS_Hoso_GridView3'],
    controller: 'TrangChuNew6_ViewController',
    viewModel: 'TrangChuNew6_ViewModel',
    cls: 'trang-chu-new6 dash-page',
    scrollable: 'y',
    padding: '0 16 16',
    listeners: { afterrender: 'onChartReady', activate: 'onChartReady' },
    layout: { type: 'vbox', align: 'stretch' },
    defaults: { margin: '16 0 0' },
    items: [
        // Thanh tìm kiếm dùng chung từ View1; phát sự kiện 'timkiem' khi điều kiện hợp lệ
        { xtype: 'TT_TimKiem_View', listeners: { timkiem: 'onSearch' } },
        { xtype: 'TrangChuNew6_ViewCanBo' },
        // 1 hàng 4 card: Loại hồ sơ | Tiến độ theo tháng | CV trực tiếp thực hiện | CV cần phê duyệt (màn hẹp: 2x2 / dọc)
        { xtype: 'TrangChuNew6_ViewKetQua' },
        // Danh sách hồ sơ dùng chung với View3, View5: ẩn cho tới khi click biểu đồ / thẻ KPI và có dữ liệu
        { xtype: 'DS_Hoso_GridView3' },
        // Ẩn khi grid DS hồ sơ ở trên có dữ liệu (controller.onDsHoSoLoad)
        {
            xtype: 'container',
            reference: 'hoSoDuocGiaoCard',
            cls: 'tcn6-card',
            height: 620,
            padding: 16,
            layout: { type: 'vbox', align: 'stretch' },
            items: [
                {
                    xtype: 'component',
                    cls: 'tcn6-card-header',
                    bind: { data: { tong: '{soHoSo}' } },
                    tpl: '<div class="tcn6-card-title"><span class="tcn6-title-icon tcn6-tone-blue"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/></svg></span>Danh sách hồ sơ được giao (mới nhất)</div>' +
                        '<span class="tcn6-chip">{tong} hồ sơ</span>'
                },
                { xtype: 'TrangChuNew6_ViewGrid', flex: 1 }
            ]
        }
    ]
});
