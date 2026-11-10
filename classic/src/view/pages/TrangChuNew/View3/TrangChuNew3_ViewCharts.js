Ext.define('DEMO.view.pages.TrangChuNew.View3.TrangChuNew3_ViewCharts', {
    extend: 'Ext.container.Container',
    xtype: 'TrangChuNew3_ViewCharts',
    requires: [
        'Ext.layout.container.Fit',
        'Ext.chart.PolarChart',
        'Ext.chart.CartesianChart',
        'Ext.chart.series.Pie',
        'Ext.chart.series.Bar',
        'Ext.chart.series.Line',
        'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Category'
    ],
    cls: 'tcn3-charts-row',
    layout: { type: 'hbox', align: 'stretch' },
    height: 320,
    minHeight: 320,
    items: [
        // Biểu đồ 1: Cơ cấu hồ sơ theo loại đơn vị (Donut Chart)
        {
            xtype: 'container',
            cls: 'tcn3-card',
            flex: 1,
            margin: '0 8 0 0',
            layout: { type: 'vbox', align: 'stretch' },
            items: [
                {
                    xtype: 'component',
                    cls: 'tcn3-card-header',
                    html: '<div class="tcn3-header-wrap">' +
                        '<span class="tcn3-header-icon tcn3-tone-blue"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg></span>' +
                        '<h3>Cơ cấu hồ sơ theo loại đơn vị</h3>' +
                        '</div>'
                },
                {
                    xtype: 'container',
                    flex: 1,
                    layout: 'fit',
                    cls: 'tcn3-donut-body-wrap',
                    minHeight: 185,
                    items: [
                        {
                            xtype: 'polar',
                            itemId: 'coCauChart_IdView',
                            animation: false,
                            insetPadding: 10,
                            bind: { store: '{coCauStore}' },
                            listeners: { afterrender: 'onChartReady' },
                            series: [{
                                type: 'pie',
                                angleField: 'soLuong',
                                donut: 60,
                                radiusFactor: 95,
                                highlight: false,
                                style: { lineWidth: 1.5, strokeStyle: '#ffffff' },
                                colors: ['#3b82f6', '#00a47e', '#a78bfa'],
                                labelOverflowPadding: 0,
                                label: {
                                    field: 'tyLe',
                                    display: 'inside',
                                    fontSize: 12,
                                    fontWeight: 'bold',
                                    fillStyle: '#ffffff',
                                    calloutLine: false,
                                    renderer: function (val) {
                                        const percent = Number(String(val).replace('%', '').replace(',', '.'));
                                        return {
                                            text: percent >= 7 ? String(val).replace('.', ',') + '%' : '',
                                            rotationRads: 0
                                        };
                                    }
                                },
                                tooltip: {
                                    trackMouse: true,
                                    renderer: function (tooltip, record) {
                                        const name = record.get('name');
                                        const sl = Number(record.get('soLuong')).toLocaleString('vi-VN');
                                        const tl = record.get('tyLe');
                                        tooltip.setHtml(Ext.String.htmlEncode(name) + ': ' + sl + ' hồ sơ (' + tl + '%)');
                                    }
                                }
                            }]
                        },
                        {
                            xtype: 'component',
                            cls: 'tcn3-donut-center-label',
                            bind: {
                                html: '<div class="tcn3-donut-center-inner">' +
                                    '<strong>{tongSoDonut}</strong>' +
                                    '<small>Hồ sơ</small>' +
                                    '</div>'
                            }
                        }
                    ]
                },
                {
                    xtype: 'component',
                    cls: 'tcn3-donut-legend-horizontal',
                    html: '<div class="tcn3-legend-row">' +
                        '<span class="tcn3-legend-item"><i style="background:#3b82f6"></i>Cấp Cục</span>' +
                        '<span class="tcn3-legend-item"><i style="background:#00a47e"></i>Cấp tỉnh</span>' +
                        '<span class="tcn3-legend-item"><i style="background:#a78bfa"></i>Cấp Xã</span>' +
                        '</div>'
                }
            ]
        },

        // Biểu đồ 2: Biến động số lượng hồ sơ theo đơn vị (Stacked Bar & Line)
        {
            xtype: 'container',
            cls: 'tcn3-card',
            flex: 1.5,
            margin: '0 8 0 0',
            layout: { type: 'vbox', align: 'stretch' },
            items: [
                {
                    xtype: 'component',
                    cls: 'tcn3-card-header',
                    html: '<div class="tcn3-header-wrap" style="justify-content: space-between;">' +
                        '<div style="display:flex; align-items:center; gap:8px;">' +
                        '<span class="tcn3-header-icon tcn3-tone-blue"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 20V10M12 20V4M6 20v-6"/></svg></span>' +
                        '<h3>Biến động số lượng hồ sơ theo đơn vị</h3>' +
                        '</div>' +
                        '</div>'
                },
                {
                    xtype: 'cartesian',
                    itemId: 'bienDongChart_IdView',
                    flex: 1,
                    animation: false,
                    colors: ['#a78bfa', '#00a47e', '#3b82f6'],
                    insetPadding: { top: 25, right: 15, bottom: 8, left: 16 },
                    bind: { store: '{bienDongStore}' },
                    listeners: { afterrender: 'onChartReady' },
                    axes: [
                        {
                            type: 'numeric',
                            position: 'left',
                            fields: ['capXa', 'capTinh', 'capCuc', 'tongSo'],
                            minimum: 0,
                            grid: true,
                            renderer: function (axis, label) {
                                return Number(label).toLocaleString('vi-VN');
                            }
                        },
                        {
                            type: 'category',
                            position: 'bottom',
                            fields: ['code'],
                            renderer: function (axis, value) {
                                const record = axis.getChart().getStore().findRecord('code', value, 0, false, true, true);
                                return record ? record.get('name') : value;
                            }
                        }
                    ],
                    series: [
                        {
                            type: 'bar',
                            stacked: true,
                            xField: 'code',
                            yField: ['capXa', 'capTinh', 'capCuc'],
                            style: { maxBarWidth: 30, radius: 3, lineWidth: 1, strokeStyle: '#ffffff' },
                            tooltip: {
                                trackMouse: true,
                                renderer: function (tooltip, record, item) {
                                    const field = item.field;
                                    const fieldNames = { capXa: 'Cấp Xã', capTinh: 'Cấp tỉnh', capCuc: 'Cấp Cục' };
                                    const name = fieldNames[field] || field;
                                    const val = Number(record.get(field)).toLocaleString('vi-VN');
                                    const label = record.get('nameHover') || record.get('name') || record.get('quy');
                                    tooltip.setHtml(Ext.String.htmlEncode(label) + ' — ' + name + ': ' + val + ' hồ sơ');
                                }
                            }
                        },
                        {
                            type: 'line',
                            xField: 'code',
                            yField: 'tongSo',
                            style: { strokeStyle: '#f97316', lineWidth: 2.5 },
                            marker: { radius: 4, fillStyle: '#f97316', strokeStyle: '#ffffff', lineWidth: 1.5 },
                            label: {
                                field: 'tongSo',
                                display: 'over',
                                color: '#c2410c',
                                fontSize: 11,
                                fontWeight: '700',
                                renderer: function (val, sprite, config, data, index) {
                                    const store = data && data.store;
                                    const count = store ? store.getCount() : 5;
                                    if (index === count - 1 && val) {
                                        return Number(val).toLocaleString('vi-VN');
                                    }
                                    return '';
                                }
                            },
                            tooltip: {
                                trackMouse: true,
                                renderer: function (tooltip, record) {
                                    const val = Number(record.get('tongSo')).toLocaleString('vi-VN');
                                    const label = record.get('nameHover') || record.get('name') || record.get('quy');
                                    tooltip.setHtml(Ext.String.htmlEncode(label) + ' — Tổng: ' + val + ' hồ sơ');
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'component',
                    cls: 'tcn3-biendong-legend-horizontal',
                    html: '<div class="tcn3-legend-row">' +
                        '<span class="tcn3-legend-item"><i style="background:#3b82f6"></i>Cấp Cục</span>' +
                        '<span class="tcn3-legend-item"><i style="background:#00a47e"></i>Cấp tỉnh</span>' +
                        '<span class="tcn3-legend-item"><i style="background:#a78bfa"></i>Cấp Xã</span>' +
                        '<span class="tcn3-legend-item"><i class="tcn3-line-dot"></i>Số hồ sơ</span>' +
                        '</div>'
                }
            ]
        },

        // Biểu đồ 3: Cơ cấu theo loại đối tượng (Horizontal Bar Chart ExtJS)
        {
            xtype: 'container',
            cls: 'tcn3-card',
            flex: 1,
            layout: { type: 'vbox', align: 'stretch' },
            items: [
                {
                    xtype: 'component',
                    cls: 'tcn3-card-header',
                    html: '<div class="tcn3-header-wrap">' +
                        '<span class="tcn3-header-icon tcn3-tone-blue"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20V10M18 20V4M6 20v-4"/></svg></span>' +
                        '<h3>Cơ cấu theo loại đối tượng</h3>' +
                        '</div>'
                },
                {
                    xtype: 'cartesian',
                    itemId: 'loaiDoiTuongChart_IdView',
                    flex: 1,
                    flipXY: true,
                    animation: false,
                    insetPadding: { top: 15, right: 16, bottom: 18, left: 10 },
                    bind: { store: '{loaiDoiTuongStore}' },
                    listeners: { afterrender: 'onChartReady' },
                    axes: [
                        {
                            type: 'numeric',
                            position: 'bottom',
                            fields: ['val'],
                            minimum: 0,
                            grid: true,
                            renderer: function (axis, label) {
                                return Number(label).toLocaleString('vi-VN');
                            }
                        },
                        {
                            type: 'category',
                            position: 'left',
                            fields: ['name']
                        }
                    ],
                    series: [
                        {
                            type: 'bar',
                            xField: 'name',
                            yField: 'val',
                            style: { maxBarWidth: 16, radius: 4, lineWidth: 0 },
                            renderer: function (sprite, config, rendererData, index) {
                                const cfg = DEMO.view.pages.TrangChuNew.View3.TrangChuNew3_DisplayConfig;
                                const store = rendererData.store;
                                const record = store ? store.getAt(index) : null;
                                const key = record ? (record.get('code') || record.get('name')) : null;
                                const color = cfg.getLoaiDoiTuongColor(key, index);

                                return {
                                    fillStyle: color,
                                    strokeStyle: color,
                                    lineWidth: 0
                                };
                            },
                            label: {
                                field: 'val',
                                display: 'outside',
                                color: '#334155',
                                fontSize: 11.5,
                                fontWeight: '600',
                                renderer: function (val) {
                                    return Number(val).toLocaleString('vi-VN');
                                }
                            },
                            tooltip: {
                                trackMouse: true,
                                renderer: function (tooltip, record) {
                                    const val = Number(record.get('val')).toLocaleString('vi-VN');
                                    tooltip.setHtml(record.get('name') + ': ' + val + ' đối tượng');
                                }
                            }
                        }
                    ]
                }
            ]
        }
    ]
});
