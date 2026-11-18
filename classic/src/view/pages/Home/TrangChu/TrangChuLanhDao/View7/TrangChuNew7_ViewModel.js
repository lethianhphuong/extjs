Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View7.TrangChuNew7_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.TrangChuNew7_ViewModel',

    data: {
        // tongQuan thô từ dữ liệu: [{ code, name, val }]
        kpiRaw: [],
        // Mã chức vụ đang lọc (TONG = tất cả)
        chucVuChon: 'TONG',
        tenChucVuChon: '',
        soCanBo: 0
    },

    /** Icon (Font Awesome) và tone màu thẻ KPI theo mã chức vụ. */
    kpiDisplay: {
        TONG: { icon: 'users', mau: 'blue', laTong: true },
        CUC_TRUONG: { icon: 'sitemap', mau: 'sky' },
        PHO_CUC_TRUONG: { icon: 'user-tie', mau: 'green' },
        TRUONG_PHONG: { icon: 'folder', mau: 'purple' },
        PHO_TRUONG_PHONG: { icon: 'exchange-alt', mau: 'orange' },
        DOI_TRUONG: { icon: 'user-clock', mau: 'amber' },
        DOI_PHO: { icon: 'user-friends', mau: 'teal' },
        TRUONG_CAX: { icon: 'shield-alt', mau: 'rose' },
        PHO_TRUONG_CAX: { icon: 'user-shield', mau: 'pink' },
        CAN_BO: { icon: 'id-badge', mau: 'indigo' }
    },

    formulas: {
        kpiCards: function (get) {
            const me = this;
            const chon = get('chucVuChon');
            return (get('kpiRaw') || []).map(function (row) {
                const def = me.kpiDisplay[row.code] || { icon: 'user', mau: 'blue' };
                return {
                    code: row.code,
                    ten: row.name,
                    giaTriText: Number(row.val || 0).toLocaleString('vi-VN'),
                    icon: def.icon,
                    mau: def.mau,
                    laTong: !!def.laTong,
                    chon: row.code === chon
                };
            });
        },

        /** Tiêu đề card danh sách: ten = chức vụ đang lọc (chip màu theo tone), soText = số cán bộ. */
        tieuDe: function (get) {
            const chon = get('chucVuChon');
            const def = this.kpiDisplay[chon] || {};
            return {
                ten: chon === 'TONG' ? 'Tất cả chức vụ' : get('tenChucVuChon'),
                soText: Number(get('soCanBo') || 0).toLocaleString('vi-VN'),
                mau: def.mau || 'blue'
            };
        }
    },

    stores: {
        // Phân trang phía client: danh sách (đã lọc theo chức vụ) nằm trong memory proxy
        dsCanBoStore: {
            fields: ['id', 'hoTen', 'soHieu', 'chucVuCode', 'chucVu', 'donVi', 'tongHoSo', 'dangThucHien'],
            pageSize: 10,
            proxy: { type: 'memory', enablePaging: true, reader: { type: 'json' } }
        }
    }
});
