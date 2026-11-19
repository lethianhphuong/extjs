/**
 * Cấu hình hiển thị View7.
 * - nhomKpi: icon + tone của từng thẻ KPI theo groupCode của tongQuan (thẻ đã gộp, VD Trưởng CA xã/phường/đặc khu).
 * - chucVu: danh mục enum ChucVu (mã số = CODE của danhSachCanBo), nhom = groupCode của thẻ chứa mã đó;
 *   nhom null: chức vụ không có thẻ riêng, chỉ hiện khi chọn thẻ "Tổng số cán bộ".
 */
Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View7.TrangChuNew7_DisplayConfig', {
    singleton: true,

    /** Mã thẻ "tất cả" của tongQuan. */
    maTong: 'TONG_SO_CAN_BO',

    /** Hiển thị khi không tìm thấy nhóm. */
    hienThiMacDinh: { icon: 'user', mau: 'blue' },

    nhomKpi: {
        TONG_SO_CAN_BO: { icon: 'users', mau: 'blue', laTong: true },
        CUC_TRUONG: { icon: 'sitemap', mau: 'sky' },
        PHO_CUC_TRUONG: { icon: 'user-tie', mau: 'green' },
        GIAM_DOC: { icon: 'landmark', mau: 'cyan' },
        PHO_GIAM_DOC: { icon: 'user-tie', mau: 'lime' },
        TRUONG_PHONG: { icon: 'folder', mau: 'purple' },
        PHO_TRUONG_PHONG: { icon: 'exchange-alt', mau: 'orange' },
        DOI_TRUONG: { icon: 'user-clock', mau: 'amber' },
        PHO_DOI_TRUONG: { icon: 'user-friends', mau: 'teal' },
        TRUONG_CONG_AN_XA_PHUONG_DAC_KHU: { icon: 'shield-alt', mau: 'rose' },
        PHO_CONG_AN_XA_PHUONG_DAC_KHU: { icon: 'user-shield', mau: 'pink' },
        CAN_BO: { icon: 'id-badge', mau: 'indigo' }
    },

    chucVu: {
        '1001': { ma: 'MA_CHUCVU_BOTRUONG', ten: 'Bộ trưởng', nhom: null },
        '1002': { ma: 'MA_CHUCVU_THUTRUONG', ten: 'Thứ trưởng', nhom: null },
        '2301': { ma: 'MA_CHUCVU_CHANH_VANPHONG', ten: 'Chánh Văn phòng', nhom: null },
        '2302': { ma: 'MA_CHUCVU_PHOCHANH_VANPHONG', ten: 'Phó Chánh Văn phòng', nhom: null },
        '2101': { ma: 'CUC_TRUONG', ten: 'Cục trưởng', nhom: 'CUC_TRUONG' },
        '2102': { ma: 'CUC_PHO', ten: 'Phó Cục trưởng', nhom: 'PHO_CUC_TRUONG' },
        '3001': { ma: 'GIAM_DOC', ten: 'Giám đốc', nhom: 'GIAM_DOC' },
        '3002': { ma: 'PHO_GIAM_DOC', ten: 'Phó Giám đốc', nhom: 'PHO_GIAM_DOC' },
        '4001': { ma: 'TRUONG_PHONG', ten: 'Trưởng phòng', nhom: 'TRUONG_PHONG' },
        '4002': { ma: 'PHO_TRUONG_PHONG', ten: 'Phó Trưởng phòng', nhom: 'PHO_TRUONG_PHONG' },
        '5001': { ma: 'TRUONG_CONG_AN_HUYEN', ten: 'Trưởng Công an huyện', nhom: null },
        '5002': { ma: 'PHO_TRUONG_CONG_AN_HUYEN', ten: 'Phó Trưởng Công an huyện', nhom: null },
        '5101': { ma: 'TRUONG_CONG_AN_THANHPHO', ten: 'Trưởng Công an thành phố', nhom: null },
        '5102': { ma: 'PHO_TRUONG_CONG_AN_THANHPHO', ten: 'Phó Trưởng Công an thành phố', nhom: null },
        '5201': { ma: 'TRUONG_CONG_AN_QUAN', ten: 'Trưởng Công an quận', nhom: null },
        '5202': { ma: 'PHO_TRUONG_CONG_AN_QUAN', ten: 'Phó Trưởng Công an quận', nhom: null },
        '5301': { ma: 'TRUONG_CONG_AN_THIXA', ten: 'Trưởng Công an thị xã', nhom: null },
        '5302': { ma: 'PHO_TRUONG_CONG_AN_THIXA', ten: 'Phó Trưởng Công an thị xã', nhom: null },
        '5401': { ma: 'GIAM_THI', ten: 'Giám thị', nhom: null },
        '5402': { ma: 'PHO_GIAM_THI', ten: 'Phó Giám thị', nhom: null },
        '6001': { ma: 'DOI_TRUONG', ten: 'Đội trưởng', nhom: 'DOI_TRUONG' },
        '6002': { ma: 'PHO_DOI_TRUONG', ten: 'Phó Đội trưởng', nhom: 'PHO_DOI_TRUONG' },
        '6101': { ma: 'TRUONG_CONG_AN_XA', ten: 'Trưởng Công an xã', nhom: 'TRUONG_CONG_AN_XA_PHUONG_DAC_KHU' },
        '6102': { ma: 'PHO_TRUONG_CONG_AN_XA', ten: 'Phó Trưởng Công an xã', nhom: 'PHO_CONG_AN_XA_PHUONG_DAC_KHU' },
        '6201': { ma: 'TRUONG_CONG_AN_PHUONG', ten: 'Trưởng Công an phường', nhom: 'TRUONG_CONG_AN_XA_PHUONG_DAC_KHU' },
        '6202': { ma: 'PHO_TRUONG_CONG_AN_PHUONG', ten: 'Phó Trưởng Công an phường', nhom: 'PHO_CONG_AN_XA_PHUONG_DAC_KHU' },
        '6301': { ma: 'TRUONG_CONG_AN_THI_TRAN', ten: 'Trưởng Công an thị trấn', nhom: null },
        '6302': { ma: 'PHO_TRUONG_CONG_AN_THI_TRAN', ten: 'Phó Trưởng Công an thị trấn', nhom: null },
        '6501': { ma: 'DON_TRUONG', ten: 'Đồn trưởng', nhom: null },
        '6502': { ma: 'PHO_DON_TRUONG', ten: 'Phó Đồn trưởng', nhom: null },
        '6701': { ma: 'TRUONG_CONG_AN_DAC_KHU', ten: 'Trưởng Công an đặc khu', nhom: 'TRUONG_CONG_AN_XA_PHUONG_DAC_KHU' },
        '6702': { ma: 'PHO_TRUONG_CONG_AN_DAC_KHU', ten: 'Phó Trưởng Công an đặc khu', nhom: 'PHO_CONG_AN_XA_PHUONG_DAC_KHU' },
        '6801': { ma: 'TRAM_TRUONG', ten: 'Trạm trưởng', nhom: null },
        '6802': { ma: 'PHO_TRAM_TRUONG', ten: 'Phó Trạm trưởng', nhom: null },
        '0003': { ma: 'VAN_THU', ten: 'Văn thư', nhom: null },
        '1003': { ma: 'VAN_THU_BO', ten: 'Văn thư Bộ', nhom: null },
        '2003': { ma: 'VAN_THU_CUC', ten: 'Văn thư Cục', nhom: null },
        '3003': { ma: 'VAN_THU_PHONG', ten: 'Văn thư Phòng', nhom: null },
        '4003': { ma: 'VAN_THU_DOI', ten: 'Văn thư Đội', nhom: null },
        '0000': { ma: 'CAN_BO', ten: 'Cán bộ', nhom: 'CAN_BO' }
    },

    /**
     * groupCode thẻ KPI của một mã chức vụ (CODE cán bộ, VD '6201' → TRUONG_CONG_AN_XA_PHUONG_DAC_KHU).
     * Chấp nhận cả dữ liệu cũ có CODE chính là groupCode (VD 'CAN_BO').
     * @param {String} code
     * @return {String|null}
     */
    getNhom: function (code) {
        const def = this.chucVu[code];
        if (def) {
            return def.nhom;
        }
        return this.nhomKpi[code] ? code : null;
    },

    /** Icon + tone của thẻ KPI theo groupCode. */
    getHienThiNhom: function (groupCode) {
        return this.nhomKpi[groupCode] || this.hienThiMacDinh;
    },

    /** Icon + tone của cán bộ theo nhóm của mã chức vụ (chức vụ không có thẻ riêng: mặc định). */
    getHienThiCanBo: function (code) {
        return this.getHienThiNhom(this.getNhom(code));
    },

    /** Tên chức vụ theo mã; không có trong danh mục thì dùng tên API trả về (TEN_CHUC_VU). */
    getTenChucVu: function (code, tenApi) {
        const def = this.chucVu[code];
        return def ? def.ten : (tenApi || code || '');
    }
});
