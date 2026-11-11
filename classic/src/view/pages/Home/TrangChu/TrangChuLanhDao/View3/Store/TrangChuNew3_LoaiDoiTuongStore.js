Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.Store.TrangChuNew3_LoaiDoiTuongStore', {
    extend: 'Ext.data.Store',
    alias: 'store.trangchunew3loaidoituong',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json'
        }
    },
    fields: [
        { name: 'code', type: 'string' },
        { name: 'name', type: 'string' },
        { name: 'val', type: 'int' }
    ]
});
