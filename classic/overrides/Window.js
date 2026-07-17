
Ext.define('DEMO.override.Window', {
    override: 'Ext.window.Window',

    ui: 'dialogcustom',
    closable: true,
    closeToolText: 'Đóng',
    resizable: false,
    modal: true,
    closeAction: 'destroy',
    bodyStyle: 'background-color:transparent',
    layout: {
        type: 'fit',
        padding: 5
    },
    initComponent: function () {

        let config = this.config;

        if (config && config.items && config.items.length && config.items[0].xtype) {
            let items = config.items;

            let popup = this;
            popup.xtype_p = items[0].xtype;
            popup.setAllIsUpdate = function (bool = false) {
                window.DEMO_2_PP.down(popup.xtype_p).getForm().managedListeners.forEach((el) => {
                    el.item.setReadOnly(bool);
                    el.item.setDisabled(bool);
                });
            };
            popup.setAllHidden = function (bool = false) {
                window.DEMO_2_PP.down(popup.xtype_p).query('button').forEach((x) => {
                    x.setHidden(bool);
                });
            };

            window.DEMO_2_PP = popup;

        }

        this.callParent(arguments);
    }
});