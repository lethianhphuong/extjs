
Ext.define('DEMO.override.vtype.VTypes_MaxLen', {
    override: 'Ext.form.field.VTypes',

    maxlen: function (value, field) {
        let len = 0;
        try {
            let maxLengthValue = parseInt(field.maxLength);
            len = encodeURI(value).split(/%..|./).length;

            this.maxlenText = `Không được nhập quá ${maxLengthValue} ký tự!`;
            return len <= maxLengthValue;
        }
        catch (error) {
        }
        return false;
    },
    maxlen4000Text: 'Không được nhập quá 0 ký tự!'
});