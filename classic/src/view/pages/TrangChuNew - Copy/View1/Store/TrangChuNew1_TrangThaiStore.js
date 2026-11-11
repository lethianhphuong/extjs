Ext.define('DEMO.view.pages.TrangChuNew.View1.Store.TrangChuNew1_TrangThaiStore', {
    extend: 'Ext.data.Store',
    alias: 'store.trangchunew1trangthai',
    fields: [
        { name: 'name', type: 'string' },
        { name: 'nhanDonVi', type: 'string' },
        { name: 'soLuong', type: 'int' },
        { name: 'ten', type: 'string' },
        { name: 'nhanTruc', type: 'string' },
        { name: 'mau', type: 'string' },
        { name: 'thuTu', type: 'int' }
    ],
    sorters: [{ property: 'thuTu', direction: 'ASC' }]
});
