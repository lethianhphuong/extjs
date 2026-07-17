Ext.define('DEMO.view.pages.UserPage.UserPage_ViewGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'UserPage_ViewGrid',

    title: 'All Users',
    header: { titleAlign: 'left' },
    style: { background: '#fff', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' },
    margin: '0 0 10 0',
    columns: [
        { text: 'ID', dataIndex: 'id', width: 60 },
        { text: 'Name', dataIndex: 'name', flex: 1 },
        { text: 'Email', dataIndex: 'email', flex: 1 },
        { text: 'Role', dataIndex: 'role', width: 120 },
        {
            text: 'Status', dataIndex: 'status', width: 120,
            renderer: function (v) {
                var c = v === 'Active' ? '#22c55e' : '#ef4444';
                return '<span style="color:' + c + ';font-weight:600;">' + v + '</span>';
            }
        },
        { text: 'Joined', dataIndex: 'joined', width: 120 }
    ],
    store: {
        fields: ['id', 'name', 'email', 'role', 'status', 'joined'],
        data: [
            { id: 1, name: 'Jaydon Frankie', email: 'jaydon@minispace.com', role: 'Admin', status: 'Active', joined: '01/15/2024' },
            { id: 2, name: 'Skylar Dias', email: 'skylar@minispace.com', role: 'Editor', status: 'Active', joined: '03/22/2024' },
            { id: 3, name: 'Craig Torff', email: 'craig@minispace.com', role: 'User', status: 'Active', joined: '05/10/2024' },
            { id: 4, name: 'Lindsey Lipshutz', email: 'lindsey@minispace.com', role: 'User', status: 'Inactive', joined: '07/01/2024' },
            { id: 5, name: 'Abram Levin', email: 'abram@minispace.com', role: 'Editor', status: 'Active', joined: '09/15/2024' }
        ]
    }
});
