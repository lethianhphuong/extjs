/**
 * Card donut dùng chung của View6 (cùng kiểu với "Cơ cấu hồ sơ theo loại đơn vị" ở View3:
 * Ext polar + series pie donut, legend là dataview bên cạnh).
 *
 * Store cần các field: code, name, val, tyLe (số %), color (mã màu), soLuongText, tyLeText.
 * Cấu hình:
 *   title          tiêu đề card
 *   iconSvg        nội dung <svg> của icon tiêu đề
 *   tone           tone nền icon (tcn6-tone-*)
 *   legendPosition 'right' | 'bottom' (card hẹp dùng 'bottom', legend 2 cột)
 *   emptyText      chữ hiển thị khi tổng = 0
 * Sự kiện:
 *   donutitemclick(card, record) — click lát donut hoặc dòng legend
 */
Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View6.TrangChuNew6_DonutCard', {
    extend: 'Ext.container.Container',
    xtype: 'TrangChuNew6_DonutCard',
    requires: ['Ext.chart.PolarChart', 'Ext.chart.series.Pie', 'Ext.view.View'],

    config: {
        store: null,
        title: '',
        iconSvg: '',
        tone: 'blue',
        legendPosition: 'right',
        emptyText: 'Chưa có dữ liệu'
    },

    cls: 'tcn6-card tcn6-donut-card',
    padding: 16,
    layout: { type: 'vbox', align: 'stretch' },

    /** Nhãn % chỉ hiện trên lát đủ lớn để không chồng chữ. */
    minLabelPercent: 8,
    /** Độ mờ của lát / dòng đang rê chuột. */
    hoverOpacity: 0.6,

    initComponent: function () {
        const me = this;
        const bottom = me.getLegendPosition() === 'bottom';
        me.addCls(bottom ? 'tcn6-donut-legend-bottom' : 'tcn6-donut-legend-right');
        me.items = [me.buildHeader(), {
            xtype: 'container',
            flex: 1,
            cls: 'tcn6-donut-body',
            layout: bottom ? { type: 'vbox', align: 'stretch' } : { type: 'hbox', align: 'stretch' },
            items: [me.buildChartWrap(bottom), me.buildLegend(bottom)]
        }];
        me.callParent(arguments);
        me.chart = me.down('polar');
        me.emptyCmp = me.down('#donutEmpty');
        me.legend = me.down('dataview');
        me.bindInnerStore(me.getStore());
    },

    buildHeader: function () {
        const me = this;
        return {
            xtype: 'component',
            cls: 'tcn6-card-header',
            html: '<div class="tcn6-card-title"><span class="tcn6-title-icon tcn6-tone-' + Ext.String.htmlEncode(me.getTone()) + '">' +
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + me.getIconSvg() + '</svg></span>' +
                Ext.String.htmlEncode(me.getTitle()) + '</div>'
        };
    },

    buildChartWrap: function (bottom) {
        const me = this;
        return {
            xtype: 'container',
            cls: 'tcn6-donut-chart-wrap',
            // card layout: hiện donut hoặc trạng thái trống
            layout: 'card',
            flex: bottom ? undefined : 1,
            height: bottom ? 190 : undefined,
            minHeight: 170,
            items: [{
                xtype: 'polar',
                animation: false,
                insetPadding: 8,
                series: [{
                    type: 'pie',
                    angleField: 'val',
                    donut: 60,
                    radiusFactor: 95,
                    highlight: false,
                    style: { lineWidth: 1.5, strokeStyle: '#ffffff' },
                    renderer: function (sprite, config, rendererData, index) {
                        const record = rendererData.store ? rendererData.store.getAt(index) : null;
                        return record ? { fillStyle: record.get('color') } : {};
                    },
                    label: {
                        field: 'tyLe',
                        display: 'inside',
                        fontSize: 12,
                        fontWeight: 'bold',
                        fillStyle: '#ffffff',
                        calloutLine: false,
                        renderer: function (val) {
                            return {
                                text: Number(val) >= me.minLabelPercent ? me.formatPercent(val) : '',
                                rotationRads: 0
                            };
                        }
                    },
                    tooltip: {
                        trackMouse: true,
                        renderer: function (tooltip, record) {
                            tooltip.setHtml(me.getTipText(record));
                        }
                    }
                }],
                listeners: {
                    afterrender: function (chart) {
                        me.bindChartEvents(chart);
                        if (me.boundStore) { me.onDataChanged(me.boundStore); }
                    }
                }
            }, {
                // Tổng = 0: vòng xám + chữ thay cho donut
                xtype: 'component',
                itemId: 'donutEmpty',
                html: '<div class="tcn6-donut-empty"><div class="tcn6-donut-empty-ring"><span>' + Ext.String.htmlEncode(me.getEmptyText()) + '</span></div></div>'
            }]
        };
    },

    buildLegend: function (bottom) {
        const me = this;
        return {
            xtype: 'dataview',
            cls: 'tcn6-donut-legend',
            flex: 1,
            scrollable: bottom ? 'y' : null,
            itemSelector: '.tcn6-donut-item',
            overItemCls: 'is-hover',
            tpl: [
                '<tpl for=".">',
                '<div class="tcn6-donut-item" style="--donut-color:{color:htmlEncode}" title="{[this.tip(values)]}">',
                '<i class="tcn6-donut-dot"></i>',
                '<span class="tcn6-donut-name">{name:htmlEncode}</span>',
                '<strong class="tcn6-donut-val">{soLuongText:htmlEncode}</strong>',
                '<span class="tcn6-donut-pct">{tyLeText:htmlEncode}</span>',
                '</div>',
                '</tpl>',
                {
                    tip: function (values) {
                        return Ext.String.htmlEncode(values.name + ': ' + values.soLuongText + ' (' + values.tyLeText + ')');
                    }
                }
            ],
            listeners: {
                itemmouseenter: function (view, record, node, index) { me.setHoverIndex(index); },
                itemmouseleave: function () { me.setHoverIndex(-1); },
                itemclick: function (view, record) { me.fireEvent('donutitemclick', me, record); }
            }
        };
    },

    updateStore: function (store) {
        this.bindInnerStore(store);
    },

    /** Gắn store cho chart + legend và theo dõi dữ liệu để bật/tắt trạng thái trống. */
    bindInnerStore: function (store) {
        const me = this;
        if (!me.chart || !store) { return; }
        if (me.boundStore && me.boundStore !== store) {
            me.boundStore.un({ datachanged: me.onDataChanged, refresh: me.onDataChanged, scope: me });
        }
        if (me.boundStore !== store) {
            store.on({ datachanged: me.onDataChanged, refresh: me.onDataChanged, scope: me });
            me.boundStore = store;
        }
        me.chart.setStore(store);
        me.legend.setStore(store);
        me.onDataChanged(store);
    },

    onDataChanged: function (store) {
        const me = this;
        const tong = store.sum('val') || 0;
        me.chart.up('container').getLayout().setActiveItem(tong ? me.chart : me.emptyCmp);
        me.setHoverIndex(-1);
        // Pie có lát = 0: Ext đôi khi giữ góc cũ của lát sau khi dữ liệu đổi → tính lại góc rồi vẽ lại
        if (tong && me.chart.rendered) {
            me.chart.getSeries().forEach(function (series) { series.processData(); });
            me.chart.redraw();
        }
    },

    //#region NOTE: Hover / click trên donut
    /** Interaction của chart chặn mousemove kiểu Ext nên dùng sự kiện DOM gốc (giống View3). */
    bindChartEvents: function (chart) {
        const me = this;
        const dom = chart.getEl().dom;
        dom.addEventListener('mousemove', function (event) {
            const item = me.getItemAtPoint(event.pageX, event.pageY);
            me.setHoverIndex(item ? item.index : -1);
        });
        dom.addEventListener('mouseleave', function () { me.setHoverIndex(-1); });
        chart.getEl().on('click', function (event) {
            const item = me.getItemAtPoint(event.getX(), event.getY());
            if (item && item.record) {
                me.fireEvent('donutitemclick', me, item.record);
            }
        });
    },

    getItemAtPoint: function (pageX, pageY) {
        const chart = this.chart;
        const surfaceXY = chart.getSurface('series').el.getXY();
        return chart.getItemForPoint(pageX - surfaceXY[0], pageY - surfaceXY[1]);
    },

    /** Lát và dòng legend cùng index sáng lên (lát chỉ mờ đi, giữ nguyên màu). */
    setHoverIndex: function (index) {
        const me = this;
        if (me.hoverIndex === index || !me.chart || !me.chart.rendered) { return; }
        me.hoverIndex = index;
        const series = me.chart.getSeries()[0];
        const record = index >= 0 && me.boundStore ? me.boundStore.getAt(index) : null;
        // Mục = 0 không có lát để làm nổi bật, chỉ sáng dòng legend
        const item = record && record.get('val') ? series.getItemByIndex(index, 'sprites') : null;
        me.chart.getEl().dom.style.cursor = item ? 'pointer' : '';
        if (item) {
            series.setHighlight({ fillStyle: record.get('color'), strokeStyle: '#ffffff', lineWidth: 1.5, margin: 0, globalAlpha: me.hoverOpacity });
            me.chart.setHighlightItem(null);
        }
        me.chart.setHighlightItem(item || null);
        if (me.legend.rendered) {
            me.legend.clearHighlight();
            const node = index >= 0 ? me.legend.getNode(index) : null;
            if (node) { me.legend.highlightItem(node); }
        }
    },
    //#endregion

    getTipText: function (record) {
        return Ext.String.htmlEncode(record.get('name')) + ': <b>' + Ext.String.htmlEncode(record.get('soLuongText')) + '</b> (' + Ext.String.htmlEncode(record.get('tyLeText')) + ')';
    },

    formatPercent: function (val) {
        return Number(val || 0).toLocaleString('vi-VN', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + '%';
    },

    onDestroy: function () {
        const me = this;
        if (me.boundStore) { me.boundStore.un({ datachanged: me.onDataChanged, refresh: me.onDataChanged, scope: me }); }
        me.callParent(arguments);
    }
});
