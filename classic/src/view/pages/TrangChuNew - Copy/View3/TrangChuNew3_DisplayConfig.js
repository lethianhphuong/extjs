Ext.define('DEMO.view.pages.TrangChuNew.View3.TrangChuNew3_DisplayConfig', {
    singleton: true,

    /** ========================================================
     * CẤU HÌNH BẢN ĐỒ VIEW3 (THAY ĐỔI ẢNH VÀ URL BẢN ĐỒ TẠI ĐÂY)
     * ======================================================== */
    /** Đường dẫn URL file ảnh bản đồ (bản bóc tách nền trong suốt hoặc file gốc 1268.jpg) */
    bandoImgUrl: 'classic/src/view/pages/TrangChuNew/View3/1268_transparent.png',
    // bandoImgUrlGoc: 'classic/src/view/pages/TrangChuNew/View3/1268.jpg',
    // bandoImgUrlOnline: 'https://vnpa.moh.gov.vn/wp-content/uploads/2025/11/1268.jpg',

    /** URL mở ra khi người dùng click vào ảnh bản đồ hoặc link xem chi tiết */
    bandoMapUrl: '#ban-do',

    paletteColors: [
        '#2563eb', // blue
        '#22c55e', // green
        '#f59e0b', // amber
        '#ef4444', // red
        '#8b5cf6', // purple
        '#06b6d4', // cyan
        '#64748b'  // slate / muted
    ],

    // Màu theo cấp đơn vị: Cấp tỉnh (chiếm phần lớn) dùng màu thương hiệu #00a47e (màu active menu); Cục xanh dương, Xã tím nhạt
    // cùng dải màu lạnh để hài hòa nhưng vẫn phân biệt rõ; đường tổng màu cam làm điểm nhấn ấm
    coCauColors: {
        'Cấp Cục': '#3b82f6',
        'Cấp tỉnh': '#00a47e',
        'Cấp Xã': '#a78bfa',
        'Tổng': '#f97316'
    },

    /** Bảng màu biểu đồ Cơ cấu theo loại đối tượng: tránh xanh lá thương hiệu (dành cho cấp đơn vị) và đỏ/vàng cam (cảnh báo) */
    loaiDoiTuongColors: [
        '#4f46e5', // 1. Hình sự (indigo)
        '#0891b2', // 2. Kinh tế (cyan)
        '#db2777', // 3. Ma túy (pink)
        '#ca8a04', // 4. Môi trường (ochre)
        '#94a3b8'  // 5. Khác (slate)
    ],

    loaiDoiTuongColorMap: {
        '029': '#4f46e5',
        '030': '#0891b2',
        '031': '#db2777',
        '032': '#ca8a04',
        '-1': '#94a3b8',
        'Hình sự': '#4f46e5',
        'Kinh tế': '#0891b2',
        'Ma túy': '#db2777',
        'Môi trường': '#ca8a04',
        'Khác': '#94a3b8'
    },

    getLoaiDoiTuongColor: function (codeOrName, index) {
        const me = this;
        if (codeOrName && me.loaiDoiTuongColorMap[codeOrName]) {
            return me.loaiDoiTuongColorMap[codeOrName];
        }
        const colors = me.loaiDoiTuongColors;
        const idx = typeof index === 'number' ? index : 0;
        return colors[idx % colors.length];
    },

    tieuChi: {
        tongQuan: {
            DANG_QUAN_LY: { icon: 'folder', mau: 'blue', thuTu: 1 },
            LAP_MOI: { icon: 'plus', mau: 'green', thuTu: 2 },
            DA_KET_THUC: { icon: 'check', mau: 'purple', thuTu: 3 },
            CHUYEN_MUC: { icon: 'exchange-alt', mau: 'orange', thuTu: 4 },
            SAP_DEN_HAN: { icon: 'clock', mau: 'orange', thuTu: 5 },
            QUA_HAN: { icon: 'exclamation-triangle', mau: 'red', thuTu: 6 },
            PER_LAP_MOI: { icon: 'clock', mau: 'orange', thuTu: 7 },
            PER_DA_KET_THUC: { icon: 'exclamation-triangle', mau: 'red', thuTu: 8 },
            TONG: { icon: 'folder', mau: 'blue', thuTu: 1 }
        },
        kpi: {
            tongSo: { ten: 'Tổng số hồ sơ đang quản lý', icon: 'folder', mau: 'blue' },
            moMoi: { ten: 'Mở mới trong kỳ', icon: 'plus', mau: 'green' },
            ketThuc: { ten: 'Kết thúc trong kỳ', icon: 'check', mau: 'purple' },
            chuyenMuc: { ten: 'Chuyển mức trong kỳ', icon: 'exchange-alt', mau: 'orange' },
            sapDenHan: { ten: 'Sắp đến hạn', icon: 'clock', mau: 'orange' },
            quaHan: { ten: 'Quá hạn', icon: 'exclamation-triangle', mau: 'red' }
        },
        loaiHoSo: {
            DTCB: { ten: 'ĐTCB', icon: 'file-alt', mau: 'green', thuTu: 1 },
            SUUTRA: { ten: 'Sưu tra', icon: 'clipboard', mau: 'amber', thuTu: 2 },
            HIEMNGHI: { ten: 'Hiềm nghi', icon: 'exclamation-triangle', mau: 'red', thuTu: 3 },
            CHUYENAN: { ten: 'Chuyên án', icon: 'briefcase', mau: 'purple', thuTu: 4 },
            CTVBM: { ten: 'CTVBM', icon: 'users', mau: 'cyan', thuTu: 5 },
            HTBM: { ten: 'HTBM', icon: 'envelope', mau: 'indigo', thuTu: 6 },
            VANV: { ten: 'Vai ảo NV', icon: 'id-card', mau: 'muted', thuTu: 7 },
            NNV: { ten: 'Người nước ngoài', icon: 'home', mau: 'muted', thuTu: 8 }
        },
        canhBao: {
            quaHan: {
                key: 'quaHan',
                ten: 'Hồ sơ quá hạn đánh giá',
                icon: 'alert-triangle',
                mau: 'red'
            },
            sapHetHan: {
                key: 'sapHetHan',
                ten: 'Hồ sơ sắp hết hạn đánh giá',
                icon: 'clock',
                mau: 'orange'
            },
            tangBatThuong: {
                key: 'tangBatThuong',
                ten: 'Hồ sơ tăng mức bất thường',
                icon: 'trending-up',
                mau: 'amber'
            },
            nhieuDonVi: {
                key: 'nhieuDonVi',
                ten: 'Hồ sơ nhiều đơn vị liên quan',
                icon: 'share-2',
                mau: 'purple'
            }
        }
    },

    svgIcons: {
        folder: '<path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/>',
        'plus-circle': '<circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/>',
        'check-circle': '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
        repeat: '<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14M7 22l-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>',
        clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
        'alert-triangle': '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
        'trending-up': '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',
        'share-2': '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>'
    },

    getIconSvg: function (name) {
        return this.svgIcons[name] || '';
    },

    /** Bản đồ màu sắc chuẩn đồng bộ theo View 1 (bảo đảm 100% không mất màu) */
    cardColorMap: {
        blue: {
            cardBg: '#f4f7fe',
            cardBorder: '#d4e0fb',
            iconBg: '#2563eb',
            iconStroke: '#ffffff',
            iconRadius: '8px'
        },
        green: {
            cardBg: '#f2faf6',
            cardBorder: '#cdeadd',
            iconBg: '#059669',
            iconStroke: '#ffffff',
            iconRadius: '8px'
        },
        purple: {
            cardBg: '#faf4fe',
            cardBorder: '#e9d6fb',
            iconBg: '#9333ea',
            iconStroke: '#ffffff',
            iconRadius: '8px'
        },
        orange: {
            cardBg: '#fef7f3',
            cardBorder: '#fcded0',
            iconBg: '#ea580c',
            iconStroke: '#ffffff',
            iconRadius: '8px'
        },
        amber: {
            cardBg: '#fdf8f2',
            cardBorder: '#f7e4cd',
            iconBg: '#d97706',
            iconStroke: '#ffffff',
            iconRadius: '8px'
        },
        yellow: {
            cardBg: '#fdf8f2',
            cardBorder: '#f7e4cd',
            iconBg: '#d97706',
            iconStroke: '#ffffff',
            iconRadius: '8px'
        },
        red: {
            cardBg: '#fef3f5',
            cardBorder: '#f9d2da',
            iconBg: '#e11d48',
            iconStroke: '#ffffff',
            iconRadius: '8px'
        },
        cyan: {
            cardBg: '#f2fafb',
            cardBorder: '#cdedf2',
            iconBg: '#06b6d4',
            iconStroke: '#ffffff',
            iconRadius: '8px'
        },
        indigo: {
            cardBg: '#f6f5fe',
            cardBorder: '#dcdbfb',
            iconBg: '#4f46e5',
            iconStroke: '#ffffff',
            iconRadius: '8px'
        },
        muted: {
            cardBg: '#f9fafb',
            cardBorder: '#eaf0f3',
            iconBg: '#94a3b8',
            iconStroke: '#ffffff',
            iconRadius: '8px'
        }
    },

    /** Bảng 8 màu pastel chuẩn cho hàng thẻ nghiệp vụ phụ đồng bộ theo View 1 */
    subcardColors: [
        { cardBg: '#f2faf6', cardBorder: '#cdeadd' }, // 1. ĐTCB: green (#059669)
        { cardBg: '#fdf8f2', cardBorder: '#f7e4cd' }, // 2. Sưu Tra: amber (#d97706)
        { cardBg: '#fef3f5', cardBorder: '#f9d2da' }, // 3. Hiềm nghi: red (#e11d48)
        { cardBg: '#faf4fe', cardBorder: '#e9d6fb' }, // 4. Chuyên án: purple (#9333ea)
        { cardBg: '#f2fafb', cardBorder: '#cdedf2' }, // 5. CT VBM: cyan (#06b6d4)
        { cardBg: '#f6f5fe', cardBorder: '#dcdbfb' }, // 6. HTBM: indigo (#4f46e5)
        { cardBg: '#f9fafb', cardBorder: '#eaf0f3' }, // 7. VANV: muted (#94a3b8)
        { cardBg: '#f4f7fe', cardBorder: '#d4e0fb' }  // 8. NNV: blue (#2563eb)
    ],

    getCardColors: function (mau) {
        const me = this;
        return me.cardColorMap[mau] || me.cardColorMap.blue;
    },

    getSubcardColors: function (index) {
        const me = this;
        const list = me.subcardColors;
        return list[index % list.length];
    },

    kpiFallbackList: [
        { icon: 'folder', mau: 'blue' },
        { icon: 'plus', mau: 'green' },
        { icon: 'check', mau: 'purple' },
        { icon: 'exchange-alt', mau: 'orange' },
        { icon: 'clock', mau: 'orange' },
        { icon: 'exclamation-triangle', mau: 'red' },
        { icon: 'chart-line', mau: 'cyan' },
        { icon: 'share-alt', mau: 'purple' }
    ],

    getKpiDisplay: function (code, index) {
        const me = this;
        const definitions = (me.tieuChi && me.tieuChi.tongQuan) || {};
        if (code && definitions[code]) {
            return definitions[code];
        }
        const idx = typeof index === 'number' ? index : 0;
        return me.kpiFallbackList[idx % me.kpiFallbackList.length];
    },

    get: function (group, code) {
        const me = this;
        const definitions = me.tieuChi[group] || {};
        return definitions[code] || { ten: code, icon: 'info', mau: 'blue' };
    },

    formatNumber: function (val) {
        if (val === null || val === undefined || isNaN(val)) return '0';
        return Number(val).toLocaleString('vi-VN');
    },

    formatPercent: function (val, digits = 1) {
        if (val === null || val === undefined || isNaN(val)) return '0%';
        return Number(val).toLocaleString('vi-VN', {
            minimumFractionDigits: digits,
            maximumFractionDigits: digits
        }) + '%';
    }
});
