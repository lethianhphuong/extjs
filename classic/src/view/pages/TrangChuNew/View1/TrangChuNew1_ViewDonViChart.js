Ext.define('DEMO.view.pages.TrangChuNew.View1.TrangChuNew1_ViewDonViChart', {
    extend: 'Ext.chart.PolarChart',
    xtype: 'TrangChuNew1_ViewDonViChart',
    requires: [
        'Ext.chart.series.Pie',
        'DEMO.view.pages.TrangChuNew.View1.TrangChuNew1_DisplayConfig'
    ],
    itemId: 'donViChart_IdView',
    bind: { store: '{donViTopStore}' },
    animation: false,
    insetPadding: 12,
    listeners: { afterrender: 'onChartReady' },
    series: [{
        type: 'pie',
        angleField: 'val',
        donut: 76,
        style: { lineWidth: 0 },
        highlight: { margin: 3 },
        tooltip: {
            trackMouse: true,
            renderer: function (tooltip, record) {
                const me = this;
                const store = me.getStore();
                const total = store.sum('val') || 0;
                const val = typeof record.get('val') === 'number' ? record.get('val') : 0;
                const percent = total ? val * 100 / total : 0;
                const code = record.get('code');
                const name = record.get('name');
                const display = DEMO.view.pages.TrangChuNew.View1.TrangChuNew1_DisplayConfig.get('donVi', code);

                tooltip.setHtml(
                    Ext.String.htmlEncode(name || display.ten) + ': ' +
                    Number(val).toLocaleString('vi-VN') + ' ĐT (' +
                    Math.round(percent) + '%)'
                );
            }
        }
    }]
});