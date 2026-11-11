Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.Store.TrangChuNew3_BienDongStore', {
    extend: 'Ext.data.Store',
    alias: 'store.trangchunew3biendong',
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
        { name: 'quy', type: 'string' },
        { name: 'capCuc', type: 'int' },
        { name: 'capTinh', type: 'int' },
        { name: 'capXa', type: 'int' },
        { name: 'tongSo', type: 'int' }
    ]
});
