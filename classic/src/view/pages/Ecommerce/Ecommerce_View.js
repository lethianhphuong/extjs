Ext.define('DEMO.view.pages.Ecommerce.Ecommerce_View', {
    extend: 'Ext.container.Container',
    xtype: 'Ecommerce_View',
    controller: 'controller.ecommerce',
    viewModel: 'viewmodel.ecommerce',
    scrollable: 'y',
    padding: 20,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [
        {
            xtype: 'component',
            html: '<h2 style="margin:0 0 20px;color:#1a1a2e;font-size:22px;font-weight:700;">Ecommerce Dashboard</h2>'
        },
        // KPI Row
        {
            xtype: 'container',
            layout: { type: 'hbox', align: 'stretch' },
            defaults: {
                flex: 1,
                margin: '0 10 10 0',
                padding: 20,
                cls: 'kpi-card',
                style: {
                    background: '#fff',
                    borderRadius: '12px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
                }
            },
            items: [
                { xtype: 'component', html: '<div><div style="font-size:12px;color:#888;font-weight:600;">TOTAL REVENUE</div><div style="font-size:28px;font-weight:800;color:#1a1a2e;margin:8px 0;">$84,254</div><div style="font-size:12px;color:#22c55e;font-weight:600;">&#9650; +24.5% last 7 days</div></div>' },
                { xtype: 'component', html: '<div><div style="font-size:12px;color:#888;font-weight:600;">ORDERS</div><div style="font-size:28px;font-weight:800;color:#1a1a2e;margin:8px 0;">2,845</div><div style="font-size:12px;color:#22c55e;font-weight:600;">&#9650; +12.3% last 7 days</div></div>' },
                { xtype: 'component', html: '<div><div style="font-size:12px;color:#888;font-weight:600;">CONVERSION RATE</div><div style="font-size:28px;font-weight:800;color:#1a1a2e;margin:8px 0;">3.24%</div><div style="font-size:12px;color:#ef4444;font-weight:600;">&#9660; -0.8% last 7 days</div></div>' },
                { xtype: 'component', html: '<div><div style="font-size:12px;color:#888;font-weight:600;">AVG ORDER VALUE</div><div style="font-size:28px;font-weight:800;color:#1a1a2e;margin:8px 0;">$29.62</div><div style="font-size:12px;color:#22c55e;font-weight:600;">&#9650; +5.1% last 7 days</div></div>', margin: '0 0 10 0' }
            ]
        },
        // Charts placeholder
        {
            xtype: 'container',
            layout: { type: 'hbox', align: 'stretch' },
            height: 300,
            margin: '0 0 10 0',
            defaults: {
                flex: 1,
                margin: '0 10 0 0',
                style: { background: '#fff', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' },
                padding: 16,
                layout: 'fit'
            },
            items: [
                { xtype: 'panel', title: 'Revenue Over Time', header: { titleAlign: 'left' } },
                { xtype: 'panel', title: 'Top Products', header: { titleAlign: 'left' }, margin: '0 0 0 10' }
            ]
        }
    ]
});
