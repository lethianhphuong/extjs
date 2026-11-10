Ext.define('DEMO.view.pages.TrangChuNew.View6.TrangChuNew6_ViewKetQua', {
    extend: 'Ext.container.Container',
    xtype: 'TrangChuNew6_ViewKetQua',
    layout: { type: 'hbox', align: 'stretch' },
    items: [{
        //#region NOTE: Trạng thái công việc (Donut + legend động)
        xtype: 'container',
        cls: 'tcn6-card',
        flex: 1,
        minWidth: 360,
        margin: '0 16 0 0',
        padding: 16,
        layout: { type: 'vbox', align: 'stretch' },
        items: [{
            xtype: 'component',
            cls: 'tcn6-card-header',
            html: '<div class="tcn6-card-title">Trạng thái công việc trực tiếp thực hiện</div>'
        }, {
            xtype: 'container',
            flex: 1,
            layout: { type: 'hbox', align: 'stretch' },
            items: [{
                xtype: 'container',
                flex: 1,
                layout: 'absolute',
                items: [{
                    xtype: 'polar',
                    itemId: 'trangThaiDonutChart_IdView',
                    anchor: '100% 100%',
                    animation: false,
                    insetPadding: 6,
                    bind: { store: '{trangThaiDonutStore}' },
                    listeners: { afterrender: 'onChartReady' },
                    series: [{
                        type: 'pie',
                        angleField: 'soLuong',
                        donut: 66,
                        highlight: false,
                        tooltip: {
                            trackMouse: true,
                            renderer: function (tooltip, record) {
                                tooltip.setHtml(Ext.String.htmlEncode(record.get('name')) + ': <b>' +
                                    Number(record.get('soLuong')).toLocaleString('vi-VN') + '</b> (' + record.get('tyLeText') + ')');
                            }
                        }
                    }]
                }, {
                    xtype: 'component',
                    cls: 'tcn6-donut-center',
                    anchor: '100% 100%',
                    bind: { data: '{trangThai}' },
                    tpl: '<strong>{tongText}</strong><small>hồ sơ</small>'
                }]
            }, {
                xtype: 'component',
                flex: 1,
                cls: 'tcn6-vlegend',
                bind: { data: '{trangThai}' },
                tpl: '<tpl for="items"><div class="tcn6-tone-{mau}">' +
                    '<i class="tcn6-dot"></i><span>{name:htmlEncode}</span><b>{soLuongText}</b><small>{tyLeText}</small></div></tpl>'
            }]
        }]
        //#endregion
    }, {
        //#region NOTE: Tiến độ xử lý theo tháng (Area chart)
        xtype: 'container',
        cls: 'tcn6-card',
        flex: 1.3,
        padding: 16,
        layout: { type: 'vbox', align: 'stretch' },
        items: [{
            xtype: 'component',
            cls: 'tcn6-card-header',
            html: '<div class="tcn6-card-title">Tiến độ xử lý hồ sơ theo tháng</div><span class="tcn6-muted">Số hồ sơ lũy kế</span>'
        }, {
            xtype: 'cartesian',
            itemId: 'tienDoLineChart_IdView',
            flex: 1,
            animation: false,
            insetPadding: { top: 24, right: 8, bottom: 4, left: 4 },
            innerPadding: { top: 0, right: 28, bottom: 0, left: 24 },
            bind: { store: '{tienDoThangStore}' },
            listeners: { afterrender: 'onChartReady' },
            axes: [
                { type: 'numeric', position: 'left', fields: ['soLuong'], minimum: 0, majorTickSteps: 4, grid: true },
                { type: 'category', position: 'bottom', fields: ['thang'] }
            ],
            series: [{
                type: 'line',
                xField: 'thang',
                yField: 'soLuong',
                fill: true,
                smooth: true,
                style: { lineWidth: 3, fillOpacity: 0.14 },
                marker: { type: 'circle', radius: 4, lineWidth: 2 },
                label: { field: 'soLuong', display: 'over', fontSize: 12, fontWeight: 'bold' },
                tooltip: {
                    trackMouse: true,
                    renderer: function (tooltip, record) {
                        tooltip.setHtml(Ext.String.htmlEncode(record.get('thang')) + ': <b>' + record.get('soLuong') + '</b> hồ sơ');
                    }
                }
            }]
        }]
        //#endregion
    }]
});
