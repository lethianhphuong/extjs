Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View5.TrangChuNew5_View', {
    extend: 'Ext.container.Container',
    xtype: 'TrangChuNew5_View',
    requires: [
        // Bật responsiveConfig cho Component (đổi bố cục theo độ rộng màn hình)
        'Ext.Responsive',
        'DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.DS_Hoso_GridView3.DS_Hoso_GridView3'
    ],
    controller: 'TrangChuNew5_ViewController',
    viewModel: 'TrangChuNew5_ViewModel',
    cls: 'trang-chu-new5 dash-page',
    scrollable: true,
    listeners: { afterrender: 'onChartReady', activate: 'onChartReady' },
    padding: 18,
    layout: { type: 'vbox', align: 'stretch' },
    items: [
        { xtype: 'TrangChuNew5_ViewThongKe' },
        /*
         * ĐƠN VỊ | HỆ LỰC LƯỢNG theo độ rộng màn hình: >= 1400px cạnh nhau; < 1400px xếp dọc;
         * < 900px 2 biểu đồ nhỏ trong mỗi khối cũng xếp dọc nên khối cao thêm 320 + 14 (800 → 1134).
         * Layout 'box' + responsive chỉ đổi `vertical` (đổi type hbox↔vbox sẽ lỗi "reading 'getSizeModel'" khi resize).
         * Khi xếp dọc, hàng để height null (co theo nội dung) nên flex bị bỏ qua và mỗi khối dùng height của nó.
         */
        {
            xtype: 'container', margin: '18 0 0',
            layout: { type: 'box', align: 'stretch' },
            responsiveConfig: {
                'width >= 1400': { layout: { vertical: false }, height: 800 },
                'width < 1400': { layout: { vertical: true }, height: null }
            },
            items: [{
                xtype: 'TrangChuNew5_ViewDonVi',
                flex: 0.45,
                responsiveConfig: {
                    'width >= 1400': { margin: '0 18 0 0', height: 800 },
                    'width >= 900 && width < 1400': { margin: '0 0 18 0', height: 800 },
                    'width < 900': { margin: '0 0 18 0', height: 1134 }
                }
            }, {
                xtype: 'TrangChuNew5_ViewLucLuong',
                flex: 0.55,
                responsiveConfig: {
                    'width >= 900': { height: 800 },
                    'width < 900': { height: 1134 }
                }
            }]
        },
        // Danh sách hồ sơ dùng chung với View3: ẩn cho tới khi click biểu đồ / thẻ KPI và có dữ liệu
        { xtype: 'DS_Hoso_GridView3', minWidth: 1080, margin: '18 0 0' }
    ]
});
