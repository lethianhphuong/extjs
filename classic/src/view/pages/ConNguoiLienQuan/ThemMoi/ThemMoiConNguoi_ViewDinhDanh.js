Ext.define('DEMO.view.pages.ConNguoiLienQuan.ThemMoi.ThemMoiConNguoi_ViewDinhDanh', {
    extend: 'Ext.container.Container',
    xtype: 'ThemMoiConNguoi_ViewDinhDanh',
    items: [
        {
            xtype: 'container',
            cls: 'cnlq-row',
            layout: 'column',
            items: [
                {
                    xtype: 'container',
                    cls: 'cnlq-photo-box',
                    height: 168,
                    layout: { type: 'vbox', align: 'center', pack: 'center' },
                    items: [
                        {
                            xtype: 'component',
                            reference: 'photoPlaceholder',
                            cls: 'cnlq-photo-placeholder',
                            html: '<span class="x-fa fa-cloud-upload"></span>'
                        },
                        {
                            xtype: 'image',
                            reference: 'photoPreview',
                            alt: 'Ảnh người liên quan',
                            width: 100,
                            height: 112,
                            hidden: true,
                            cls: 'cnlq-photo'
                        },
                        {
                            xtype: 'filefield',
                            reference: 'photoUpload',
                            buttonOnly: true,
                            buttonText: 'Tải ảnh',
                            accept: 'image/*',
                            listeners: { change: 'onPhotoChange' }
                        }
                    ],
                    columnWidth: 0.16666667,
                    formSpan: 2
                },
                {
                    xtype: 'textfield',
                    name: 'hoTen',
                    fieldLabel: 'Họ và tên',
                    allowBlank: false,
                    bind: { value: '{person.hoTen}' },
                    cls: 'field-csstyle required',
                    reference: 'hoTen',
                    columnWidth: 0.25,
                    formSpan: 3
                },
                {
                    xtype: 'combobox',
                    name: 'gioiTinh',
                    fieldLabel: 'Giới tính',
                    allowBlank: false,
                    bind: { value: '{person.gioiTinh}', store: '{gioiTinhComboStore}' },
                    editable: false,
                    valueField: 'value',
                    displayField: 'text',
                    cls: 'field-csstyle required',
                    reference: 'gioiTinh',
                    columnWidth: 0.16666667,
                    formSpan: 2
                },
                {
                    xtype: 'datefield',
                    name: 'ngaySinh',
                    fieldLabel: 'Ngày sinh',
                    allowBlank: false,
                    bind: { value: '{person.ngaySinh}' },
                    cls: 'field-csstyle required',
                    reference: 'ngaySinh',
                    columnWidth: 0.16666667,
                    formSpan: 2
                },
                {
                    xtype: 'textfield',
                    name: 'cccd',
                    fieldLabel: 'CCCD/CMT',
                    bind: { value: '{person.cccd}' },
                    maxLength: 12,
                    enforceMaxLength: true,
                    reference: 'cccd',
                    maskRe: /[0-9]/,
                    listeners: { change: 'onCccdChange' },
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
                    xtype: 'textfield',
                    name: 'tenKhac',
                    fieldLabel: 'Tên gọi khác',
                    bind: { value: '{person.tenKhac}' },
                    reference: 'tenKhac',
                    columnWidth: 0.16666667,
                    formSpan: 2
                },
                {
                    xtype: 'textfield',
                    name: 'lyDoKhongCccd',
                    fieldLabel: 'Lý do không có CCCD/CMND',
                    allowBlank: false,
                    bind: { value: '{person.lyDoKhongCccd}' },
                    reference: 'lyDoKhongCccd',
                    cls: 'field-csstyle required',
                    columnWidth: 0.25,
                    formSpan: 3
                },
                {
                    xtype: 'datefield',
                    name: 'ngayCapCccd',
                    fieldLabel: 'Ngày cấp CCCD',
                    bind: { value: '{person.ngayCapCccd}' },
                    reference: 'ngayCapCccd',
                    columnWidth: 0.16666667,
                    formSpan: 2
                },
                {
                    xtype: 'textfield',
                    name: 'noiCapCccd',
                    fieldLabel: 'Nơi cấp CCCD',
                    bind: { value: '{person.noiCapCccd}' },
                    reference: 'noiCapCccd',
                    columnWidth: 0.25,
                    formSpan: 3
                },
                {
                    xtype: 'container',
                    cls: 'cnlq-lookup-button',
                    items: [
                        {
                            xtype: 'button',
                            text: 'Tra cứu',
                            tooltip: 'Tra cứu dữ liệu mô phỏng',
                            cls: 'cnlq-primary',
                            handler: 'onLookup'
                        }
                    ],
                    columnWidth: 0.16666667,
                    formSpan: 2
                }
            ],
            listeners: { resize: 'onFormRowResize' }
        },
        {
            layout: 'column',
            items: [
                {
                    xtype: 'combobox',
                    name: 'danToc',
                    fieldLabel: 'Dân tộc',
                    bind: { value: '{person.danToc}', store: '{danTocComboStore}' },
                    editable: false,
                    valueField: 'value',
                    displayField: 'text',
                    reference: 'danToc',
                    columnWidth: 0.16666667,
                    formSpan: 2
                },
                {
                    xtype: 'combobox',
                    name: 'quocTich',
                    fieldLabel: 'Quốc tịch',
                    bind: { value: '{person.quocTich}', store: '{quocTichComboStore}' },
                    editable: false,
                    valueField: 'value',
                    displayField: 'text',
                    reference: 'quocTich',
                    columnWidth: 0.16666667,
                    formSpan: 2
                },
                {
                    xtype: 'textfield',
                    name: 'hoChieu',
                    fieldLabel: 'Hộ chiếu',
                    bind: { value: '{person.hoChieu}' },
                    reference: 'hoChieu',
                    columnWidth: 0.25,
                    formSpan: 3
                },
                {
                    xtype: 'datefield',
                    name: 'ngayCapHc',
                    fieldLabel: 'Ngày cấp hộ chiếu',
                    bind: { value: '{person.ngayCapHc}' },
                    reference: 'ngayCapHc',
                    columnWidth: 0.16666667,
                    formSpan: 2
                },
                {
                    xtype: 'textfield',
                    name: 'noiCapHc',
                    fieldLabel: 'Nơi cấp hộ chiếu',
                    bind: { value: '{person.noiCapHc}' },
                    reference: 'noiCapHc',
                    columnWidth: 0.25,
                    formSpan: 3
                }
            ],
            listeners: { resize: 'onFormRowResize' },
            xtype: 'container',
            cls: 'cnlq-row'
        }
    ],
    layout: { type: 'vbox', align: 'stretch' }
});
