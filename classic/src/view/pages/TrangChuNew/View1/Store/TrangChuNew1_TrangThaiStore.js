Ext.define('DEMO.view.pages.TrangChuNew.View1.Store.TrangChuNew1_TrangThaiStore', {
    extend: 'Ext.data.Store',
    alias: 'store.trangchunew1trangthai',
    requires: [
        'DEMO.view.pages.TrangChuNew.View1.TrangChuNew1_DisplayConfig'
    ],
    fields: [
        { name: 'name', type: 'string' },
        { name: 'soLuong', type: 'int' }
    ],
    sorters: [{
        sorterFn: function (a, b) {
            const displayConfig = DEMO.view.pages.TrangChuNew.View1.TrangChuNew1_DisplayConfig;

            return displayConfig.get('trangThai', a.get('name')).thuTu -
                displayConfig.get('trangThai', b.get('name')).thuTu;
        }
    }]
});