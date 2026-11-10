Ext.define('DEMO.view.pages.TrangChuNew.View4.TrangChuNew4_DisplayConfig', {
    singleton: true,

    USE_MOCK_DATA: true,

    paletteColors: [
        '#2563eb', // blue
        '#16a34a', // green
        '#f59e0b', // amber
        '#dc2626', // red
        '#8b5cf6', // purple
        '#06b6d4', // cyan
        '#64748b'  // slate
    ],

    loaiHoSoColors: {
        DTCB: { bg: '#ecfdf5', text: '#059669', border: '#a7f3d0' },
        SUUTRA: { bg: '#fdf2f8', text: '#db2777', border: '#fbcfe8' },
        HIEMNGHI: { bg: '#f1f5f9', text: '#475569', border: '#cbd5e1' },
        CHUYENAN: { bg: '#faf5ff', text: '#7c3aed', border: '#e9d5ff' },
        CTVBM: { bg: '#fef2f2', text: '#dc2626', border: '#fecaca' },
        HTBM: { bg: '#f5f3ff', text: '#6366f1', border: '#ddd6fe' }
    },

    svgIcons: {
        folder: '<path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/>',
        plus: '<path d="M12 5v14M5 12h14"/>',
        check: '<path d="m5 13 4 4L19 7"/>',
        swap: '<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14M7 22l-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>',
        clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
        alert: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
        user: '<circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 1 0-16 0"/>',
        building: '<rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01"/>',
        briefcase: '<rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
        list: '<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>',
        arrowRight: '<path d="m9 18 6-6-6-6"/>'
    },

    getIconSvg: function (name) {
        return this.svgIcons[name] || '';
    },

    formatNumber: function (val) {
        if (val === null || val === undefined || isNaN(val)) return '0';
        return Number(val).toLocaleString('vi-VN');
    },

    formatPercent: function (val, digits) {
        const d = (digits !== undefined) ? digits : 2;
        if (val === null || val === undefined || isNaN(val)) return '0%';
        return Number(val).toLocaleString('vi-VN', {
            minimumFractionDigits: d,
            maximumFractionDigits: d
        }) + '%';
    }
});
