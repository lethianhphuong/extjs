Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View6.TrangChuNew6_ViewKetQua', {
    extend: 'Ext.container.Container',
    xtype: 'TrangChuNew6_ViewKetQua',
    requires: [
        // Bật responsiveConfig cho mọi Component (thay plugin 'responsive' đã deprecated)
        'Ext.Responsive',
        'Ext.chart.CartesianChart',
        'Ext.chart.series.Bar',
        'Ext.chart.series.Line',
        'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Category'
    ],
    layout: { type: 'vbox', align: 'stretch' },

    /** Icon SVG (nội dung thẻ <svg>) cho tiêu đề các card. */
    iconBar: '<path d="M3 3v18h18"/><path d="M8 17V9M13 17V5M18 17v-6"/>',
    iconTask: '<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
    iconApprove: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',

    /** Chiều cao 1 card. */
    cardHeight: 320,
    /** Khoảng cách giữa các card (px). */
    gap: 16,

    initComponent: function () {
        const me = this;
        me.items = [me.buildRow([me.buildPair(me.buildHoSoCards(), true), me.buildPair(me.buildTrangThaiCards(), false)])];
        me.callParent(arguments);
    },

    /**
     * Hàng 4 card (2 cặp), xếp theo 3 mức màn hình:
     *   >= 1600px: 1 hàng 4 card;  1200–1600px: lưới 2x2;  < 1200px: xếp dọc từng card.
     *   (layout 'box' + responsive chỉ đổi `vertical`: đổi type hbox↔vbox sẽ tạo layout mới, card con còn trỏ layout cũ
     *   đã bị gỡ owner → lỗi "Cannot read properties of null (reading 'getSizeModel')" khi resize)
     * @param {Array} pairs 2 cặp card từ buildPair
     */
    buildRow: function (pairs) {
        const h = this.cardHeight;
        const gap = this.gap;
        return {
            xtype: 'container',
            layout: { type: 'box', align: 'stretch' },
            responsiveConfig: {
                'width >= 1600': { layout: { vertical: false }, height: h },
                'width >= 1200 && width < 1600': { layout: { vertical: true }, height: h * 2 + gap },
                'width < 1200': { layout: { vertical: true }, height: h * 4 + gap * 3 }
            },
            items: pairs
        };
    },

    /**
     * Cặp 2 card (flex 1 mỗi card): >= 1200px xếp ngang, < 1200px xếp dọc.
     * @param {Array} cards 2 card
     * @param {Boolean} isFirst cặp đầu tiên — có khoảng cách với cặp sau (phải khi 1 hàng, dưới khi 2x2 / dọc)
     */
    buildPair: function (cards, isFirst) {
        const gap = this.gap;
        const gapRight = '0 ' + gap + ' 0 0';
        const gapBottom = '0 0 ' + gap + ' 0';
        cards[0].responsiveConfig = {
            'width >= 1200': { margin: gapRight },
            'width < 1200': { margin: gapBottom }
        };
        return {
            xtype: 'container',
            flex: 1,
            layout: { type: 'box', align: 'stretch' },
            responsiveConfig: {
                'width >= 1600': { layout: { vertical: false }, margin: isFirst ? gapRight : 0 },
                'width >= 1200 && width < 1600': { layout: { vertical: false }, margin: isFirst ? gapBottom : 0 },
                'width < 1200': { layout: { vertical: true }, margin: isFirst ? gapBottom : 0 }
            },
            items: cards
        };
    },

    /**
     * Card biểu đồ cột dùng chung (Loại hồ sơ, Kết quả công việc...): màu từng cột theo field color,
     * nhãn số trên đầu cột, tooltip "Tên: số đơn vị (x%)". Click / hover do mixin gắn qua dataKey (onChartReady).
     * @param {Object} cfg { title, iconSvg, tone, itemId, dataKey, store, xField, unit, rotateLabel }
     */
    buildBarCard: function (cfg) {
        const me = this;
        return {
            xtype: 'container',
            cls: 'tcn6-card',
            flex: 1,
            padding: 16,
            layout: { type: 'vbox', align: 'stretch' },
            items: [{
                xtype: 'component',
                cls: 'tcn6-card-header',
                html: '<div class="tcn6-card-title"><span class="tcn6-title-icon tcn6-tone-' + cfg.tone + '">' +
                    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + cfg.iconSvg + '</svg></span>' +
                    Ext.String.htmlEncode(cfg.title) + '</div>'
            }, {
                xtype: 'cartesian',
                itemId: cfg.itemId,
                // Mã biểu đồ tra theo dataKey trong DisplayConfig.maBieuDo; click / hover gắn ở onChartReady (mixin)
                dataKey: cfg.dataKey,
                flex: 1,
                animation: false,
                insetPadding: { top: 24, right: 10, bottom: 6, left: 6 },
                bind: { store: cfg.store },
                listeners: {
                    afterrender: 'onChartReady',
                    redraw: me.fitBarAxis
                },
                axes: [{
                    type: 'numeric',
                    position: 'left',
                    fields: ['val'],
                    minimum: 0,
                    grid: true,
                    // Số lượng là số nguyên: ẩn mốc lẻ (0,5; 1,5…) khi giá trị nhỏ
                    renderer: function (axis, label) {
                        return Number.isInteger(Number(label)) ? Number(label).toLocaleString('vi-VN') : '';
                    }
                }, {
                    type: 'category',
                    position: 'bottom',
                    fields: [cfg.xField],
                    // Nhiều cột trong card hẹp: xoay nhãn để hiện đủ tên
                    label: cfg.rotateLabel ? { fontSize: 10.5, rotate: { degrees: -30 } } : { fontSize: 11 }
                }],
                series: [{
                    type: 'bar',
                    xField: cfg.xField,
                    yField: 'val',
                    style: { maxBarWidth: 26, radius: 4, lineWidth: 0 },
                    // Màu từng cột theo field color (controller tính từ tone, đổi theo theme)
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
                                '</b> ' + cfg.unit + ' (' + Ext.String.htmlEncode(record.get('tyLeText')) + ')');
                        }
                    }
                }]
            }]
        };
    },

    /**
     * Nhãn số đặt ngoài đầu cột: không đủ chỗ phía trên thì Ext chuyển nhãn xuống chân cột (insideStart) và nhãn
     * bị cắt mất → nâng trục để đầu cột cao nhất còn chừa khoảng trống rồi làm tròn mốc.
     * Ext cần khoảng: nhãn (~16px) + labelOverflowPadding 10px x 2 + chiều cao nhãn lần nữa ≈ 55px → chừa 70px.
     * @param {Ext.chart.CartesianChart} chart
     */
    fitBarAxis: function (chart) {
        const store = chart.getStore();
        const axis = chart.getAxes()[0];
        const rect = chart.getSurface('series').getRect();
        const maxVal = store ? (store.max('val') || 0) : 0;
        const length = rect ? rect[chart.getFlipXY() ? 2 : 3] : 0;
        if (!maxVal || length <= 80) { return; }
        const ratio = chart.getFlipXY() ? 0.6 : 0.75;
        const raw = Math.max(maxVal / ratio, maxVal * length / (length - 70));
        const step = Math.pow(10, Math.floor(Math.log10(raw))) / 4;
        const target = Math.max(1, Math.ceil(raw / step) * step);
        if (axis.getMaximum() !== target) {
            axis.setMaximum(target);
            chart.redraw();
        }
    },

    /** Cặp 1: Loại hồ sơ | Tiến độ xử lý theo tháng. */
    buildHoSoCards: function () {
        const me = this;
        return [me.buildBarCard({
            title: 'Loại hồ sơ',
            iconSvg: me.iconBar,
            tone: 'blue',
            itemId: 'loaiHoSoChart_IdView',
            dataKey: 'loaiHoSo',
            store: '{loaiHoSoStore}',
            // Trục hiện tên ngắn (ĐTCB, CT VBM...), tooltip hiện tên đầy đủ
            xField: 'ten',
            unit: 'hồ sơ',
            rotateLabel: true
        }), {
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
        }];
    },

    /** Cặp 2: cột Kết quả công việc trực tiếp thực hiện | cột Kết quả phạm vi quản lý. */
    buildTrangThaiCards: function () {
        const me = this;
        return [me.buildBarCard({
            title: 'Kết quả công việc trực tiếp thực hiện',
            iconSvg: me.iconTask,
            tone: 'green',
            itemId: 'trangThaiChart_IdView',
            dataKey: 'trangThaiCongViecCanBo',
            store: '{trangThaiCongViecStore}',
            xField: 'name',
            unit: 'công việc'
        }), me.buildBarCard({
            title: 'Kết quả phạm vi quản lý',
            iconSvg: me.iconApprove,
            tone: 'purple',
            itemId: 'pheDuyetChart_IdView',
            dataKey: 'trangThaiCongViecCanPheDuyet',
            store: '{pheDuyetStore}',
            xField: 'name',
            unit: 'công việc'
        })];
    }
});
