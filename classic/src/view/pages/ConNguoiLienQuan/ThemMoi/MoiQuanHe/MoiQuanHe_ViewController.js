Ext.define('DEMO.view.pages.ConNguoiLienQuan.ThemMoi.MoiQuanHe.MoiQuanHe_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.moiquanhe',

    onFormRowResize: function (row, width) {
        const me = this;
        const screenWidth = Ext.Element.getViewportWidth();
        const mode = screenWidth <= 620 ? 'small' : screenWidth <= 1100 ? 'medium' : 'wide';
        if (row.columnMode === mode || !width || me.destroyed) { return; }
        row.columnMode = mode;
        row.items.each(function (item) {
            const span = item.formSpan || 12;
            item.columnWidth = mode === 'small' ? 1 : mode === 'medium' ? (span <= 4 ? 0.5 : 1) : span / 12;
        });
        row.updateLayout();
    },


    onSave: function () {
        const me = this, form = me.lookupReference('relationForm').getForm();
        form.getFields().each(function (field) {
            if (typeof field.getValue() === 'string') {
                field.setValue(field.getValue().trim());
            }
        });
        if (!form.isValid()) {
            return;
        }
        me.getView().fireEvent('relationsaved', me.getView(), form.getValues());
        me.getView().up('window').close();
    },

    onClose: function () {
        const me = this;
        me.getView().up('window').close();
    }
});
