Ext.define('DEMO.view.pages.TrangChuNew.View5.TrangChuNew5_ViewDonVi', {
    extend: 'Ext.container.Container',
    xtype: 'TrangChuNew5_ViewDonVi',
    cls: 'tcn5-card',
    padding: 18,
    layout: { type: 'vbox', align: 'stretch' },
    items: [{
        xtype: 'component', cls: 'tcn5-heading', height: 48,
        html: '<b><i class="x-fa fa-building tcn5-card-icon tcn5-tone-blue"></i>ĐƠN VỊ C02</b><span class="tcn5-level">Cấp Cục C02</span><span class="tcn5-status">● Hoạt động chuẩn</span>'
    }, {
        xtype: 'container', height: 320, layout: { type: 'hbox', align: 'stretch' },
        margin: '18 0',
        items: [{
            xtype: 'container', flex: 1, cls: 'tcn5-inner', padding: 14, margin: '0 14 0 0',
            layout: { type: 'vbox', align: 'stretch' },
            items: [
                { xtype: 'component', cls: 'tcn5-subheading', html: '<i class="x-fa fa-chart-pie tcn5-card-icon tcn5-tone-purple"></i>CƠ CẤU HỒ SƠ THEO ĐƠN VỊ' },
                {
                    xtype: 'container', height: 180, layout: 'absolute',
                    items: [{
                        xtype: 'polar', itemId: 'coCauDonViChart_IdView', chartKind: 'donut',
                        width: '100%', height: 180, animation: false, insetPadding: 28,
                        bind: { store: '{donViStore}' },
                        listeners: { afterrender: 'onChartReady' },
                        series: [{
                            type: 'pie', angleField: 'val', donut: 64,
                            style: { lineWidth: 0 }, highlight: false,
                            label: { field: 'tyLeText', display: 'outside', fontSize: 11, calloutLine: { length: 12 } },
                            tooltip: {
                                trackMouse: true,
                                renderer: function (tooltip, record) {
                                    tooltip.setHtml(Ext.String.htmlEncode(record.get('name')) + ': ' + Number(record.get('val')).toLocaleString('vi-VN') + ' hồ sơ (' + Ext.String.htmlEncode(record.get('tyLeText')) + ')');
                                }
                            }
                        }]
                    }]
                }, {
                    xtype: 'component', bind: { data: '{donVi}' },
                    listeners: { afterrender: 'onTooltipReady' },
                    tpl: '<div class="tcn5-legend"><tpl for="."><span data-tcn5-tip="{name:htmlEncode}: {tyLeText:htmlEncode}"><i class="tcn5-dot tcn5-tone-{mau}"></i>{name:htmlEncode}: <b>{[Number(values.val).toLocaleString("vi-VN")]}</b></span></tpl></div>'
                }
            ]
        }, {
            xtype: 'container', flex: 1, cls: 'tcn5-inner', padding: 14,
            layout: { type: 'vbox', align: 'stretch' },
            items: [
                { xtype: 'component', cls: 'tcn5-subheading', html: '<i class="x-fa fa-chart-bar tcn5-card-icon tcn5-tone-cyan"></i>BIẾN ĐỘNG SỐ LƯỢNG HỒ SƠ THEO ĐƠN VỊ' },
                { xtype: 'TrangChuNew5_ViewBarChart', itemId: 'bienDongDonViChart_IdView', height: 220, bind: { store: '{donViStore}' } }
            ]
        }]
    }, {
        xtype: 'container', cls: 'tcn5-inner', padding: 14, flex: 1,
        layout: { type: 'vbox', align: 'stretch' },
        items: [
            {
                xtype: 'container', cls: 'tcn5-trend-header', layout: { type: 'hbox', align: 'middle' },
                items: [
                    { xtype: 'component', flex: 1, html: '<b><i class="x-fa fa-chart-line tcn5-card-icon tcn5-tone-green"></i>Diễn biến mở mới và kết thúc hồ sơ</b>' },
                    { xtype: 'button', text: 'Mở mới', cls: 'tcn5-series-button tcn5-tone-blue', enableToggle: true, bind: { pressed: '{hienMoMoi}' }, stateKey: 'hienMoMoi', seriesIndex: 0, toggleHandler: 'onToggleTrendSeries' },
                    { xtype: 'button', text: 'Kết thúc', cls: 'tcn5-series-button tcn5-tone-green', enableToggle: true, bind: { pressed: '{hienKetThuc}' }, stateKey: 'hienKetThuc', seriesIndex: 1, toggleHandler: 'onToggleTrendSeries' }
                ]
            },
            { xtype: 'TrangChuNew5_ViewDienBienChart', itemId: 'dienBienHoSoChart_IdView' }
        ]
    }]
});
