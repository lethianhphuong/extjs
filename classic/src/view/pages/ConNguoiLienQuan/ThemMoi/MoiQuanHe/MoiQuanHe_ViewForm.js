Ext.define('DEMO.view.pages.ConNguoiLienQuan.ThemMoi.MoiQuanHe.MoiQuanHe_ViewForm', {
    extend: 'Ext.form.Panel',
    xtype: 'MoiQuanHe_ViewForm',
    bodyPadding: 16,
    scrollable: true,
    cls: 'padding5',
    layout: { type: 'vbox', align: 'stretch' },
    items: [
        {
            xtype: 'container',
            cls: 'cnlq-row',
            layout: 'column',
            items: [
                {
                    xtype: 'textfield',
                    name: 'qhTen',
                    fieldLabel: 'Họ tên',
                    allowBlank: false,
                    bind: { value: '{person.qhTen}' },
                    reference: 'qhTen',
                    cls: 'field-csstyle required',
                    columnWidth: 0.5,
                    formSpan: 6
                },
                {
                    xtype: 'textfield',
                    name: 'qhNam',
                    fieldLabel: 'Năm sinh',
                    bind: { value: '{person.qhNam}' },
                    maxLength: 4,
                    enforceMaxLength: true,
                    reference: 'qhNam',
                    columnWidth: 0.5,
                    formSpan: 6
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
                    name: 'qhGt',
                    fieldLabel: 'Giới tính',
                    bind: { value: '{person.qhGt}', store: '{qhGtComboStore}' },
                    editable: false,
                    valueField: 'value',
                    displayField: 'text',
                    reference: 'qhGt',
                    columnWidth: 0.5,
                    formSpan: 6
                },
                {
                    xtype: 'textfield',
                    name: 'qhCccd',
                    fieldLabel: 'CCCD/CMT',
                    bind: { value: '{person.qhCccd}' },
                    maxLength: 12,
                    enforceMaxLength: true,
                    reference: 'qhCccd',
                    columnWidth: 0.5,
                    formSpan: 6
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
                    name: 'qhQuanHe',
                    fieldLabel: 'Quan hệ',
                    allowBlank: false,
                    bind: { value: '{person.qhQuanHe}', store: '{qhQuanHeComboStore}' },
                    editable: false,
                    valueField: 'value',
                    displayField: 'text',
                    reference: 'qhQuanHe',
                    cls: 'field-csstyle required',
                    columnWidth: 0.5,
                    formSpan: 6
                },
                {
                    xtype: 'textfield',
                    name: 'qhNoiO',
                    fieldLabel: 'Nơi ở hiện nay',
                    bind: { value: '{person.qhNoiO}' },
                    reference: 'qhNoiO',
                    columnWidth: 0.5,
                    formSpan: 6
                }
            ],
            listeners: { resize: 'onFormRowResize' }
        }
    ]
});
