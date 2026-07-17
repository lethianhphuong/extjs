Ext.define('DEMO.view.pages.UserList.UserList_View', {
    extend: 'Ext.container.Container',
    xtype: 'UserList_View',
    controller: 'userlist',
    viewModel: 'userlist',

    requires: [
        'DEMO.view.pages.UserList.UserList_ViewGrid'
    ],

    scrollable: 'y',
    padding: 24,

    layout: { type: 'vbox', align: 'stretch' },

    items: [
        // -- Page Header --
        {
            xtype: 'container',
            layout: { type: 'hbox', pack: 'between', align: 'middle' },
            margin: '0 0 6 0',
            items: [
                {
                    xtype: 'component',
                    html: '<h2 class="user-list-title">List</h2>'
                },
                {
                    xtype: 'button',
                    text: 'Add user',
                    iconCls: 'x-fa fa-plus',
                    ui: 'soft-green',
                    style: 'border-radius:8px;font-weight:600;',
                    cls: 'userList-add-btn'
                }
            ]
        },
        // -- Breadcrumb --
        {
            xtype: 'component',
            margin: '0 0 18 0',
            html: '<div class="user-list-breadcrumb" style="font-size:13px;color:#64748b;">' +
                  '<span style="cursor:pointer;">Dashboard</span>' +
                  ' <span style="margin:0 6px;color:#9ca3af;">&bull;</span> ' +
                  '<span style="cursor:pointer;">User</span>' +
                  ' <span style="margin:0 6px;color:#9ca3af;">&bull;</span> ' +
                  '<span style="color:#1a1a2e;font-weight:500;">List</span>' +
                  '</div>'
        },
        // -- Main Card (tabs + toolbar + grid) --
        {
            xtype: 'panel',
            cls: 'user-list-card',
            flex: 1,
            style: 'border-radius:12px;overflow:hidden;',
            bodyStyle: 'background:#1e293b;padding:0;',
            layout: { type: 'vbox', align: 'stretch' },
            items: [
                // -- Status Tabs --
                {
                    xtype: 'container',
                    cls: 'user-list-tabs',
                    layout: { type: 'hbox', align: 'middle' },
                    padding: '0 24',
                    margin: '0 0 0 0',
                    items: [
                        {
                            xtype: 'button',
                            text: 'All <span class="user-tab-count">20</span>',
                            cls: 'user-tab-btn user-tab-active',
                            enableToggle: true,
                            toggleGroup: 'userStatusTabs',
                            pressed: true,
                            handler: function (btn) { this.up('.user-list-tabs').ownerCt.down('gridpanel').filterByStatus('All', btn); }
                        },
                        {
                            xtype: 'button',
                            text: 'Active <span class="user-tab-count user-tab-count-green">2</span>',
                            cls: 'user-tab-btn',
                            enableToggle: true,
                            toggleGroup: 'userStatusTabs',
                            handler: function (btn) { this.up('.user-list-tabs').ownerCt.down('gridpanel').filterByStatus('Active', btn); }
                        },
                        {
                            xtype: 'button',
                            text: 'Pending <span class="user-tab-count user-tab-count-yellow">10</span>',
                            cls: 'user-tab-btn',
                            enableToggle: true,
                            toggleGroup: 'userStatusTabs',
                            handler: function (btn) { this.up('.user-list-tabs').ownerCt.down('gridpanel').filterByStatus('Pending', btn); }
                        },
                        {
                            xtype: 'button',
                            text: 'Banned <span class="user-tab-count user-tab-count-red">6</span>',
                            cls: 'user-tab-btn',
                            enableToggle: true,
                            toggleGroup: 'userStatusTabs',
                            handler: function (btn) { this.up('.user-list-tabs').ownerCt.down('gridpanel').filterByStatus('Banned', btn); }
                        },
                        {
                            xtype: 'button',
                            text: 'Rejected <span class="user-tab-count user-tab-count-gray">2</span>',
                            cls: 'user-tab-btn',
                            enableToggle: true,
                            toggleGroup: 'userStatusTabs',
                            handler: function (btn) { this.up('.user-list-tabs').ownerCt.down('gridpanel').filterByStatus('Rejected', btn); }
                        }
                    ]
                },
                // -- Divider --
                {
                    xtype: 'component',
                    html: '<div style="height:1px;background:#334155;margin:0 24px;"></div>'
                },
                // -- Filter Toolbar --
                {
                    xtype: 'container',
                    layout: { type: 'hbox', align: 'middle' },
                    padding: '12 24',
                    items: [
                        {
                            xtype: 'combobox',
                            emptyText: 'Role',
                            width: 160,
                            editable: false,
                            cls: 'user-role-combo',
                            triggerCls: 'user-role-trigger',
                            store: {
                                fields: ['text', 'value'],
                                data: [
                                    { text: 'All Roles', value: 'all' },
                                    { text: 'Content Creator', value: 'Content Creator' },
                                    { text: 'IT Administrator', value: 'IT Administrator' },
                                    { text: 'Financial Planner', value: 'Financial Planner' },
                                    { text: 'HR Recruiter', value: 'HR Recruiter' },
                                    { text: 'Software Engineer', value: 'Software Engineer' },
                                    { text: 'Designer', value: 'Designer' }
                                ]
                            },
                            valueField: 'value',
                            displayField: 'text',
                            value: 'all',
                            listeners: {
                                change: function (combo, newVal) {
                                    var grid = combo.up('container').ownerCt.down('gridpanel');
                                    var store = grid.getStore();
                                    store.clearFilter();
                                    if (newVal !== 'all') {
                                        store.filterBy(function (rec) {
                                            return rec.get('role') === newVal;
                                        });
                                    }
                                }
                            }
                        },
                        { xtype: 'tbspacer', width: 12 },
                        {
                            xtype: 'textfield',
                            emptyText: 'Search...',
                            cls: 'user-search-field',
                            triggers: {
                                search: {
                                    cls: 'x-fa fa-search',
                                    position: 'left'
                                }
                            },
                            width: 320,
                            enableKeyEvents: true,
                            listeners: {
                                keyup: function (field) {
                                    var query = field.getValue().toLowerCase();
                                    var grid = field.up('container').ownerCt.down('gridpanel');
                                    var store = grid.getStore();
                                    store.clearFilter();
                                    if (query) {
                                        store.filterBy(function (rec) {
                                            return rec.get('name').toLowerCase().indexOf(query) > -1 ||
                                                   rec.get('email').toLowerCase().indexOf(query) > -1 ||
                                                   rec.get('company').toLowerCase().indexOf(query) > -1 ||
                                                   rec.get('phone').indexOf(query) > -1;
                                        });
                                    }
                                }
                            }
                        },
                        { xtype: 'tbspacer', flex: 1 },
                        {
                            xtype: 'button',
                            cls: 'user-more-btn',
                            iconCls: 'x-fa fa-ellipsis-v',
                            tooltip: 'More options'
                        }
                    ]
                },
                // -- Data Grid --
                {
                    xtype: 'UserList_ViewGrid'
                }
            ]
        }
    ]
});
