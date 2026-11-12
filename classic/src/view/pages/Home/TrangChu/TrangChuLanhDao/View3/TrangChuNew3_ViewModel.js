Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.TrangChuNew3_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.TrangChuNew3_ViewModel',



    requires: [
        'DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.TrangChuNew3_DisplayConfig',
        'DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.Store.TrangChuNew3_CoCauStore',
        'DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.Store.TrangChuNew3_BienDongStore',
        'DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.Store.TrangChuNew3_LoaiDoiTuongStore',
        'DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.Store.TrangChuNew3_DienBienStore',
        'DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.DS_Hoso_GridView3.DS_Hoso_GridView3Store'
    ],


    data: {
        tongQuan: [],
        kpiRaw: null,
        tongLoaiHoSoText: '0',
        kyBaoCao: 'Q IV/2025',
        hienMoMoi: true,
        hienKetThuc: true,
        limit: 20
    },

    //#region NOTE: Tính toán và chuẩn hóa thẻ KPI
    /**
     * Tính toán xu hướng biến động và định dạng pill badge chuẩn View 1
     * change = typeLech * valLech
     * previous = val - change
     * rate = previous > 0 ? (change * 100) / previous : null
     * trendText = xuHuong + ' ' + thayDoiText + ' (' + phanTramText + ')'
     * Ví dụ: "↓ -2 (-1,6%)" hoặc "↑ +11 (—)"
     */
    calculateTrend: function (val, typeLech, valLech, code) {
        const me = this;
        if (!typeLech || valLech === null || valLech === undefined || isNaN(valLech)) {
            return {
                hasTrend: false,
                trendText: '',
                trendClass: 'tcn-trend-none',
                badgeBg: 'transparent',
                badgeBorder: 'transparent',
                badgeColor: 'inherit'
            };
        }

        const change = typeLech * valLech;
        const previous = val - change;
        const rate = previous > 0 ? (change * 100) / previous : null;
        const huong = me.getTrendDirection(typeLech);

        const thayDoiText = me.getTrendSign(change) + Number(valLech).toLocaleString('vi-VN');
        const phanTramText = me.formatTrendRate(rate);

        // Định dạng text badge đúng 100% theo ảnh: "↓ -2 (-1,6%)" hoặc "↑ +11 (—)"
        const trendText = huong.xuHuong + ' ' + thayDoiText + ' (' + phanTramText + ')';
        const tone = me.getTrendTone(huong, code);

        return {
            hasTrend: true,
            hienBienDong: true,
            phanTramText: huong.xuHuong + ' ' + phanTramText,
            trendText: trendText,
            lech: trendText,
            xuHuong: tone.xuHuong,
            trendClass: tone.trendClass,
            badgeBg: tone.badgeBg,
            badgeBorder: tone.badgeBorder,
            badgeColor: tone.badgeColor
        };
    },

    /** Dấu của số lượng thay đổi: '+', '-' hoặc rỗng khi bằng 0. */
    getTrendSign: function (change) {
        if (change > 0) { return '+'; }
        if (change < 0) { return '-'; }
        return '';
    },

    /** Mũi tên và hướng biến động theo typeLech. */
    getTrendDirection: function (typeLech) {
        if (typeLech > 0) { return { xuHuong: '↑', isUp: true, isDown: false }; }
        if (typeLech < 0) { return { xuHuong: '↓', isUp: false, isDown: true }; }
        return { xuHuong: '→', isUp: false, isDown: false };
    },

    /** Tỷ lệ % dạng "+5,8%"; không tính được (kỳ trước = 0) thì trả về "—". */
    formatTrendRate: function (rate) {
        if (rate === null) { return '—'; }
        const percentSign = rate > 0 ? '+' : '';
        return percentSign + Number(Math.abs(rate)).toFixed(1).replace('.', ',') + '%';
    },

    /**
     * Phối màu badge chuẩn theo View 1:
     * Giảm (hoặc tăng ở chỉ số rủi ro: quá hạn) -> badge hồng đỏ; Tăng -> xanh bạc hà; còn lại -> xám.
     */
    getTrendTone: function (huong, code) {
        const isDangerMetric = (code === 'QUA_HAN' || code === 'PER_DA_KET_THUC');
        if (huong.isDown || (huong.isUp && isDangerMetric)) {
            return { trendClass: 'tcn-trend-down', xuHuong: 'red', badgeBg: '#fff1f2', badgeBorder: '#fecdd3', badgeColor: '#e11d48' };
        }
        if (huong.isUp) {
            return { trendClass: 'tcn-trend-up', xuHuong: 'green', badgeBg: '#ecfdf5', badgeBorder: '#a7f3d0', badgeColor: '#059669' };
        }
        return { trendClass: 'tcn-trend-neutral', xuHuong: 'muted', badgeBg: '#f1f5f9', badgeBorder: '#cbd5e1', badgeColor: '#64748b' };
    },

    /** Chuẩn hóa một thẻ KPI từ bản ghi tổng quan. */
    createKpiCard: function (item, index) {
        const me = this;
        const cfg = DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.TrangChuNew3_DisplayConfig;
        const code = item.code || '';
        const val = typeof item.val === 'number' ? item.val : 0;
        const typeLech = typeof item.typeLech === 'number' ? item.typeLech : 0;
        const valLech = typeof item.valLech === 'number' ? item.valLech : null;
        const display = cfg.getKpiDisplay(code, index);
        const trend = me.calculateTrend(val, typeLech, valLech, code);
        const name = item.name || item.ten || code;

        return {
            key: code,
            code: code,
            name: name,
            ten: name,
            val: val,
            giaTriText: cfg.formatNumber(val),
            icon: display.icon,
            mau: display.mau,
            laTong: code === 'DANG_QUAN_LY' || code === 'TONG' || index === 0,
            hasTrend: trend.hasTrend,
            hienBienDong: trend.hasTrend,
            trendText: trend.trendText,
            // Thẻ phần trăm (code PER_*): bỏ val, chỉ hiển thị % biến động
            laPhanTram: String(code || '').startsWith('PER_'),
            phanTramText: trend.hasTrend ? trend.phanTramText : '0%',
            lech: trend.trendText,
            xuHuong: trend.xuHuong,
            trendClass: trend.trendClass
        };
    },
    //#endregion

    formulas: {
        kpiCards: function (get) {
            const me = this;
            const tongQuan = get('tongQuan');
            if (!Array.isArray(tongQuan) || !tongQuan.length) {
                return [];
            }
            return tongQuan.map((item, index) => me.createKpiCard(item, index));
        }
    },

    stores: {
        coCauStore: {
            type: 'trangchunew3cocau'
        },
        bienDongStore: {
            type: 'trangchunew3biendong'
        },
        loaiDoiTuongStore: {
            type: 'trangchunew3loaidoituong'
        },
        dienBienStore: {
            type: 'trangchunew3dienbien'
        },
        // Biểu đồ "Số lượng hồ sơ theo 8 loại hồ sơ"
        loaiHoSoStore: {
            fields: ['code', 'ten', 'tenDayDu', 'val', 'mauHex'],
            data: []
        },
        // Danh sách hồ sơ của grid DS_Hoso_GridView3 (trống cho tới khi click biểu đồ)
        dsHoSoStore: {
            type: 'DS_Hoso_GridView3Store'
        }
    }
});
