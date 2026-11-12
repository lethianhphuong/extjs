Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View5.TrangChuNew5_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TrangChuNew5_ViewController',
    /** Nạp mock khi khởi tạo trang. */
    init: function () {
        const me = this;
        me.loadData();
    },
    /** Nạp lại toàn bộ dữ liệu, không phụ thuộc trạng thái render của tab. */
    loadData: function () {
        const me = this;
        const vm = me.getViewModel();
        const data = DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View5.TrangChuNew5_MockData.getData();

        vm.set('chiSo', vm.prepareTongQuan(data.tongQuan));
        vm.getStore('loaiHoSoStore').loadData(vm.prepareRows(data.loaiHoSo, 'loaiHoSo'));
        vm.getStore('bienDongDonViStore').loadData(vm.prepareBienDongDonVi(data.bienDongHoSoTheoDonVi));
        vm.getStore('dienBienStore').loadData(data.dienBienMoMoiVaKetThuc || []);
        vm.getStore('bienDongCapDonViStore').loadData(vm.prepareBienDongCapDonVi(data.bienDongHoSoTheoCapDonVi));
        vm.getStore('dienBienLucLuongStore').loadData(data.dienBienMoMoiVaKetThucLucLuong || []);
        vm.getStore('capXaStore').loadData(vm.prepareRows(data.capXa, 'lucLuong'));
        vm.notify();
        me.updateChartColors();
    },
    /** Áp dụng màu CSS cho canvas và theo dõi theme trong vòng đời View. */
    onChartReady: function () {
        const me = this;
        me.updateChartColors();
        if (!me.themeObserver) {
            me.themeObserver = new MutationObserver(function () { me.updateChartColors(); });
            me.themeObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
        }
    },
    /** Store binding có thể đến sau render; cập nhật khoảng trục khi dữ liệu thực sự sẵn sàng. */
    onBarStoreChange: function (chart, store, oldStore) {
        const me = this;
        if (oldStore) {
            chart.mun(oldStore, 'datachanged', me.updateChartColors, me);
        }
        if (store) {
            chart.mon(store, 'datachanged', me.updateChartColors, me);
        }
        me.updateChartColors();
    },
    /** Đồng bộ màu biểu đồ với theme hiện tại. */
    updateChartColors: function () {
        const me = this;
        const view = me.getView();
        if (!view.rendered) { return; }
        const color = me.createThemeColorReader(view);
        const palette = me.getChartPalette(color);
        view.query('cartesian').forEach(function (chart) {
            if (!chart.rendered) { return; }
            chart.recordColors = palette;
            chart.setBackground(color('--theme-bg-card', '#ffffff'));
            me.applyAxisColors(chart, color);
            if (chart.chartKind === 'trend') {
                me.applyTrendColors(chart, palette);
            } else if (chart.chartKind === 'stacked') {
                me.applyStackedColors(chart, palette);
            } else {
                me.applyBarColors(chart, color);
            }
            chart.redraw();
        });
    },

    /** Hàm đọc CSS variable của View; biến --theme-* chưa có thì thử --tcn5--theme-*, cuối cùng dùng fallback. */
    createThemeColorReader: function (view) {
        const styles = window.getComputedStyle(view.getEl().dom);
        return function (name, fallback) {
            let val = styles.getPropertyValue(name).trim();
            if (!val && name.startsWith('--theme-')) {
                val = styles.getPropertyValue('--tcn5' + name).trim();
            }
            return val || fallback || '';
        };
    },

    /** Bảng màu tone dùng cho chart (ưu tiên CSS variable --tcn5-*). */
    getChartPalette: function (color) {
        const defaultPalette = {
            blue: '#2563eb',
            green: '#16a34a',
            amber: '#d97706',
            orange: '#ea580c',
            violet: '#7c3aed',
            pink: '#db2777',
            cyan: '#0891b2',
            muted: '#64748b',
            indigo: '#4f46e5',
            purple: '#9333ea'
        };
        const palette = {};
        Object.keys(defaultPalette).forEach(function (name) {
            palette[name] = color('--tcn5-' + name, defaultPalette[name]) || defaultPalette[name];
        });
        return palette;
    },

    /** Màu nhãn và đường trục. */
    applyAxisColors: function (chart, color) {
        if (!chart.getAxes) { return; }
        chart.getAxes().forEach(function (axis) {
            axis.setLabel({ color: color('--theme-text-secondary', '#475569'), fontSize: 10 });
            axis.setStyle({ strokeStyle: color('--theme-border', '#cbd5e1') });
        });
    },

    /** Biến động theo cấp đơn vị: cột chồng Xã / Tỉnh / Cục (thứ tự yField) và đường tổng màu cam. */
    applyStackedColors: function (chart, palette) {
        const series = chart.getSeries();
        chart.setColors([palette.violet, palette.green, palette.blue]);
        series[0].setColors([palette.violet, palette.green, palette.blue]);
        series[1].setStyle({ strokeStyle: palette.orange });
        series[1].setMarker({ fillStyle: palette.orange });
        series[1].setLabel({ color: palette.orange });
    },

    /** Biểu đồ diễn biến: 2 đường mở mới / kết thúc, giữ trạng thái ẩn hiện theo khóa riêng của từng chart. */
    applyTrendColors: function (chart, palette) {
        const me = this;
        const colors = [palette.blue, palette.green];
        const vm = me.getViewModel();
        chart.setColors(colors);
        chart.getSeries().forEach(function (series, index) {
            series.setStyle({
                strokeStyle: colors[index],
                fillStyle: {
                    type: 'linear', degrees: 90, stops: [
                        { offset: 0, color: colors[index] },
                        { offset: 1, color: 'rgba(0,0,0,0)' }
                    ]
                }
            });
            series.setHidden(!vm.get(index ? chart.ketThucKey : chart.moMoiKey));
        });
    },

    /** Biểu đồ cột: chừa khoảng trục cho nhãn ngoài cột, kể cả cột có giá trị lớn nhất. */
    applyBarColors: function (chart, color) {
        const store = chart.getStore();
        const records = store ? store.getRange() : [];
        const maximum = records.reduce((max, record) => Math.max(max, Number(record.get('val')) || 0), 0);
        chart.getAxes()[0].setMaximum(Math.max(1, Math.ceil(maximum * 1.2)));
        chart.getSeries()[0].setLabel({ color: color('--theme-text-primary', '#0f172a'), fontSize: 13, fontWeight: 'bold' });
    },
    /** Bật/tắt riêng từng đường và giữ trạng thái khi cập nhật theme. */
    onToggleTrendSeries: function (button, pressed) {
        const me = this;
        const chart = me.getView().down('#' + button.chartItemId);
        me.getViewModel().set(button.stateKey, pressed);
        if (chart && chart.rendered) {
            chart.getSeries()[button.seriesIndex].setHidden(!pressed);
            chart.redraw();
        }
    },
    /** Tooltip theo phần tử HTML, hủy cùng component để không lưu target cũ. */
    onTooltipReady: function (component) {
        const tip = Ext.create('Ext.tip.ToolTip', {
            target: component.getEl(),
            delegate: '[data-tcn5-tip]',
            trackMouse: true,
            listeners: {
                beforeshow: function (tooltip) {
                    const text = tooltip.triggerElement.getAttribute('data-tcn5-tip');
                    if (!text) { return false; }
                    tooltip.setHtml(Ext.String.htmlEncode(text));
                }
            }
        });
        component.on('beforedestroy', function () { tip.destroy(); });
    },
    /** Ngắt observer khi đóng trang. */
    destroy: function () {
        const me = this;
        if (me.themeObserver) { me.themeObserver.disconnect(); }
        me.callParent(arguments);
    }
});
