Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View5.TrangChuNew5_ViewDienBien', {
    extend: 'Ext.container.Container',
    xtype: 'TrangChuNew5_ViewDienBien',
    cls: 'tcn5-card',
    padding: 16,
    layout: { type: 'vbox', align: 'stretch' },
    items: [{
        xtype: 'container',
        cls: 'tcn5-card-header',
        layout: { type: 'hbox', align: 'middle' },
        items: [{
            xtype: 'component',
            flex: 1,
            html: '<div class="tcn5-card-title"><i class="x-fa fa-chart-line tcn5-card-icon tcn5-tone-green"></i>Diễn biến mở mới và kết thúc hồ sơ</div>'
        }, {
            xtype: 'button',
            text: 'Mở mới',
            cls: 'tcn5-series-button tcn5-tone-blue',
            enableToggle: true,
            bind: { pressed: '{hienMoMoi}' },
            stateKey: 'hienMoMoi',
            seriesIndex: 0,
            toggleHandler: 'onToggleTrendSeries'
        }, {
            xtype: 'button',
            text: 'Kết thúc',
            cls: 'tcn5-series-button tcn5-tone-green',
            enableToggle: true,
            bind: { pressed: '{hienKetThuc}' },
            stateKey: 'hienKetThuc',
            seriesIndex: 1,
            toggleHandler: 'onToggleTrendSeries'
        }]
    }, {
        xtype: 'TrangChuNew5_ViewDienBienChart',
        itemId: 'dienBienHoSoChart_IdView',
        flex: 1,
        bind: { hidden: '{rong.dienBien}', store: '{dienBienStore}' }
    }, {
        xtype: 'component',
        cls: 'tcn5-empty',
        flex: 1,
        html: 'Không có dữ liệu',
        bind: { hidden: '{!rong.dienBien}' }
    }]
});
