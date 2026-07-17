Ext.define('DEMO.view.pages.UserRoles.UserRoles_View', {
    extend: 'Ext.grid.Panel',
    xtype: 'UserRoles_View',

    controller: 'userroles',
    viewModel: 'userroles',

    style: { background: '#fff', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' },
    header: {
        titleAlign: 'left',
        items: [{
            xtype: 'button', text: '+ Add Role', iconCls: 'x-fa fa-plus', ui: 'soft-green', style: 'border-radius:8px;'
        }]
    },

    columns: [
        { text: 'Role', dataIndex: 'role', flex: 1 },
        { text: 'Description', dataIndex: 'description', flex: 2 },
        { text: 'Users', dataIndex: 'users', width: 80, align: 'center' },
        { text: 'Permissions', dataIndex: 'permissions', width: 200 },
        {
            xtype: 'actioncolumn', text: 'Actions', width: 100, align: 'center',
            items: [
                { iconCls: 'x-fa fa-edit', tooltip: 'Edit', style: 'color:#3b82f6;' },
                { iconCls: 'x-fa fa-trash', tooltip: 'Delete', style: 'color:#ef4444;' }
            ]
        }
    ],

    store: {
        type: 'store',
        fields: ['role', 'description', 'users', 'permissions'],
        data: [
            { role: 'Admin', description: 'Full system access with all permissions', users: 2, permissions: 'All' },
            { role: 'Editor', description: 'Can edit and publish content', users: 3, permissions: 'Read, Write, Publish' },
            { role: 'User', description: 'Standard user with limited access', users: 128, permissions: 'Read, Limited Write' },
            { role: 'Viewer', description: 'Read-only access to the system', users: 45, permissions: 'Read Only' }
        ]
    }
});
