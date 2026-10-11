Ext.define('DEMO.view.pages.ConNguoiDemo2.ConNguoiDemo2_ViewQhPopup', {
    extend: 'Ext.form.Panel',
    xtype: 'ConNguoiDemo2_ViewQhPopup',

    controller: 'ConNguoiDemo2_ViewPopup_ViewController',

    cls: 'padding5',
    bodyPadding: '16 18 10 18',
    layout: 'column',
    style: 'background:var(--theme-bg-card, #fff);',

    fieldDefaults: {
        labelAlign: 'top',
        labelSeparator: ''
    },

    defaults: {
        columnWidth: 0.5
    },

    items: [
        {
            xtype: 'textfield',
            reference: 'txtQhTen',
            fieldLabel: 'Họ tên *',
            allowBlank: false,
            emptyText: 'Nhập họ và tên...'
        },
        {
            xtype: 'textfield',
            reference: 'txtQhNam',
            fieldLabel: 'Năm sinh',
            maxLength: 4,
            maskRe: /[0-9]/,
            emptyText: 'Ví dụ: 1990'
        },
        {
            xtype: 'combobox',
            reference: 'cboQhGt',
            fieldLabel: 'Giới tính',
            editable: false,
            value: 'Nam',
            store: ['Nam', 'Nữ', 'Khác']
        },
        {
            xtype: 'textfield',
            reference: 'txtQhCccd',
            fieldLabel: 'CCCD/CMT',
            maxLength: 12,
            maskRe: /[0-9]/,
            emptyText: '12 chữ số...'
        },
        {
            xtype: 'combobox',
            reference: 'cboQhQuanHe',
            fieldLabel: 'Quan hệ *',
            allowBlank: false,
            editable: false,
            emptyText: '-- Chọn quan hệ --',
            store: ['Bố', 'Mẹ', 'Vợ', 'Chồng', 'Con', 'Anh', 'Chị', 'Em', 'Ông', 'Bà', 'Khác']
        },
        {
            xtype: 'textfield',
            reference: 'txtQhNoiO',
            fieldLabel: 'Nơi ở hiện nay',
            emptyText: 'Địa chỉ nơi ở...'
        }
    ],

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            cls: 'modal-foot-toolbar',
            layout: {
                type: 'hbox',
                pack: 'center'
            },
            items: [
                {
                    text: 'Lưu',
                    cls: 'btn-green-flat',
                    width: 76,
                    height: 32,
                    handler: 'onSaveQh'
                },
                {
                    text: 'Đóng',
                    cls: 'btn-red-flat',
                    width: 76,
                    height: 32,
                    margin: '0 0 0 12',
                    handler: 'onClosePopup'
                }
            ]
        }
    ]
});
