Ext.define('DEMO.view.pages.InvoicePage.InvoicePage_View', {
    extend: 'Ext.container.Container',
    xtype: 'InvoicePage_View',
    controller: 'invoiceview',
    viewModel: 'invoiceview',
    requires: [
        'DEMO.view.pages.InvoicePage.InvoicePage_ViewGrid'
    ],
    scrollable: 'y',
    padding: 20,

    layout: { type: 'vbox', align: 'stretch' },

    items: [
        {
            xtype: 'component',
            html: '<h2 style="margin:0 0 20px;color:#1a1a2e;font-size:22px;font-weight:700;">Invoice Management</h2>'
        },
        {
            xtype: 'container',
            layout: { type: 'hbox', align: 'stretch' },
            defaults: {
                flex: 1, margin: '0 10 10 0', padding: 20,
                style: { background: '#fff', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }
            },
            items: [
                { xtype: 'component', html: '<div style="font-size:12px;color:#888;font-weight:600;">TOTAL INVOICES</div><div style="font-size:28px;font-weight:800;color:#1a1a2e;margin:8px 0;">1,542</div><div style="font-size:12px;color:#22c55e;">▲ +8.7%</div>' },
                { xtype: 'component', html: '<div style="font-size:12px;color:#888;font-weight:600;">PAID</div><div style="font-size:28px;font-weight:800;color:#22c55e;margin:8px 0;">1,284</div><div style="font-size:12px;color:#22c55e;">83.3%</div>' },
                { xtype: 'component', html: '<div style="font-size:12px;color:#888;font-weight:600;">UNPAID</div><div style="font-size:28px;font-weight:800;color:#f97316;margin:8px 0;">198</div><div style="font-size:12px;color:#f97316;">12.8%</div>' },
                { xtype: 'component', html: '<div style="font-size:12px;color:#888;font-weight:600;">OVERDUE</div><div style="font-size:28px;font-weight:800;color:#ef4444;margin:8px 0;">60</div><div style="font-size:12px;color:#ef4444;">3.9%</div>', margin: '0 0 10 0' }
            ]
        },
        {
            xtype: 'InvoicePage_ViewGrid'
        }
    ]
});
