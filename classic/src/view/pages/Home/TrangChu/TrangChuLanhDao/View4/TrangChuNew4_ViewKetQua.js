Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View4.TrangChuNew4_ViewKetQua', {
    extend: 'Ext.container.Container',
    xtype: 'TrangChuNew4_ViewKetQua',
    requires: [
        'Ext.grid.Panel',
        'Ext.chart.PolarChart',
        'Ext.chart.CartesianChart',
        'Ext.chart.series.Pie',
        'Ext.chart.series.Line',
        'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Category'
    ],
    cls: 'tcn4-ketqua-row',
    layout: { type: 'vbox', align: 'stretch' },
    items: [
        // Khối 1 (trên): Kết quả công việc trực tiếp thực hiện (Donut + Line Chart)
        {
            xtype: 'container',
            cls: 'tcn4-card',
            height: 290,
            layout: { type: 'vbox', align: 'stretch' },
            items: [
                {
                    xtype: 'component',
                    cls: 'tcn4-card-header',
                    html: '<div class="tcn4-header-wrap">' +
                        '<span class="tcn4-header-icon tcn4-tone-blue"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 1 0-16 0"/></svg></span>' +
                        '<h3>Kết quả công việc trực tiếp thực hiện</h3>' +
                        '</div>'
                },
                {
                    xtype: 'container',
                    flex: 1,
                    layout: { type: 'hbox', align: 'stretch' },
                    items: [
                        // Cụm Donut Chart
                        {
                            xtype: 'container',
                            flex: 1,
                            layout: { type: 'hbox', align: 'stretch' },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1.1,
                                    layout: 'fit',
                                    cls: 'tcn4-donut-wrapper',
                                    items: [
                                        {
                                            xtype: 'polar',
                                            itemId: 'congViecDonutChart_IdView',
                                            animation: false,
                                            insetPadding: 8,
                                            bind: { store: '{trangThaiDonutStore}' },
                                            listeners: { afterrender: 'onChartReady' },
                                            series: [{
                                                type: 'pie',
                                                angleField: 'soLuong',
                                                donut: 68,
                                                highlight: false,
                                                style: { lineWidth: 1.5, strokeStyle: '#ffffff' },
                                                colors: ['#2563eb', '#16a34a', '#f59e0b', '#dc2626', '#64748b'],
                                                tooltip: {
                                                    trackMouse: true,
                                                    renderer: function (tooltip, record) {
                                                        const name = record.get('name');
                                                        const sl = record.get('soLuong');
                                                        const tl = record.get('tyLe');
                                                        tooltip.setHtml(Ext.String.htmlEncode(name) + ': ' + sl + ' (' + tl + ')');
                                                    }
                                                }
                                            }]
                                        },
                                        {
                                            xtype: 'component',
                                            cls: 'tcn4-donut-center-label',
                                            bind: {
                                                html: '<div class="tcn4-donut-center-inner">' +
                                                    '<strong>{tongSoDonut}</strong>' +
                                                    '<small>Hồ sơ</small>' +
                                                    '</div>'
                                            }
                                        }
                                    ]
                                },
                                // Legend chi tiết bên phải Donut
                                {
                                    xtype: 'component',
                                    flex: 1.1,
                                    cls: 'tcn4-donut-legend-vertical',
                                    html: '<div class="tcn4-vlegend-list">' +
                                        '<div class="tcn4-vlegend-item"><i style="background:#2563eb"></i><span>Đang thực hiện: <strong>72 (56,3%)</strong></span></div>' +
                                        '<div class="tcn4-vlegend-item"><i style="background:#16a34a"></i><span>Đã hoàn thành: <strong>15 (11,7%)</strong></span></div>' +
                                        '<div class="tcn4-vlegend-item"><i style="background:#f59e0b"></i><span>Sắp đến hạn: <strong>6 (4,7%)</strong></span></div>' +
                                        '<div class="tcn4-vlegend-item"><i style="background:#dc2626"></i><span>Quá hạn: <strong>3 (2,3%)</strong></span></div>' +
                                        '<div class="tcn4-vlegend-item"><i style="background:#64748b"></i><span>Khác: <strong>32 (25,0%)</strong></span></div>' +
                                        '</div>'
                                }
                            ]
                        },

                        // Cụm Line Chart (Tiến độ xử lý hồ sơ theo tháng)
                        {
                            xtype: 'container',
                            flex: 1.05,
                            cls: 'tcn4-linechart-container',
                            layout: { type: 'vbox', align: 'stretch' },
                            items: [
                                {
                                    xtype: 'component',
                                    cls: 'tcn4-linechart-title',
                                    html: '<div class="tcn4-chart-subtitle">• Tiến độ xử lý hồ sơ theo tháng</div>'
                                },
                                {
                                    xtype: 'cartesian',
                                    itemId: 'tienDoLineChart_IdView',
                                    flex: 1,
                                    minHeight: 180,
                                    animation: false,
                                    colors: ['#2563eb'],
                                    insetPadding: { top: 20, right: 25, bottom: 10, left: 16 },
                                    bind: { store: '{tienDoThangStore}' },
                                    listeners: { afterrender: 'onChartReady' },
                                    axes: [
                                        {
                                            type: 'numeric',
                                            position: 'left',
                                            fields: ['soLuong'],
                                            minimum: 0,
                                            maximum: 140,
                                            majorTickSteps: 7,
                                            grid: true
                                        },
                                        {
                                            type: 'category',
                                            position: 'bottom',
                                            fields: ['thang']
                                        }
                                    ],
                                    series: [
                                        {
                                            type: 'line',
                                            xField: 'thang',
                                            yField: 'soLuong',
                                            fill: true,
                                            style: {
                                                lineWidth: 3,
                                                strokeStyle: '#2563eb',
                                                // Nền gradient xanh dưới đường cho biểu đồ tươi, đậm hơn
                                                fillStyle: { type: 'linear', degrees: 90, stops: [
                                                    { offset: 0, color: 'rgba(37, 99, 235, 0.35)' },
                                                    { offset: 1, color: 'rgba(37, 99, 235, 0)' }
                                                ] }
                                            },
                                            marker: {
                                                type: 'circle',
                                                radius: 5,
                                                fill: '#2563eb',
                                                stroke: '#ffffff',
                                                lineWidth: 2
                                            },
                                            tooltip: {
                                                trackMouse: true,
                                                renderer: function (tooltip, record) {
                                                    tooltip.setHtml(record.get('thang') + ': ' + record.get('soLuong') + ' hồ sơ');
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },

        // Khối 2 (dưới): Danh sách hồ sơ được giao (mới nhất) - GridPanel
        {
            xtype: 'container',
            cls: 'tcn4-card',
            margin: '10 0 0 0',
            height: 385,
            layout: { type: 'vbox', align: 'stretch' },
            items: [
                {
                    xtype: 'component',
                    cls: 'tcn4-card-header',
                    html: '<div class="tcn4-header-wrap">' +
                        '<span class="tcn4-header-icon tcn4-tone-blue"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/></svg></span>' +
                        '<h3>Danh sách hồ sơ được giao (mới nhất)</h3>' +
                        '</div>'
                },
                {
                    xtype: 'grid',
                    itemId: 'dsHoSoGrid_IdView',
                    cls: 'tcn4-custom-grid',
                    flex: 1,
                    border: false,
                    rowLines: true,
                    columnLines: true,
                    scrollable: 'y',
                    bind: { store: '{dsHoSoStore}' },
                    columns: [
                        {
                            text: 'STT',
                            dataIndex: 'stt',
                            width: 60,
                            align: 'center'
                        },
                        {
                            text: 'Mã đối tượng',
                            dataIndex: 'maDoiTuong',
                            flex: 1,
                            minWidth: 150,
                            align: 'center',
                            renderer: function (val) {
                                return '<span class="tcn4-code-text">' + Ext.String.htmlEncode(val) + '</span>';
                            }
                        },
                        {
                            text: 'Ngày đưa vào quản lý',
                            dataIndex: 'ngayDuaVaoQuanLy',
                            flex: 1.25,
                            minWidth: 180,
                            align: 'center'
                        },
                        {
                            text: 'Loại hồ sơ',
                            dataIndex: 'loaiHsText',
                            flex: 1,
                            minWidth: 140,
                            align: 'center',
                            renderer: function (val) {
                                return Ext.String.htmlEncode(val || '');
                            }
                        },
                        {
                            text: 'Số đăng ký',
                            dataIndex: 'soDangKy',
                            flex: 1.15,
                            minWidth: 160,
                            align: 'center'
                        }
                    ]
                }
            ]
        }
    ]
});
