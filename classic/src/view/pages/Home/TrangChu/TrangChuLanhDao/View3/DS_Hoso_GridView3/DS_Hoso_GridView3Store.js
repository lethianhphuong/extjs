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

    /** DEMO: danh sách mock theo maThongKe (key trong TrangChuNew3_MockData); không có thì dùng danhSachHoSo. */
    mockTheoMa: {
        D5_C05_LIST: 'danhSachDeXuat',
        D5_C07_LIST: 'danhSachPhamViQuanLy'
    },

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
    loadDataDanhSach: function (params, dieuKien) {
        const me = this;
        // Nhớ params của biểu đồ đang chọn để tìm kiếm / làm mới lọc lại đúng danh sách đó
        me.paramsHienTai = params || {};
        if (me.isDemo()) {
            const mock = DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View3.TrangChuNew3_MockData.getData();
            const list = mock[me.mockTheoMa[me.paramsHienTai.maThongKe]] || mock.danhSachHoSo;
            me.setDanhSach(me.locDanhSach(list, dieuKien));
            return;
        }

        const url = config.getNVCB_BC_Url() + me.apiPath;
        const requestParams = {
            maThongKe: me.paramsHienTai.maThongKe,
            // API: điều kiện tìm kiếm gửi kèm trong json (ngày dạng Ymd)
            json: Ext.encode(Ext.apply({}, me.dieuKienApi(dieuKien), me.paramsHienTai.json))
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

    /**
     * Tìm kiếm trong danh sách của biểu đồ đang chọn.
     * @param {Object} [dieuKien] { loaiHoSo, trangThai, tuNgay, denNgay, tenDoiTuong }; null = bỏ lọc
     */
    timKiem: function (dieuKien) {
        this.loadDataDanhSach(this.paramsHienTai, dieuKien);
    },

    /** Lọc phía client (chế độ DEMO) theo loại, trạng thái, khoảng ngày đưa vào quản lý, tên đối tượng. */
    locDanhSach: function (list, dieuKien) {
        const rows = Array.isArray(list) ? list : [];
        const dk = dieuKien || {};
        const tuNgay = dk.tuNgay ? Ext.Date.format(dk.tuNgay, 'Y-m-d') : null;
        const denNgay = dk.denNgay ? Ext.Date.format(dk.denNgay, 'Y-m-d') : null;
        const ten = String(dk.tenDoiTuong || '').trim().toLowerCase();
        return rows.filter(function (row) {
            // ngayDuaVaoQuanLy dạng 'Y-m-d' nên so sánh chuỗi đúng thứ tự ngày
            const ngay = row.ngayDuaVaoQuanLy || '';
            return (!dk.loaiHoSo || row.loaiHoSoCode === dk.loaiHoSo) &&
                (!dk.trangThai || row.trangThaiCode === dk.trangThai) &&
                (!tuNgay || ngay >= tuNgay) &&
                (!denNgay || ngay <= denNgay) &&
                (!ten || String(row.tenDoiTuong || '').toLowerCase().indexOf(ten) >= 0);
        });
    },

    /** Điều kiện gửi API: chỉ giữ trường có giá trị, ngày đổi sang 'Ymd'. */
    dieuKienApi: function (dieuKien) {
        const dk = dieuKien || {};
        const json = {};
        if (dk.loaiHoSo) { json.loaiHoSo = dk.loaiHoSo; }
        if (dk.trangThai) { json.trangThai = dk.trangThai; }
        if (dk.tuNgay) { json.tuNgayQuanLy = Ext.Date.format(dk.tuNgay, 'Ymd'); }
        if (dk.denNgay) { json.denNgayQuanLy = Ext.Date.format(dk.denNgay, 'Ymd'); }
        if (String(dk.tenDoiTuong || '').trim()) { json.tenDoiTuong = String(dk.tenDoiTuong).trim(); }
        return json;
    },

    /** Bỏ danh sách đang hiển thị và params của biểu đồ đã chọn (không bắn sự kiện load). */
    lamRong: function () {
        const me = this;
        me.paramsHienTai = {};
        me.getProxy().setData([]);
        me.removeAll();
    },

    /** Đưa danh sách vào memory proxy rồi tải trang 1. */
    setDanhSach: function (list) {
        const me = this;
        me.getProxy().setData(Array.isArray(list) ? list : []);
        me.loadPage(1);
    }
});
