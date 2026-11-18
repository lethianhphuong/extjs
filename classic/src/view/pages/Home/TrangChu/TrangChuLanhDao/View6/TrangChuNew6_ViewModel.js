Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View6.TrangChuNew6_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.TrangChuNew6_ViewModel',
    requires: [
        'DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View6.TrangChuNew6_DisplayConfig',
        'DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.DS_Hoso_GridView3.DS_Hoso_GridView3Store'
    ],

    data: {
        canBoInfo: {},
        kpiCards: [],
        soHoSo: 0
    },

    stores: {
        // Key theo DataView6: loaiHoSo / trangThaiCongViecCanBo / trangThaiCongViecCanPheDuyet / tienDoXuLyTheoThang / danhSachHoSoDuocGiao
        // 3 store biểu đồ cột dùng chung bộ field (TrangChuNew6_ViewKetQua.buildBarCard)
        // Biểu đồ cột Loại hồ sơ: thêm 'ten' (tên ngắn trên trục)
        loaiHoSoStore: { fields: ['code', 'name', 'ten', 'val', 'mau', 'color', 'tyLe', 'tyLeText', 'soLuongText'] },
        trangThaiCongViecStore: { fields: ['code', 'name', 'val', 'mau', 'color', 'tyLe', 'tyLeText', 'soLuongText'] },
        pheDuyetStore: { fields: ['code', 'name', 'val', 'mau', 'color', 'tyLe', 'tyLeText', 'soLuongText'] },
        // code = thang: dùng làm mã điểm khi click biểu đồ tiến độ
        tienDoThangStore: { fields: ['code', 'thang', 'sl'] },
        // Grid "Danh sách hồ sơ được giao" (TrangChuNew6_ViewGrid)
        dsHoSoDuocGiaoStore: { fields: ['stt', 'id', 'maDoiTuong', 'loaiDoituongMoi', 'tenLoaiDoituongMoi', 'loaiTone', 'ngayKyDuyet', 'ngayKyDuyetText', 'soDangKy'] },
        // Danh sách hồ sơ của grid DS_Hoso_GridView3 (dùng chung với View3, View5), nạp khi click biểu đồ
        dsHoSoStore: { type: 'DS_Hoso_GridView3Store' }
    }
});
