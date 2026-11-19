Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.DS_Hoso_GridView3.DS_Hoso_GridView3Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.DS_Hoso_GridView3Model',
    requires: ['DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.DS_Hoso_GridView3.DS_Hoso_GridView3Store'],

    data: {
        // Điều kiện tìm kiếm trong danh sách hồ sơ (thanh tìm kiếm trên grid)
        timKiemNangCao: {
            loaiHoSo: null,
            trangThai: null,
            tuNgay: null,
            denNgay: null,
            tenDoiTuong: ''
        }
    },

    stores: {
        // Danh sách hồ sơ (grid dùng chung View3, View5, View6), nạp khi click biểu đồ / thẻ KPI
        dsHoSoStore: { type: 'DS_Hoso_GridView3Store' },
        // Combobox loại hồ sơ (mã khớp loaiHoSoCode của danh sách)
        loaiHoSoCbbStore: {
            fields: ['code', 'ten'],
            data: [
                { code: 'DTCB', ten: 'ĐTCB' },
                { code: 'SUUTRA', ten: 'Sưu tra' },
                { code: 'HIEMNGHI', ten: 'Hiềm nghi' },
                { code: 'CHUYENAN', ten: 'Chuyên án' },
                { code: 'CTVBM', ten: 'CTVBM' },
                { code: 'HTBM', ten: 'HTBM' },
                { code: 'VANV', ten: 'Vai ảo NV' },
                { code: 'NNV', ten: 'Nhà nghiệp vụ' }
            ]
        },
        // Combobox trạng thái (mã khớp trangThaiCode của danh sách)
        trangThaiCbbStore: {
            fields: ['code', 'ten'],
            data: [
                { code: 'DANG_QUAN_LY', ten: 'Đang quản lý' },
                { code: 'CHUYEN_MUC', ten: 'Chuyển mức' },
                { code: 'KET_THUC', ten: 'Đã kết thúc' },
                { code: 'QUA_HAN', ten: 'Quá hạn' }
            ]
        }
    }
});
