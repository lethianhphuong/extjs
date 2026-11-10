Ext.define('DEMO.view.pages.TrangChuNew.View6.TrangChuNew6_DisplayConfig', {
    singleton: true,

    /** Tone màu theo mã ổn định; giá trị màu thật nằm ở CSS variable --tcn6-{tone}. */
    loaiHoSoTone: {
        DTCB: 'green',
        SUUTRA: 'pink',
        HIEMNGHI: 'slate',
        CHUYENAN: 'purple',
        CTVBM: 'red',
        HTBM: 'indigo'
    },
    trangThaiTone: {
        DANG_THUC_HIEN: 'blue',
        HOAN_THANH: 'green',
        SAP_DEN_HAN: 'amber',
        QUA_HAN: 'red',
        KHAC: 'muted'
    },
    /** Danh sách tone mà Controller đọc từ CSS để tô màu biểu đồ canvas. */
    tones: ['blue', 'green', 'amber', 'orange', 'red', 'purple', 'indigo', 'pink', 'slate', 'muted'],

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
