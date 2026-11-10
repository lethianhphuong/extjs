Ext.define('DEMO.view.pages.TrangChuNew.View5.TrangChuNew5_ViewBarChart', {
    extend: 'Ext.chart.CartesianChart',
    xtype: 'TrangChuNew5_ViewBarChart',
    animation: false,
    height: 170,
    insetPadding: { top: 26, right: 8, bottom: 8, left: 8 },
    innerPadding: { top: 15, right: 0, bottom: 0, left: 0 },
    listeners: { afterrender: 'onChartReady', storechange: 'onBarStoreChange' },
    axes: [
        { type: 'numeric', position: 'left', minimum: 0, hidden: true },
        { type: 'category', position: 'bottom', fields: ['code'], label: { fontSize: 10, rotationRads: 0 },
            style: { textPadding: 0 },
            renderer: function (axis, value) {
                const record = axis.getChart().getStore().findRecord('code', value, 0, false, true, true);
                return record ? record.get('name').replace(/ /g, '\n') : value;
            } }
    ],
    series: [{
        type: 'bar', xField: 'code', yField: 'val',
        style: { maxBarWidth: 28, radius: 4 },
        label: { field: 'val', display: 'outside', orientation: 'horizontal', calloutLine: false },
        renderer: function (sprite, config, data, index) {
            const me = this;
            const palette = me.getChart().recordColors;
            const record = data.store.getAt(index);
            return palette && record ? { fillStyle: palette[record.get('mau')], strokeStyle: palette[record.get('mau')] } : {};
        },
        tooltip: {
            trackMouse: true,
            renderer: function (tooltip, record) {
                tooltip.setHtml(Ext.String.htmlEncode(record.get('name')) + ': ' + Number(record.get('val')).toLocaleString('vi-VN'));
            }
        }
    }]
});
