Ext.define('DEMO.view.pages.TrangChuNew.View3.TrangChuNew3_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.TrangChuNew3_ViewModel',



    requires: [
        'DEMO.view.pages.TrangChuNew.View3.TrangChuNew3_DisplayConfig',
        'DEMO.view.pages.TrangChuNew.View3.Store.TrangChuNew3_CoCauStore',
        'DEMO.view.pages.TrangChuNew.View3.Store.TrangChuNew3_BienDongStore',
        'DEMO.view.pages.TrangChuNew.View3.Store.TrangChuNew3_LoaiDoiTuongStore',
        'DEMO.view.pages.TrangChuNew.View3.Store.TrangChuNew3_DienBienStore',
        'DEMO.view.pages.TrangChuNew.View3.Store.TrangChuNew3_TopDiaBanStore',
        'DEMO.view.pages.TrangChuNew.View3.Store.TrangChuNew3_GridStore'
    ],


    data: {
        bandoImgUrl: DEMO.view.pages.TrangChuNew.View3.TrangChuNew3_DisplayConfig.bandoImgUrl,
        tongQuan: [],
        kpiRaw: null,
        loaiHoSoRaw: [],
        canhBaoRaw: null,
        kyBaoCao: 'Q IV/2025',
        hienMoMoi: true,
        hienKetThuc: true,
        loaiDiaBan: 'tinh',
        tongSoDonut: '256.842'
    },

    /**
     * Tính toán xu hướng biến động và định dạng pill badge chuẩn View 1
     * change = typeLech * valLech
     * previous = val - change
     * rate = previous > 0 ? (change * 100) / previous : null
     * trendText = xuHuong + ' ' + thayDoiText + ' (' + phanTramText + ')'
     * Ví dụ: "↓ -2 (-1,6%)" hoặc "↑ +11 (—)"
     */
    calculateTrend: function (val, typeLech, valLech, code) {
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

        let sign = '';
        if (change > 0) {
            sign = '+';
        } else if (change < 0) {
            sign = '-';
        }

        let xuHuong = '→';
        let isUp = false;
        let isDown = false;

        if (typeLech > 0) {
            xuHuong = '↑';
            isUp = true;
        } else if (typeLech < 0) {
            xuHuong = '↓';
            isDown = true;
        }

        const thayDoiText = sign + Number(valLech).toLocaleString('vi-VN');
        const percentSign = (rate !== null && rate > 0) ? '+' : '';
        const phanTramText = rate === null
            ? '—'
            : (percentSign + Number(Math.abs(rate)).toFixed(1).replace('.', ',') + '%');

        // Định dạng text badge đúng 100% theo ảnh: "↓ -2 (-1,6%)" hoặc "↑ +11 (—)"
        const trendText = xuHuong + ' ' + thayDoiText + ' (' + phanTramText + ')';

        // Phối màu badge chuẩn theo View 1:
        // Giảm (hoặc tăng quá hạn/rủi ro) -> badge khung hồng đỏ
        // Tăng -> badge khung xanh bạc hà
        const isDangerMetric = (code === 'QUA_HAN' || code === 'PER_DA_KET_THUC');
        const isRedBadge = isDown || (isUp && isDangerMetric);

        let badgeBg, badgeBorder, badgeColor, trendClass, toneXuHuong;

        if (isRedBadge) {
            trendClass = 'tcn-trend-down';
            toneXuHuong = 'red';
            badgeBg = '#fff1f2';
            badgeBorder = '#fecdd3';
            badgeColor = '#e11d48';
        } else if (isUp) {
            trendClass = 'tcn-trend-up';
            toneXuHuong = 'green';
            badgeBg = '#ecfdf5';
            badgeBorder = '#a7f3d0';
            badgeColor = '#059669';
        } else {
            trendClass = 'tcn-trend-neutral';
            toneXuHuong = 'muted';
            badgeBg = '#f1f5f9';
            badgeBorder = '#cbd5e1';
            badgeColor = '#64748b';
        }

        return {
            hasTrend: true,
            hienBienDong: true,
            phanTramText: xuHuong + ' ' + phanTramText,
            trendText: trendText,
            lech: trendText,
            xuHuong: toneXuHuong,
            trendClass: trendClass,
            badgeBg: badgeBg,
            badgeBorder: badgeBorder,
            badgeColor: badgeColor
        };
    },

    formulas: {
        kpiCards: function (get) {
            const me = this;
            const tongQuan = get('tongQuan') || [];
            if (!tongQuan || !tongQuan.length) return [];

            const cfg = DEMO.view.pages.TrangChuNew.View3.TrangChuNew3_DisplayConfig;

            return tongQuan.map(function (item, index) {
                const code = item.code || '';
                const val = typeof item.val === 'number' ? item.val : 0;
                const typeLech = typeof item.typeLech === 'number' ? item.typeLech : 0;
                const valLech = typeof item.valLech === 'number' ? item.valLech : null;
                const display = cfg.getKpiDisplay(code, index);
                const trend = me.calculateTrend(val, typeLech, valLech, code);

                return {
                    key: code,
                    code: code,
                    name: item.name || item.ten || code,
                    ten: item.name || item.ten || code,
                    val: val,
                    giaTriText: cfg.formatNumber(val),
                    icon: display.icon,
                    mau: display.mau,
                    laTong: code === 'DANG_QUAN_LY' || code === 'TONG' || index === 0,
                    hasTrend: trend.hasTrend,
                    hienBienDong: trend.hasTrend,
                    trendText: trend.trendText,
                    // Thẻ phần trăm (code PER_*): bỏ val, chỉ hiển thị % biến động
                    laPhanTram: code.indexOf('PER_') === 0,
                    phanTramText: trend.hasTrend ? trend.phanTramText : '0%',
                    lech: trend.trendText,
                    xuHuong: trend.xuHuong,
                    trendClass: trend.trendClass
                };
            });
        },

        loaiHoSoCards: function (get) {
            const list = get('loaiHoSoRaw') || [];
            const cfg = DEMO.view.pages.TrangChuNew.View3.TrangChuNew3_DisplayConfig;

            return list.map(function (item) {
                const def = (cfg.tieuChi && cfg.tieuChi.loaiHoSo && cfg.tieuChi.loaiHoSo[item.code]) || {};
                const mau = def.mau || 'muted';
                const icon = def.icon || 'file-alt';
                const name = item.ten || item.name || def.ten || item.code;
                const val = typeof item.val === 'number' ? item.val : 0;
                return {
                    code: item.code,
                    name: name,
                    ten: name,
                    val: val,
                    icon: icon,
                    mau: mau,
                    soLuongText: cfg.formatNumber(val)
                };
            });
        },

        canhBaoCards: function (get) {
            const raw = get('canhBaoRaw');
            if (!raw) return [];

            const cfg = DEMO.view.pages.TrangChuNew.View3.TrangChuNew3_DisplayConfig;

            return [
                {
                    ten: 'Hồ sơ quá hạn đánh giá',
                    soLuong: cfg.formatNumber(raw.quaHan),
                    icon: 'alert-triangle',
                    iconSvg: cfg.getIconSvg('alert-triangle'),
                    mau: 'red'
                },
                {
                    ten: 'Hồ sơ sắp hết hạn đánh giá',
                    soLuong: cfg.formatNumber(raw.sapHetHan),
                    icon: 'clock',
                    iconSvg: cfg.getIconSvg('clock'),
                    mau: 'orange'
                },
                {
                    ten: 'Hồ sơ tăng mức bất thường',
                    soLuong: cfg.formatNumber(raw.tangBatThuong),
                    icon: 'trending-up',
                    iconSvg: cfg.getIconSvg('trending-up'),
                    mau: 'amber'
                },
                {
                    ten: 'Hồ sơ nhiều đơn vị liên quan',
                    soLuong: cfg.formatNumber(raw.nhieuDonVi),
                    icon: 'share-2',
                    iconSvg: cfg.getIconSvg('share-2'),
                    mau: 'purple'
                }
            ];
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
        topDiaBanStore: {
            type: 'trangchunew3topdiaban'
        },
        gridStore: {
            type: 'trangchunew3grid'
        }
    }
});
