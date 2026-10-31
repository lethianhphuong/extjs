Ext.define('DEMO.view.pages.TrangChuNew.View1.TrangChuNew1_ViewTrangThaiChart', {
    extend: 'Ext.container.Container',
    xtype: 'TrangChuNew1_ViewTrangThaiChart',
    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.series.Bar',
        'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Category'
    ],
    cls: 'tcn-card dash-card',
    layout: { type: 'vbox', align: 'stretch' },
    items: [
        { xtype: 'component', html: '<h2>Số hồ sơ theo trạng thái</h2>' },
        {
            xtype: 'cartesian',
            reference: 'trangThaiChart',
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
                    fields: ['ten'],
                    style: { textPadding: 0 },
                    label: { fontSize: 12, rotationRads: 0 },
                    renderer: function (axis, value) {
                        const labels = {
                            'Đang quản lý': 'Đang\nquản lý',
                            'Đã kết thúc': 'Đã\nkết thúc',
                            'Lập mới': 'Lập\nmới',
                            'Chưa có số HS': 'Chưa có\nsố HS'
                        };

                        return labels[value] || value;
                    }
                }
            ],
            series: [{
                type: 'bar',
                xField: 'ten',
                yField: 'soLuong',
                style: { maxBarWidth: 42, radius: 4 },
                renderer: function (sprite, config, data, index) {
                    const me = this;
                    const colors = me.getColors() || me.getChart().getColors();

                    return { fillStyle: colors[index] };
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
                        tooltip.setHtml(Ext.String.htmlEncode(record.get('ten')) + ': ' +
                            Number(record.get('soLuong')).toLocaleString('vi-VN') + ' hồ sơ');
                    }
                }
            }]
        },
        { xtype: 'component', cls: 'tcn-note', html: 'Phân bổ hồ sơ theo từng giai đoạn xử lý' }
    ]
});
