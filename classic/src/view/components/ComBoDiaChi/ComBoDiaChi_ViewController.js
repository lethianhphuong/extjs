Ext.define('DEMO.view.components.ComBoDiaChi.ComBoDiaChi_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.combodiachi',

    //#region NOTE: Đồng bộ config bind hai chiều với các field khai báo trong View
    onReady: function () { this.syncCatalogs(); },

    syncCatalogs: function () {
        const view = this.getView(), vm = this.getViewModel();
        if (view.getTinhData()) { vm.getStore('tinhStore').loadData(view.getTinhData()); }
        if (view.getXaData()) {
            vm.getStore('xaStore').loadData(view.getXaData());
            vm.getStore('xaCuStore').loadData(view.getXaData());
        }
        if (view.getQuocGiaData()) { vm.getStore('quocGiaStore').loadData(view.getQuocGiaData()); }
        this.syncFields();
    },

    syncFields: function () {
        const me = this, view = me.getView();
        if (!view.rendered || me.syncing) { return; }
        me.syncing = true;
        const current = me.lookupReference('sapNhapRow'), old = me.lookupReference('truocSapNhapRow');
        current.setHidden(!view.getIsSapNhap());
        current.setDisabled(!view.getIsSapNhap());
        old.setHidden(!!view.getIsSapNhap());
        old.setDisabled(!!view.getIsSapNhap());
        me.lookupReference('copyCell').setHidden(!view.getShowCopy());
        me.lookupReference('copyCuCell').setHidden(!view.getShowCopy());
        me.lookupReference('diaChiField').setFieldLabel(view.getAddressLabel());
        me.lookupReference('diaChiField').setValue(view.getDiaChi());
        me.lookupReference('tinhField').setValue(view.getKeyMaTinh());
        me.filterXa(false);
        me.lookupReference('xaField').setValue(view.getKeyMaXa());
        me.lookupReference('quocGiaField').setValue(view.getQuocGia());
        me.lookupReference('diaChiCuField').setValue(view.getDiaChiCu());
        me.lookupReference('tinhCuField').setValue(view.getKeyMaTinhCu());
        me.filterXa(true);
        me.lookupReference('xaCuField').setValue(view.getKeyMaXaCu());
        me.lookupReference('quocGiaCuField').setValue(view.getQuocGiaCu());
        me.syncing = false;
    },

    filterXa: function (old) {
        const me = this, view = me.getView();
        const store = me.getViewModel().getStore(old ? 'xaCuStore' : 'xaStore');
        const maTinh = old ? view.getKeyMaTinhCu() : view.getKeyMaTinh();
        store.clearFilter();
        store.filterBy(function (record) { return !!maTinh && record.get('maTinh') === maTinh; });
    },

    onDiaChiChange: function (field, value) { if (!this.syncing) { this.getView().setDiaChi(value); } },
    onXaChange: function (field, value) { if (!this.syncing) { this.getView().setKeyMaXa(value); } },
    onTinhChange: function (field, value) {
        if (this.syncing) { return; }
        const view = this.getView();
        view.setKeyMaTinh(value);
        if (!this.getViewModel().getStore('xaStore').findRecord('maXa', view.getKeyMaXa())) { view.setKeyMaXa(null); }
        this.syncFields();
    },
    onQuocGiaChange: function (field, value) { if (!this.syncing) { this.getView().setQuocGia(value); } },
    onDiaChiCuChange: function (field, value) { if (!this.syncing) { this.getView().setDiaChiCu(value); } },
    onXaCuChange: function (field, value) { if (!this.syncing) { this.getView().setKeyMaXaCu(value); } },
    onTinhCuChange: function (field, value) {
        if (this.syncing) { return; }
        const view = this.getView();
        view.setKeyMaTinhCu(value);
        if (!this.getViewModel().getStore('xaCuStore').findRecord('maXa', view.getKeyMaXaCu())) { view.setKeyMaXaCu(null); }
        this.syncFields();
    },
    onQuocGiaCuChange: function (field, value) { if (!this.syncing) { this.getView().setQuocGiaCu(value); } },
    //#endregion

    //#region NOTE: Copy do màn hình gọi quyết định nguồn dữ liệu
    onCopyClick: function () { this.getView().fireEvent('copyaddress', this.getView()); },

    onRowResize: function (row, width) {
        const mode = width <= 620 ? 'small' : width <= 900 ? 'medium' : 'wide';
        if (!width || row.columnMode === mode) { return; }
        row.columnMode = mode;
        row.items.each(function (item) {
            const span = item.formSpan || 12;
            item.columnWidth = mode === 'small' ? 1 : mode === 'medium' ? (span <= 4 ? 0.5 : 1) : span / 12;
        });
        row.updateLayout();
    }
    //#endregion
});
