Ext.define('DEMO.view.pages.TrangChuNew.View5.TrangChuNew5_ViewDienBienChart', {
    extend: 'Ext.chart.CartesianChart',
    xtype: 'TrangChuNew5_ViewDienBienChart',
    chartKind: 'trend',
    height: 230,
    animation: false,
    insetPadding: 12,
    bind: { store: '{dienBienStore}' },
    listeners: { afterrender: 'onChartReady' },
    axes: [
        { type: 'numeric', position: 'left', minimum: 0, grid: true },
        { type: 'category', position: 'bottom', fields: ['code'],
            renderer: function (axis, value) {
                const record = axis.getChart().getStore().findRecord('code', value, 0, false, true, true);
                return record ? record.get('name') : value;
            } }
    ],
    series: [
        {
            type: 'line', xField: 'code', yField: 'moMoi', title: 'Mở mới',
            fill: true, style: { lineWidth: 2.5, fillOpacity: 0.18 },
            marker: { radius: 3 }, highlight: true,
            tooltip: {
                trackMouse: true,
                renderer: function (tooltip, record) {
                    tooltip.setHtml(Ext.String.htmlEncode(record.get('nameHover') || record.get('name')) + ' — Mở mới: ' + Number(record.get('moMoi')).toLocaleString('vi-VN') + ' hồ sơ');
                }
            }
        },
        {
            type: 'line', xField: 'code', yField: 'ketThuc', title: 'Kết thúc',
            fill: true, style: { lineWidth: 2.5, fillOpacity: 0.18 },
            marker: { radius: 3 }, highlight: true,
            tooltip: {
                trackMouse: true,
                renderer: function (tooltip, record) {
                    tooltip.setHtml(Ext.String.htmlEncode(record.get('nameHover') || record.get('name')) + ' — Kết thúc: ' + Number(record.get('ketThuc')).toLocaleString('vi-VN') + ' hồ sơ');
                }
            }
        }
    ]
});
