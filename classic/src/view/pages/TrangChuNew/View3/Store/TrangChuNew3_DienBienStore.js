Ext.define('DEMO.view.pages.TrangChuNew.View3.Store.TrangChuNew3_DienBienStore', {
    extend: 'Ext.data.Store',
    alias: 'store.trangchunew3dienbien',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json'
        }
    },
    fields: [
        { name: 'code', type: 'auto' },
        { name: 'name', type: 'string' },
        { name: 'nameHover', type: 'string' },
        { name: 'thang', type: 'string' },
        { name: 'moMoi', type: 'int' },
        { name: 'ketThuc', type: 'int' }
    ]
});
