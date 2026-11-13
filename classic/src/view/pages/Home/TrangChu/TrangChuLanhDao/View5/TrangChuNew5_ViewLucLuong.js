Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View5.TrangChuNew5_ViewLucLuong', {
    extend: 'Ext.container.Container',
    xtype: 'TrangChuNew5_ViewLucLuong',
    cls: 'tcn5-card', padding: 18,
    layout: { type: 'vbox', align: 'stretch' },
    items: [
        { xtype: 'component', cls: 'tcn5-heading', height: 38, html: '<b><i class="x-fa fa-users tcn5-card-icon tcn5-tone-purple"></i>HỆ LỰC LƯỢNG</b>' },
        {
            xtype: 'container', height: 320, layout: { type: 'hbox', align: 'stretch' }, margin: '18 0',
            items: [{
                // Biến động số lượng hồ sơ theo cấp đơn vị: cột chồng Cục / Tỉnh / Xã + đường tổng (như View3)
                xtype: 'container', flex: 1, cls: 'tcn5-inner', padding: 12, margin: '0 14 0 0',
                layout: { type: 'vbox', align: 'stretch' },
                items: [
                    { xtype: 'component', cls: 'tcn5-subheading', html: '<i class="x-fa fa-chart-bar tcn5-card-icon tcn5-tone-indigo"></i>Biến động hồ sơ theo đơn vị' },
                    {
                        xtype: 'cartesian',
                        itemId: 'bienDongCapDonViChart_IdView',
                        dataKey: 'bienDongHoSoTheoCapDonVi',
                        chartKind: 'stacked',
                        flex: 1,
                        animation: false,
                        insetPadding: { top: 22, right: 8, bottom: 4, left: 4 },
                        bind: { store: '{bienDongCapDonViStore}' },
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
                                label: { fontSize: 10 },
                                renderer: function (axis, value) {
                                    const store = axis.getChart().getStore();
                                    const record = store ? store.findRecord('code', value, 0, false, true, true) : null;
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
                                style: { maxBarWidth: 22, radius: 3, lineWidth: 1, strokeStyle: '#ffffff' },
                                tooltip: {
                                    trackMouse: true,
                                    renderer: function (tooltip, record, item) {
                                        const fieldNames = { capXa: 'Cấp Xã', capTinh: 'Cấp tỉnh', capCuc: 'Cấp Cục' };
                                        const val = Number(record.get(item.field)).toLocaleString('vi-VN');
                                        const label = record.get('nameHover') || record.get('name');
                                        tooltip.setHtml(Ext.String.htmlEncode(label) + ' — ' + (fieldNames[item.field] || item.field) + ': ' + val + ' hồ sơ');
                                    }
                                }
                            },
                            {
                                type: 'line',
                                xField: 'code',
                                yField: 'tongSo',
                                style: { lineWidth: 2.5 },
                                marker: { radius: 3.5, strokeStyle: '#ffffff', lineWidth: 1.5 },
                                label: {
                                    field: 'tongSo',
                                    display: 'over',
                                    fontSize: 11,
                                    fontWeight: '700',
                                    // Chỉ hiện số ở tháng cuối để không rối biểu đồ nhỏ
                                    renderer: function (val, sprite, config, data, index) {
                                        const store = data && data.store;
                                        const count = store ? store.getCount() : 0;
                                        return index === count - 1 && val ? Number(val).toLocaleString('vi-VN') : '';
                                    }
                                },
                                tooltip: {
                                    trackMouse: true,
                                    renderer: function (tooltip, record) {
                                        const val = Number(record.get('tongSo')).toLocaleString('vi-VN');
                                        const label = record.get('nameHover') || record.get('name');
                                        tooltip.setHtml(Ext.String.htmlEncode(label) + ' — Tổng: ' + val + ' hồ sơ');
                                    }
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'component',
                        html: '<div class="tcn5-legend">' +
                            '<span><i class="tcn5-dot tcn5-tone-blue"></i>Cấp Cục</span>' +
                            '<span><i class="tcn5-dot tcn5-tone-green"></i>Cấp tỉnh</span>' +
                            '<span><i class="tcn5-dot tcn5-tone-violet"></i>Cấp Xã</span>' +
                            '<span><i class="tcn5-dot tcn5-tone-orange"></i>Số hồ sơ</span>' +
                            '</div>'
                    }
                ]
            }, {
                xtype: 'container', flex: 1, cls: 'tcn5-inner', padding: 12,
                layout: { type: 'vbox', align: 'stretch' },
                items: [
                    { xtype: 'component', cls: 'tcn5-subheading', html: '<span data-tcn5-tip="Cấp xã — thống kê số hồ sơ đang quản lý"><i class="x-fa fa-map-marker-alt tcn5-card-icon tcn5-tone-cyan"></i>Cấp xã</span>', listeners: { afterrender: 'onTooltipReady' } },
                    { xtype: 'TrangChuNew5_ViewBarChart', itemId: 'capXaChart_IdView', dataKey: 'capXa', flex: 1, bind: { store: '{capXaStore}' } }
                ]
            }]
        }, {
            // Diễn biến mở mới và kết thúc hồ sơ của hệ lực lượng (thay cho 2 bảng Top đơn vị cấp tỉnh / cấp xã)
            xtype: 'container', flex: 1, cls: 'tcn5-inner', padding: 14,
            layout: { type: 'vbox', align: 'stretch' },
            items: [
                {
                    xtype: 'container',
                    cls: 'tcn5-trend-header',
                    layout: { type: 'hbox', align: 'middle' },
                    items: [
                        {
                            xtype: 'component',
                            flex: 1,
                            html: '<b><i class="x-fa fa-chart-line tcn5-card-icon tcn5-tone-purple"></i>Diễn biến mở mới và kết thúc hồ sơ của hệ lực lượng</b>'
                        },
                        {
                            xtype: 'button',
                            text: 'Mở mới',
                            cls: 'tcn5-series-button tcn5-tone-blue',
                            enableToggle: true,
                            bind: { pressed: '{hienMoMoiLucLuong}' },
                            stateKey: 'hienMoMoiLucLuong',
                            chartItemId: 'dienBienLucLuongChart_IdView',
                            seriesIndex: 0,
                            toggleHandler: 'onToggleTrendSeries'
                        },
                        {
                            xtype: 'button',
                            text: 'Kết thúc',
                            cls: 'tcn5-series-button tcn5-tone-green',
                            enableToggle: true,
                            bind: { pressed: '{hienKetThucLucLuong}' },
                            stateKey: 'hienKetThucLucLuong',
                            chartItemId: 'dienBienLucLuongChart_IdView',
                            seriesIndex: 1,
                            toggleHandler: 'onToggleTrendSeries'
                        }
                    ]
                },
                {
                    xtype: 'TrangChuNew5_ViewDienBienChart',
                    itemId: 'dienBienLucLuongChart_IdView',
                    dataKey: 'dienBienMoMoiVaKetThucLucLuong',
                    moMoiKey: 'hienMoMoiLucLuong',
                    ketThucKey: 'hienKetThucLucLuong',
                    bind: { store: '{dienBienLucLuongStore}' }
                }
            ]
        }
    ]
});
