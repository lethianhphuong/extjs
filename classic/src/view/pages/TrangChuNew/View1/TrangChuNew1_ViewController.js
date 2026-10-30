Ext.define('DEMO.view.pages.TrangChuNew.View1.TrangChuNew1_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.trangchunew1',
    requires: ['DEMO.app.NotiCommon'],

    /** Khởi tạo ngày theo mẫu bằng Date riêng cho từng instance ViewModel. */
    init: function () {
        const me = this;
        const viewModel = me.getViewModel();

        viewModel.set('timKiemNangCao.tuNgay', new Date(2026, 0, 1));
        viewModel.set('timKiemNangCao.denNgay', new Date(2026, 11, 31));
    },

    /** Kiểm tra điều kiện tìm kiếm trên dashboard dữ liệu mẫu. */
    onSearch: function () {
        const me = this;
        const form = me.lookupReference('boLoc').getForm();
        const filter = me.getViewModel().get('timKiemNangCao');

        if (!form.isValid()) {
            return;
        }
        if (filter.tuNgay && filter.denNgay && filter.tuNgay > filter.denNgay) {
            me.lookupReference('denNgay').markInvalid('Đến ngày phải bằng hoặc sau từ ngày');
            return;
        }
        notiCommon.show({
            type: 'info',
            message: 'Điều kiện tìm kiếm hợp lệ. Dashboard đang hiển thị dữ liệu minh họa, chưa kết nối API.'
        });
    },

    /** Thông báo khi chưa có màn hình chi tiết hồ sơ tương ứng. */
    onViewRecord: function (view, record, item, index, event) {
        const me = this;

        if (event.getTarget('.tcn-detail-button')) {
            me.showRecordUnavailable(record);
        }
    },

    /** Hiển thị trạng thái liên kết chi tiết chưa được cấu hình. */
    showRecordUnavailable: function (record) {
        notiCommon.show({
            type: 'info',
            message: 'Chưa có liên kết chi tiết cho hồ sơ ' + Ext.String.htmlEncode(record.get('ma')) + '.'
        });
    },

    /** Giữ nguyên biểu đồ mẫu khi chưa có dữ liệu tổng hợp theo kỳ. */
    onTrendPeriodChange: function () {
        const me = this;

        me.getViewModel().set('kyBieuDo', 'Theo tháng');
        notiCommon.show({
            type: 'info',
            message: 'Biểu đồ đang dùng dữ liệu minh họa; chưa có dữ liệu theo kỳ được chọn.'
        });
    }
});
