Ext.define('DEMO.override.DateField', {
    override: 'Ext.form.field.Date',
    labelSeparator: '',
    labelAlign: 'top',
    cls: 'field-csstyle',
    invalidText: 'Nhập sai định dạng. Định dạng đúng ngày/tháng/năm (dd/mm/yyyy)',
    formatText: 'Định dạng {0}',
    readOnlyCls: 'readOnlyCls',
    blankText: 'Không được để trống trường này',
    minText: 'Thông tin ngày nhập không trước ngày {0}',
    maxText: 'Thông tin ngày nhập không sau ngày {0}',
    format: 'd/m/Y',
    altFormats: 'd/m/Y|dmY|d-m-Y|d.m.Y|d/m/Y H:i:s',

    listeners: {
        change: function (obj) {
            if (obj) {
                // FIX LỖI KHI GET DETAIL KHI VỪA VÀO SET MIN DATE LÀ NGÀY HIÊN TẠI
                if (obj.lastValue && !obj.validate()) { // allowBlank == false
                    setTimeout(() => obj.validate(), 0);
                }
            }
        }
    }

});                                                