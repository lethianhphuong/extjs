Ext.define('DEMO.view.pages.TrangChuNew.View2.TrangChuNew2_ViewSoLuong', {
    extend: 'Ext.container.Container',
    xtype: 'TrangChuNew2_ViewSoLuong',
    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Category',
        'Ext.chart.series.Bar'
    ],
    cls: 'tcn2-card tcn2-count-card',
    layout: { type: 'vbox', align: 'stretch' },
    items: [
        {
            xtype: 'component',
            cls: 'tcn2-section-header tcn2-section-header-flex',
            style: 'display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;',
            bind: {
                html: '<div class="tcn2-section-title-wrap" style="display: flex; align-items: center; gap: 8px; min-width: 0;">' +
                    '<span class="tcn-analysis-icon" style="display: inline-flex; align-items: center; justify-content: center; width: 26px; height: 26px; border-radius: 7px; background: rgba(37, 99, 235, 0.1); color: #2563eb; flex-shrink: 0;" aria-hidden="true">' +
                    '<svg style="width: 16px; height: 16px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
                    '<path d="M18 20V10M12 20V4M6 20v-6"/>' +
                    '</svg></span>' +
                    '<h2 style="margin: 0;">Số lượng hồ sơ theo 8 loại hồ sơ</h2>' +
                    '</div>' +
                    '<span class="tcn2-badge" style="margin-top: 0; white-space: nowrap; flex-shrink: 0; color: #2563eb; background: rgba(37, 99, 235, 0.08); border-color: rgba(37, 99, 235, 0.2); font-weight: 400;">Tổng: <strong style="font-weight: 700;">{tongHoSo}</strong> hồ sơ</span>'
            }
        },
        {
            xtype: 'cartesian',
            listeners: { afterrender: 'onChartReady' },
            height: 185,
            insetPadding: { top: 26, right: 12, bottom: 8, left: 12 },
            innerPadding: { top: 25, right: 0, bottom: 0, left: 0 },
            bind: { store: '{hoSoStore}' },
            axes: [
                { type: 'numeric', position: 'left', fields: ['soLuong'], minimum: 0, grid: true },
                { type: 'category', position: 'bottom', fields: ['ten'] }
            ],
            series: [{
                type: 'bar',
                xField: 'ten',
                yField: 'soLuong',
                style: { maxBarWidth: 32, radius: 4 },
                label: {
                    field: 'soLuong',
                    display: 'outside',
                    calloutLine: false,
                    orientation: 'horizontal',
                    fontSize: 12,
                    fontWeight: 'bold',
                    renderer: function (val) {
                        return Number(val).toLocaleString('vi-VN');
                    }
                },
                highlight: false,
                tooltip: {
                    trackMouse: true,
                    renderer: function (tooltip, record) {
                        const ten = Ext.String.htmlEncode(record.get('ten'));
                        const soLuong = Number(record.get('soLuong')).toLocaleString('vi-VN');
                
                        tooltip.setHtml(ten + ': ' + soLuong + ' hồ sơ');
                    }
                },
                renderer: function (sprite, config, data, index) {
                    const me = this;
                    const colors = me.getColors();
                    const color = colors && colors[index];

                    return color ? { fillStyle: color, strokeStyle: color } : {};
                }
            }]
        }
    ]
});
