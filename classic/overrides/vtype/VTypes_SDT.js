
Ext.define('DEMO.override.vtype.VTypes_SDT', {
    override: 'Ext.form.field.VTypes',

    sdt: function (value) {
        return this.sdtRe.test(value);
    },

    sdtRe: /^0\d{9}\d?$/,
    sdtText: 'Chuỗi nhập vào chỉ được nhập số và bắt đầu bằng 0',
    sdtMask: /\d/
});