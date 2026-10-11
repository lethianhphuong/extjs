Ext.define('DEMO.view.pages.ConNguoiLienQuan.ThemMoi.ThemMoiConNguoi_ViewForm', {
    extend: 'Ext.container.Container',
    xtype: 'ThemMoiConNguoi_ViewForm',
    layout: { type: 'vbox', align: 'stretch' },
    items: [
        //#region NOTE: Vai trò và hướng dẫn tra cứu
        {
            cls: 'cnlq-row',
            layout: 'column',
            items: [
                {
                    xtype: 'combobox',
                    name: 'vaiTro',
                    fieldLabel: 'Vai trò người tham gia tố tụng',
                    allowBlank: false,
                    bind: { value: '{person.vaiTro}', store: '{vaiTroComboStore}' },
                    editable: false,
                    valueField: 'value',
                    displayField: 'text',
                    cls: 'field-csstyle required',
                    reference: 'vaiTro',
                    columnWidth: 1,
                    formSpan: 12
                }
            ],
            listeners: { resize: 'onFormRowResize' }
        },
        { xtype: 'component', cls: 'cnlq-section-title', html: 'Thông tin cá nhân' },
        {
            xtype: 'component',
            cls: 'cnlq-lookup-hint',
            html: 'Nhập Họ tên, Giới tính, Ngày sinh, CCCD để tra cứu dữ liệu mô phỏng.'
        },
        //#endregion
        //#region NOTE: Các khối thông tin cá nhân dùng chung ViewModel của popup
        { xtype: 'ThemMoiConNguoi_ViewDinhDanh' },
        { xtype: 'ThemMoiConNguoi_ViewThongTinBoSung' }
        //#endregion
    ],
    requires: [
        'DEMO.view.pages.ConNguoiLienQuan.ThemMoi.ThemMoiConNguoi_ViewDinhDanh',
        'DEMO.view.pages.ConNguoiLienQuan.ThemMoi.ThemMoiConNguoi_ViewThongTinBoSung'
    ]
});
