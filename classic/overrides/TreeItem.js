Ext.define('DEMO.override.TreeItem', {
    override: 'Ext.list.TreeItem',
    getIndent: function () {
        return 10;
    }

});