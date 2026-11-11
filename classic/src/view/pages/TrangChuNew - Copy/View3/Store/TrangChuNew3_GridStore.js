Ext.define('DEMO.view.pages.TrangChuNew.View3.Store.TrangChuNew3_GridStore', {
    extend: 'Ext.data.Store',
    alias: 'store.trangchunew3grid',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json'
        }
    },
    fields: [
        { name: 'stt' },
        { name: 'maDonVi', type: 'string' },
        { name: 'tenDonVi', type: 'string' },
        { name: 'capDonVi', type: 'string' },
        { name: 'tongHoSo', type: 'int' },
        { name: 'moMoi', type: 'int' },
        { name: 'ketThuc', type: 'int' },
        { name: 'chuyenMuc', type: 'int' },
        { name: 'dtcb', type: 'int' },
        { name: 'suuTra', type: 'int' },
        { name: 'hiemNghi', type: 'int' },
        { name: 'chuyenAn', type: 'int' },
        { name: 'ctvbm', type: 'int' },
        { name: 'htbm', type: 'int' },
        { name: 'vanv', type: 'int' },
        { name: 'nnv', type: 'int' },
        { name: 'isSummary', type: 'boolean', defaultValue: false }
    ]
});
