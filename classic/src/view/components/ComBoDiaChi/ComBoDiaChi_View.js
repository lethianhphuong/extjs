Ext.define('DEMO.view.components.ComBoDiaChi.ComBoDiaChi_View', {
    extend: 'Ext.container.Container',
    xtype: 'ComBoDiaChi',
    requires: [
        'DEMO.view.components.ComBoDiaChi.ComBoDiaChi_ViewController',
        'DEMO.view.components.ComBoDiaChi.ComBoDiaChi_ViewModel'
    ],
    controller: 'combodiachi',
    viewModel: 'combodiachi',
    layout: { type: 'vbox', align: 'stretch' },
    config: {
        addressLabel: 'Địa chỉ',
        showCopy: false,
        copyFrom: null,
        isSapNhap: false,
        tinhData: null,
        xaData: null,
        quocGiaData: null,
        diaChi: null,
        keyMaTinh: null,
        keyMaXa: null,
        quocGia: null,
        diaChiCu: null,
        keyMaTinhCu: null,
        keyMaXaCu: null,
        quocGiaCu: null
    },
    twoWayBindable: ['diaChi', 'keyMaTinh', 'keyMaXa', 'quocGia', 'diaChiCu', 'keyMaTinhCu', 'keyMaXaCu', 'quocGiaCu'],
    publishes: ['diaChi', 'keyMaTinh', 'keyMaXa', 'quocGia', 'diaChiCu', 'keyMaTinhCu', 'keyMaXaCu', 'quocGiaCu'],
    items: [
        //#region NOTE: Địa chỉ theo đơn vị hành chính sau sáp nhập
        {
            xtype: 'container',
            reference: 'sapNhapRow',
            margin: '0 0 10 0',
            layout: 'column',
            items: [
                { xtype: 'textfield', reference: 'diaChiField', fieldLabel: 'Địa chỉ', columnWidth: 0.275, formSpan: 3.3, listeners: { change: 'onDiaChiChange' } },
                { xtype: 'combobox', reference: 'xaField', fieldLabel: 'Phường/Xã', editable: false, valueField: 'maXa', displayField: 'tenXa', bind: { store: '{xaStore}' }, columnWidth: 0.23333333, formSpan: 2.8, listeners: { change: 'onXaChange' } },
                { xtype: 'combobox', reference: 'tinhField', fieldLabel: 'Tỉnh/TP', editable: false, valueField: 'maTinh', displayField: 'tenTinh', bind: { store: '{tinhStore}' }, columnWidth: 0.23333333, formSpan: 2.8, listeners: { change: 'onTinhChange' } },
                { xtype: 'combobox', reference: 'quocGiaField', fieldLabel: 'Quốc gia', editable: false, valueField: 'value', displayField: 'text', bind: { store: '{quocGiaStore}' }, columnWidth: 0.175, formSpan: 2.1, listeners: { change: 'onQuocGiaChange' } },
                { xtype: 'container', reference: 'copyCell', columnWidth: 0.08333333, formSpan: 1,
                    items: [{ xtype: 'button', iconCls: 'x-fa fa-copy', tooltip: 'Sao chép địa chỉ', handler: 'onCopyClick' }] }
            ],
            listeners: { resize: 'onRowResize' }
        },
        //#endregion
        //#region NOTE: Địa chỉ theo đơn vị hành chính trước sáp nhập
        {
            xtype: 'container',
            reference: 'truocSapNhapRow',
            margin: '0 0 10 0',
            layout: 'column',
            hidden: true,
            disabled: true,
            items: [
                { xtype: 'textfield', reference: 'diaChiCuField', fieldLabel: 'Trước đây là', columnWidth: 0.275, formSpan: 3.3, listeners: { change: 'onDiaChiCuChange' } },
                { xtype: 'combobox', reference: 'xaCuField', fieldLabel: 'Phường/Xã', editable: false, valueField: 'maXa', displayField: 'tenXa', bind: { store: '{xaCuStore}' }, columnWidth: 0.23333333, formSpan: 2.8, listeners: { change: 'onXaCuChange' } },
                { xtype: 'combobox', reference: 'tinhCuField', fieldLabel: 'Tỉnh/TP', editable: false, valueField: 'maTinh', displayField: 'tenTinh', bind: { store: '{tinhStore}' }, columnWidth: 0.23333333, formSpan: 2.8, listeners: { change: 'onTinhCuChange' } },
                { xtype: 'combobox', reference: 'quocGiaCuField', fieldLabel: 'Quốc gia', editable: false, valueField: 'value', displayField: 'text', bind: { store: '{quocGiaStore}' }, columnWidth: 0.175, formSpan: 2.1, listeners: { change: 'onQuocGiaCuChange' } },
                { xtype: 'container', reference: 'copyCuCell', columnWidth: 0.08333333, formSpan: 1,
                    items: [{ xtype: 'button', iconCls: 'x-fa fa-copy', tooltip: 'Sao chép địa chỉ', handler: 'onCopyClick' }] }
            ],
            listeners: { resize: 'onRowResize' }
        }
        //#endregion
    ],
    listeners: { afterrender: 'onReady' },
    updateAddressLabel: function () { this.syncAddressFields(); },
    updateTinhData: function () { this.syncAddressCatalogs(); },
    updateXaData: function () { this.syncAddressCatalogs(); },
    updateQuocGiaData: function () { this.syncAddressCatalogs(); },
    updateShowCopy: function () { this.syncAddressFields(); },
    updateIsSapNhap: function () { this.syncAddressFields(); },
    updateDiaChi: function () { this.syncAddressFields(); },
    updateKeyMaTinh: function () { this.syncAddressFields(); },
    updateKeyMaXa: function () { this.syncAddressFields(); },
    updateQuocGia: function () { this.syncAddressFields(); },
    updateDiaChiCu: function () { this.syncAddressFields(); },
    updateKeyMaTinhCu: function () { this.syncAddressFields(); },
    updateKeyMaXaCu: function () { this.syncAddressFields(); },
    updateQuocGiaCu: function () { this.syncAddressFields(); },
    syncAddressFields: function () {
        if (this.rendered && this.getController()) { this.getController().syncFields(); }
    },
    syncAddressCatalogs: function () {
        if (this.rendered && this.getController()) { this.getController().syncCatalogs(); }
    },
    getAddressData: function () {
        const old = !this.getIsSapNhap();
        const controller = this.getController();
        const tinh = controller.lookupReference(old ? 'tinhCuField' : 'tinhField');
        const xa = controller.lookupReference(old ? 'xaCuField' : 'xaField');
        return {
            dc: old ? this.getDiaChiCu() : this.getDiaChi(),
            maTinh: old ? this.getKeyMaTinhCu() : this.getKeyMaTinh(),
            maXa: old ? this.getKeyMaXaCu() : this.getKeyMaXa(),
            tinh: tinh.getRawValue(),
            xa: xa.getRawValue(),
            qg: old ? this.getQuocGiaCu() : this.getQuocGia()
        };
    },
    setAddressData: function (data) {
        const old = !this.getIsSapNhap();
        this[old ? 'setDiaChiCu' : 'setDiaChi'](data.dc || null);
        this[old ? 'setKeyMaTinhCu' : 'setKeyMaTinh'](data.maTinh || null);
        this[old ? 'setKeyMaXaCu' : 'setKeyMaXa'](data.maXa || null);
        this[old ? 'setQuocGiaCu' : 'setQuocGia'](data.qg || null);
    }
});
