Ext.define('DEMO.view.pages.TrangChuNew.View1.TrangChuNew1_ViewDienBienChart', {
    extend: 'Ext.container.Container',
    xtype: 'TrangChuNew1_ViewDienBienChart',
    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.series.Line',
        'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Category',
        'Ext.draw.gradient.Linear'
    ],
    cls: 'tcn-card tcn-trend-card dash-card',
    height: 380,
    layout: { type: 'vbox', align: 'stretch' },
    items: [
        {
            xtype: 'container',
            itemId: 'dienBienHeader_IdView',
            cls: 'tcn-trend-header',
            layout: 'auto',
            items: [
                { xtype: 'component', cls: 'tcn-trend-title', html: '<h2>Diễn biến mở mới và kết thúc hồ sơ</h2>' },
                {
                    xtype: 'container',
                    cls: 'tcn-trend-controls',
                    width: 270,
                    layout: 'auto',
                    items: [
                        {
                            xtype: 'button',
                            text: 'Mở mới',
                            cls: 'tcn-series-button tcn-series-new',
                            enableToggle: true,
                            bind: { pressed: '{hienMoMoi}' },
                            seriesIndex: 0,
                            stateKey: 'hienMoMoi',
                            toggleHandler: 'onToggleTrendSeries'
                        },
                        {
                            xtype: 'button',
                            text: 'Kết thúc',
                            cls: 'tcn-series-button tcn-series-end',
                            enableToggle: true,
                            bind: { pressed: '{hienKetThuc}' },
                            seriesIndex: 1,
                            stateKey: 'hienKetThuc',
                            toggleHandler: 'onToggleTrendSeries'
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'cartesian',
            itemId: 'dienBienChart_IdView',
            flex: 1,
            minHeight: 300,
            animation: false,
            insetPadding: 16,
            bind: { store: '{dienBienChartStore}' },
            listeners: { afterrender: 'onChartReady' },
            legend: false,
            axes: [
                {
                    type: 'numeric',
                    position: 'left',
                    minimum: 0,
                    grid: true,
                    renderer: function (axis, value) {
                        return Number(value).toLocaleString('vi-VN');
                    }
                },
                { type: 'category', position: 'bottom', fields: ['ky'] }
            ],
            series: [
                {
                    type: 'line',
                    fill: true,
                    style: { lineWidth: 2.5, fillOpacity: 0.18 },
                    title: 'Mở mới',
                    xField: 'ky',
                    yField: 'moMoi',
                    marker: { radius: 3 },
                    highlight: true,
                    tooltip: {
                        trackMouse: true,
                        renderer: function (tooltip, record) {
                            tooltip.setHtml(Ext.String.htmlEncode(record.get('ky')) + ' — Mở mới: ' +
                                Number(record.get('moMoi')).toLocaleString('vi-VN'));
                        }
                    }
                },
                {
                    type: 'line',
                    fill: true,
                    style: { lineWidth: 2.5, fillOpacity: 0.18 },
                    title: 'Kết thúc',
                    xField: 'ky',
                    yField: 'ketThuc',
                    marker: { radius: 3 },
                    highlight: true,
                    tooltip: {
                        trackMouse: true,
                        renderer: function (tooltip, record) {
                            tooltip.setHtml(Ext.String.htmlEncode(record.get('ky')) + ' — Kết thúc: ' +
                                Number(record.get('ketThuc')).toLocaleString('vi-VN'));
                        }
                    }
                }
            ]
        }
    ]
});
