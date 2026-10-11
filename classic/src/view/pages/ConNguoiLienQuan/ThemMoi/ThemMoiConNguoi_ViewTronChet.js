Ext.define('DEMO.view.pages.ConNguoiLienQuan.ThemMoi.ThemMoiConNguoi_ViewTronChet', {
    extend: 'Ext.container.Container',
    xtype: 'ThemMoiConNguoi_ViewTronChet',
    requires: [
        'DEMO.view.pages.ConNguoiLienQuan.ThemMoi.ThemMoiConNguoi_ViewTron',
        'DEMO.view.pages.ConNguoiLienQuan.ThemMoi.ThemMoiConNguoi_ViewChet'
    ],
    items: [
        { xtype: 'component', html: '<h3>Thông tin thống kê các trường hợp trốn, chết</h3>' },
        {
            xtype: 'checkbox',
            boxLabel: 'Đối tượng có trường hợp trốn/chết',
            bind: '{hasIncident}',
            listeners: { change: 'onIncidentChange' }
        },
        {
            xtype: 'container',
            reference: 'incidentWrap',
            hidden: true,
            disabled: true,
            items: [
                {
                    xtype: 'container',
                    cls: 'cnlq-row',
                    layout: 'column',
                    items: [
                        {
                            xtype: 'combobox',
                            name: 'dvCap1',
                            fieldLabel: 'Đơn vị',
                            allowBlank: false,
                            bind: { value: '{person.dvCap1}', store: '{dvCap1ComboStore}' },
                            editable: false,
                            valueField: 'value',
                            displayField: 'text',
                            cls: 'field-csstyle required',
                            reference: 'dvCap1',
                            listeners: { change: 'onUnitChange' },
                            columnWidth: 0.25,
                            formSpan: 3
                        },
                        {
                            xtype: 'combobox',
                            name: 'dvCap2',
                            fieldLabel: 'Chi tiết',
                            bind: { value: '{person.dvCap2}', store: '{dvCap2ComboStore}' },
                            editable: false,
                            valueField: 'value',
                            displayField: 'text',
                            reference: 'dvCap2',
                            listeners: { change: 'onUnitChildChange' },
                            hidden: true,
                            columnWidth: 0.25,
                            formSpan: 3
                        },
                        {
                            xtype: 'combobox',
                            name: 'dvCap3',
                            fieldLabel: 'Chi tiết',
                            bind: { value: '{person.dvCap3}', store: '{dvCap3ComboStore}' },
                            editable: false,
                            valueField: 'value',
                            displayField: 'text',
                            reference: 'dvCap3',
                            listeners: { change: 'onIncidentChange' },
                            hidden: true,
                            columnWidth: 0.25,
                            formSpan: 3
                        },
                        {
                            xtype: 'textfield',
                            name: 'dvKhac',
                            fieldLabel: 'Đơn vị khác, ghi cụ thể',
                            bind: { value: '{person.dvKhac}' },
                            reference: 'dvKhac',
                            listeners: { change: 'onIncidentChange' },
                            hidden: true,
                            columnWidth: 0.25,
                            formSpan: 3
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
                            name: 'tcLoai',
                            fieldLabel: 'Trường hợp',
                            allowBlank: false,
                            bind: { value: '{person.tcLoai}', store: '{tcLoaiComboStore}' },
                            editable: false,
                            valueField: 'value',
                            displayField: 'text',
                            cls: 'field-csstyle required',
                            reference: 'tcLoai',
                            listeners: { change: 'onIncidentChange' },
                            columnWidth: 0.25,
                            formSpan: 3
                        }
                    ],
                    listeners: { resize: 'onFormRowResize' }
                },
                { xtype: 'ThemMoiConNguoi_ViewTron', reference: 'tronBranch', hidden: true, disabled: true },
                { xtype: 'ThemMoiConNguoi_ViewChet', reference: 'chetBranch', hidden: true, disabled: true }
            ],
            layout: { type: 'vbox', align: 'stretch' }
        }
    ],
    layout: { type: 'vbox', align: 'stretch' }
});
