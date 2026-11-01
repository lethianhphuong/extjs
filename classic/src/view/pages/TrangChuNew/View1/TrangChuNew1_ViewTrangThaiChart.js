Ext.define('DEMO.view.pages.TrangChuNew.View1.TrangChuNew1_ViewTrangThaiChart', {
    extend: 'Ext.container.Container',
    xtype: 'TrangChuNew1_ViewTrangThaiChart',
    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.series.Bar',
        'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Category',
        'DEMO.view.pages.TrangChuNew.View1.TrangChuNew1_DisplayConfig'
    ],
    cls: 'tcn-card dash-card',
    height: 420,
    layout: { type: 'vbox', align: 'stretch' },
    items: [
        { xtype: 'component', html: '<h2>Đối tượng QLNV</h2>' },
        {
            xtype: 'cartesian',
            itemId: 'trangThaiChart_IdView',
            height: 280,
            animation: false,
            insetPadding: { top: 24, right: 12, bottom: 16, left: 12 },
            // Chừa chỗ cho nhãn số phía trên cột cao nhất.
            innerPadding: { top: 20, right: 0, bottom: 0, left: 0 },
            bind: { store: '{trangThaiChartStore}' },
            listeners: { afterrender: 'onChartReady' },
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
                {
                    type: 'category',
                    position: 'bottom',
                    fields: ['ma'],
                    style: { textPadding: 0 },
                    label: { fontSize: 12, rotationRads: 0 },
                    renderer: function (axis, value) {
                        return DEMO.view.pages.TrangChuNew.View1.TrangChuNew1_DisplayConfig.get('trangThai', value).nhanTruc;
                    }
                }
            ],
            series: [{
                type: 'bar',
                xField: 'ma',
                yField: 'soLuong',
                style: { maxBarWidth: 42, radius: 4 },
                renderer: function (sprite, config, data, index) {
                    const me = this;
                    const colors = me.getChart().statusColors;
                    const record = data.store.getAt(index);

                    if (!colors || !record) {
                        return {};
                    }
                    const display = DEMO.view.pages.TrangChuNew.View1.TrangChuNew1_DisplayConfig.get('trangThai', record.get('ma'));
                    const color = colors[display.mau] || colors.muted;

                    return { fillStyle: color, strokeStyle: color };
                },
                label: {
                    field: 'soLuong',
                    display: 'outside',
                    calloutLine: false,
                    orientation: 'horizontal',
                    fontSize: 13,
                    renderer: function (value) {
                        return Number(value).toLocaleString('vi-VN');
                    }
                },
                tooltip: {
                    trackMouse: true,
                    renderer: function (tooltip, record) {
                        const display = DEMO.view.pages.TrangChuNew.View1.TrangChuNew1_DisplayConfig.get('trangThai', record.get('ma'));

                        tooltip.setHtml(Ext.String.htmlEncode(display.ten) + ': ' +
                            Number(record.get('soLuong')).toLocaleString('vi-VN') + ' đối tượng');
                    }
                }
            }]
        },
        { xtype: 'component', cls: 'tcn-note', html: 'Phân bổ đối tượng theo từng giai đoạn xử lý' }
    ]
});
