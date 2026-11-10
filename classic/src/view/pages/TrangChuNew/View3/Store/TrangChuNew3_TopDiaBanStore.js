Ext.define('DEMO.view.pages.TrangChuNew.View3.Store.TrangChuNew3_TopDiaBanStore', {
    extend: 'Ext.data.Store',
    alias: 'store.trangchunew3topdiaban',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json'
        }
    },
    fields: [
        { name: 'stt', type: 'int' },
        { name: 'diaBan', type: 'string' },
        { name: 'soHoSo', type: 'int' },
        { name: 'soHoSoText', type: 'string' },
        { name: 'loai', type: 'string' }
    ]
});
