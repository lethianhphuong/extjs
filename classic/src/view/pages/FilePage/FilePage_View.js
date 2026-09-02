Ext.define('DEMO.view.pages.FilePage.FilePage_View', {
    extend: 'Ext.container.Container',
    xtype: 'FilePage_View',
    controller: 'filepage',
    viewModel: 'filepage',
    scrollable: 'y',
    padding: 20,

    layout: { type: 'vbox', align: 'stretch' },

    items: [
        {
            xtype: 'component',
            html: '<h2 style="margin:0 0 20px;color:#1a1a2e;font-size:22px;font-weight:700;">File Manager</h2>'
        },
        {
            xtype: 'container',
            layout: { type: 'hbox', align: 'stretch' },
            defaults: {
                flex: 1, margin: '0 10 10 0', padding: 20,
                style: { background: '#fff', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }
            },
            items: [
                { xtype: 'component', html: '<div style="font-size:12px;color:#888;font-weight:600;">TOTAL FILES</div><div style="font-size:28px;font-weight:800;color:#1a1a2e;margin:8px 0;">3,842</div><div style="font-size:12px;color:#22c55e;">&#9650; +24 this week</div>' },
                { xtype: 'component', html: '<div style="font-size:12px;color:#888;font-weight:600;">STORAGE USED</div><div style="font-size:28px;font-weight:800;color:#1a1a2e;margin:8px 0;">14.2 GB</div><div style="font-size:12px;color:#f97316;">68% of 20GB</div>' },
                { xtype: 'component', html: '<div style="font-size:12px;color:#888;font-weight:600;">SHARED FILES</div><div style="font-size:28px;font-weight:800;color:#1a1a2e;margin:8px 0;">486</div><div style="font-size:12px;color:#22c55e;">&#9650; +12 this week</div>', margin: '0 0 10 0' }
            ]
        },
        {
            xtype: 'panel',
            title: 'Recent Files',
            header: { titleAlign: 'left' },
            style: { background: '#fff', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' },
            bodyPadding: 16,
            html: '<div style="color:#999;text-align:center;padding:40px;">File browser will be loaded here...</div>'
        }
    ]
});
