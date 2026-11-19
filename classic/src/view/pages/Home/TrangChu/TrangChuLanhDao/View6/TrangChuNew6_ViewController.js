Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View6.TrangChuNew6_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TrangChuNew6_ViewController',
    requires: [
        'DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View6.TrangChuNew6_DisplayConfig',
        'DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View6.TrangChuNew6_MockData'
    ],
    // Hover / click chart → grid DS_Hoso_GridView3 (dùng chung với View3, View5)
    mixins: {
        bieuDoClick: 'DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.DS_Hoso_GridView3.DS_Hoso_BieuDoClickMixin'
    },

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
        // Dữ liệu mới: xóa tìm kiếm và ẩn grid danh sách hồ sơ của lần click trước (mixin)
        me.resetDsHoSo();
        me.applyData(DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View6.TrangChuNew6_MockData.getData());
    },

    /** Chuẩn hóa dữ liệu thô (cấu trúc DataView6) và đổ vào ViewModel / store. */
    applyData: function (data) {
        const me = this;
        const vm = me.getViewModel();
        const config = DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View6.TrangChuNew6_DisplayConfig;
        const palette = me.getCurrentPalette();
        const dsHoSo = data.danhSachHoSoDuocGiao || [];

        vm.set({
            canBoInfo: Ext.apply({ chuCaiDau: me.getChuCaiDau(data.canBo && data.canBo.hoTen) }, data.canBo),
            kpiCards: me.prepareKpi(data.tongQuan),
            soHoSo: dsHoSo.length
        });
        // 3 biểu đồ cột: Loại hồ sơ / Kết quả công việc trực tiếp thực hiện / Kết quả phạm vi quản lý
        vm.getStore('loaiHoSoStore').loadData(me.prepareTyLe(data.loaiHoSo, config.loaiHoSoTone, palette).items.map(function (item) {
            return Ext.apply(item, { ten: config.loaiHoSoTen[item.code] || item.name });
        }));
        // 2 biểu đồ thanh ngang (flipXY) vẽ mục đầu tiên ở dưới cùng → đảo thứ tự để đọc từ trên xuống đúng như dữ liệu
        vm.getStore('trangThaiCongViecStore').loadData(me.prepareTyLe(data.trangThaiCongViecCanBo, config.trangThaiTone, palette).items.reverse());
        // trangThaiCongViecCanPheDuyet chưa có trong API (DataView6): đang dùng mock, cần bổ sung API
        vm.getStore('pheDuyetStore').loadData(me.prepareTyLe(data.trangThaiCongViecCanPheDuyet, config.pheDuyetTone, palette).items.reverse());
        vm.getStore('tienDoThangStore').loadData((data.tienDoXuLyTheoThang || []).map(row => Ext.apply({ code: row.thang }, row)));
        vm.getStore('dsHoSoDuocGiaoStore').loadData(dsHoSo.map(function (row, idx) {
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

    /**
     * Dữ liệu biểu đồ cột từ danh sách { code, name, val }: tổng, % (làm tròn 1 chữ số), tone + mã màu theo code.
     * Mục = 0 vẫn giữ để trục vẫn hiện tên mục với cột 0.
     */
    prepareTyLe: function (rows, toneMap, palette) {
        const me = this;
        const config = DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View6.TrangChuNew6_DisplayConfig;
        const tong = (rows || []).reduce((sum, row) => sum + (row.val || 0), 0);
        const layMauDuPhong = me.taoBoMauDuPhong(rows, toneMap, palette);
        return {
            tong: tong,
            tongText: config.formatNumber(tong),
            items: (rows || []).map(function (row) {
                const tyLe = tong ? Math.round((row.val || 0) * 1000 / tong) / 10 : 0;
                // Có cấu hình tone thì theo tone (đổi theme được); chưa có thì lấy màu dự phòng (mau rỗng)
                const mau = toneMap[row.code] || '';
                const color = mau ? (palette[mau] || palette.muted) : layMauDuPhong();
                return Ext.apply({}, row, {
                    name: String(row.name || row.code || '').trim(),
                    val: row.val || 0,
                    tyLe: tyLe,
                    tyLeText: config.formatPercent(tyLe),
                    soLuongText: config.formatNumber(row.val),
                    mau: mau,
                    color: color
                });
            })
        };
    },

    /**
     * Hàm lấy lần lượt màu dự phòng (DisplayConfig.mauDuPhong) cho các mã chưa có tone,
     * bỏ qua màu mà các mã đã cấu hình trong cùng chart đang dùng; hết màu thì quay vòng.
     */
    taoBoMauDuPhong: function (rows, toneMap, palette) {
        const duPhong = DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View6.TrangChuNew6_DisplayConfig.mauDuPhong;
        const daDung = (rows || []).filter(row => toneMap[row.code]).map(row => String(palette[toneMap[row.code]] || '').toLowerCase());
        const conLai = duPhong.filter(mau => daDung.indexOf(mau.toLowerCase()) < 0);
        const danhSach = conLai.length ? conLai : duPhong;
        let index = 0;
        return function () {
            const mau = danhSach[index % danhSach.length];
            index += 1;
            return mau;
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

    //#region NOTE: Click biểu đồ — phần chung (bắn taiDanhSach sang DS_Hoso_GridView3) nằm ở DS_Hoso_BieuDoClickMixin
    /** Mã biểu đồ D5_Cxx theo dataKey (DisplayConfig.maBieuDo), mixin dùng khi tạo thông tin click. */
    getMaBieuDoMap: function () {
        return DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View6.TrangChuNew6_DisplayConfig.maBieuDo;
    },

    /** Thẻ KPI tổng quan (D5_C02): click theo data-code. */
    onKpiReady: function (component) {
        const me = this;
        me.bindKpiClick(component, '.tcn6-kpi', 'tongQuan', function () {
            return me.getViewModel().get('kpiCards');
        });
    },

    // Cột "Kết quả công việc trực tiếp thực hiện" (D5_C05) / "Kết quả phạm vi quản lý" (D5_C07):
    // click do mixin xử lý theo dataKey của chart (gắn ở onChartReady), không cần handler riêng

    /** Sự kiện 'dshosoload' của grid DS_Hoso_GridView3: có hồ sơ thì ẩn card "Danh sách hồ sơ được giao", rỗng thì hiện. */
    onDsHoSoLoad: function (grid, tong) {
        const card = this.lookupReference('hoSoDuocGiaoCard');
        if (card) {
            card.setHidden(tong > 0);
        }
    },
    //#endregion

    //#region NOTE: Màu biểu đồ theo theme
    /** Chart sẵn sàng hoặc tab được kích hoạt: tô màu, theo dõi đổi theme; chart có dataKey thì gắn hover/click (mixin). */
    onChartReady: function (component) {
        const me = this;
        if (component && component.dataKey) {
            me.bindBieuDoClick(component);
        }
        // Chờ layout của tab vừa kích hoạt xong mới vẽ lại, tránh chart rỗng ở lần mở đầu.
        Ext.defer(me.updateChartColors, 50, me);
        if (!me.themeObserver) {
            me.themeObserver = new MutationObserver(function () { me.updateChartColors(); });
            me.themeObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
        }
    },

    /** Hàm đọc CSS variable của View; biến --theme-* chưa có thì thử --tcn6-* tương ứng, cuối cùng dùng fallback. */
    createThemeColorReader: function (view) {
        const styles = window.getComputedStyle(view.getEl().dom);
        return function (name, fallback) {
            let val = styles.getPropertyValue(name).trim();
            if (!val && name.startsWith('--theme-')) {
                val = styles.getPropertyValue('--tcn6-' + name.substring(2)).trim();
            }
            return val || fallback || '';
        };
    },

    /** Bảng màu tone dùng cho chart (đọc từ DisplayConfig và CSS variable --tcn6-*). */
    getChartPalette: function (color) {
        const config = DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View6.TrangChuNew6_DisplayConfig;
        const palette = {};
        config.tones.forEach(function (tone) {
            palette[tone] = color('--tcn6-' + tone, config.defaultPalette[tone]);
        });
        return palette;
    },

    /** Bảng màu hiện tại: view đã render thì đọc CSS variable (theo theme), chưa thì dùng màu mặc định. */
    getCurrentPalette: function () {
        const me = this;
        const view = me.getView();
        if (view && view.rendered) {
            return me.getChartPalette(me.createThemeColorReader(view));
        }
        return Ext.apply({}, DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View6.TrangChuNew6_DisplayConfig.defaultPalette);
    },

    /** Tập hợp màu giao diện nền/chữ/viền dùng chung cho các chart. */
    getThemeTokens: function (color) {
        return {
            bgCard: color('--theme-bg-card', '#ffffff'),
            textPrimary: color('--theme-text-primary', '#1e293b'),
            textSecondary: color('--theme-text-secondary', '#64748b'),
            border: color('--theme-border', '#e2e8f0')
        };
    },

    /** Đổi theme: cập nhật mã màu từng mục của 3 store biểu đồ cột (cột vẽ theo field color). */
    applyBarColors: function (palette) {
        const vm = this.getViewModel();
        ['loaiHoSoStore', 'trangThaiCongViecStore', 'pheDuyetStore'].forEach(function (key) {
            const store = vm.getStore(key);
            if (!store) { return; }
            store.each(function (record) {
                // Mục dùng màu dự phòng (mau rỗng) giữ nguyên màu đã gán
                const color = palette[record.get('mau')];
                if (color) {
                    record.set('color', color, { commit: true, silent: true });
                }
            });
            store.fireEvent('refresh', store);
        });
    },

    /** Cấu hình màu line, gradient fill, marker và vẽ lại biểu đồ đường tiến độ. */
    applyTienDoLineColors: function (line, blueTone, tokens) {
        if (!line || !line.rendered || !line.getStore()) { return; }
        const max = line.getStore().getRange().reduce((m, record) => Math.max(m, Number(record.get('sl')) || 0), 0);
        line.setBackground(tokens.bgCard);
        line.getAxes().forEach(function (axis) {
            axis.setLabel({ color: tokens.textSecondary, fontSize: 12 });
            axis.setStyle({ strokeStyle: tokens.border });
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
        line.getSeries()[0].setMarker({ fillStyle: blueTone, strokeStyle: tokens.bgCard });
        line.getSeries()[0].setLabel({ color: tokens.textPrimary });
        line.redraw();
    },

    /** Đọc CSS variable của View và áp vào canvas chart (canvas không tự nhận var()). */
    updateChartColors: function () {
        const me = this;
        const view = me.getView();
        if (!view || !view.rendered) { return; }

        const color = me.createThemeColorReader(view);
        const palette = me.getChartPalette(color);
        const tokens = me.getThemeTokens(color);

        me.applyBarColors(palette);
        me.applyTienDoLineColors(view.down('#tienDoLineChart_IdView'), palette.blue, tokens);
    },
    //#endregion

    /** Ngắt observer khi đóng trang. */
    destroy: function () {
        const me = this;
        if (me.themeObserver) { me.themeObserver.disconnect(); }
        me.callParent(arguments);
    }
});
