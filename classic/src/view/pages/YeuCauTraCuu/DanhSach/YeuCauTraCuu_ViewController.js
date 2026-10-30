Ext.define('DEMO.view.pages.YeuCauTraCuu.DanhSach.YeuCauTraCuu_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.yeucautracuu',

    requires: [
        'DEMO.view.pages.YeuCauTraCuu.TaoYeuCau.TaoYeuCau_View'
    ],

    init: function () {
        var me = this;
        var store = me.getViewModel().getStore('ticketGridStore');
        if (store) {
            // Lưu dữ liệu ban đầu để lọc bộ nhớ
            me.rawRecords = store.getData().getRange().map(function (rec) {
                return Ext.apply({}, rec.getData());
            });
            store.loadPage(1);
        }
    },

    onSearch: function () {
        var me = this;
        var vm = me.getViewModel();
        var store = vm.getStore('ticketGridStore');
        var keyword = (vm.get('filters.keyword') || '').trim().toLowerCase();
        var loaiTraCuu = vm.get('filters.loaiTraCuu');
        var mucDoUuTien = vm.get('filters.mucDoUuTien');
        var trangThai = vm.get('filters.trangThai');

        if (!me.rawRecords) return;

        var filtered = me.rawRecords.filter(function (row) {
            var matchKw = !keyword ||
                (row.maPhieu && row.maPhieu.toLowerCase().includes(keyword)) ||
                (row.hoTen && row.hoTen.toLowerCase().includes(keyword)) ||
                (row.cccd && row.cccd.toLowerCase().includes(keyword));

            var matchLoai = !loaiTraCuu || row.loaiTraCuu === loaiTraCuu;
            var matchPrio = !mucDoUuTien || row.mucDoUuTien === mucDoUuTien;
            var matchStatus = !trangThai || row.trangThai === trangThai;

            return matchKw && matchLoai && matchPrio && matchStatus;
        });

        store.getProxy().setData(filtered);
        store.loadPage(1);
    },

    onReset: function () {
        var me = this;
        var vm = me.getViewModel();
        vm.set('filters', {
            keyword: '',
            loaiTraCuu: '',
            mucDoUuTien: '',
            trangThai: ''
        });
        me.onSearch();
    },

    onAddNewTicket: function () {
        var me = this;
        var win = Ext.create('DEMO.view.pages.YeuCauTraCuu.TaoYeuCau.TaoYeuCau_View', {
            listeners: {
                ticketcreated: function (newRecord) {
                    me.onTicketCreated(newRecord);
                }
            }
        });
        win.show();
    },

    onTicketCreated: function (newRecord) {
        var me = this;
        var store = me.getViewModel().getStore('ticketGridStore');
        if (!me.rawRecords) me.rawRecords = [];

        newRecord.id = Ext.id();
        me.rawRecords.unshift(newRecord);

        store.getProxy().setData(me.rawRecords);
        store.loadPage(1);
    },

    onViewDetail: function (grid, rowIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        if (!rec) return;

        var d = rec.getData();
        var win = Ext.create('DEMO.view.pages.YeuCauTraCuu.TaoYeuCau.TaoYeuCau_View');
        var vm = win.getViewModel();
        var ctrl = win.getController();

        var parts = (d.hoTen || '').trim().split(/\s+/),
            initials = parts.length >= 2 ? (parts[parts.length - 2][0] + parts[parts.length - 1][0]).toUpperCase() : 'ND';

        vm.set('selectedPerson', {
            code: d.maNguoi || 'ND-000131',
            name: d.hoTen || '',
            cccd: d.cccd || '—',
            dob: '—',
            gender: 'Nam',
            phone: '—',
            initials: initials
        });

        vm.set('ticket', {
            code: d.maPhieu,
            date: d.ngayYeuCau || '24/10/2026',
            type: d.loaiTraCuu || 'Tra cứu nhân thân',
            priority: d.mucDoUuTien || 'Thường',
            unit: d.donViYeuCau || '',
            purpose: d.noiDung || ''
        });

        vm.set('currentStep', 2);
        win.show();
        ctrl.renderStep3Preview();
    },

    onDeleteTicket: function (grid, rowIndex) {
        var me = this;
        var rec = grid.getStore().getAt(rowIndex);
        if (!rec) return;

        Ext.Msg.confirm('Xác nhận', 'Bạn có chắc chắn muốn xoá yêu cầu tra cứu <strong>' + rec.get('maPhieu') + '</strong> không?', function (btn) {
            if (btn === 'yes') {
                var id = rec.get('id');
                me.rawRecords = me.rawRecords.filter(function (r) {
                    return r.id !== id;
                });
                me.onSearch();

                if (typeof notiCommon !== 'undefined') {
                    notiCommon.showSuccess('Đã xoá yêu cầu tra cứu thành công!');
                }
            }
        });
    }
});
