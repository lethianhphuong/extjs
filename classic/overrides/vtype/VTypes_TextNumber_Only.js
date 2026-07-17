
Ext.define('DEMO.override.vtype.VTypes_TextNumber_Only', {
    override: 'Ext.form.field.VTypes',

    // Thường dùng cho số hộ chiếu

    textnumber_only: function () {
        return true;
    },
    // textnumber_onlyRe: /(^\w*$)/,
    textnumber_onlyMask: /\w/
    // textnumber_onlyText: 'Chuỗi nhập vào chỉ được nhập chữ hoặc số',
});