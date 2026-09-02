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
            selectionchange: 'onNavigationTreeSelectionChange',
            afterrender: function (treeList) {
                var tip = new Ext.tip.ToolTip({
                    autoShow: false,
                    autoHide: true,
                    dismissDelay: 2000,
                    trackMouse: true,
                    anchor: 'left',
                    offset: [0, 10]
                });

                treeList.getEl().on({
                    mouseover: function (e, target) {
                        var textEl = e.getTarget('.x-treelist-item-text');
                        if (textEl) {
                            var text = textEl.textContent.trim();
                            if (text) {
                                tip.update(text);
                                tip.setTarget(textEl);
                                tip.show();
                            }
                        }
                    },
                    mouseout: function (e, target) {
                        var textEl = e.getTarget('.x-treelist-item-text');
                        if (textEl) {
                            tip.hide();
                        }
                    },
                    delegate: '.x-treelist-item-text'
                });
            }
        }
    }]
});
