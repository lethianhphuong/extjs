Ext.define('DEMO.view.pages.BlogPage.BlogPage_View', {
    extend: 'Ext.container.Container',
    xtype: 'BlogPage_View',
    controller: 'blogview',
    viewModel: 'blogview',
    requires: [
        'DEMO.view.pages.BlogPage.BlogPage_ViewGrid'
    ],
    scrollable: 'y',
    padding: 20,

    layout: { type: 'vbox', align: 'stretch' },

    items: [
        {
            xtype: 'component',
            html: '<h2 style="margin:0 0 20px;color:#1a1a2e;font-size:22px;font-weight:700;">Blog</h2>'
        },
        {
            xtype: 'container',
            layout: { type: 'hbox', align: 'stretch' },
            defaults: {
                flex: 1, margin: '0 10 10 0', padding: 20,
                style: { background: '#fff', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }
            },
            items: [
                { xtype: 'component', html: '<div style="font-size:12px;color:#888;font-weight:600;">TOTAL POSTS</div><div style="font-size:28px;font-weight:800;color:#1a1a2e;margin:8px 0;">248</div><div style="font-size:12px;color:#22c55e;">▲ +12 this month</div>' },
                { xtype: 'component', html: '<div style="font-size:12px;color:#888;font-weight:600;">PUBLISHED</div><div style="font-size:28px;font-weight:800;color:#22c55e;margin:8px 0;">214</div><div style="font-size:12px;color:#22c55e;">86.3%</div>' },
                { xtype: 'component', html: '<div style="font-size:12px;color:#888;font-weight:600;">DRAFTS</div><div style="font-size:28px;font-weight:800;color:#f97316;margin:8px 0;">28</div><div style="font-size:12px;color:#f97316;">Pending review</div>' },
                { xtype: 'component', html: '<div style="font-size:12px;color:#888;font-weight:600;">TOTAL VIEWS</div><div style="font-size:28px;font-weight:800;color:#1a1a2e;margin:8px 0;">1.2M</div><div style="font-size:12px;color:#22c55e;">▲ +24.5%</div>', margin: '0 0 10 0' }
            ]
        },
        {
            xtype: 'BlogPage_ViewGrid'
        }
    ]
});
