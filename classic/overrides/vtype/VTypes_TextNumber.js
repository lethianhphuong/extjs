
Ext.define('DEMO.override.vtype.VTypes_TextNumber', {
    override: 'Ext.form.field.VTypes',

    // Dùng cho 1 textfield common
    textnumber: function (value) {
        if (value && value.trim().length == 0) {
            return false;
        }
        let exclude = /[`~[\]!@#$%^*{}<>]/;
        let check_exclude = exclude.test(value);
        return !(check_exclude);
    },

    kyTuDacBiet: function (value) {
        if (value && value.trim().length == 0) {
            return false;
        }
        let exclude = /[`~[\]!@#$%^*{}<>?]/;
        let check_exclude = exclude.test(value);

        console.log(check_exclude);
        return !(check_exclude);
    },


    kyTuDacBietText: 'Chuỗi nhập vào không được chứa ký tự đặc biệt',

    textnumberText: 'Chuỗi nhập vào không được chứa ký tự đặc biệt `~!@#$%^*{}<>".'
});