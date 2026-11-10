Ext.define('DEMO.view.pages.TrangChuNew.View6.TrangChuNew6_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TrangChuNew6_ViewController',
    requires: [
        'DEMO.view.pages.TrangChuNew.View6.TrangChuNew6_DisplayConfig',
        'DEMO.view.pages.TrangChuNew.View6.TrangChuNew6_MockData'
    ],

    //#region NOTE: Nạp dữ liệu
    /** Nạp dữ liệu khi khởi tạo trang. */
    init: function () {
        const me = this;
        me.loadData();
    },

    /** Sự kiện 'timkiem' từ TT_TimKiem_View; hiện vẫn dùng dữ liệu mẫu. */
    onSearch: function () {
        const me = this;
        me.loadData();
    },

    /** Nguồn dữ liệu: mock (chưa kết nối API). */
    loadData: function () {
        const me = this;
        me.applyData(DEMO.view.pages.TrangChuNew.View6.TrangChuNew6_MockData.getData());
    },

    /** Chuẩn hóa dữ liệu thô và đổ vào ViewModel / store. */
    applyData: function (data) {
        const me = this;
        const vm = me.getViewModel();
        const config = DEMO.view.pages.TrangChuNew.View6.TrangChuNew6_DisplayConfig;
        const trangThai = me.prepareTyLe(data.trangThai, config.trangThaiTone);

        vm.set({
            canBoInfo: Ext.apply({ chuCaiDau: me.getChuCaiDau(data.canBo && data.canBo.hoTen) }, data.canBo),
            kpiCards: (data.kpiCards || []).map(function (item) {
                return Ext.apply({}, item, {
                    iconSvg: config.getIconSvg(item.icon),
                    giaTriText: config.formatNumber(item.giaTri)
                });
            }),
            loaiHoSo: me.prepareTyLe((data.loaiHoSo || []).map(function (item) {
                return Ext.apply({ name: item.ten }, item);
            }), config.loaiHoSoTone),
            trangThai: trangThai,
            soHoSo: (data.dsHoSo || []).length
        });
        vm.getStore('trangThaiDonutStore').loadData(trangThai.items);
        vm.getStore('tienDoThangStore').loadData(data.tienDoThang || []);
        vm.getStore('dsHoSoStore').loadData((data.dsHoSo || []).map(function (row) {
            return Ext.apply({ loaiHsTone: config.loaiHoSoTone[row.loaiHsCode] || 'muted' }, row);
        }));
        vm.notify();
        me.updateChartColors();
    },

    /** Tính tổng, tỷ lệ % và tone màu cho danh sách có trường soLuong. */
    prepareTyLe: function (rows, toneMap) {
        const config = DEMO.view.pages.TrangChuNew.View6.TrangChuNew6_DisplayConfig;
        const tong = (rows || []).reduce((sum, row) => sum + (row.soLuong || 0), 0);
        return {
            tong: tong,
            tongText: config.formatNumber(tong),
            items: (rows || []).map(function (row) {
                const tyLe = tong ? (row.soLuong || 0) * 100 / tong : 0;
                return Ext.apply({}, row, {
                    tyLe: tyLe,
                    tyLeText: config.formatPercent(tyLe),
                    soLuongText: config.formatNumber(row.soLuong),
                    mau: toneMap[row.code] || 'muted'
                });
            })
        };
    },

    /** Lấy chữ cái đầu của họ và tên (VD: Nguyễn Văn D → ND) cho avatar. */
    getChuCaiDau: function (hoTen) {
        const words = String(hoTen || '').trim().split(/\s+/).filter(Boolean);
        if (!words.length) {
            return '';
        }
        const first = words[0].charAt(0);
        const last = words.length > 1 ? words[words.length - 1].charAt(0) : '';
        return (first + last).toUpperCase();
    },
    //#endregion

    //#region NOTE: Màu biểu đồ theo theme
    /** Chart sẵn sàng hoặc tab được kích hoạt: tô màu và theo dõi đổi theme. */
    onChartReady: function () {
        const me = this;
        // Chờ layout của tab vừa kích hoạt xong mới vẽ lại, tránh chart rỗng ở lần mở đầu.
        Ext.defer(me.updateChartColors, 50, me);
        if (!me.themeObserver) {
            me.themeObserver = new MutationObserver(function () { me.updateChartColors(); });
            me.themeObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
        }
    },

    /** Đọc CSS variable của View và áp vào canvas chart (canvas không tự nhận var()). */
    updateChartColors: function () {
        const me = this;
        const view = me.getView();
        if (!view || !view.rendered) { return; }
        const styles = window.getComputedStyle(view.getEl().dom);
        const color = function (name, fallback) {
            let val = styles.getPropertyValue(name).trim();
            if (!val && name.indexOf('--theme-') === 0) {
                val = styles.getPropertyValue('--tcn6-' + name.substring(2)).trim();
            }
            return val || fallback || '';
        };
        const defaultPalette = {
            blue: '#2563eb',
            green: '#059669',
            amber: '#d97706',
            orange: '#ea580c',
            red: '#dc2626',
            purple: '#7c3aed',
            indigo: '#4f46e5',
            pink: '#db2777',
            slate: '#475569',
            muted: '#64748b'
        };
        const palette = {};
        DEMO.view.pages.TrangChuNew.View6.TrangChuNew6_DisplayConfig.tones.forEach(function (tone) {
            palette[tone] = color('--tcn6-' + tone, defaultPalette[tone]);
        });

        const donut = view.down('#trangThaiDonutChart_IdView');
        if (donut && donut.rendered && donut.getStore()) {
            const colors = donut.getStore().getRange().map(record => palette[record.get('mau')] || palette.muted || '#64748b');
            const bgCard = color('--theme-bg-card', '#ffffff');
            donut.setBackground(bgCard);
            donut.getSeries()[0].setColors(colors);
            donut.getSeries()[0].setStyle({ strokeStyle: bgCard, lineWidth: 2 });
            donut.redraw();
        }

        const line = view.down('#tienDoLineChart_IdView');
        if (line && line.rendered && line.getStore()) {
            const max = line.getStore().getRange().reduce((m, record) => Math.max(m, Number(record.get('soLuong')) || 0), 0);
            const bgCard = color('--theme-bg-card', '#ffffff');
            const textSecondary = color('--theme-text-secondary', '#475569');
            const border = color('--theme-border', '#cbd5e1');
            const textPrimary = color('--theme-text-primary', '#0f172a');
            const blueTone = palette.blue || '#2563eb';

            line.setBackground(bgCard);
            line.getAxes().forEach(function (axis) {
                axis.setLabel({ color: textSecondary, fontSize: 12 });
                axis.setStyle({ strokeStyle: border });
                if (axis.type === 'numeric') {
                    axis.setMaximum(Math.max(10, Math.ceil(max * 1.2 / 10) * 10));
                }
            });
            line.getSeries()[0].setStyle({
                strokeStyle: blueTone,
                fillStyle: { type: 'linear', degrees: 90, stops: [
                    { offset: 0, color: blueTone },
                    { offset: 1, color: 'rgba(0,0,0,0)' }
                ] }
            });
            line.getSeries()[0].setMarker({ fillStyle: blueTone, strokeStyle: bgCard });
            line.getSeries()[0].setLabel({ color: textPrimary });
            line.redraw();
        }
    },
    //#endregion

    /** Ngắt observer khi đóng trang. */
    destroy: function () {
        const me = this;
        if (me.themeObserver) { me.themeObserver.disconnect(); }
        me.callParent(arguments);
    }
});
