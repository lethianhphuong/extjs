Ext.define('DEMO.view.pages.ConNguoiLienQuan.DanhSach.ConNguoiLienQuan_ViewFilter', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'ConNguoiLienQuan_ViewFilter',
    cls: 'padding5',
    layout: {
        type: 'hbox',
        align: 'bottom'
    },
    overflowHandler: 'scroller',
    items: [
        {
            xtype: 'textfield',
            fieldLabel: 'Họ tên / CCCD',
            emptyText: 'Nhập từ khóa...',
            width: 230,
            bind: '{timKiemNangCao.keyword}'
        },
        {
            xtype: 'combobox',
            name: 'filterRole',
            fieldLabel: 'Vai trò',
            allowBlank: true,
            bind: {
                value: '{timKiemNangCao.role}',
                store: '{vaiTroComboStore}'
            },
            editable: false,
            valueField: 'value',
            displayField: 'text',
            reference: 'vaiTro',
            width: 220
        },
        {
            xtype: 'combobox',
            name: 'filterGender',
            fieldLabel: 'Giới tính',
            allowBlank: true,
            bind: {
                value: '{timKiemNangCao.gender}',
                store: '{gioiTinhComboStore}'
            },
            editable: false,
            valueField: 'value',
            displayField: 'text',
            reference: 'gioiTinh',
            width: 110
        },
        {
            text: 'Tìm kiếm',
            iconCls: 'x-fa fa-search',
            handler: 'onSearch'
        },
        {
            text: 'Đặt lại',
            handler: 'onReset'
        },
        '->',
        {
            text: 'Thêm mới',
            iconCls: 'x-fa fa-plus',
            handler: 'onAdd',
            cls: 'cnlq-primary'
        }
    ]
});
