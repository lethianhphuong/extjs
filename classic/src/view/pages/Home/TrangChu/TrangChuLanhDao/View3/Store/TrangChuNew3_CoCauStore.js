Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.Store.TrangChuNew3_CoCauStore', {
    extend: 'Ext.data.Store',
    alias: 'store.trangchunew3cocau',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json'
        }
    },
    fields: [
        { name: 'name', type: 'string' },
        { name: 'soLuong', type: 'int' },
        { name: 'tyLe', type: 'float' },
        { name: 'mau', type: 'string' }
    ]
});
