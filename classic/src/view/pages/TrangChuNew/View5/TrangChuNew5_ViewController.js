Ext.define('DEMO.view.pages.TrangChuNew.View5.TrangChuNew5_ViewController', {
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
        const data = DEMO.view.pages.TrangChuNew.View5.TrangChuNew5_MockData.getData();
        const coCauDonVi = vm.prepareCoCauDonVi(data.coCauHoSoTheoDonVi);
        const bienDongDonVi = vm.prepareBienDongDonVi(data.bienDongHoSoTheoDonVi);

        vm.set({
            chiSo: vm.prepareTongQuan(data.tongQuan),
            loaiHoSo: vm.prepareRows(data.loaiHoSo, 'loaiHoSo'),
            coCauDonViList: coCauDonVi,
            topTinh: data.topDiaBanTinhCoNhieuHoSo,
            topXa: data.topDiaBanXaCoNhieuHoSo
        });
        vm.getStore('coCauDonViStore').loadData(coCauDonVi);
        vm.getStore('bienDongDonViStore').loadData(bienDongDonVi);
        vm.getStore('dienBienStore').loadData(data.dienBienMoMoiVaKetThuc);
        vm.getStore('capTinhStore').loadData(vm.prepareRows(data.capTinh, 'lucLuong'));
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
        const styles = window.getComputedStyle(view.getEl().dom);
        const color = function (name, fallback) {
            const val = styles.getPropertyValue(name).trim()
                || (name.startsWith('--theme-') ? styles.getPropertyValue('--tcn5' + name).trim() : '');
            return val || fallback || '';
        };
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
        ['blue', 'green', 'amber', 'orange', 'violet', 'pink', 'cyan', 'muted', 'indigo', 'purple'].forEach(function (name) {
            palette[name] = color('--tcn5-' + name, defaultPalette[name]) || defaultPalette[name];
        });
        view.query('cartesian, polar').forEach(function (chart) {
            if (!chart.rendered) { return; }
            chart.recordColors = palette;
            chart.setBackground(color('--theme-bg-card', '#ffffff'));
            if (chart.getAxes) {
                chart.getAxes().forEach(function (axis) {
                    axis.setLabel({ color: color('--theme-text-secondary', '#475569'), fontSize: 10 });
                    axis.setStyle({ strokeStyle: color('--theme-border', '#cbd5e1') });
                });
            }
            if (chart.isXType('polar')) {
                const colors = chart.getStore().getRange().map(record => palette[record.get('mau')] || palette.muted);
                chart.setColors(colors);
                chart.getSeries()[0].setColors(colors);
                chart.getSeries()[0].setLabel({ color: '#ffffff' });
            } else if (chart.chartKind === 'trend') {
                const colors = [palette.blue, palette.green];
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
                    series.setHidden(!me.getViewModel().get(index ? 'hienKetThuc' : 'hienMoMoi'));
                });
            } else {
                // Chừa khoảng trục cho nhãn ngoài cột, kể cả cột có giá trị lớn nhất.
                const store = chart.getStore();
                const maximum = store ? store.getRange().reduce((max, record) => Math.max(max, Number(record.get('val')) || 0), 0) : 0;
                chart.getAxes()[0].setMaximum(Math.max(1, Math.ceil((maximum || 0) * 1.2)));
                chart.getSeries()[0].setLabel({ color: color('--theme-text-primary', '#0f172a'), fontSize: 10 });
            }
            chart.redraw();
        });
    },
    /** Bật/tắt riêng từng đường và giữ trạng thái khi cập nhật theme. */
    onToggleTrendSeries: function (button, pressed) {
        const me = this;
        const chart = me.getView().down('#dienBienHoSoChart_IdView');
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
