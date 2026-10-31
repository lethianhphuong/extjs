Ext.define('DEMO.view.pages.TrangChuNew.View1.TrangChuNew1_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.trangchunew1',
    requires: ['DEMO.app.NotiCommon'],

    //#region NOTE: Khởi tạo và thao tác người dùng

    /** Khởi tạo ngày mẫu và theo dõi thứ tự màu đơn vị theo ViewModel. */
    init: function () {
        const me = this;
        const viewModel = me.getViewModel();

        viewModel.set('timKiemNangCao.tuNgay', new Date(2026, 0, 1));
        viewModel.set('timKiemNangCao.denNgay', new Date(2026, 11, 31));
        me.unitRankingBinding = viewModel.bind('{donViXepHang}', me.onUnitRankingChange, me);
    },

    /** Chọn số cột theo vùng KPI thực tế, độc lập với sidebar và viewport. */
    onMetricsResize: function (component, width) {
        const eightColumnMinWidth = 1200;
        const fourColumnMinWidth = 640;
        const availableWidth = typeof width === 'number' ? width : component.getWidth();
        const columns = availableWidth >= eightColumnMinWidth ? 8 : availableWidth >= fourColumnMinWidth ? 4 : 2;

        if (availableWidth <= 0 || component.metricColumns === columns) {
            return;
        }
        component.metricColumns = columns;
        component.removeCls(['tcn-metrics-cols-8', 'tcn-metrics-cols-4', 'tcn-metrics-cols-2']);
        component.addCls('tcn-metrics-cols-' + columns);
        component.updateLayout();
    },

    /** Kiểm tra điều kiện tìm kiếm trên dashboard dữ liệu mẫu. */
    onSearch: function () {
        const me = this;
        const form = me.lookupReference('boLoc').getForm();
        const filter = me.getViewModel().get('timKiemNangCao');

        if (!form.isValid()) {
            return;
        }
        if (filter.tuNgay && filter.denNgay && filter.tuNgay > filter.denNgay) {
            me.lookupReference('denNgay').markInvalid('Đến ngày phải bằng hoặc sau từ ngày');
            return;
        }
        notiCommon.show({
            type: 'info',
            message: 'Điều kiện tìm kiếm hợp lệ. Dashboard đang hiển thị dữ liệu minh họa, chưa kết nối API.'
        });
    },

    /** Bật/tắt series và lưu trạng thái độc lập với kỳ thống kê. */
    onToggleTrendSeries: function (button, pressed) {
        const me = this;
        const chart = me.lookupReference('dienBienChart');

        me.getViewModel().set(button.stateKey, pressed);
        if (chart && chart.rendered) {
            chart.getSeries()[button.seriesIndex].setHidden(!pressed);
            chart.redraw();
        }
    },

    /** Theo dõi chiều cao tự nhiên của danh sách, kể cả khi binding đổi Top 5/10. */
    onDetailsReady: function (component) {
        const me = this;

        if (me.trendResizeObserver) {
            me.trendResizeObserver.disconnect();
        }
        me.trendResizeObserver = new ResizeObserver(function () {
            me.updateTrendHeight();
        });
        me.trendResizeObserver.observe(component.getEl().dom);
        me.trendResizeObserver.observe(me.lookupReference('donViCard').getEl().dom);
        me.trendResizeObserver.observe(me.lookupReference('dienBienHeader').getEl().dom);
    },

    /** Giãn chart đến đáy card; khi hai card xếp dọc thì dùng chiều cao tối thiểu. */
    updateTrendHeight: function () {
        const me = this;

        if (me.destroying || me.destroyed) {
            return;
        }
        const units = me.lookupReference('donViCard');
        const trend = me.lookupReference('dienBienCard');
        const header = me.lookupReference('dienBienHeader');
        const chart = me.lookupReference('dienBienChart');

        if (!units || !trend || !header || !chart || !trend.rendered) {
            return;
        }
        const styles = window.getComputedStyle(trend.getEl().dom);
        const headerStyles = window.getComputedStyle(header.getEl().dom);
        const frameHeight = ['paddingTop', 'paddingBottom', 'borderTopWidth', 'borderBottomWidth']
            .reduce((sum, name) => sum + (parseFloat(styles[name]) || 0), 0);
        const minimum = chart.minHeight + header.getHeight() + frameHeight +
            (parseFloat(headerStyles.marginTop) || 0) + (parseFloat(headerStyles.marginBottom) || 0);
        const sameRow = Math.abs(units.getEl().dom.offsetTop - trend.getEl().dom.offsetTop) < 2;
        const height = Math.ceil(Math.max(minimum, sameRow ? units.getHeight() : 0));

        if (trend.getHeight() !== height) {
            trend.setHeight(height);
        }
    },

    /** Chuyển về bảng đầy đủ và donut Top 10 bằng cùng một state. */
    onShowAllUnits: function () {
        const me = this;

        me.getViewModel().set('gioiHanDonVi', 10);
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
        component.updateLayout();
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
        const chart = me.lookupReference('donViChart');

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
            ['trangThaiChart', me.updateStatusChartColors],
            ['dienBienChart', me.updateTrendChartColors],
            ['donViChart', me.updateUnitChartColors]
        ];

        updates.forEach(function ([reference, update]) {
            const chart = me.lookupReference(reference);

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

    /** Màu cột lấy trực tiếp từ palette chart, không ghi vào dữ liệu hồ sơ. */
    updateStatusChartColors: function (chart, theme) {
        const me = this;
        const colors = ['blue', 'amber', 'orange', 'red'].map(name => theme.colors[name]);

        chart.setColors(colors);
        chart.getSeries()[0].setColors(colors);
        me.updateChartAxes(chart, theme);
        chart.getSeries()[0].setLabel({ color: theme.text, fontSize: theme.valueFontSize, fontWeight: '600' });
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
                fillStyle: {
                    type: 'linear',
                    degrees: 90,
                    stops: [
                        { offset: 0, color: colors[index] },
                        { offset: 1, color: 'rgba(0,0,0,0)' }
                    ]
                }
            });
            series.setHidden(!me.getViewModel().get(stateKeys[index]));
        });
    },

    /** Palette lấy theo thứ tự xếp hạng, giữ màu đơn vị khi đổi Top 5/10. */
    updateUnitChartColors: function (chart, theme) {
        const me = this;
        const rows = me.getViewModel().get('donViXepHang') || [];
        const colors = rows.slice(0, 10).map(row => theme.colors[row.mau]);

        chart.setColors(colors);
        chart.getSeries()[0].setColors(colors);
    },

    //#endregion

    /** Giải phóng observer thuộc vòng đời trang. */
    destroy: function () {
        const me = this;

        if (me.unitRankingBinding) {
            me.unitRankingBinding.destroy();
            me.unitRankingBinding = null;
        }
        if (me.trendResizeObserver) {
            me.trendResizeObserver.disconnect();
            me.trendResizeObserver = null;
        }
        if (me.themeObserver) {
            me.themeObserver.disconnect();
            me.themeObserver = null;
        }
        me.callParent(arguments);
    }
});
