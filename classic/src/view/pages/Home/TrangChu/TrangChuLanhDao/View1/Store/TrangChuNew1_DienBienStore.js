Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View1.Store.TrangChuNew1_DienBienStore', {
    extend: 'Ext.data.Store',
    alias: 'store.trangchunew1dienbien',
    fields: [
        { name: 'code', type: 'int' },
        { name: 'name', type: 'string' },
        { name: 'nameHover', type: 'string' },
        { name: 'moMoi', type: 'int' },
        { name: 'ketThuc', type: 'int' }
    ]
});