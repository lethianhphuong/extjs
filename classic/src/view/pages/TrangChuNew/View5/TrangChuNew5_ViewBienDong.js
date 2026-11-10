Ext.define('DEMO.view.pages.TrangChuNew.View5.TrangChuNew5_ViewBienDong', {
    extend: 'Ext.container.Container',
    xtype: 'TrangChuNew5_ViewBienDong',
    cls: 'tcn5-card',
    padding: 16,
    layout: { type: 'vbox', align: 'stretch' },
    items: [{
        xtype: 'component',
        cls: 'tcn5-card-header',
        html: '<div class="tcn5-card-title"><i class="x-fa fa-chart-bar tcn5-card-icon tcn5-tone-cyan"></i>Biến động hồ sơ theo đơn vị</div>' +
            '<div class="tcn5-card-extra">Top 7</div>'
    }, {
        xtype: 'TrangChuNew5_ViewBarChart',
        itemId: 'bienDongDonViChart_IdView',
        flex: 1,
        bind: { hidden: '{rong.bienDong}', store: '{bienDongDonViStore}' }
    }, {
        xtype: 'component',
        cls: 'tcn5-empty',
        flex: 1,
        html: 'Không có dữ liệu',
        bind: { hidden: '{!rong.bienDong}' }
    }]
});
