Ext.define('DEMO.view.pages.TestNoti.TestNoti_View', {
    extend: 'Ext.container.Container',
    xtype: 'TestNoti_View',

    controller: 'testnoti',
    viewModel: 'testnoti',

    layout: { type: 'vbox', align: 'center', pack: 'center' },

    items: [
        {
            xtype: 'component',
            html: '<h2 style="color:var(--theme-text-primary, #1e293b);margin-bottom:8px;">Test notiCommon</h2>' +
                '<p style="color:var(--theme-text-secondary, #64748b);margin-bottom:24px;">Nhan nut de test tung loai thong bao</p>'
        },
        {
            xtype: 'container',
            layout: { type: 'hbox', align: 'middle', pack: 'center' },
            defaults: {
                width: 140,
                height: 44,
                margin: '0 8'
            },
            items: [
                { xtype: 'button', text: 'Success', ui: 'soft-green', iconCls: 'x-fa fa-check-circle', handler: 'onTestSuccess' },
                { xtype: 'button', text: 'Error', ui: 'soft-red', iconCls: 'x-fa fa-times-circle', handler: 'onTestError' },
                { xtype: 'button', text: 'Warning', ui: 'soft-orange', iconCls: 'x-fa fa-exclamation-triangle', handler: 'onTestWarning' },
                { xtype: 'button', text: 'Info', ui: 'soft-blue', iconCls: 'x-fa fa-info-circle', handler: 'onTestInfo' },
                { xtype: 'button', text: 'Confirm', ui: 'soft-purple', iconCls: 'x-fa fa-question-circle', handler: 'onTestConfirm' }
            ]
        },
        {
            xtype: 'container',
            layout: { type: 'hbox', align: 'middle', pack: 'center' },
            margin: '16 0 0 0',
            defaults: {
                width: 180,
                height: 44,
                margin: '0 8'
            },
            items: [
                { xtype: 'button', text: 'Grid + Auto Close', ui: 'soft-blue', iconCls: 'x-fa fa-table', handler: 'onTestGrid' },
                { xtype: 'button', text: 'Custom HTML', ui: 'soft-blue', iconCls: 'x-fa fa-code', handler: 'onTestCustomHtml' }
            ]
        }
    ]
});
