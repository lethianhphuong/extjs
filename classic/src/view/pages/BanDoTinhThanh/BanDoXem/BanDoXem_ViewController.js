/* global VnMap */
Ext.define('DEMO.view.pages.BanDoTinhThanh.BanDoXem.BanDoXem_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.BanDoXem_ViewController',

    // Vẽ bản đồ chỉ xem với màu và trạng thái radar lấy từ ViewModel
    onBanDoAfterRender: function (cmp) {
        const me = this;
        const vm = me.getViewModel();

        if (typeof VnMap === 'undefined') {
            notiCommon.show({ message: 'Chưa nạp thư viện bản đồ (lib/vnmap/VnMap.js).', type: 'error' });
            return;
        }

        me.banDo = VnMap.create(cmp.el.dom, {
            readOnly: true,
            zoom: true,
            zoomOnClick: true,
            activeOnClick: true,
            radar: { on: vm.get('hienRadar') },
            colors: vm.get('mauTinh'),
            onClick: function (tinh) {
                me.onClickTinh(tinh);
            },
            onRadarToggle: function (bat) {
                vm.set('hienRadar', bat);
            }
        });
    },

    // Click vào tỉnh: thư viện tự tô active và phóng tới tỉnh; ở đây cập nhật thanh thông tin và ghi log
    onClickTinh: function (tinh) {
        const me = this;
        console.log('[BanDoXem] Tỉnh được click:', tinh);
        me.getViewModel().set('tinhDangChon', tinh);
    },

    // Bỏ chọn: xóa trạng thái active và thu bản đồ về toàn cảnh
    onBoChon: function () {
        const me = this;
        if (me.banDo) {
            me.banDo.setActive(null);
            me.banDo.resetZoom();
        }
        me.getViewModel().set('tinhDangChon', null);
    },

    destroy: function () {
        const me = this;
        if (me.banDo) {
            me.banDo.destroy();
            me.banDo = null;
        }
        me.callParent(arguments);
    }
});
