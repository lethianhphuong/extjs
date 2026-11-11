Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View1.TrangChuNew1_ViewThongKe', {
    extend: 'Ext.Component',
    xtype: 'TrangChuNew1_ViewThongKe',
    cls: 'tcn-metrics tcn-metrics-cols-4',
    listeners: {
        afterrender: 'onMetricsResize',
        resize: 'onMetricsResize'
    },
    bind: { data: '{chiSoHienThi}' },
    tpl: [
        '<div class="tcn-metric-grid"><tpl for=".">',
        '<article class="tcn-metric tcn-tone-{mauIcon:htmlEncode}<tpl if="laTong"> tcn-metric-total</tpl>">',
        '<div class="tcn-metric-header"><span class="tcn-metric-title">{ten:htmlEncode}</span>',
        '<span class="tcn-metric-icon" aria-hidden="true">',
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">',
        '<tpl switch="icon">',
        '<tpl case="folder"><path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/>',
        '<tpl case="file-text"><path d="M6 3h8l4 4v14H6zM14 3v5h4M9 12h6M9 16h6"/>',
        '<tpl case="clipboard"><rect x="5" y="5" width="14" height="16" rx="2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 12h6M9 16h6"/>',
        '<tpl case="warning"><path d="m10.3 4-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3l-8-14a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4M12 17h.01"/>',
        '<tpl case="briefcase"><rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V4h8v3M3 12h18M10 12v3h4v-3"/>',
        '<tpl case="users"><circle cx="12" cy="7" r="3"/><circle cx="4.5" cy="10" r="2"/><circle cx="19.5" cy="10" r="2"/><path d="M7 21v-3a5 5 0 0 1 10 0v3ZM2 20v-3a3 3 0 0 1 4-3M22 20v-3a3 3 0 0 0-4-3"/>',
        '<tpl case="envelope"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
        '<tpl case="identity"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="10" r="3"/><path d="M6 19a6 6 0 0 1 12 0"/>',
        '</tpl></svg></span></div>',
        '<strong class="tcn-metric-number">{giaTriText:htmlEncode}</strong>',
        '<span class="tcn-metric-trend tcn-trend-{trangThai:htmlEncode}">',
        '{xuHuong:htmlEncode} {thayDoiText:htmlEncode} ({phanTramText:htmlEncode})</span>',
        '</article></tpl></div>'
    ]
});
