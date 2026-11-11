Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View6.TrangChuNew6_ViewKetQua', {
    extend: 'Ext.container.Container',
    xtype: 'TrangChuNew6_ViewKetQua',
    layout: { type: 'hbox', align: 'stretch' },
    items: [{
        //#region NOTE: Trạng thái công việc trực tiếp thực hiện (biểu đồ cột đứng theo trangThaiCongViecTrucTiep)
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
            bind: { data: '{trangThai}' },
            tpl: '<div class="tcn6-card-title">Trạng thái công việc trực tiếp thực hiện</div>' +
                '<span class="tcn6-muted">Tổng <b>{tongText}</b></span>'
        }, {
            xtype: 'cartesian',
            itemId: 'trangThaiCongViecChart_IdView',
            flex: 1,
            animation: false,
            insetPadding: { top: 24, right: 8, bottom: 4, left: 4 },
            innerPadding: { top: 0, right: 16, bottom: 0, left: 16 },
            bind: { store: '{trangThaiCongViecStore}' },
            listeners: { afterrender: 'onChartReady' },
            axes: [
                { type: 'numeric', position: 'left', fields: ['val'], minimum: 0, majorTickSteps: 4, grid: true },
                { type: 'category', position: 'bottom', fields: ['name'] }
            ],
            series: [{
                type: 'bar',
                xField: 'name',
                yField: 'val',
                style: { maxBarWidth: 56, minGapWidth: 24, radius: 6 },
                // Màu từng cột theo code (DisplayConfig.trangThaiTone → CSS variable)
                renderer: function (sprite, config, data, index) {
                    const palette = this.getChart().recordColors;
                    const record = data.store.getAt(index);
                    const mau = palette && record ? palette[record.get('mau')] : null;
                    return mau ? { fillStyle: mau, strokeStyle: mau } : {};
                },
                label: {
                    field: 'val',
                    display: 'outside',
                    orientation: 'horizontal',
                    calloutLine: false,
                    renderer: function (text) { return Number(text || 0).toLocaleString('vi-VN'); }
                },
                tooltip: {
                    trackMouse: true,
                    renderer: function (tooltip, record) {
                        tooltip.setHtml(Ext.String.htmlEncode(record.get('name')) + ': <b>' +
                            Number(record.get('val') || 0).toLocaleString('vi-VN') + '</b>');
                    }
                }
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
                { type: 'numeric', position: 'left', fields: ['sl'], minimum: 0, majorTickSteps: 4, grid: true },
                { type: 'category', position: 'bottom', fields: ['thang'] }
            ],
            series: [{
                type: 'line',
                xField: 'thang',
                yField: 'sl',
                fill: true,
                smooth: true,
                style: { lineWidth: 3, fillOpacity: 0.14 },
                marker: { type: 'circle', radius: 4, lineWidth: 2 },
                label: { field: 'sl', display: 'over', fontSize: 12, fontWeight: 'bold' },
                tooltip: {
                    trackMouse: true,
                    renderer: function (tooltip, record) {
                        tooltip.setHtml(Ext.String.htmlEncode(record.get('thang')) + ': <b>' + record.get('sl') + '</b> hồ sơ');
                    }
                }
            }]
        }]
        //#endregion
    }]
});
