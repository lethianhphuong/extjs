Ext.define('DEMO.view.pages.ConNguoiLienQuan.ThemMoi.ThemMoiConNguoi_ViewThongTinBoSung', {
    extend: 'Ext.container.Container',
    xtype: 'ThemMoiConNguoi_ViewThongTinBoSung',
    items: [
        {
            xtype: 'container',
            cls: 'cnlq-row',
            layout: 'column',
            items: [
                {
                    xtype: 'combobox',
                    name: 'trinhDo',
                    fieldLabel: 'Trình độ văn hóa',
                    bind: { value: '{person.trinhDo}', store: '{trinhDoComboStore}' },
                    editable: false,
                    valueField: 'value',
                    displayField: 'text',
                    reference: 'trinhDo',
                    columnWidth: 0.16666667,
                    formSpan: 2
                },
                {
                    xtype: 'combobox',
                    name: 'ngheNghiep',
                    fieldLabel: 'Nghề nghiệp',
                    allowBlank: false,
                    bind: { value: '{person.ngheNghiep}', store: '{ngheNghiepComboStore}' },
                    editable: false,
                    valueField: 'value',
                    displayField: 'text',
                    cls: 'field-csstyle required',
                    reference: 'ngheNghiep',
                    columnWidth: 0.16666667,
                    formSpan: 2
                },
                {
                    xtype: 'textfield',
                    name: 'chucVu',
                    fieldLabel: 'Chức vụ, quyền hạn',
                    bind: { value: '{person.chucVu}' },
                    reference: 'chucVu',
                    columnWidth: 0.25,
                    formSpan: 3
                },
                {
                    xtype: 'textfield',
                    name: 'noiLamViec',
                    fieldLabel: 'Nơi làm việc',
                    bind: { value: '{person.noiLamViec}' },
                    reference: 'noiLamViec',
                    columnWidth: 0.25,
                    formSpan: 3
                },
                {
                    xtype: 'textfield',
                    name: 'soDt',
                    fieldLabel: 'Số điện thoại',
                    bind: { value: '{person.soDt}' },
                    reference: 'soDt',
                    columnWidth: 0.16666667,
                    formSpan: 2
                }
            ],
            listeners: { resize: 'onFormRowResize' }
        },
        {
            xtype: 'container',
            cls: 'cnlq-row',
            layout: 'column',
            items: [
                {
                    xtype: 'combobox',
                    name: 'thanhPhanGd',
                    fieldLabel: 'Thành phần gia đình',
                    bind: { value: '{person.thanhPhanGd}', store: '{thanhPhanGdComboStore}' },
                    editable: false,
                    valueField: 'value',
                    displayField: 'text',
                    reference: 'thanhPhanGd',
                    columnWidth: 0.16666667,
                    formSpan: 2
                },
                {
                    xtype: 'combobox',
                    name: 'tonGiao',
                    fieldLabel: 'Tôn giáo',
                    bind: { value: '{person.tonGiao}', store: '{tonGiaoComboStore}' },
                    editable: false,
                    valueField: 'value',
                    displayField: 'text',
                    reference: 'tonGiao',
                    columnWidth: 0.16666667,
                    formSpan: 2
                },
                {
                    xtype: 'combobox',
                    name: 'dangVien',
                    fieldLabel: 'Là Đảng viên',
                    allowBlank: false,
                    bind: { value: '{person.dangVien}', store: '{dangVienComboStore}' },
                    editable: false,
                    valueField: 'value',
                    displayField: 'text',
                    cls: 'field-csstyle required',
                    reference: 'dangVien',
                    columnWidth: 0.16666667,
                    formSpan: 2
                }
            ],
            listeners: { resize: 'onFormRowResize' }
        },
        {
            xtype: 'container',
            cls: 'cnlq-row',
            layout: 'column',
            items: [
                {
                    xtype: 'combobox',
                    name: 'tienAn',
                    fieldLabel: 'Tiền án/Tiền sự',
                    allowBlank: false,
                    bind: { value: '{person.tienAn}', store: '{tienAnComboStore}' },
                    editable: false,
                    valueField: 'value',
                    displayField: 'text',
                    cls: 'field-csstyle required',
                    reference: 'tienAn',
                    columnWidth: 0.16666667,
                    formSpan: 2
                },
                {
                    xtype: 'textareafield',
                    name: 'ttTienAn',
                    fieldLabel: 'Thông tin tiền án, tiền sự',
                    bind: { value: '{person.ttTienAn}' },
                    height: 84,
                    reference: 'ttTienAn',
                    columnWidth: 0.83333333,
                    formSpan: 10
                }
            ],
            listeners: { resize: 'onFormRowResize' }
        }
    ],
    layout: { type: 'vbox', align: 'stretch' }
});
