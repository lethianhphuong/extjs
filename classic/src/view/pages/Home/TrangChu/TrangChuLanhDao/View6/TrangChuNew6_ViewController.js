Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View6.TrangChuNew6_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TrangChuNew6_ViewController',
    requires: [
        'DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View6.TrangChuNew6_DisplayConfig',
        'DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View6.TrangChuNew6_MockData'
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
        me.applyData(DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View6.TrangChuNew6_MockData.getData());
    },

    /** Chuẩn hóa dữ liệu thô (cấu trúc DataView6) và đổ vào ViewModel / store. */
    applyData: function (data) {
        const me = this;
        const vm = me.getViewModel();
        const config = DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View6.TrangChuNew6_DisplayConfig;
        const trangThai = me.prepareTyLe(data.trangThaiCongViecTrucTiep, config.trangThaiTone);
        const dsHoSo = data.danhSachHoSoDuocGiao || [];

        vm.set({
            canBoInfo: Ext.apply({ chuCaiDau: me.getChuCaiDau(data.canBo && data.canBo.hoTen) }, data.canBo),
            kpiCards: me.prepareKpi(data.tongQuan),
            loaiHoSo: me.prepareLoaiHoSo(data.loaiHoSo),
            trangThai: trangThai,
            soHoSo: dsHoSo.length
        });
        vm.getStore('trangThaiCongViecStore').loadData(trangThai.items);
        vm.getStore('tienDoThangStore').loadData(data.tienDoXuLyTheoThang || []);
        vm.getStore('dsHoSoStore').loadData(dsHoSo.map(function (row, idx) {
            return Ext.apply({
                stt: idx + 1,
                loaiTone: config.loaiDoiTuongMoiTone[String(row.loaiDoituongMoi || '').slice(0, 6)] || 'muted',
                ngayKyDuyetText: row.ngayKyDuyet ? Ext.Date.format(new Date(row.ngayKyDuyet), 'd/m/Y') : ''
            }, row);
        }));
        vm.notify();
        me.updateChartColors();
    },

    /** Thẻ KPI từ tongQuan: chỉ giữ code có cấu hình; PER_* gộp thành badge chênh lệch của thẻ gốc. */
    prepareKpi: function (rows) {
        const config = DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View6.TrangChuNew6_DisplayConfig;
        const lech = {};
        (rows || []).forEach(function (row) {
            const goc = config.kpiGop[row.code];
            if (goc && typeof row.valLech === 'number') {
                lech[goc] = row;
            }
        });
        return (rows || []).filter(row => config.kpi[row.code]).map(function (row) {
            const cfg = config.kpi[row.code];
            const per = lech[row.code];
            const item = Ext.apply({}, cfg, {
                code: row.code,
                ten: row.name,
                giaTri: row.val,
                giaTriText: config.formatNumber(row.val),
                iconSvg: config.getIconSvg(cfg.icon),
                hienLech: !!per
            });
            if (per) {
                const huong = Math.sign(per.typeLech || 0);
                item.lechText = (huong > 0 ? '+' : '') + config.formatNumber(huong < 0 ? -Math.abs(per.valLech) : per.valLech);
                item.lechTone = 'flat';
                if (huong > 0) {
                    item.lechTone = 'up';
                } else if (huong < 0) {
                    item.lechTone = 'down';
                }
            }
            return item;
        }).sort((a, b) => a.thuTu - b.thuTu);
    },

    /** Thẻ loại hồ sơ: tỷ lệ + tone + icon theo code. */
    prepareLoaiHoSo: function (rows) {
        const me = this;
        const config = DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View6.TrangChuNew6_DisplayConfig;
        const result = me.prepareTyLe(rows, config.loaiHoSoTone);
        result.items.forEach(function (item) {
            item.icon = config.loaiHoSoIcon[item.code] || 'folder';
        });
        return result;
    },

    /** Tính tổng, tỷ lệ % và tone màu cho danh sách dạng { code, name, val }. */
    prepareTyLe: function (rows, toneMap) {
        const config = DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View6.TrangChuNew6_DisplayConfig;
        const tong = (rows || []).reduce((sum, row) => sum + (row.val || 0), 0);
        return {
            tong: tong,
            tongText: config.formatNumber(tong),
            items: (rows || []).map(function (row) {
                const tyLe = tong ? (row.val || 0) * 100 / tong : 0;
                return Ext.apply({}, row, {
                    name: String(row.name || row.code || '').trim(),
                    tyLe: tyLe,
                    tyLeText: config.formatPercent(tyLe),
                    soLuongText: config.formatNumber(row.val),
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
        DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View6.TrangChuNew6_DisplayConfig.tones.forEach(function (tone) {
            palette[tone] = color('--tcn6-' + tone, defaultPalette[tone]);
        });
        // Màu nền/chữ/viền dùng chung cho các chart; có giá trị dự phòng khi CSS chưa nạp biến theme
        const bgCard = color('--theme-bg-card', '#ffffff');
        const textPrimary = color('--theme-text-primary', '#1e293b');
        const textSecondary = color('--theme-text-secondary', '#64748b');
        const border = color('--theme-border', '#e2e8f0');
        const blueTone = palette.blue;

        const bar = view.down('#trangThaiCongViecChart_IdView');
        if (bar && bar.rendered && bar.getStore()) {
            const maxBar = bar.getStore().getRange().reduce((m, record) => Math.max(m, Number(record.get('val')) || 0), 0);
            bar.recordColors = palette;
            bar.setBackground(bgCard);
            bar.getAxes().forEach(function (axis) {
                axis.setLabel({ color: textSecondary, fontSize: 12 });
                axis.setStyle({ strokeStyle: border });
                if (axis.type === 'numeric') {
                    // Chừa khoảng cho nhãn số trên đầu cột
                    axis.setMaximum(Math.max(5, Math.ceil(maxBar * 1.2)));
                }
            });
            bar.getSeries()[0].setLabel({ color: textPrimary, fontSize: 13, fontWeight: 'bold' });
            bar.redraw();
        }

        const line = view.down('#tienDoLineChart_IdView');
        if (line && line.rendered && line.getStore()) {
            const max = line.getStore().getRange().reduce((m, record) => Math.max(m, Number(record.get('sl')) || 0), 0);
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
                fillStyle: {
                    type: 'linear', degrees: 90, stops: [
                        { offset: 0, color: blueTone },
                        { offset: 1, color: 'rgba(0,0,0,0)' }
                    ]
                }
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
