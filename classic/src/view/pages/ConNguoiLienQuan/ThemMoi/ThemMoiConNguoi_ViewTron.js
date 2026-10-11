Ext.define('DEMO.view.pages.ConNguoiLienQuan.ThemMoi.ThemMoiConNguoi_ViewTron', {
    extend: 'Ext.container.Container',
    xtype: 'ThemMoiConNguoi_ViewTron',
    items: [
        {
            xtype: 'container',
            cls: 'cnlq-row',
            layout: 'column',
            items: [
                {
                    xtype: 'combobox',
                    name: 'htTron',
                    fieldLabel: 'Hình thức trốn',
                    bind: { value: '{person.htTron}', store: '{htTronComboStore}' },
                    editable: false,
                    valueField: 'value',
                    displayField: 'text',
                    reference: 'htTron',
                    listeners: { change: 'onIncidentChange' },
                    columnWidth: 0.25,
                    formSpan: 3
                },
                {
                    xtype: 'textfield',
                    name: 'htTronKhac',
                    fieldLabel: 'Hình thức trốn khác, ghi cụ thể',
                    bind: { value: '{person.htTronKhac}' },
                    reference: 'htTronKhac',
                    listeners: { change: 'onIncidentChange' },
                    hidden: true,
                    disabled: true,
                    columnWidth: 0.25,
                    formSpan: 3
                },
                {
                    xtype: 'textfield',
                    name: 'xpTron',
                    fieldLabel: 'Xử lý cán bộ vi phạm (nếu có)',
                    bind: { value: '{person.xpTron}' },
                    reference: 'xpTron',
                    listeners: { change: 'onIncidentChange' },
                    hidden: true,
                    disabled: true,
                    columnWidth: 0.25,
                    formSpan: 3
                },
                {
                    xtype: 'button',
                    reference: 'addTron',
                    text: 'Thêm',
                    cls: 'cnlq-primary cnlq-add-reason',
                    incidentType: 'tron',
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
            bind: { store: '{escapesGridStore}' },
            columns: [
                { xtype: 'rownumberer', text: 'STT', width: 50 },
                {
                    text: 'Hình thức trốn',
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
                    name: 'ddTron',
                    fieldLabel: 'Địa điểm trốn',
                    bind: { value: '{person.ddTron}', store: '{ddTronComboStore}' },
                    editable: false,
                    valueField: 'value',
                    displayField: 'text',
                    reference: 'ddTron',
                    listeners: { change: 'onIncidentChange' },
                    columnWidth: 0.25,
                    formSpan: 3
                },
                {
                    xtype: 'textfield',
                    name: 'ddTronKhac',
                    fieldLabel: 'Địa điểm khác, ghi rõ',
                    bind: { value: '{person.ddTronKhac}' },
                    reference: 'ddTronKhac',
                    listeners: { change: 'onIncidentChange' },
                    hidden: true,
                    disabled: true,
                    columnWidth: 0.25,
                    formSpan: 3
                },
                {
                    xtype: 'datefield',
                    name: 'ngayTron',
                    fieldLabel: 'Ngày trốn',
                    bind: { value: '{person.ngayTron}' },
                    reference: 'ngayTron',
                    listeners: { change: 'onIncidentChange' },
                    columnWidth: 0.25,
                    formSpan: 3
                },
                {
                    xtype: 'datefield',
                    name: 'ngayBatLai',
                    fieldLabel: 'Ngày bắt lại',
                    bind: { value: '{person.ngayBatLai}' },
                    reference: 'ngayBatLai',
                    listeners: { change: 'onIncidentChange' },
                    columnWidth: 0.25,
                    formSpan: 3
                },
                {
                    xtype: 'textareafield',
                    name: 'ndTron',
                    fieldLabel: 'Nội dung',
                    bind: { value: '{person.ndTron}' },
                    height: 84,
                    reference: 'ndTron',
                    listeners: { change: 'onIncidentChange' },
                    columnWidth: 1,
                    formSpan: 12
                },
                {
                    xtype: 'combobox',
                    name: 'kqTron',
                    fieldLabel: 'Kết quả giải quyết với đối tượng',
                    bind: { value: '{person.kqTron}', store: '{kqTronComboStore}' },
                    editable: false,
                    valueField: 'value',
                    displayField: 'text',
                    reference: 'kqTron',
                    listeners: { change: 'onIncidentChange' },
                    columnWidth: 0.25,
                    formSpan: 3
                },
                {
                    xtype: 'textareafield',
                    name: 'kqCbTron',
                    fieldLabel: 'Kết quả xử lý cán bộ vi phạm',
                    bind: { value: '{person.kqCbTron}' },
                    height: 84,
                    reference: 'kqCbTron',
                    listeners: { change: 'onIncidentChange' },
                    columnWidth: 0.66666667,
                    formSpan: 8
                }
            ],
            listeners: { resize: 'onFormRowResize' },
            reference: 'tronDetails',
            hidden: true,
            disabled: true
        }
    ],
    layout: { type: 'vbox', align: 'stretch' }
});
