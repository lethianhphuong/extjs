Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View7.TrangChuNew7_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.TrangChuNew7_ViewModel',
    requires: ['DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View7.TrangChuNew7_DisplayConfig'],

    data: {
        // tongQuan thô từ API: [{ groupCode, name, ord, value }]
        kpiRaw: [],
        // groupCode đang lọc (TONG_SO_CAN_BO = tất cả)
        chucVuChon: 'TONG_SO_CAN_BO',
        tenChucVuChon: '',
        soCanBo: 0,
        limit: 20
    },

    /** Mã thẻ "tất cả" của tongQuan (thẻ tổng). */
    maTong: 'TONG_SO_CAN_BO',

    formulas: {
        /** Thẻ KPI theo groupCode của tongQuan, icon / tone theo DisplayConfig.nhomKpi. */
        kpiCards: function (get) {
            const cfg = DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View7.TrangChuNew7_DisplayConfig;
            const chon = get('chucVuChon');
            // Sắp theo ord của API
            return (get('kpiRaw') || []).slice().sort((a, b) => (a.ord || 0) - (b.ord || 0)).map(function (row) {
                const def = cfg.getHienThiNhom(row.groupCode);
                return {
                    code: row.groupCode,
                    ten: row.name,
                    giaTriText: Number(row.value || 0).toLocaleString('vi-VN'),
                    icon: def.icon,
                    mau: def.mau,
                    laTong: !!def.laTong,
                    chon: row.groupCode === chon
                };
            });
        },

        /** Tiêu đề card danh sách: ten = chức vụ đang lọc (chip màu theo tone), soText = số cán bộ. */
        tieuDe: function (get) {
            const chon = get('chucVuChon');
            const def = DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View7.TrangChuNew7_DisplayConfig.getHienThiNhom(chon);
            return {
                ten: chon === this.maTong ? 'Tất cả chức vụ' : get('tenChucVuChon'),
                soText: Number(get('soCanBo') || 0).toLocaleString('vi-VN'),
                mau: def.mau || 'blue'
            };
        }
    },

    stores: {
        // Phân trang phía client: danh sách (đã lọc theo chức vụ) nằm trong memory proxy
        dsCanBoStore: {
            // Key theo API danhSachCanBo
            fields: ['ID', 'CODE', 'HO_TEN', 'SO_HIEU_CAND', 'TEN_CHUC_VU', 'MA_DON_VI', 'TEN_DON_VI', 'SO_HO_SO_PHU_TRACH', 'SO_HO_SO_DANG_THUC_HIEN'],
            idProperty: 'ID',
            pageSize: 10,
            proxy: { type: 'memory', enablePaging: true, reader: { type: 'json' } }
        }
    }
});
