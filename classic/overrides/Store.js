
Ext.define('DEMO.override.Store', {
    override: 'Ext.data.Store',
    getDataStore: function () {
        const me = this;

        return me.getRange().map(x => x.data);
    }
});