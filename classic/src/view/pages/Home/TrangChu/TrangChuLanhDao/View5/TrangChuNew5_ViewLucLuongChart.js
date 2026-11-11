Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View5.TrangChuNew5_ViewLucLuongChart', {
    extend: 'Ext.chart.CartesianChart',
    xtype: 'TrangChuNew5_ViewLucLuongChart',
    chartKind: 'group',
    animation: false,
    flipXY: true,
    insetPadding: { top: 4, right: 12, bottom: 4, left: 4 },
    listeners: { afterrender: 'onChartReady', storechange: 'onBarStoreChange' },
    axes: [
        { type: 'numeric', position: 'bottom', minimum: 0, hidden: true },
        { type: 'category', position: 'left', fields: ['code'],
            renderer: function (axis, value) {
                const chart = axis.getChart();
                const store = chart ? chart.getStore() : null;
                const record = store ? store.findRecord('code', value, 0, false, true, true) : null;
                return record ? (record.get('name') || value) : value;
            } }
    ],
    series: [{
        type: 'bar',
        xField: 'code',
        yField: ['tinh', 'xa'],
        title: ['Cấp tỉnh', 'Cấp xã'],
        stacked: false,
        style: { maxBarWidth: 12, minGapWidth: 10, inGroupGapWidth: 2 },
        label: { field: ['tinh', 'xa'], display: 'outside', calloutLine: false,
            renderer: function (text) { return Number(text || 0).toLocaleString('vi-VN'); }
        },
        tooltip: {
            trackMouse: true,
            renderer: function (tooltip, record, item) {
                const capTinh = item.field === 'tinh';
                tooltip.setHtml(Ext.String.htmlEncode(record.get('name') || '') + ' — ' + (capTinh ? 'Cấp tỉnh' : 'Cấp xã') +
                    ': <b>' + Number(record.get(item.field) || 0).toLocaleString('vi-VN') + '</b> hồ sơ');
            }
        }
    }]
});
