
Ext.define('DEMO.override.ComboBox', {
    override: 'Ext.form.field.ComboBox',
    inputAttrTpl: [
        'spellcheck=false'
    ],
    labelSeparator: '',
    labelAlign: 'top',
    cls: 'field-csstyle',
    readOnlyCls: 'readOnlyCls',
    forceSelection: true,
    anyMatch: true,
    queryMode: 'local',
    blankText: 'Không được để trống trường này',
    listeners: {
        blur: function (obj) {
            // Hàm xử lý lỗi obj.forceSelection === true && obj.allowBlank === false, nhập freetext sau đó dùng chuột chọn thì ko update validate
            // Nếu ở view cũng có blur thì sẽ chạy blur ở view
            if (obj) {
                if (obj.forceSelection === true && obj.allowBlank === false && obj.value == null && obj.rawValue != null && obj.rawValue != '') {
                    if (!(obj.hasHadSelection)) {
                        obj.reset();
                    }
                }
            }
        }
    }
});