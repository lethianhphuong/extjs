Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View6.TrangChuNew6_DisplayConfig', {
    singleton: true,

    /** Mã biểu đồ View6 theo dataKey của chart / thẻ — gửi kèm khi click để tải DS hồ sơ (View3: D3_, View5: D4_, View6: D5_). */
    maBieuDo: {
        tongQuan: 'D5_C02',
        loaiHoSo: 'D5_C03',
        tienDoXuLyTheoThang: 'D5_C04',
        trangThaiCongViecCanBo: 'D5_C05',
        trangThaiCongViecCanPheDuyet: 'D5_C07'
    },

    /** Tone màu theo mã ổn định; giá trị màu thật nằm ở CSS variable --tcn6-{tone}. */
    loaiHoSoTone: {
        DTCB: 'green',
        SUUTRA: 'pink',
        HIEMNGHI: 'slate',
        CHUYENAN: 'purple',
        CTVBM: 'red',
        HTBM: 'indigo',
        VANV: 'blue',
        NNV: 'amber'
    },
    /** Tên ngắn hiển thị trên trục biểu đồ cột "Loại hồ sơ" (tooltip vẫn hiện tên đầy đủ). */
    loaiHoSoTen: {
        DTCB: 'ĐTCB',
        SUUTRA: 'Sưu tra',
        HIEMNGHI: 'Hiềm nghi',
        CHUYENAN: 'Chuyên án',
        CTVBM: 'CT VBM',
        HTBM: 'HTBM',
        VANV: 'VANV',
        NNV: 'NNV'
    },
    /** Màu cột "Kết quả công việc trực tiếp thực hiện" theo code (trangThaiCongViecCanBo). */
    trangThaiTone: {
        'TAOMOI': 'blue',   // Lưu mới
        'DOIKY': 'amber',  // Đợi ký
        'TUCHOI': 'red',    // Từ chối ký
        'BOSUNG': 'purple'  // Yêu cầu bổ sung
    },
    /**
     * Màu cột "Kết quả phạm vi quản lý" theo code (trangThaiCongViecCanPheDuyet).
     * Danh sách trạng thái dự kiến — cần xác nhận lại theo nghiệp vụ / API.
     */
    pheDuyetTone: {
        DOIKY: 'amber',
        DADUYET: 'green',
        TUCHOI: 'red',
        DAKY: 'orange'
    },
    /** Thẻ KPI theo code của tongQuan; PER_* được gộp làm badge chênh lệch cho thẻ gốc. */
    kpi: {
        DANG_QUAN_LY: { icon: 'folder', mau: 'blue', laTong: true, thuTu: 1 },
        LAP_MOI: { icon: 'plus', mau: 'green', thuTu: 2 },
        DA_KET_THUC: { icon: 'check', mau: 'purple', thuTu: 3 },
        CHUYEN_MUC: { icon: 'swap', mau: 'orange', thuTu: 4 }
    },
    kpiGop: {
        PER_LAP_MOI: 'LAP_MOI',
        PER_DA_KET_THUC: 'DA_KET_THUC'
    },
    /** Tone badge loại hồ sơ trong grid theo 6 số đầu của loaiDoituongMoi (nhóm nghiệp vụ). */
    loaiDoiTuongMoiTone: {
        '036001': 'green',
        '036002': 'pink',
        '036003': 'slate',
        '036004': 'purple',
        '036005': 'red',
        '036006': 'indigo'
    },
    /**
     * Màu dự phòng: mã chưa khai báo trong bảng tone (loaiHoSoTone / trangThaiTone / pheDuyetTone) sẽ tự lấy lần lượt
     * màu ở đây, bỏ qua màu đã dùng trong cùng chart → lát/cột và dòng chú thích bên cạnh luôn cùng một màu.
     * Các màu khác hẳn bộ tone chính để không lẫn với mục đã cấu hình.
     */
    mauDuPhong: [
        '#0891b2', // xanh lơ
        '#65a30d', // xanh nõn chuối
        '#c026d3', // tím hồng
        '#0d9488', // xanh ngọc
        '#e11d48', // hồng đỏ
        '#a16207', // vàng đất
        '#0284c7', // xanh da trời
        '#92400e', // nâu
        '#1e3a8a', // xanh than
        '#ca8a04'  // vàng đậm
    ],
    /** Danh sách tone mà Controller đọc từ CSS để tô màu biểu đồ canvas. */
    tones: ['blue', 'green', 'amber', 'orange', 'red', 'purple', 'indigo', 'pink', 'slate', 'muted'],
    /** Màu mặc định của từng tone (khi chưa đọc được CSS variable --tcn6-*). */
    defaultPalette: {
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
    },

    svgIcons: {
        folder: '<path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/>',
        plus: '<path d="M12 5v14M5 12h14"/>',
        check: '<path d="m5 13 4 4L19 7"/>',
        swap: '<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14M7 22l-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>',
        clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
        alert: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>'
    },

    getIconSvg: function (name) {
        return this.svgIcons[name] || '';
    },

    formatNumber: function (val) {
        return Number(val || 0).toLocaleString('vi-VN');
    },

    formatPercent: function (val) {
        return Number(val || 0).toLocaleString('vi-VN', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + '%';
    }
});
