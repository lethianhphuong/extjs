/* global VnMap3D */
Ext.define('DEMO.view.pages.BanDoTinhThanh.BanDoSaBan.BanDoSaBan_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.BanDoSaBan_ViewController',

    // Các mức nghiêng xoay vòng khi bấm nút "Nghiêng"
    MUC_NGHIENG: [0.58, 0.42, 0.78],
    BUOC_XOAY: 25,

    // Dựng sa bàn khi khung đã render
    onSaBanAfterRender: function (cmp) {
        const me = this;
        const vm = me.getViewModel();

        if (typeof VnMap3D === 'undefined') {
            notiCommon.show({ message: 'Chưa nạp thư viện sa bàn (lib/vnmap/VnMap3D.js).', type: 'error' });
            return;
        }

        try {
            me.saBan = VnMap3D.create(cmp.el.dom, {
                values: vm.get('soLieu'),
                bearing: vm.get('gocXoay'),
                tilt: vm.get('doNghieng'),
                onClick: function (tinh) {
                    me.onClickTinh(tinh);
                }
            });
        } catch (e) {
            console.error('[BanDoSaBan]', e);
            notiCommon.show({ message: 'Không dựng được sa bàn: ' + e.message + '. Hãy tải lại trang (Ctrl + F5).', type: 'error' });
        }
    },

    // Click vào tỉnh: thư viện tự tô màu chọn; ở đây cập nhật thanh thông tin và ghi log
    onClickTinh: function (tinh) {
        const me = this;
        me.getViewModel().set('tinhDangChon', tinh);
        console.log('[BanDoSaBan] Tỉnh được click:', tinh);
    },

    onXoayTrai: function () {
        this.datGocNhin(this.getViewModel().get('gocXoay') - this.BUOC_XOAY, null);
    },

    onXoayPhai: function () {
        this.datGocNhin(this.getViewModel().get('gocXoay') + this.BUOC_XOAY, null);
    },

    onDoiDoNghieng: function () {
        const me = this;
        const hienTai = me.MUC_NGHIENG.indexOf(me.getViewModel().get('doNghieng'));
        me.datGocNhin(null, me.MUC_NGHIENG[(hienTai + 1) % me.MUC_NGHIENG.length]);
    },

    onGocMacDinh: function () {
        this.datGocNhin(-18, this.MUC_NGHIENG[0]);
    },

    datGocNhin: function (gocXoay, doNghieng) {
        const me = this;
        const vm = me.getViewModel();
        if (gocXoay !== null) vm.set('gocXoay', gocXoay);
        if (doNghieng !== null) vm.set('doNghieng', doNghieng);
        if (me.saBan) {
            me.saBan.setView({ bearing: vm.get('gocXoay'), tilt: vm.get('doNghieng') }, true);
        }
    },

    onBoChon: function () {
        const me = this;
        if (me.saBan) {
            me.saBan.setActive(null);
        }
        me.getViewModel().set('tinhDangChon', null);
    },

    destroy: function () {
        const me = this;
        if (me.saBan) {
            me.saBan.destroy();
            me.saBan = null;
        }
        me.callParent(arguments);
    }
});
