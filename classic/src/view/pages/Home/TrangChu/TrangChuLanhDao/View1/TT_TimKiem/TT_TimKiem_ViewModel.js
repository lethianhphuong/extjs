Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View1.TT_TimKiem.TT_TimKiem_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.TT_TimKiem_ViewModel',
    requires: [
        'DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View1.TT_TimKiem.store.TT_TimKiem_ReportTypeTreeStore',
        'DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View1.TT_TimKiem.store.TT_TimKiem_ListReportStore',
        'DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View1.TT_TimKiem.store.TT_TimKiem_DM_NghiepVuCoBanStore',
        'DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View1.TT_TimKiem.store.TT_TimKiem_DM_HeLucLuongBCTK_Store',
        'DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View1.TT_TimKiem.store.TT_TimKiem_DS_PQX_DonVi_store',
        'DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View1.TT_TimKiem.store.TT_TimKiem_DM_BaoCaoDinhKy_Store',
        'DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View1.TT_TimKiem.store.TT_TimKiem_DM_ThangTrongNamBCTK_Store',
        'DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View1.TT_TimKiem.store.TT_TimKiem_DM_QuyTrongNamBCTK_Store',
        'DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View1.TT_TimKiem.store.TT_TimKiem_PhamViThongKeStore',
        'DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View1.TT_TimKiem.store.TT_TimKiem_Ds_DonViStore',
        'DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View1.TT_TimKiem.store.TT_TimKiem_DM_TinhStore',
        'DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View1.TT_TimKiem.store.TT_TimKiem_DM_HuyenStore',
        'DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View1.TT_TimKiem.store.TT_TimKiem_DM_XaStore'
    ],
    stores: {
        ReportTypeTreeStore: { type: 'TT_TimKiem_ReportTypeTreeStore' },
        ListReportStore: { type: 'TT_TimKiem_ListReportStore' },
        DM_HeLucLuong_Store: { type: 'TT_TimKiem_DM_NghiepVuCoBanStore' },
        DM_TinhTrucThuoc_Store: { type: 'TT_TimKiem_DS_PQX_DonVi_store' },
        DM_CucTrucThuoc_Store: { type: 'TT_TimKiem_DM_HeLucLuongBCTK_Store' },
        DM_PhongThuocTinh_Store: { type: 'TT_TimKiem_DS_PQX_DonVi_store' },
        DM_PhongThuocCuc_Store: { type: 'TT_TimKiem_DS_PQX_DonVi_store' },
        DM_DoiThuocPhong_Store: { type: 'TT_TimKiem_DS_PQX_DonVi_store' },
        DM_BaoCaoDinhKy_Store: { type: 'TT_TimKiem_DM_BaoCaoDinhKy_Store' },
        DM_ThangTrongNamStore: { type: 'TT_TimKiem_DM_ThangTrongNamBCTK_Store' },
        DM_QuyTrongNamStore: { type: 'TT_TimKiem_DM_QuyTrongNamBCTK_Store' },
        PhamViThongKeStore: { type: 'TT_TimKiem_PhamViThongKeStore' },
        Ds_DonViStore: { type: 'TT_TimKiem_Ds_DonViStore' },
        Ds_DonViTinhStore: { type: 'TT_TimKiem_Ds_DonViStore' },
        Ds_DonViDoiStore: { type: 'TT_TimKiem_Ds_DonViStore' },
        DM_TinhStore: { type: 'TT_TimKiem_DM_TinhStore' },
        DM_HuyenStore: { type: 'TT_TimKiem_DM_HuyenStore' },
        DM_XaStore: { type: 'TT_TimKiem_DM_XaStore' },
        DM_LinhVucHoaDongStore: { type: 'TT_TimKiem_DM_NghiepVuCoBanStore' },
        DM_LoaiHinhStore: { type: 'TT_TimKiem_DM_NghiepVuCoBanStore' }
    },
    data: {
        // Mã tạm cho demo, đặt tại ViewModel theo phạm vi của form.
        constant: {
            CAPDONVI_BCTK: { TOANQUOC: 'toanQuoc', CAPCUC: 'capCuc', TINHTHANH: 'tinhThanh' },
            BAOCAODINHKY: { THANG: 'month', QUY: 'quarter', NAM: 'year' },
            DANHMUC: { HE_LUC_LUONG: ['AN', 'CS'], LINH_VUC: 'linhVuc', LOAI_HINH: 'loaiHinh' }
        },
        tieuChiKhacParams: {},
        maxYear: new Date().getFullYear(),
        minYear: 2025,
        readOnlyCapDonVi: false,
        readOnlyTinh: false,
        readOnlyCuc: false,
        readOnlyPhongTinh: true,
        readOnlyPhongCuc: true,
        readOnlyDoi: true,
        isHiddenHeLL: false,
        isHiddenCuc: false,
        isHiddenPhongCuc: false,
        isHiddenTinhThanh: false,
        isHiddenPhongTinh: false
    },
    formulas: {
        isMonth: function (get) {
            return get('tieuChiKhacParams.baoCaoDinhKy') === get('constant.BAOCAODINHKY.THANG');
        },
        isQuarter: function (get) {
            return get('tieuChiKhacParams.baoCaoDinhKy') === get('constant.BAOCAODINHKY.QUY');
        },
        isYear: function (get) {
            return get('tieuChiKhacParams.baoCaoDinhKy') === get('constant.BAOCAODINHKY.NAM');
        },
        flexKy: function (get) {
            return get('isYear') ? 3 : 2;
        }
    }
});
