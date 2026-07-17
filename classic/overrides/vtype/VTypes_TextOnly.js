
Ext.define('DEMO.override.vtype.VTypes_TextOnly', {
    override: 'Ext.form.field.VTypes',

    // Hiện chỉ cho nhập chữ cái ko dấu
    textonly: function (value) {
        return this.textonlyRe.test(value);
    },
    textonlyRe: /^[a-zA-Z]*$/,
    textonlyText: 'Thông tin nhập vào chỉ được nhập ký tự chữ (a-zA-Z)'
});