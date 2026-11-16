/* global VnMap */
Ext.define('DEMO.view.pages.BanDoTinhThanh.BanDoTinhThanh_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.BanDoTinhThanh_ViewController',

    // Vẽ bản đồ tô màu khi đã render, nạp danh sách 34 tỉnh vào lưới
    onBanDoAfterRender: function (cmp) {
        const me = this;
        const vm = me.getViewModel();

        if (!me.coThuVienBanDo()) return;

        vm.getStore('tinhThanhStore').loadData(Ext.Array.map(VnMap.PROVINCES, function (tinh) {
            return Ext.apply({}, tinh);
        }));

        me.banDo = VnMap.create(cmp.el.dom, {
            zoom: true,
            zoomOnClick: true,
            radar: { on: vm.get('hienRadar') },
            colors: VnMap.regionColors(),
            current: vm.get('mauDangChon'),
            onChange: function (id, mau, tatCa) {
                me.dongBoLuoi(tatCa);
            },
            onRadarToggle: function (bat) {
                vm.set('hienRadar', bat);
            }
        });
        me.dongBoLuoi(me.banDo.getColors());
    },

    // Chọn sẵn ô màu mặc định khi bảng màu hiển thị lần đầu
    onBangMauSanSang: function (dataview) {
        const me = this;
        const rec = dataview.getStore().findRecord('mau', me.getViewModel().get('mauDangChon'));
        if (rec) {
            dataview.getSelectionModel().select(rec, false, true);
        }
    },

    onChonMau: function (dataview, selected) {
        const me = this;
        const rec = selected && selected[0];
        if (!rec) return;
        me.datMauDangChon(rec.get('mau'));
    },

    onChonMauKhac: function (picker, color) {
        const me = this;
        me.lookupReference('dvBangMau').getSelectionModel().deselectAll(true);
        me.datMauDangChon('#' + color);
    },

    onBatTatTay: function (btn, pressed) {
        const me = this;
        if (me.banDo) {
            me.banDo.setEraser(pressed);
        }
    },

    onToTheoVung: function () {
        const me = this;
        if (!me.banDo) return;
        me.banDo.applyRegionColors();
        me.dongBoLuoi(me.banDo.getColors());
    },

    onToTatCa: function () {
        const me = this;
        if (!me.banDo) return;
        me.banDo.fillAll(me.getViewModel().get('mauDangChon'));
        me.dongBoLuoi(me.banDo.getColors());
    },

    onXoaHetMau: function () {
        const me = this;
        if (!me.banDo) return;
        me.banDo.clearAll();
        me.dongBoLuoi({});
    },

    // Tích / bỏ tích trong lưới → tô / bỏ màu trên bản đồ
    onTichChonTinh: function (column, rowIndex, checked, record) {
        const me = this;
        const tay = me.lookupReference('btnTay').pressed;
        if (!me.banDo || !record) return;
        me.banDo.setColor(record.get('id'), checked && !tay ? me.getViewModel().get('mauDangChon') : null);
        me.dongBoLuoi(me.banDo.getColors());
    },

    datMauDangChon: function (mau) {
        const me = this;
        me.getViewModel().set('mauDangChon', mau);
        me.lookupReference('btnTay').toggle(false, true);
        if (me.banDo) {
            me.banDo.setCurrent(mau);
        }
    },

    // Cập nhật màu và ô tích của lưới theo màu hiện tại trên bản đồ
    dongBoLuoi: function (tatCa) {
        const me = this;
        const store = me.getViewModel().getStore('tinhThanhStore');
        let soTinhDaTo = 0;

        store.beginUpdate();
        store.each(function (rec) {
            const mau = tatCa[rec.get('id')] || '';
            if (mau) soTinhDaTo++;
            if (rec.get('mau') !== mau) {
                rec.set({ mau: mau, daTo: !!mau }, { dirty: false });
            }
        });
        store.endUpdate();
        me.getViewModel().set('soTinhDaTo', soTinhDaTo);
    },

    coThuVienBanDo: function () {
        if (typeof VnMap === 'undefined') {
            notiCommon.show({ message: 'Chưa nạp thư viện bản đồ (lib/vnmap/VnMap.js).', type: 'error' });
            return false;
        }
        return true;
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
