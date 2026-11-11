Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View1.TrangChuNew1_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.trangchunew1',
    requires: [
        'DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View1.TrangChuNew1_MockData'
    ],

    //#region NOTE: Khởi tạo và thao tác người dùng

    /** Theo dõi thứ tự màu đơn vị và nạp số liệu dashboard. */
    init: function () {
        const me = this;
        const viewModel = me.getViewModel();

        me.unitRankingBinding = viewModel.bind('{donViDangHienThi}', me.onUnitRankingChange, me);
        me.loadData();
    },

    /** Nạp toàn bộ 7 phần theo đúng response DATA_MOCK của backend */
    loadData: function () {
        const me = this;
        const viewModel = me.getViewModel();
        const data = DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View1.TrangChuNew1_MockData.getData();

        viewModel.getStore('dienBienChartStore').loadData(data.namThongKeDonVi || []);
        viewModel.set({
            trangThaiData: data.trangThaiChartStore || [],
            donViData: data.donViStore || [],
            chiSo: data.chiSo || [],
            hieuQuaDtcb: data.hieuQuaDtcb || [],
            hieuQuaSuuTra: data.hieuQuaSuuTra || [],
            lucLuong: data.lucLuong || []
        });
        viewModel.notify();
        if (me.getView().rendered) {
            me.updateChartColors();
        }
    },

    /** Chọn số cột theo vùng KPI thực tế, độc lập với sidebar và viewport. */
    onMetricsResize: function (component, width) {
        const eightColumnMinWidth = 1200;
        const fourColumnMinWidth = 640;
        const availableWidth = typeof width === 'number' ? width : component.getWidth();
        let columns = 2;

        if (availableWidth >= eightColumnMinWidth) {
            columns = 8;
        } else if (availableWidth >= fourColumnMinWidth) {
            columns = 4;
        }

        if (availableWidth <= 0 || component.metricColumns === columns) {
            return;
        }
        component.metricColumns = columns;
        component.removeCls(['tcn-metrics-cols-8', 'tcn-metrics-cols-4', 'tcn-metrics-cols-2']);
        component.addCls('tcn-metrics-cols-' + columns);
        component.updateLayout();
    },

    /** Bật/tắt series và lưu trạng thái độc lập với kỳ thống kê. */
    onToggleTrendSeries: function (button, pressed) {
        const me = this;
        const chart = me.getView().down('#dienBienChart_IdView');

        me.getViewModel().set(button.stateKey, pressed);
        if (chart && chart.rendered) {
            chart.getSeries()[button.seriesIndex].setHidden(!pressed);
            chart.redraw();
        }
    },

    /** Xếp donut lên trên khi card không còn đủ chỗ cho hai cột. */
    onUnitCardResize: function (component, width) {
        const twoColumnMinWidth = 480;
        const availableWidth = typeof width === 'number' ? width : component.getWidth();
        const stacked = availableWidth < twoColumnMinWidth;

        if (availableWidth <= 0 || component.unitStacked === stacked) {
            return;
        }
        component.unitStacked = stacked;
        component.toggleCls('tcn-unit-stacked', stacked);
        const size = stacked ? 130 : 230;

        this.resizeDonutElements(component, size);
        component.updateLayout();
    },

    resizeDonutElements: function (component, size) {
        component.down('#donViDonutWrap_IdView').setSize(size, size);
        component.down('#donViChart_IdView').setSize(size, size);
        component.down('#donViDonutCenter_IdView').setSize(size, size);
    },

    //#endregion

    //#region NOTE: Theme và biểu đồ

    /** Chart mới render chỉ cần cập nhật chính nó. */
    onChartReady: function (chart) {
        const me = this;

        me.updateChartColors(chart);
        if (!me.themeObserver) {
            me.themeObserver = new MutationObserver(function () {
                me.updateChartColors();
            });
            me.themeObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
        }
    },

    /** Binding bảo đảm palette cập nhật cả khi dữ liệu xếp hạng đến sau render. */
    onUnitRankingChange: function () {
        const me = this;
        const chart = me.getView().down('#donViChart_IdView');

        if (chart && chart.rendered) {
            me.updateChartColors(chart);
        }
    },

    /** Canvas cần màu đã tính toán; đọc CSS một lần cho mỗi lượt cập nhật. */
    getChartTheme: function () {
        const me = this;
        const styles = window.getComputedStyle(me.getView().getEl().dom);
        const color = name => styles.getPropertyValue(name).trim();

        return {
            text: color('--tcn-chart-text'),
            background: color('--theme-bg-card'),
            border: color('--theme-border'),
            fontSize: parseFloat(color('--tcn-chart-font-size')) || 12,
            valueFontSize: parseFloat(color('--tcn-chart-value-font-size')) || 13,
            colors: Object.fromEntries(['blue', 'green', 'red', 'amber', 'orange', 'purple', 'indigo', 'cyan', 'muted']
                .map(name => [name, color('--tcn-' + name)]))
        };
    },

    /** Đổi theme cập nhật tất cả chart; afterrender chỉ truyền chart vừa sẵn sàng. */
    updateChartColors: function (targetChart) {
        const me = this;
        const theme = me.getChartTheme();
        const updates = [
            ['trangThaiChart_IdView', me.updateStatusChartColors],
            ['dienBienChart_IdView', me.updateTrendChartColors],
            ['donViChart_IdView', me.updateUnitChartColors]
        ];

        updates.forEach(function ([itemId, update]) {
            const chart = me.getView().down('#' + itemId);

            if (chart && chart.rendered && (!targetChart || chart === targetChart)) {
                chart.setBackground(theme.background);
                update.call(me, chart, theme);
                chart.redraw();
            }
        });
    },

    /** Áp dụng phần trục dùng chung cho hai chart Cartesian. */
    updateChartAxes: function (chart, theme) {
        chart.getAxes().forEach(function (axis) {
            axis.setLabel({ color: theme.text, fontSize: theme.fontSize });
            axis.setStyle({ strokeStyle: theme.border });
        });
    },

    /** Cache màu FE độc lập với thời điểm Store được bind hoặc có dữ liệu. */
    updateStatusChartColors: function (chart, theme) {
        const me = this;
        const series = chart.getSeries()[0];

        chart.statusColors = theme.colors;
        // Bar chỉ có một series; renderer chọn màu riêng cho từng record theo mã.
        series.setColors([theme.colors.blue]);
        me.updateChartAxes(chart, theme);
        series.setLabel({ color: theme.text, fontSize: theme.valueFontSize, fontWeight: '600' });
    },

    /** Giữ trạng thái bật/tắt đường khi thay đổi theme. */
    updateTrendChartColors: function (chart, theme) {
        const me = this;
        const colors = [theme.colors.blue, theme.colors.green];
        const stateKeys = ['hienMoMoi', 'hienKetThuc'];

        chart.setColors(colors);
        me.updateChartAxes(chart, theme);
        chart.getSeries().forEach(function (series, index) {
            series.setStyle({
                strokeStyle: colors[index],
                fillStyle: me.buildGradientFill(colors[index])
            });
            series.setHidden(!me.getViewModel().get(stateKeys[index]));
        });
    },

    buildGradientFill: function (color) {
        return {
            type: 'linear',
            degrees: 90,
            stops: [
                { offset: 0, color: color },
                { offset: 1, color: 'rgba(0,0,0,0)' }
            ]
        };
    },

    /** Palette lấy theo thứ tự xếp hạng, giữ màu đơn vị khi đổi Top 5/10. */
    updateUnitChartColors: function (chart, theme) {
        const me = this;
        const rows = me.getViewModel().get('donViDangHienThi') || [];
        const colors = rows.map(row => theme.colors[row.mau] || theme.colors.muted);

        chart.setColors(colors);
        chart.getSeries()[0].setColors(colors);
    },

    //#endregion

    /** Giải phóng observer thuộc vòng đời trang. */
    onUnitListReady: function (list) {
        const tip = Ext.create('Ext.tip.ToolTip', {
            target: list.getEl(),
            delegate: '.tcn-unit-rank',
            listeners: {
                beforeshow: function (tooltip) {
                    const name = tooltip.triggerElement.getAttribute('data-unit-name');

                    if (!name) {
                        return false;
                    }
                    tooltip.update(Ext.String.htmlEncode(name));
                }
            }
        });

        list.on('beforedestroy', function () {
            tip.destroy();
        });
    },

    destroy: function () {
        const me = this;

        if (me.unitRankingBinding) {
            me.unitRankingBinding.destroy();
            me.unitRankingBinding = null;
        }
        if (me.themeObserver) {
            me.themeObserver.disconnect();
            me.themeObserver = null;
        }
        me.callParent(arguments);
    }
});
