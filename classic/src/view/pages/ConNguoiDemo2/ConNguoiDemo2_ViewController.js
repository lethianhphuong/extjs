Ext.define('DEMO.view.pages.ConNguoiDemo2.ConNguoiDemo2_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.connguoidemo2',

    // ================= BẬT WINDOW THÊM MỚI =================

    onOpenAddWindow: function () {
        let win = Ext.create('Ext.window.Window', {
            title: 'Thêm mới thông tin con người liên quan',
            cls: 'cnlq-editor',
            width: 1300,
            height: '100%',
            items: [{
                xtype: 'ConNguoiDemo2_ViewPopup'
            }]
        });

        win.show();
    },

    // ================= TÌM KIẾM & BỘ LỌC =================

    onSearch: function () {
        let me = this;
        let vm = me.getViewModel();
        let store = vm.getStore('conNguoiStore');
        let tuKhoa = (me.lookupReference('txtSearchTuKhoa').getValue() || '').trim().toLowerCase();
        let vaiTro = me.lookupReference('cboSearchVaiTro').getValue();
        let tienAn = me.lookupReference('cboSearchTienAn').getValue();

        store.clearFilter();
        store.filterBy(function (record) {
            let match = true;
            if (tuKhoa) {
                let hoTen = (record.get('hoTen') || '').toLowerCase();
                let cccd = (record.get('cccd') || '').toLowerCase();
                let soDt = (record.get('soDt') || '').toLowerCase();
                match = hoTen.includes(tuKhoa) || cccd.includes(tuKhoa) || soDt.includes(tuKhoa);
            }
            if (match && vaiTro && vaiTro !== 'all') {
                match = (record.get('vaiTro') === vaiTro);
            }
            if (match && tienAn && tienAn !== 'all') {
                match = (record.get('tienAn') === tienAn);
            }
            return match;
        });
    },

    onResetSearch: function () {
        let me = this;
        me.lookupReference('txtSearchTuKhoa').setValue('');
        me.lookupReference('cboSearchVaiTro').setValue('all');
        me.lookupReference('cboSearchTienAn').setValue('all');
        me.getViewModel().getStore('conNguoiStore').clearFilter();
    },

    onEditRecord: function (grid, rowIndex) {
        let rec = grid.getStore().getAt(rowIndex);
        Ext.Msg.alert('Chi tiết', 'Chức năng xem/chỉnh sửa thông tin đối tượng: <b>' + Ext.String.htmlEncode(rec.get('hoTen')) + '</b>');
    },

    onDeleteRecord: function (grid, rowIndex) {
        let rec = grid.getStore().getAt(rowIndex);
        Ext.Msg.confirm('Xác nhận xóa', 'Bạn có chắc chắn muốn xóa đối tượng <b>' + Ext.String.htmlEncode(rec.get('hoTen')) + '</b> khỏi danh sách?', function (choice) {
            if (choice === 'yes') {
                grid.getStore().remove(rec);
                notiCommon.show({ message: 'Đã xóa bản ghi thành công', type: 'success' });
            }
        });
    }
});
