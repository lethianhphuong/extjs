Ext.define('DEMO.view.pages.ConNguoiLienQuan.ThemMoi.ThemMoiConNguoi_ViewNghiepVu', {
    extend: 'Ext.container.Container',
    xtype: 'ThemMoiConNguoi_ViewNghiepVu',
    layout: 'anchor',
    defaults: { anchor: '100%' },
    items: [
        {
            xtype: 'combobox',
            name: 'maTuy',
            fieldLabel: 'Tệ nạn ma túy',
            allowBlank: false,
            bind: { value: '{person.maTuy}', store: '{maTuyComboStore}' },
            editable: false,
            valueField: 'value',
            displayField: 'text',
            cls: 'field-csstyle required',
            reference: 'maTuy'
        },
        {
            xtype: 'combobox',
            name: 'lucLuongVt',
            fieldLabel: 'Lực lượng vũ trang',
            allowBlank: false,
            bind: { value: '{person.lucLuongVt}', store: '{lucLuongVtComboStore}' },
            editable: false,
            valueField: 'value',
            displayField: 'text',
            cls: 'field-csstyle required',
            reference: 'lucLuongVt'
        },
        {
            xtype: 'combobox',
            name: 'doiTuongNv',
            fieldLabel: 'Đối tượng nghiệp vụ',
            allowBlank: false,
            bind: { value: '{person.doiTuongNv}', store: '{doiTuongNvComboStore}' },
            editable: false,
            valueField: 'value',
            displayField: 'text',
            cls: 'field-csstyle required',
            reference: 'doiTuongNv'
        },
        {
            xtype: 'textfield',
            name: 'sucKhoe',
            fieldLabel: 'Tình trạng sức khỏe',
            bind: { value: '{person.sucKhoe}' },
            reference: 'sucKhoe'
        }
    ]
});
