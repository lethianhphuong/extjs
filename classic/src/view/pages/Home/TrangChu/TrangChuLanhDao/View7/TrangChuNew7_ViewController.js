Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View7.TrangChuNew7_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TrangChuNew7_ViewController',
    requires: ['DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View7.TrangChuNew7_MockData'],

    init: function () {
        this.loadData();
    },

    //#region NOTE: Nạp dữ liệu
    /** Sự kiện 'timkiem' từ TT_TimKiem_View; hiện vẫn dùng dữ liệu mẫu. */
    onSearch: function () {
        this.loadData();
    },

    /** Nguồn dữ liệu: mock (chưa kết nối API). Giữ chức vụ đang lọc sau khi tải lại. */
    loadData: function () {
        const me = this;
        const vm = me.getViewModel();
        const data = DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View7.TrangChuNew7_MockData.getData();
        me.dsCanBo = Array.isArray(data.danhSachCanBo) ? data.danhSachCanBo : [];
        vm.set('kpiRaw', data.tongQuan || []);
        me.locTheoChucVu(vm.get('chucVuChon'));
    },

    /**
     * Lọc danh sách theo mã chức vụ (TONG = tất cả), nạp vào store rồi về trang 1.
     * @param {String} code mã chức vụ của thẻ KPI
     */
    locTheoChucVu: function (code) {
        const me = this;
        const vm = me.getViewModel();
        const list = code === 'TONG' ? me.dsCanBo : me.dsCanBo.filter(row => row.chucVuCode === code);
        const kpi = (vm.get('kpiRaw') || []).find(row => row.code === code);
        const store = vm.getStore('dsCanBoStore');
        store.getProxy().setData(list);
        store.loadPage(1);
        vm.set({
            chucVuChon: code,
            tenChucVuChon: kpi ? kpi.name : '',
            soCanBo: list.length
        });
    },
    //#endregion

    //#region NOTE: Thẻ KPI
    /** Click thẻ KPI (theo data-code) để lọc danh sách theo chức vụ. */
    onKpiReady: function (component) {
        const me = this;
        component.getEl().on('click', function (event, target) {
            const code = target.getAttribute('data-code');
            if (code) {
                me.locTheoChucVu(code);
            }
        }, me, { delegate: '.tcn7-kpi' });
    },
    //#endregion

    //#region NOTE: Grid
    /** Họ tên: avatar chữ cái đầu (màu theo chức vụ) + tên dạng link. */
    renderHoTen: function (val, meta, record) {
        const words = String(val || '').trim().split(/\s+/).filter(Boolean);
        const chuCai = words.length ? (words[0].charAt(0) + (words.length > 1 ? words[words.length - 1].charAt(0) : '')).toUpperCase() : '';
        return '<span class="tcn7-person tcn7-tone-' + this.getTone(record) + '">' +
            '<span class="tcn7-avatar">' + Ext.String.htmlEncode(chuCai) + '</span>' +
            '<a href="javascript:void(0)" class="tcn7-link">' + Ext.String.htmlEncode(val || '') + '</a></span>';
    },

    /** Chức vụ: badge màu theo tone của thẻ KPI tương ứng. */
    renderChucVu: function (val, meta, record) {
        return '<span class="tcn7-badge tcn7-tone-' + this.getTone(record) + '">' + Ext.String.htmlEncode(val || '') + '</span>';
    },

    renderTongHoSo: function (val) {
        return '<strong class="tcn7-num">' + Number(val || 0).toLocaleString('vi-VN') + '</strong>';
    },

    renderDangThucHien: function (val) {
        return '<span class="tcn7-num-active">' + Number(val || 0).toLocaleString('vi-VN') + '</span>';
    },

    /** Tone màu theo mã chức vụ của bản ghi (ViewModel.kpiDisplay). */
    getTone: function (record) {
        const def = this.getViewModel().kpiDisplay[record.get('chucVuCode')];
        return def ? def.mau : 'blue';
    },

    renderDonVi: function (val, meta) {
        const text = Ext.String.htmlEncode(val || '');
        meta.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(text) + '"';
        return text;
    },

    /** Click tên cán bộ (link) → xem chi tiết. */
    onGridCellClick: function (view, td, cellIndex, record, tr, rowIndex, event) {
        if (event.getTarget('.tcn7-link')) {
            this.xemChiTiet(record);
        }
    },

    /** Xem chi tiết cán bộ; hiện chỉ log bản ghi (chưa có màn hình đích). */
    xemChiTiet: function (record) {
        window.console.log('[TrangChuNew7_View] Xem chi tiết cán bộ', record.getData());
    },

    /** Đổi số dòng/trang: cập nhật pageSize và quay về trang 1. */
    onPageSizeChange: function (combo) {
        const store = this.getViewModel().getStore('dsCanBoStore');
        store.setPageSize(combo.getValue());
        store.loadPage(1);
    }
    //#endregion
});
