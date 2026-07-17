Ext.define('DEMO.view.pages.Banking.Banking_View', {
    extend: 'Ext.container.Container',
    xtype: 'Banking_View',
    controller: 'controller.banking',
    viewModel: 'viewmodel.banking',
    scrollable: 'y',
    padding: 20,

    layout: { type: 'vbox', align: 'stretch' },

    items: [
        {
            xtype: 'component',
            html: '<h2 style="margin:0 0 20px;color:#1a1a2e;font-size:22px;font-weight:700;">Banking</h2>'
        },
        {
            xtype: 'container',
            layout: { type: 'hbox', align: 'stretch' },
            defaults: {
                flex: 1, margin: '0 10 10 0', padding: 20,
                style: { background: '#fff', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }
            },
            items: [
                { xtype: 'component', html: '<div style="font-size:12px;color:#888;font-weight:600;">BALANCE</div><div style="font-size:28px;font-weight:800;color:#1a1a2e;margin:8px 0;">$125,430</div><div style="font-size:12px;color:#22c55e;">&#9650; +8.3%</div>' },
                { xtype: 'component', html: '<div style="font-size:12px;color:#888;font-weight:600;">INCOME</div><div style="font-size:28px;font-weight:800;color:#1a1a2e;margin:8px 0;">$28,540</div><div style="font-size:12px;color:#22c55e;">&#9650; +12.1%</div>' },
                { xtype: 'component', html: '<div style="font-size:12px;color:#888;font-weight:600;">EXPENSES</div><div style="font-size:28px;font-weight:800;color:#1a1a2e;margin:8px 0;">$18,230</div><div style="font-size:12px;color:#ef4444;">&#9650; +5.6%</div>' },
                { xtype: 'component', html: '<div style="font-size:12px;color:#888;font-weight:600;">SAVINGS RATE</div><div style="font-size:28px;font-weight:800;color:#1a1a2e;margin:8px 0;">36.1%</div><div style="font-size:12px;color:#22c55e;">&#9650; +2.4%</div>', margin: '0 0 10 0' }
            ]
        },
        {
            xtype: 'panel',
            title: 'Transaction History',
            header: { titleAlign: 'left' },
            style: { background: '#fff', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' },
            bodyPadding: 16,
            html: '<div style="color:#999;text-align:center;padding:40px;">Transaction data will be loaded here...</div>'
        }
    ]
});
