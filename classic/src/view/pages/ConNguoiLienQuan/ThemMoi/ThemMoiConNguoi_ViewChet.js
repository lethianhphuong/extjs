Ext.define('DEMO.view.pages.ConNguoiLienQuan.ThemMoi.ThemMoiConNguoi_ViewChet', {
    extend: 'Ext.container.Container',
    xtype: 'ThemMoiConNguoi_ViewChet',
    items: [
        {
            xtype: 'container',
            cls: 'cnlq-row',
            layout: 'column',
            items: [
                {
                    xtype: 'combobox',
                    name: 'nnChet',
                    fieldLabel: 'Nguyên nhân chết',
                    bind: { value: '{person.nnChet}', store: '{nnChetComboStore}' },
                    editable: false,
                    valueField: 'value',
                    displayField: 'text',
                    reference: 'nnChet',
                    listeners: { change: 'onIncidentChange' },
                    columnWidth: 0.25,
                    formSpan: 3
                },
                {
                    xtype: 'textfield',
                    name: 'nnChetKhac',
                    fieldLabel: 'Nguyên nhân khác, ghi cụ thể',
                    bind: { value: '{person.nnChetKhac}' },
                    reference: 'nnChetKhac',
                    listeners: { change: 'onIncidentChange' },
                    hidden: true,
                    disabled: true,
                    columnWidth: 0.25,
                    formSpan: 3
                },
                {
                    xtype: 'textfield',
                    name: 'xpChet',
                    fieldLabel: 'Xử lý cán bộ vi phạm (nếu có)',
                    bind: { value: '{person.xpChet}' },
                    reference: 'xpChet',
                    listeners: { change: 'onIncidentChange' },
                    hidden: true,
                    disabled: true,
                    columnWidth: 0.25,
                    formSpan: 3
                },
                {
                    xtype: 'button',
                    reference: 'addChet',
                    text: 'Thêm',
                    cls: 'cnlq-primary cnlq-add-reason',
                    incidentType: 'chet',
                    handler: 'onAddIncident',
                    hidden: true,
                    columnWidth: 0.16666667,
                    formSpan: 2
                }
            ],
            listeners: { resize: 'onFormRowResize' }
        },
        {
            xtype: 'grid',
            height: 170,
            margin: '0 0 12 0',
            bind: { store: '{deathsGridStore}' },
            columns: [
                { xtype: 'rownumberer', text: 'STT', width: 50 },
                {
                    text: 'Nguyên nhân chết',
                    dataIndex: 'ten',
                    flex: 1,
                    renderer: Ext.util.Format.htmlEncode
                },
                {
                    text: 'Xử lý cán bộ vi phạm',
                    dataIndex: 'xuLy',
                    flex: 1,
                    renderer: Ext.util.Format.htmlEncode
                },
                {
                    xtype: 'actioncolumn',
                    text: 'Thao tác',
                    width: 85,
                    items: [
                        { iconCls: 'x-fa fa-trash', tooltip: 'Xóa dòng', handler: 'onRemoveRow' }
                    ]
                }
            ]
        },
        {
            xtype: 'container',
            cls: 'cnlq-row',
            layout: 'column',
            items: [
                {
                    xtype: 'combobox',
                    name: 'ddChet',
                    fieldLabel: 'Địa điểm chết',
                    bind: { value: '{person.ddChet}', store: '{ddChetComboStore}' },
                    editable: false,
                    valueField: 'value',
                    displayField: 'text',
                    reference: 'ddChet',
                    listeners: { change: 'onIncidentChange' },
                    columnWidth: 0.25,
                    formSpan: 3
                },
                {
                    xtype: 'textfield',
                    name: 'ddChetKhac',
                    fieldLabel: 'Địa điểm khác, ghi rõ',
                    bind: { value: '{person.ddChetKhac}' },
                    reference: 'ddChetKhac',
                    listeners: { change: 'onIncidentChange' },
                    hidden: true,
                    disabled: true,
                    columnWidth: 0.25,
                    formSpan: 3
                },
                {
                    xtype: 'datefield',
                    name: 'ngayChet',
                    fieldLabel: 'Ngày chết',
                    bind: { value: '{person.ngayChet}' },
                    reference: 'ngayChet',
                    listeners: { change: 'onIncidentChange' },
                    columnWidth: 0.25,
                    formSpan: 3
                },
                {
                    xtype: 'textareafield',
                    name: 'ndChet',
                    fieldLabel: 'Nội dung',
                    bind: { value: '{person.ndChet}' },
                    height: 84,
                    reference: 'ndChet',
                    listeners: { change: 'onIncidentChange' },
                    columnWidth: 1,
                    formSpan: 12
                },
                {
                    xtype: 'textfield',
                    name: 'kqChet',
                    fieldLabel: 'Kết quả giải quyết với đối tượng',
                    bind: { value: '{person.kqChet}' },
                    reference: 'kqChet',
                    listeners: { change: 'onIncidentChange' },
                    columnWidth: 0.25,
                    formSpan: 3
                },
                {
                    xtype: 'textareafield',
                    name: 'kqCbChet',
                    fieldLabel: 'Kết quả xử lý cán bộ vi phạm',
                    bind: { value: '{person.kqCbChet}' },
                    height: 84,
                    reference: 'kqCbChet',
                    listeners: { change: 'onIncidentChange' },
                    columnWidth: 0.66666667,
                    formSpan: 8
                }
            ],
            listeners: { resize: 'onFormRowResize' },
            reference: 'chetDetails',
            hidden: true,
            disabled: true
        }
    ],
    layout: { type: 'vbox', align: 'stretch' }
});
