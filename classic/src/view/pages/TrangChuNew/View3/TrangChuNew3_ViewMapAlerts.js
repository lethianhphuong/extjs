Ext.define('DEMO.view.pages.TrangChuNew.View3.TrangChuNew3_ViewMapAlerts', {
    extend: 'Ext.container.Container',
    xtype: 'TrangChuNew3_ViewMapAlerts',
    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.series.Line',
        'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Category',
        'Ext.grid.Panel'
    ],
    cls: 'tcn3-map-alerts-row',
    layout: { type: 'hbox', align: 'stretch' },
    height: 360,
    minHeight: 360,
    margin: '12 0 0 0',
    items: [
        // Khối 1: Diễn biến mở mới và kết thúc hồ sơ (12 tháng)
        {
            xtype: 'container',
            cls: 'tcn3-card',
            flex: 1.1,
            margin: '0 8 0 0',
            layout: { type: 'vbox', align: 'stretch' },
            items: [
                {
                    xtype: 'container',
                    cls: 'tcn3-card-header',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'component',
                            flex: 1,
                            html: '<div class="tcn3-header-wrap">' +
                                '<span class="tcn3-header-icon tcn3-tone-blue"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4v16h16M7 15l4-4 4 2 5-6m-5 0h5v5"/></svg></span>' +
                                '<h3>Diễn biến mở mới và kết thúc hồ sơ</h3>' +
                                '</div>'
                        }
                    ]
                },
                {
                    xtype: 'component',
                    cls: 'tcn3-dienbien-legend-bar',
                    html: '<div class="tcn3-dienbien-legend">' +
                        '<span class="tcn3-db-item db-blue"><i class="db-line"></i> Mở mới</span>' +
                        '<span class="tcn3-db-item db-green"><i class="db-line"></i> Kết thúc</span>' +
                        '</div>'
                },
                {
                    xtype: 'cartesian',
                    itemId: 'dienBienChart_IdView',
                    flex: 1,
                    minHeight: 210,
                    animation: false,
                    insetPadding: { top: 12, right: 16, bottom: 10, left: 16 },
                    bind: { store: '{dienBienStore}' },
                    listeners: { afterrender: 'onChartReady' },
                    axes: [
                        {
                            type: 'numeric',
                            position: 'left',
                            fields: ['moMoi', 'ketThuc'],
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
                            type: 'line',
                            title: 'Mở mới',
                            xField: 'code',
                            yField: 'moMoi',
                            style: { strokeStyle: '#0284c7', lineWidth: 2.2 },
                            marker: { radius: 3, fillStyle: '#0284c7' },
                            highlight: true,
                            tooltip: {
                                trackMouse: true,
                                renderer: function (tooltip, record) {
                                    const val = Number(record.get('moMoi')).toLocaleString('vi-VN');
                                    const label = record.get('nameHover') || record.get('name') || record.get('thang');
                                    tooltip.setHtml(Ext.String.htmlEncode(label) + ' — Mở mới: ' + val + ' hồ sơ');
                                }
                            }
                        },
                        {
                            type: 'line',
                            title: 'Kết thúc',
                            xField: 'code',
                            yField: 'ketThuc',
                            style: { strokeStyle: '#16a34a', lineWidth: 2.2 },
                            marker: { radius: 3, fillStyle: '#16a34a' },
                            highlight: true,
                            tooltip: {
                                trackMouse: true,
                                renderer: function (tooltip, record) {
                                    const val = Number(record.get('ketThuc')).toLocaleString('vi-VN');
                                    const label = record.get('nameHover') || record.get('name') || record.get('thang');
                                    tooltip.setHtml(Ext.String.htmlEncode(label) + ' — Kết thúc: ' + val + ' hồ sơ');
                                }
                            }
                        }
                    ]
                }
            ]
        },

        // Khối 2: Bản đồ phân bổ hồ sơ theo địa bàn & Top địa bàn
        {
            xtype: 'container',
            cls: 'tcn3-card',
            flex: 1.6,
            margin: '0 8 0 0',
            layout: { type: 'vbox', align: 'stretch' },
            items: [
                {
                    xtype: 'component',
                    cls: 'tcn3-card-header',
                    html: '<div class="tcn3-header-wrap">' +
                        '<span class="tcn3-header-icon tcn3-tone-blue"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></span>' +
                        '<h3>Bản đồ phân bổ hồ sơ theo địa bàn</h3>' +
                        '</div>'
                },
                {
                    xtype: 'container',
                    flex: 1,
                    layout: { type: 'hbox', align: 'stretch' },
                    items: [
                        // Bản đồ tĩnh lấy theo URL ảnh cấu hình (Nhấp để mở URL bản đồ)
                        {
                            xtype: 'container',
                            itemId: 'vietnamMapContainer_IdView',
                            cls: 'tcn3-vietnam-map-container',
                            flex: 1,
                            minWidth: 230,
                            layout: 'fit',
                            items: [{
                                xtype: 'image',
                                cls: 'tcn3-static-map-img',
                                alt: 'Bản đồ phân bổ hồ sơ theo địa bàn',
                                title: 'Nhấp để mở bản đồ chi tiết',
                                bind: {
                                    src: '{bandoImgUrl}'
                                }
                            }],
                            listeners: {
                                el: {
                                    click: 'onOpenMapUrl'
                                }
                            }
                        },
                        // Bảng Top địa bàn
                        {
                            xtype: 'container',
                            flex: 1,
                            cls: 'tcn3-top-diaban-container',
                            layout: { type: 'vbox', align: 'stretch' },
                            items: [
                                {
                                    xtype: 'component',
                                    cls: 'tcn3-diaban-subhead',
                                    html: '<div class="tcn3-subhead-wrap">' +
                                        '<h4>Top địa bàn có nhiều hồ sơ</h4>' +
                                        '</div>'
                                },
                                {
                                    xtype: 'grid',
                                    cls: 'tcn3-top-diaban-grid',
                                    flex: 1,
                                    bind: { store: '{topDiaBanStore}' },
                                    enableColumnHide: false,
                                    enableColumnMove: false,
                                    enableColumnResize: false,
                                    sortableColumns: false,
                                    columns: [
                                        {
                                            text: 'STT',
                                            dataIndex: 'stt',
                                            width: 46,
                                            align: 'center',
                                            renderer: function (val) {
                                                return '<span class="tcn3-rank-badge rank-' + val + '">' + val + '</span>';
                                            }
                                        },
                                        {
                                            text: 'Địa bàn',
                                            dataIndex: 'diaBan',
                                            flex: 1,
                                            renderer: function (val) {
                                                return '<span class="tcn3-diaban-name">' + Ext.String.htmlEncode(val) + '</span>';
                                            }
                                        },
                                        {
                                            text: 'Số hồ sơ',
                                            dataIndex: 'soHoSoText',
                                            width: 85,
                                            align: 'right',
                                            renderer: function (val) {
                                                return '<strong>' + Ext.String.htmlEncode(val) + '</strong>';
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'component',
                                    cls: 'tcn3-diaban-footer',
                                    html: '<a href="javascript:void(0)" class="tcn3-map-link">Xem chi tiết trên bản đồ &rarr;</a>',
                                    listeners: {
                                        el: {
                                            click: 'onOpenMapUrl'
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        },

        // Khối 3: Cảnh báo nổi bật
        {
            xtype: 'container',
            cls: 'tcn3-card tcn3-alert-card',
            flex: 0.9,
            layout: { type: 'vbox', align: 'stretch' },
            items: [
                {
                    xtype: 'component',
                    cls: 'tcn3-card-header tcn3-alert-header',
                    html: '<div class="tcn3-header-wrap">' +
                        '<span class="tcn3-header-icon tcn3-tone-red"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></span>' +
                        '<h3 style="color: #b91c1c;">Cảnh báo nổi bật</h3>' +
                        '</div>'
                },
                {
                    xtype: 'component',
                    cls: 'tcn3-alert-body',
                    flex: 1,
                    bind: { data: '{canhBaoCards}' },
                    tpl: [
                        '<div class="tcn3-alert-list">',
                        '<tpl for=".">',
                        '<div class="tcn3-alert-item tcn3-alert-tone-{mau}">',
                        '  <div class="tcn3-alert-left">',
                        '    <span class="tcn3-alert-icon" aria-hidden="true">',
                        '      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">',
                        '        {iconSvg}',
                        '      </svg>',
                        '    </span>',
                        '    <span class="tcn3-alert-title">{ten:htmlEncode}</span>',
                        '  </div>',
                        '  <strong class="tcn3-alert-count">{soLuong:htmlEncode}</strong>',
                        '</div>',
                        '</tpl>',
                        '</div>'
                    ]
                }
            ]
        }
    ]
});
