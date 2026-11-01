Ext.define('DEMO.view.pages.TrangChuNew.View1.Store.TrangChuNew1_DienBienStore', {
    extend: 'Ext.data.Store',
    alias: 'store.trangchunew1dienbien',
    fields: [
        { name: 'ky', type: 'string' },
        { name: 'moMoi', type: 'int' },
        { name: 'ketThuc', type: 'int' }
    ]
});
