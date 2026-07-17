Ext.define('DEMO.view.main.Sidebar', {
    extend: 'Ext.panel.Panel',
    xtype: 'app-sidebar',

    region: 'west',
    width: 260,
    layout: 'fit',
    cls: 'app-sidebar',
    split: false,
    collapsible: true,
    header: false,
    bodyBorder: false,

    items: [{
        xtype: 'treelist',
        reference: 'navigationTreeList',
        ui: 'navigation',
        bind: {
            store: '{navigationTree}'
        },
        width: '100%',
        expanderFirst: false,
        expanderOnly: false,
        selectOnExpander: true,
        singleExpand: false,
        listeners: {
            selectionchange: 'onNavigationTreeSelectionChange'
        }
    }]
});
