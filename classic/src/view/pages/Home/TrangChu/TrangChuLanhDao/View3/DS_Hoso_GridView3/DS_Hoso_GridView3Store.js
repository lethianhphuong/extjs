/* global NVCB, config, common */
Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.DS_Hoso_GridView3.DS_Hoso_GridView3Store', {
    extend: 'Ext.data.Store',
    alias: 'store.DS_Hoso_GridView3Store',
    requires: ['DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.TrangChuNew3_MockData'],

    fields: [
        'id', 'maHoSo', 'loaiHoSoCode', 'tenLoaiHoSo', 'trangThaiCode', 'trangThai', 'tenDoiTuong',
        { name: 'ngayDuaVaoQuanLy', type: 'date', dateFormat: 'Y-m-d' }
    ],
    pageSize: 10,
    // Phân trang phía client: toàn bộ danh sách nằm trong memory proxy
    proxy: { type: 'memory', enablePaging: true, reader: { type: 'json' } },

    /** Đường dẫn API danh sách hồ sơ (nối sau config.getNVCB_BC_Url()). TODO: thay bằng URL thật. */
    apiPath: '/danh-sach-ho-so-trang-chu',

    /** Chạy app DEMO (hoặc chưa có NVCB.Ajax) thì dùng mock, app NVCB thì gọi API. */
    isDemo: function () {
        const appName = Ext.manifest && Ext.manifest.name;
        return appName === 'DEMO' || typeof NVCB === 'undefined' || !NVCB.Ajax;
    },

    /**
     * Tải danh sách hồ sơ theo biểu đồ được click.
     * Không đặt tên loadData để tránh ghi đè Ext.data.Store#loadData (Ext dùng nội bộ).
     * @param {Object} params { maThongKe: 'D3_Cxx', json: { code: '...' } }
     */
    loadDataDanhSach: function (params) {
        const me = this;
        if (me.isDemo()) {
            const mock = DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.TrangChuNew3_MockData.getData();
            me.setDanhSach(mock.danhSachHoSo);
            return;
        }

        const url = config.getNVCB_BC_Url() + me.apiPath;
        const requestParams = {
            maThongKe: params.maThongKe,
            json: Ext.encode(params.json || {})
        };
        NVCB.Ajax.getParams(url, requestParams, function (success, response) {
            if (success) {
                const oResponse = Ext.decode(response.responseText);
                if (oResponse.success) {
                    me.setDanhSach(oResponse.data);
                    return;
                }
            } else if (typeof common !== 'undefined' && common.onShowResponseMsgFail) {
                common.onShowResponseMsgFail(response);
            }
            me.setDanhSach([]);
        });
    },

    /** Đưa danh sách vào memory proxy rồi tải trang 1. */
    setDanhSach: function (list) {
        const me = this;
        me.getProxy().setData(Array.isArray(list) ? list : []);
        me.loadPage(1);
    }
});
