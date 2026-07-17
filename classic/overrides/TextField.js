
Ext.define('DEMO.override.TextField', {
    override: 'Ext.form.field.Text',
    inputAttrTpl: [
        'spellcheck=false'
    ],
    labelSeparator: '',
    labelAlign: 'top',
    cls: 'field-csstyle',
    readOnlyCls: 'readOnlyCls',
    blankText: 'Không được để trống trường này',
    minLengthText: 'Thông tin nhập vào không ngắn hơn độ dài cho phép ({0} ký tự)',
    maxLengthText: 'Thông tin nhập vào vượt quá độ dài cho phép ({0} ký tự)',
    listeners: {
        blur: function (obj) {
            let value = obj.value;
            let isNotTrim = obj.isNotTrim;

            if (isNotTrim) { return obj.setValue(value); }

            if (typeof value === 'string') {
                obj.setValue(value.trim());
            }

        }
    }
});