Ext.define('DEMO.view.pages.TrangChuNew.View1.TrangChuNew1_ViewDonViChart', {
    extend: 'Ext.chart.PolarChart',
    xtype: 'TrangChuNew1_ViewDonViChart',
    requires: ['Ext.chart.series.Pie'],
    reference: 'donViChart',
    bind: { store: '{donViChartStore}' },
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
                tooltip.setHtml(
                    Ext.String.htmlEncode(record.get('ten')) + ': ' +
                    Number(record.get('soLuong')).toLocaleString('vi-VN') + ' HS (' +
                    Ext.String.htmlEncode(record.get('tyLeText')) + ')'
                );
            }
        }
    }]
});
