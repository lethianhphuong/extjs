Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.TrangChuNew3_DisplayConfig', {
    singleton: true,

    /** Mã biểu đồ View3 (D3) theo khóa dữ liệu, dùng khi click lấy dữ liệu biểu đồ. */
    maBieuDo: {
        tongQuan: 'D3_C01',
        loaiHoSo: 'D3_C02',
        coCauHoSoTheoDonVi: 'D3_C03',
        bienDongHoSoTheoDonVi: 'D3_C04',
        loaiDoiTuong: 'D3_C05',
        dienBienMoMoiVaKetThuc: 'D3_C06'
    },
    // Biểu đồ có code là kỳ báo cáo (YYYYKK): khi click gửi thêm fromDate / toDate của kỳ
    maBieuDoTheoKy: ['D3_C04', 'D3_C06'],

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

    /**
     * Bảng màu biểu đồ Cơ cấu theo hệ lực lượng: 12 màu khác hẳn nhau, lấy theo thứ tự nhóm trong dữ liệu
     * (4 nhóm đầu trùng màu cố định trong loaiDoiTuongColorMap; "Khác" luôn xám).
     */
    loaiDoiTuongColors: [
        '#4f46e5', // 1. indigo (Hình sự)
        '#0891b2', // 2. cyan (Kinh tế)
        '#db2777', // 3. pink (Ma túy)
        '#ca8a04', // 4. ochre (Môi trường)
        '#059669', // 5. emerald
        '#ea580c', // 6. orange
        '#a855f7', // 7. purple
        '#dc2626', // 8. red
        '#84cc16', // 9. lime
        '#92400e', // 10. brown
        '#2563eb', // 11. blue
        '#70de0a'  // 12. navy
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
        // hex: màu cột của biểu đồ "Số lượng hồ sơ theo 8 loại hồ sơ" (cùng tông với mau)
        loaiHoSo: {
            DTCB: { ten: 'ĐTCB', icon: 'file-alt', mau: 'green', hex: '#16a34a', thuTu: 1 },
            SUUTRA: { ten: 'Sưu tra', icon: 'clipboard', mau: 'amber', hex: '#f59e0b', thuTu: 2 },
            HIEMNGHI: { ten: 'Hiềm nghi', icon: 'exclamation-triangle', mau: 'red', hex: '#ef4444', thuTu: 3 },
            CHUYENAN: { ten: 'Chuyên án', icon: 'briefcase', mau: 'purple', hex: '#a855f7', thuTu: 4 },
            CTVBM: { ten: 'CTVBM', icon: 'users', mau: 'cyan', hex: '#06b6d4', thuTu: 5 },
            HTBM: { ten: 'HTBM', icon: 'envelope', mau: 'indigo', hex: '#6366f1', thuTu: 6 },
            VANV: { ten: 'Vai ảo NV', icon: 'id-card', mau: 'muted', hex: '#64748b', thuTu: 7 },
            NNV: { ten: 'Người nước ngoài', icon: 'home', mau: 'muted', hex: '#94a3b8', thuTu: 8 }
        }
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
