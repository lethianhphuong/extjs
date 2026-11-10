Ext.define('DEMO.view.pages.TrangChuNew.View4.TrangChuNew4_ViewCanBo', {
    extend: 'Ext.container.Container',
    xtype: 'TrangChuNew4_ViewCanBo',
    itemId: 'canBoContainer_IdView',
    cls: 'tcn4-profile-section',
    layout: { type: 'vbox', align: 'stretch' },
    items: [
        // Hàng 1: Profile Cán bộ bên trái + 6 Thẻ KPI bên phải
        {
            xtype: 'container',
            layout: { type: 'hbox', align: 'stretch' },
            items: [
                // Khối thông tin cá nhân cán bộ
                {
                    xtype: 'component',
                    cls: 'tcn4-officer-card tcn4-card',
                    flex: 0.85,
                    minWidth: 320,
                    margin: '0 10 0 0',
                    bind: { data: '{canBoInfo}' },
                    tpl: [
                        '<div class="tcn4-officer-body">',
                        '  <div class="tcn4-officer-avatar-wrap">',
                        '    <div class="tcn4-officer-avatar">',
                        '      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">',
                        '        <circle cx="12" cy="8" r="4"/><path d="M18 21a6 6 0 0 0-12 0"/>',
                        '      </svg>',
                        '    </div>',
                        '  </div>',
                        '  <div class="tcn4-officer-meta">',
                        '    <h2 class="tcn4-officer-name">{hoTen:htmlEncode}</h2>',
                        '    <div class="tcn4-officer-row">',
                        '      <span class="tcn4-meta-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M18 21a6 6 0 0 0-12 0"/></svg></span>',
                        '      <span class="tcn4-meta-label">Chức vụ:</span>',
                        '      <strong class="tcn4-meta-val">{chucVu:htmlEncode}</strong>',
                        '    </div>',
                        '    <div class="tcn4-officer-row">',
                        '      <span class="tcn4-meta-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01"/></svg></span>',
                        '      <span class="tcn4-meta-label">Đơn vị:</span>',
                        '      <span class="tcn4-meta-val">{donVi:htmlEncode}</span>',
                        '    </div>',
                        '    <div class="tcn4-officer-row">',
                        '      <span class="tcn4-meta-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg></span>',
                        '      <span class="tcn4-meta-label">Lĩnh vực phụ trách:</span>',
                        '      <span class="tcn4-meta-val">{linhVuc:htmlEncode}</span>',
                        '    </div>',
                        '  </div>',
                        '</div>'
                    ]
                },
                // Cụm 6 Thẻ KPI
                {
                    xtype: 'component',
                    cls: 'tcn4-kpi-grid-wrap tcn4-card',
                    flex: 1.85,
                    bind: { data: '{kpiCards}' },
                    tpl: [
                        '<div class="tcn4-kpi-grid">',
                        '<tpl for=".">',
                        '  <div class="tcn4-kpi-item tcn4-kpi-tone-{mau}<tpl if="laTong"> tcn4-kpi-total</tpl>">',
                        '    <div class="tcn4-kpi-icon-box tcn4-icon-bg-{mau}">',
                        '      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">',
                        '        {iconSvg}',
                        '      </svg>',
                        '    </div>',
                        '    <div class="tcn4-kpi-content">',
                        '      <span class="tcn4-kpi-title">{ten:htmlEncode}</span>',
                        '      <strong class="tcn4-kpi-val">{giaTriText:htmlEncode}</strong>',
                        '    </div>',
                        '  </div>',
                        '</tpl>',
                        '</div>'
                    ]
                }
            ]
        },
        // Hàng 2: 6 Huy hiệu (Badge) loại hồ sơ nghiệp vụ
        {
            xtype: 'component',
            cls: 'tcn4-subcards-bar',
            margin: '10 0 0 0',
            bind: { data: '{loaiHoSoCards}' },
            tpl: [
                '<div class="tcn4-subcards-row">',
                '<tpl for=".">',
                '  <div class="tcn4-subcard tcn4-subcard-{code}">',
                '    <span class="tcn4-subcard-title">{ten:htmlEncode}</span>',
                '    <strong class="tcn4-subcard-value">{soLuongText:htmlEncode}</strong>',
                '  </div>',
                '</tpl>',
                '</div>'
            ]
        }
    ]
});
