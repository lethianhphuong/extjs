Ext.define('DEMO.view.pages.UserList.UserList_ViewGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'UserList_ViewGrid',

    cls: 'user-list-grid',
    flex: 1,
    style: 'border-top:1px solid #334155;',
    header: false,
    hideHeaders: false,
    stripeRows: false,
    rowLines: false,
    columnLines: false,

    columns: [
        {
            xtype: 'checkcolumn',
            width: 48,
            sortable: false,
            menuDisabled: true,
            cls: 'user-check-col'
        },
        {
            text: 'Name',
            dataIndex: 'name',
            flex: 1.5,
            sortable: true,
            renderer: function (value, metaData, record) {
                var email = record.get('email');
                var avatar = record.get('avatar');
                var initials = value.split(' ').map(function (w) { return w[0]; }).join('').substring(0, 2);
                var avatarHtml = avatar
                    ? '<img src="' + avatar + '" style="width:38px;height:38px;border-radius:50%;object-fit:cover;margin-right:12px;vertical-align:middle;" />'
                    : '<div style="width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,#334155,#475569);display:inline-flex;align-items:center;justify-content:center;margin-right:12px;vertical-align:middle;font-size:13px;font-weight:600;color:#94a3b8;letter-spacing:0.5px;">' + initials + '</div>';
                return '<div style="display:flex;align-items:center;padding:6px 0;">' +
                       avatarHtml +
                       '<div>' +
                       '<div style="font-weight:600;color:#f1f5f9;font-size:13.5px;line-height:1.3;">' + value + '</div>' +
                       '<div style="color:#64748b;font-size:12px;line-height:1.3;">' + email + '</div>' +
                       '</div></div>';
            }
        },
        {
            text: 'Phone number',
            dataIndex: 'phone',
            width: 170,
            sortable: false,
            renderer: function (v) {
                return '<span style="color:#cbd5e1;font-size:13px;">' + v + '</span>';
            }
        },
        {
            text: 'Company',
            dataIndex: 'company',
            flex: 1,
            sortable: false,
            renderer: function (v) {
                return '<span style="color:#cbd5e1;font-size:13px;">' + v + '</span>';
            }
        },
        {
            text: 'Role',
            dataIndex: 'role',
            width: 160,
            sortable: false,
            renderer: function (v) {
                return '<span style="color:#e2e8f0;font-size:13px;font-weight:500;">' + v + '</span>';
            }
        },
        {
            text: 'Status',
            dataIndex: 'status',
            width: 120,
            sortable: false,
            renderer: function (v) {
                var map = {
                    'Active':   { bg: '#052e16', color: '#4ade80', border: '#166534', label: 'Active' },
                    'Pending':  { bg: '#422006', color: '#fbbf24', border: '#92400e', label: 'Pending' },
                    'Banned':   { bg: '#450a0a', color: '#f87171', border: '#991b1b', label: 'Banned' },
                    'Rejected': { bg: '#1e1e2e', color: '#a78bfa', border: '#5b21b6', label: 'Rejected' }
                };
                var s = map[v] || { bg: '#1e293b', color: '#94a3b8', border: '#334155', label: v };
                return '<span style="display:inline-block;padding:4px 12px;border-radius:6px;font-size:12px;font-weight:600;background:' + s.bg + ';color:' + s.color + ';border:1px solid ' + s.border + ';">' + s.label + '</span>';
            }
        },
        {
            xtype: 'actioncolumn',
            width: 44,
            align: 'center',
            sortable: false,
            menuDisabled: true,
            items: [
                {
                    iconCls: 'x-fa fa-pen',
                    tooltip: 'Edit',
                    handler: function (grid, rowIndex) {
                        var rec = grid.getStore().getAt(rowIndex);
                        Ext.Msg.alert('Edit', 'Edit user: ' + rec.get('name'));
                    }
                }
            ]
        },
        {
            xtype: 'actioncolumn',
            width: 44,
            align: 'center',
            sortable: false,
            menuDisabled: true,
            items: [
                {
                    iconCls: 'x-fa fa-ellipsis-v',
                    tooltip: 'More',
                    handler: function (grid, rowIndex) {
                        var rec = grid.getStore().getAt(rowIndex);
                        // Future: show context menu
                    }
                }
            ]
        }
    ],

    store: {
        fields: ['id', 'name', 'email', 'phone', 'company', 'role', 'status', 'avatar'],
        data: [
            { id: 1,  name: 'Angelique Morse',  email: 'benny89@yahoo.com',     phone: '+46 8 123 456',    company: 'Wuckert Inc',                     role: 'Content Creator',  status: 'Banned',   avatar: 'https://i.pravatar.cc/80?img=1' },
            { id: 2,  name: 'Ariana Lang',       email: 'avery43@hotmail.com',    phone: '+54 11 1234-5678', company: 'Feest Group',                     role: 'IT Administrator', status: 'Pending',  avatar: 'https://i.pravatar.cc/80?img=5' },
            { id: 3,  name: 'Aspen Schmitt',     email: 'mireya13@hotmail.com',   phone: '+34 91 123 4567',  company: 'Kihn, Marquardt and Crist',        role: 'Financial Planner', status: 'Banned',  avatar: 'https://i.pravatar.cc/80?img=3' },
            { id: 4,  name: 'Brycen Jimenez',    email: 'tyrel.greenolt@gmail.com', phone: '+52 55 1234 5678', company: 'Rempel, Hand and Herzog',        role: 'HR Recruiter',    status: 'Active',   avatar: 'https://i.pravatar.cc/80?img=8' },
            { id: 5,  name: 'Jaydon Frankie',    email: 'jaydon@minispace.com',   phone: '+1 555-0123',      company: 'Minispace Tech',                  role: 'Software Engineer', status: 'Active',  avatar: 'https://i.pravatar.cc/80?img=11' },
            { id: 6,  name: 'Skylar Dias',       email: 'skylar@minispace.com',   phone: '+1 555-0456',      company: 'Minispace Tech',                  role: 'Designer',        status: 'Pending',  avatar: 'https://i.pravatar.cc/80?img=9' },
            { id: 7,  name: 'Craig Torff',       email: 'craig@minispace.com',    phone: '+1 555-0789',      company: 'Torff Industries',                role: 'Content Creator',  status: 'Banned',  avatar: 'https://i.pravatar.cc/80?img=12' },
            { id: 8,  name: 'Lindsey Lipshutz',  email: 'lindsey@minispace.com',  phone: '+1 555-1011',      company: 'Lipshutz Co',                     role: 'HR Recruiter',    status: 'Rejected', avatar: 'https://i.pravatar.cc/80?img=16' },
            { id: 9,  name: 'Abram Levin',       email: 'abram@minispace.com',    phone: '+1 555-1213',      company: 'Levin & Associates',              role: 'Financial Planner', status: 'Active',  avatar: 'https://i.pravatar.cc/80?img=14' },
            { id: 10, name: 'Kadin Bator',       email: 'kadin@minispace.com',    phone: '+1 555-1415',      company: 'Bator Group',                     role: 'IT Administrator', status: 'Pending', avatar: 'https://i.pravatar.cc/80?img=17' },
            { id: 11, name: 'Zaire Vaccaro',     email: 'zaire@minispace.com',    phone: '+1 555-1617',      company: 'Vaccaro Enterprises',             role: 'Software Engineer', status: 'Banned', avatar: 'https://i.pravatar.cc/80?img=19' },
            { id: 12, name: 'Talan Rosser',      email: 'talan@minispace.com',    phone: '+1 555-1819',      company: 'Rosser Tech',                     role: 'Designer',        status: 'Active',   avatar: 'https://i.pravatar.cc/80?img=20' },
            { id: 13, name: 'Emery Torff',       email: 'emery@minispace.com',    phone: '+1 555-2021',      company: 'Torff Industries',                role: 'Content Creator',  status: 'Pending', avatar: 'https://i.pravatar.cc/80?img=22' },
            { id: 14, name: 'Zaire Vaccaro Jr',  email: 'zaire.jr@minispace.com', phone: '+1 555-2223',      company: 'Vaccaro Enterprises',             role: 'IT Administrator', status: 'Rejected', avatar: 'https://i.pravatar.cc/80?img=24' },
            { id: 15, name: 'John Bator',        email: 'john@minispace.com',     phone: '+1 555-2425',      company: 'Bator Group',                     role: 'HR Recruiter',    status: 'Banned',   avatar: 'https://i.pravatar.cc/80?img=25' },
            { id: 16, name: 'Kadin Sr Bator',    email: 'kadin.sr@minispace.com', phone: '+1 555-2627',      company: 'Bator Group',                     role: 'Financial Planner', status: 'Active', avatar: 'https://i.pravatar.cc/80?img=27' },
            { id: 17, name: 'Talan Rosser Jr',   email: 'talan.jr@minispace.com', phone: '+1 555-2829',      company: 'Rosser Tech',                     role: 'Software Engineer', status: 'Pending', avatar: 'https://i.pravatar.cc/80?img=28' },
            { id: 18, name: 'Lindsey Jr',        email: 'lindsey.jr@minispace.com', phone: '+1 555-3031',    company: 'Lipshutz Co',                     role: 'Designer',        status: 'Banned',   avatar: 'https://i.pravatar.cc/80?img=29' },
            { id: 19, name: 'Abram Levin Jr',    email: 'abram.jr@minispace.com', phone: '+1 555-3233',      company: 'Levin & Associates',              role: 'Content Creator',  status: 'Pending', avatar: 'https://i.pravatar.cc/80?img=30' },
            { id: 20, name: 'Jaydon Frankie Jr', email: 'jaydon.jr@minispace.com', phone: '+1 555-3435',    company: 'Minispace Tech',                  role: 'IT Administrator', status: 'Banned', avatar: 'https://i.pravatar.cc/80?img=32' }
        ]
    },

    filterByStatus: function (status, btn) {
        var store = this.getStore();
        store.clearFilter();

        if (status !== 'All') {
            store.filterBy(function (rec) {
                return rec.get('status') === status;
            });
        }

        // Update tab active states
        var tabs = this.up('panel').down('.user-list-tabs');
        if (tabs) {
            tabs.items.each(function (item) {
                if (item.isXType('button')) {
                    item.removeCls('user-tab-active');
                }
            });
        }
        if (btn) {
            btn.addCls('user-tab-active');
        }
    }
});
