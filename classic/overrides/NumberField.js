
Ext.define('DEMO.override.NumberField', {
    override: 'Ext.form.field.Number',
    labelSeparator: '',
    labelAlign: 'top',
    cls: 'field-csstyle',
    readOnlyCls: 'readOnlyCls',
    blankText: 'Không được để trống trường này',
    // minLengthText: 'Bạn cần nhập tối thiểu {0} ký tự',
    // maxLengthText: 'Không được nhập quá {0} ký tự'
    minText: 'Thông tin nhập vào không nhỏ hơn giá trị cho phép ({0})',
    maxText: 'Thông tin nhập vào không lớn hơn giá trị cho phép ({0})'
});