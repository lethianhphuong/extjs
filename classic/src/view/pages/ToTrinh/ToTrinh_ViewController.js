Ext.define('DEMO.view.pages.ToTrinh.ToTrinh_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.totrinh',

    requires: [
        'DEMO.view.pages.ToTrinh.LichSuToTrinh_ViewPopup'
    ],

    onTimKiem: function () {
        var me = this,
            vm = me.getViewModel(),
            store = vm.getStore('toTrinhStore'),
            filter = vm.get('timKiemNangCao');

        store.clearFilter(true);

        if (filter.loaiVanBan && filter.loaiVanBan !== 'all') {
            store.filter('loaiVanBan', filter.loaiVanBan);
        }
        if (filter.trangThai && filter.trangThai !== 'all') {
            store.filter('trangThaiKey', filter.trangThai);
        }
        if (filter.tuKhoa) {
            var keyword = filter.tuKhoa.toLowerCase();
            store.filterBy(function (rec) {
                return rec.get('soVanBan').toLowerCase().indexOf(keyword) > -1 ||
                       rec.get('tenVanBan').toLowerCase().indexOf(keyword) > -1;
            });
        }

        notiCommon.show({ message: 'Đã áp dụng bộ lọc.', type: 'success' });
    },

    onLamMoi: function () {
        var me = this,
            vm = me.getViewModel(),
            store = vm.getStore('toTrinhStore');

        store.clearFilter(true);
        store.load();

        vm.set('timKiemNangCao', {
            loaiVanBan: 'all',
            tuKhoa: '',
            trangThai: null,
            tuNgay: null,
            denNgay: null
        });

        notiCommon.show({ message: 'Đã làm mới dữ liệu.', type: 'info' });
    },

    onXemLichSu: function (grid, rowIndex) {
        var win = Ext.create('Ext.window.Window', {
            title: 'LỊCH SỬ XỬ LÝ',
            width: 700,
            autoHeight: true,
            maxHeight: 640,
            scrollable: 'y',
            items: [{
                xtype: 'LichSuToTrinh_ViewPopup'
            }]
        });

        win.show();
    },

    onXemChiTiet: function (grid, rowIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        notiCommon.show({ message: 'Xem chi tiết: ' + rec.get('soVanBan'), type: 'info' });
    },

    onChinhSua: function (grid, rowIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        notiCommon.show({ message: 'Chỉnh sửa: ' + rec.get('soVanBan'), type: 'info' });
    }
});
