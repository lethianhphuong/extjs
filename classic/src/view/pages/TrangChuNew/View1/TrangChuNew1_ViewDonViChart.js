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
        angleField: 'soLuong',
        donut: 76,
        style: { lineWidth: 0 },
        highlight: { margin: 3 },
        tooltip: {
            trackMouse: true,
            renderer: function (tooltip, record) {
                const me = this;
                const total = me.getStore().sum('soLuong');
                const percent = total ? record.get('soLuong') * 100 / total : 0;
                const display = DEMO.view.pages.TrangChuNew.View1.TrangChuNew1_DisplayConfig.get('donVi', record.get('ma'));

                tooltip.setHtml(
                    Ext.String.htmlEncode(display.ten) + ': ' +
                    Number(record.get('soLuong')).toLocaleString('vi-VN') + ' ĐT (' +
                    Math.round(percent) + '%)'
                );
            }
        }
    }]
});
