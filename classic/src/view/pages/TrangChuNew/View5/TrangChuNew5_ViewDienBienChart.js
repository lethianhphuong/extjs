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
                const chart = axis.getChart();
                const store = chart ? chart.getStore() : null;
                const record = store ? store.findRecord('code', value, 0, false, true, true) : null;
                return record ? (record.get('name') || value) : value;
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
                    const title = record ? (record.get('nameHover') || record.get('name') || '') : '';
                    const val = record ? Number(record.get('moMoi') || 0).toLocaleString('vi-VN') : 0;
                    tooltip.setHtml(Ext.String.htmlEncode(title) + ' — Mở mới: ' + val + ' hồ sơ');
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
                    const title = record ? (record.get('nameHover') || record.get('name') || '') : '';
                    const val = record ? Number(record.get('ketThuc') || 0).toLocaleString('vi-VN') : 0;
                    tooltip.setHtml(Ext.String.htmlEncode(title) + ' — Kết thúc: ' + val + ' hồ sơ');
                }
            }
        }
    ]
});
