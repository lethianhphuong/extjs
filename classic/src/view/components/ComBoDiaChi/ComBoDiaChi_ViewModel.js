Ext.define('DEMO.view.components.ComBoDiaChi.ComBoDiaChi_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.combodiachi',
    stores: {
        //#region NOTE: Danh mục mẫu độc lập cho từng instance
        tinhStore: { fields: ['maTinh', 'tenTinh'], data: [
            { maTinh: '01', tenTinh: 'Hà Nội' }, { maTinh: '79', tenTinh: 'TP. Hồ Chí Minh' },
            { maTinh: '31', tenTinh: 'Hải Phòng' }, { maTinh: '48', tenTinh: 'Đà Nẵng' }
        ] },
        xaStore: { fields: ['maXa', 'tenXa', 'maTinh'], data: [
            { maXa: '00001', tenXa: 'Phường Ba Đình', maTinh: '01' }, { maXa: '00002', tenXa: 'Phường Hoàn Kiếm', maTinh: '01' },
            { maXa: '00003', tenXa: 'Phường Cầu Giấy', maTinh: '01' }, { maXa: '00004', tenXa: 'Phường Đống Đa', maTinh: '01' },
            { maXa: '00005', tenXa: 'Xã Đông Anh', maTinh: '01' }, { maXa: '00006', tenXa: 'Xã Sóc Sơn', maTinh: '01' },
            { maXa: '00007', tenXa: 'Phường Thanh Xuân', maTinh: '01' }, { maXa: '00008', tenXa: 'Xã Gia Lâm', maTinh: '01' }
        ] },
        xaCuStore: { fields: ['maXa', 'tenXa', 'maTinh'], data: [
            { maXa: '00001', tenXa: 'Phường Ba Đình', maTinh: '01' }, { maXa: '00002', tenXa: 'Phường Hoàn Kiếm', maTinh: '01' },
            { maXa: '00003', tenXa: 'Phường Cầu Giấy', maTinh: '01' }, { maXa: '00004', tenXa: 'Phường Đống Đa', maTinh: '01' },
            { maXa: '00005', tenXa: 'Xã Đông Anh', maTinh: '01' }, { maXa: '00006', tenXa: 'Xã Sóc Sơn', maTinh: '01' },
            { maXa: '00007', tenXa: 'Phường Thanh Xuân', maTinh: '01' }, { maXa: '00008', tenXa: 'Xã Gia Lâm', maTinh: '01' }
        ] },
        quocGiaStore: { fields: ['value', 'text'], data: [
            { value: 'Việt Nam', text: 'Việt Nam' }, { value: 'Lào', text: 'Lào' },
            { value: 'Campuchia', text: 'Campuchia' }, { value: 'Trung Quốc', text: 'Trung Quốc' }, { value: 'Khác', text: 'Khác' }
        ] }
        //#endregion
    }
});
