Ext.define('DEMO.view.pages.DeXuatCTVBM.DeXuatCTVBM_ViewPopupB5', {
    extend: 'Ext.window.Window',
    xtype: 'DeXuatCTVBM_ViewPopupB5',

    title: 'Yêu cầu tra cứu B5',
    width: 740,
    cls: 'dexuat-modal',
    bodyStyle: 'background-color: #fafbfa;',

    header: {
        style: 'background-color: #104e38; color: #ffffff;',
        title: {
            text: 'Yêu cầu tra cứu B5',
            style: 'color: #ffffff; font-weight: 700; font-size: 12px;'
        }
    },

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    bodyPadding: 14,

    requires: [
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'Ext.form.field.TextArea',
        'Ext.form.field.ComboBox',
        'Ext.button.Button'
    ],

    items: [
        {
            xtype: 'form',
            reference: 'formYCTC_B5',
            bodyStyle: 'background: transparent;',
            defaults: {
                labelAlign: 'top',
                labelSeparator: '',
                margin: '0 0 10 0',
                width: '100%'
            },
            items: [
                // Trường 1: Mục đích tra cứu B5
                {
                    xtype: 'combobox',
                    reference: 'cbbMucDichB5',
                    name: 'mucDich',
                    fieldLabel: 'Mục đích tra cứu',
                    cls: 'field-csstyle required',
                    allowBlank: false,
                    editable: false,
                    emptyText: '-- Chọn mục đích tra cứu --',
                    displayField: 'text',
                    valueField: 'value',
                    bind: {
                        store: '{mucDichTraCuuB5Store}',
                        value: '{b5Data.mucDichTraCuu}'
                    }
                },

                // Trường 2: Chọn đơn vị hồ sơ (Multi-select V06 và PV06)
                {
                    xtype: 'combobox',
                    reference: 'cbbDonViHoSoB5',
                    name: 'donViHoSo',
                    fieldLabel: 'Chọn đơn vị hồ sơ * (Cho phép chọn cả 2 giá trị)',
                    cls: 'field-csstyle required',
                    allowBlank: false,
                    multiSelect: true,
                    delimiter: '; ',
                    editable: false,
                    emptyText: '-- Chọn đơn vị hồ sơ --',
                    displayField: 'text',
                    valueField: 'text',
                    store: {
                        fields: ['value', 'text'],
                        data: [
                            { value: 'V06', text: 'Cục hồ sơ nghiệp vụ V06' },
                            { value: 'PV06', text: 'Phòng hồ sơ nghiệp vụ PV06' }
                        ]
                    },
                    listeners: {
                        change: 'onChangeDonViHoSoB5'
                    }
                },

                // Hàng 3: Lãnh đạo đơn vị | Cấp bậc | Chức vụ
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 10 0',
                    defaults: {
                        labelAlign: 'top',
                        labelSeparator: ''
                    },
                    items: [
                        {
                            xtype: 'combobox',
                            reference: 'cbbLanhDaoB5',
                            name: 'lanhDao',
                            fieldLabel: 'Lãnh đạo đơn vị',
                            cls: 'field-csstyle required',
                            allowBlank: false,
                            editable: false,
                            emptyText: '-- Chọn lãnh đạo đơn vị --',
                            flex: 5,
                            margin: '0 8 0 0',
                            displayField: 'text',
                            valueField: 'value',
                            bind: {
                                store: '{lanhDaoDonViB5Store}',
                                value: '{b5Data.lanhDaoDonVi}'
                            },
                            listeners: {
                                change: 'onSelectLeaderB5'
                            }
                        },
                        {
                            xtype: 'textfield',
                            reference: 'txtCapBacB5',
                            name: 'capBac',
                            fieldLabel: 'Cấp bậc',
                            readOnly: true,
                            fieldStyle: 'background-color: #e9ecef; font-weight: 600; color: #495057;',
                            flex: 4,
                            margin: '0 8 0 0',
                            bind: '{b5Data.capBac}'
                        },
                        {
                            xtype: 'textfield',
                            reference: 'txtChucVuB5',
                            name: 'chucVu',
                            fieldLabel: 'Chức vụ',
                            readOnly: true,
                            fieldStyle: 'background-color: #e9ecef; font-weight: 600; color: #495057;',
                            flex: 3,
                            bind: '{b5Data.chucVu}'
                        }
                    ]
                },

                // Trường 4: Nội dung tra cứu
                {
                    xtype: 'textareafield',
                    reference: 'txtNoiDungB5',
                    name: 'noiDung',
                    fieldLabel: 'Nội dung tra cứu',
                    rows: 3,
                    emptyText: 'Nhập nội dung yêu cầu tra cứu...',
                    bind: '{b5Data.noiDungTraCuu}'
                }
            ]
        },

        // Cụm nút tác vụ đáy
        {
            xtype: 'container',
            margin: '8 0 4 0',
            layout: {
                type: 'hbox',
                pack: 'center'
            },
            defaults: {
                margin: '0 6'
            },
            items: [
                {
                    xtype: 'button',
                    reference: 'btnSaveB5',
                    text: 'Lưu',
                    style: {
                        backgroundColor: '#104e38',
                        borderColor: '#104e38',
                        color: '#ffffff',
                        borderRadius: '4px',
                        padding: '6px 32px',
                        fontWeight: '600'
                    },
                    handler: 'onSaveB5'
                },
                {
                    xtype: 'button',
                    reference: 'btnGenerateYCTC',
                    text: 'Tạo mã YCTC',
                    hidden: true,
                    style: {
                        backgroundColor: '#0b7f8c',
                        borderColor: '#0b7f8c',
                        color: '#ffffff',
                        borderRadius: '4px',
                        padding: '6px 24px',
                        fontWeight: '600'
                    },
                    handler: 'onGenerateYctcB5'
                }
            ]
        }
    ]
});
