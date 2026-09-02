Ext.define('DEMO.view.main.Header', {
    extend: 'Ext.panel.Panel',
    xtype: 'app-header',

    region: 'north',
    height: 60,
    cls: 'app-header',
    header: false,
    bodyBorder: false,
    layout: {
        type: 'hbox',
        align: 'middle',
        pack: 'space-between'
    },
    defaults: {
        border: false
    },

    initComponent: function () {
        this.callParent(arguments);
    },

    items: [{
        xtype: 'component',
        html: '<div style="display:flex;align-items:center;gap:8px;padding-left:16px;">' +
            '<span style="cursor:pointer;font-size:14px;color:#64748b;">&#8592;</span>' +
            '<span style="font-weight:600;font-size:14px;color:#1e293b;">Team 1</span>' +
            '<span style="background:#ecfdf5;color:#22c55e;font-size:11px;padding:2px 8px;border-radius:4px;font-weight:600;">Free</span>' +
            '</div>',
        flex: 1
    }, {
        xtype: 'toolbar',
        border: false,
        style: 'background:transparent;',
        items: [{
            xtype: 'textfield',
            emptyText: 'Search... (Ctrl+K)',
            width: 220,
            cls: 'header-search-field',
            editable: false,
            readOnly: true
        }, {
            iconCls: 'x-fa fa-bell-o',
            ui: 'headerToolbar',
            tooltip: 'Thông báo'
        }, {
            iconCls: 'x-fa fa-comments-o',
            ui: 'headerToolbar',
            tooltip: 'Tin nhắn'
        }, {
            iconCls: 'x-fa fa-cog',
            ui: 'headerToolbar',
            tooltip: 'Cài đặt',
            handler: 'onOpenSettings'
        }, {
            xtype: 'tbtext',
            html: '<div style="display:flex;align-items:center;gap:8px;">' +
                '<div style="width:32px;height:32px;border-radius:50%;background:#e2e8f0;display:flex;align-items:center;justify-content:center;">' +
                '<i class="x-fa fa-user" style="color:#64748b;font-size:14px;"></i>' +
                '</div></div>',
            tooltip: 'Tài khoản'
        }]
    }]
});
