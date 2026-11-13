Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View6.TrangChuNew6_ViewKetQua', {
    extend: 'Ext.container.Container',
    xtype: 'TrangChuNew6_ViewKetQua',
    requires: [
        'Ext.plugin.Responsive',
        'DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View6.TrangChuNew6_DonutCard'
    ],
    layout: { type: 'vbox', align: 'stretch' },

    /** Icon SVG (nội dung thẻ <svg>) cho tiêu đề các card. */
    iconBar: '<path d="M3 3v18h18"/><path d="M8 17V9M13 17V5M18 17v-6"/>',
    iconTask: '<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
    iconApprove: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',

    initComponent: function () {
        const me = this;
        me.items = [me.buildRow1(), me.buildRow2()];
        me.callParent(arguments);
        Ext.on('resize', me.onViewportResize, me);
    },

    /**
     * Một hàng 2 card: màn rộng xếp ngang theo flex của từng card (cao bằng nhau),
     * màn hẹp (< 1200px) xếp dọc, mỗi card cao bằng nhau.
     * @param {Number} height chiều cao 1 card
     * @param {Array} items 2 card
     * @param {String} [margin] margin của cả hàng
     */
    buildRow: function (height, items, margin) {
        items.forEach(function (item, index) {
            const last = index === items.length - 1;
            // flex không có setter nên responsiveConfig không đổi được; lưu lại để onViewportResize tự đổi
            item.wideFlex = item.flex || 1;
            item.plugins = 'responsive';
            item.responsiveConfig = {
                'width >= 1200': { margin: last ? 0 : '0 16 0 0' },
                'width < 1200': { margin: last ? 0 : '0 0 16 0' }
            };
        });
        return {
            xtype: 'container',
            isTcn6Row: true,
            margin: margin || 0,
            plugins: 'responsive',
            responsiveConfig: {
                'width >= 1200': { layout: { type: 'hbox', align: 'stretch' }, height: height },
                'width < 1200': { layout: { type: 'vbox', align: 'stretch' }, height: height * items.length + 16 * (items.length - 1) }
            },
            items: items
        };
    },

    /** Màn hẹp (xếp dọc): các card cao bằng nhau (flex 1); màn rộng: trả lại tỉ lệ flex ban đầu. */
    onViewportResize: function () {
        const me = this;
        if (!me.rendered) { return; }
        const narrow = Ext.Element.getViewportWidth() < 1200;
        me.query('container[isTcn6Row]').forEach(function (row) {
            row.items.each(function (item) {
                item.flex = narrow ? 1 : item.wideFlex;
            });
            row.updateLayout();
        });
    },

    afterRender: function () {
        const me = this;
        me.callParent(arguments);
        me.onViewportResize();
    },

    onDestroy: function () {
        Ext.un('resize', this.onViewportResize, this);
        this.callParent(arguments);
    },

    /** Hàng 1: cột Loại hồ sơ | Tiến độ xử lý theo tháng — chia đôi như hàng 2. */
    buildRow1: function () {
        const me = this;
        return me.buildRow(320, [{
            //#region NOTE: Loại hồ sơ (biểu đồ cột, cùng kiểu chart "Loại hồ sơ" ở View3)
            xtype: 'container',
            cls: 'tcn6-card',
            flex: 1,
            padding: 16,
            layout: { type: 'vbox', align: 'stretch' },
            items: [{
                xtype: 'component',
                cls: 'tcn6-card-header',
                html: '<div class="tcn6-card-title"><span class="tcn6-title-icon tcn6-tone-blue">' +
                    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + me.iconBar + '</svg></span>Loại hồ sơ</div>'
            }, {
                xtype: 'cartesian',
                itemId: 'loaiHoSoChart_IdView',
                // Mã biểu đồ tra theo dataKey trong DisplayConfig.maBieuDo; click / hover gắn ở onChartReady (mixin)
                dataKey: 'loaiHoSo',
                flex: 1,
                animation: false,
                insetPadding: { top: 24, right: 10, bottom: 6, left: 6 },
                bind: { store: '{loaiHoSoStore}' },
                listeners: {
                    afterrender: 'onChartReady',
                    // Nhãn số đặt ngoài đầu cột: không đủ chỗ phía trên thì Ext tự ẩn → nâng trục đủ chỗ rồi làm tròn mốc (giống View3)
                    redraw: function (chart) {
                        const store = chart.getStore();
                        const axis = chart.getAxes()[0];
                        const rect = chart.getSurface('series').getRect();
                        const maxVal = store ? (store.max('val') || 0) : 0;
                        const length = rect ? rect[chart.getFlipXY() ? 2 : 3] : 0;
                        if (!maxVal || length <= 80) { return; }
                        const ratio = chart.getFlipXY() ? 0.6 : 0.75;
                        const raw = Math.max(maxVal / ratio, maxVal * length / (length - 50));
                        const step = Math.pow(10, Math.floor(Math.log10(raw))) / 4;
                        const target = Math.max(1, Math.ceil(raw / step) * step);
                        if (axis.getMaximum() !== target) {
                            axis.setMaximum(target);
                            chart.redraw();
                        }
                    }
                },
                axes: [{
                    type: 'numeric',
                    position: 'left',
                    fields: ['val'],
                    minimum: 0,
                    grid: true,
                    // Số hồ sơ là số nguyên: ẩn mốc lẻ (0,5; 1,5…) khi giá trị nhỏ
                    renderer: function (axis, label) {
                        return Number.isInteger(Number(label)) ? Number(label).toLocaleString('vi-VN') : '';
                    }
                }, {
                    type: 'category',
                    position: 'bottom',
                    fields: ['ten'],
                    // Card hẹp: xoay nhãn để hiện đủ 8 tên loại hồ sơ
                    label: { fontSize: 10.5, rotate: { degrees: -30 } }
                }],
                series: [{
                    type: 'bar',
                    xField: 'ten',
                    yField: 'val',
                    style: { maxBarWidth: 26, radius: 4, lineWidth: 0 },
                    // Màu từng cột theo loại hồ sơ (field color do controller tính từ tone)
                    renderer: function (sprite, config, rendererData, index) {
                        const record = rendererData.store ? rendererData.store.getAt(index) : null;
                        const color = record ? record.get('color') : '#64748b';
                        return { fillStyle: color, strokeStyle: color, lineWidth: 0 };
                    },
                    label: {
                        field: 'val',
                        display: 'outside',
                        orientation: 'horizontal',
                        color: '#0f172a',
                        fontSize: 12,
                        fontWeight: 'bold',
                        renderer: function (val) {
                            return Number(val).toLocaleString('vi-VN');
                        }
                    },
                    tooltip: {
                        trackMouse: true,
                        renderer: function (tooltip, record) {
                            tooltip.setHtml(Ext.String.htmlEncode(record.get('name')) + ': <b>' + Ext.String.htmlEncode(record.get('soLuongText')) +
                                '</b> hồ sơ (' + Ext.String.htmlEncode(record.get('tyLeText')) + ')');
                        }
                    }
                }]
            }]
            //#endregion
        }, {
            //#region NOTE: Tiến độ xử lý theo tháng (Area chart)
            xtype: 'container',
            cls: 'tcn6-card',
            flex: 1,
            padding: 16,
            layout: { type: 'vbox', align: 'stretch' },
            items: [{
                xtype: 'component',
                cls: 'tcn6-card-header',
                html: '<div class="tcn6-card-title">Tiến độ xử lý hồ sơ theo tháng</div><span class="tcn6-muted">Số hồ sơ lũy kế</span>'
            }, {
                xtype: 'cartesian',
                itemId: 'tienDoLineChart_IdView',
                dataKey: 'tienDoXuLyTheoThang',
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
        }]);
    },

    /** Hàng 2: donut Trạng thái công việc trực tiếp thực hiện | donut Trạng thái công việc cần phê duyệt. */
    buildRow2: function () {
        const me = this;
        return me.buildRow(320, [{
            xtype: 'TrangChuNew6_DonutCard',
            itemId: 'trangThaiDonut_IdView',
            flex: 1,
            title: 'Trạng thái công việc trực tiếp thực hiện',
            iconSvg: me.iconTask,
            tone: 'green',
            bind: { store: '{trangThaiCongViecStore}' },
            listeners: { donutitemclick: 'onTrangThaiClick' }
        }, {
            xtype: 'TrangChuNew6_DonutCard',
            itemId: 'pheDuyetDonut_IdView',
            flex: 1,
            title: 'Trạng thái công việc cần phê duyệt',
            iconSvg: me.iconApprove,
            tone: 'purple',
            bind: { store: '{pheDuyetStore}' },
            listeners: { donutitemclick: 'onPheDuyetClick' }
        }], '16 0 0');
    }
});
