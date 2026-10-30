Ext.define('DEMO.view.pages.YeuCauTraCuu.TaoYeuCau.Step2.Step2_View', {
    extend: 'Ext.form.Panel',
    xtype: 'Step2_View',

    requires: [
        'DEMO.view.pages.YeuCauTraCuu.TaoYeuCau.Step2.Step2_ViewController',
        'DEMO.view.pages.YeuCauTraCuu.TaoYeuCau.Step2.Step2_ViewModel',
        'Ext.button.Segmented'
    ],

    controller: 'step2',
    viewModel: 'step2',

    cls: 'pyc-dialog-body',
    scrollable: 'y',
    layout: { type: 'vbox', align: 'stretch' },

    items: [
        // Thẻ thông tin người được tra cứu (chuẩn 100% hình mockup)
        {
            xtype: 'component',
            reference: 'selectedPersonCard',
            bind: {
                html: '{personCardHtml}'
            },
            listeners: {
                el: {
                    click: {
                        delegate: '.btn-change-person',
                        fn: 'onChangePerson'
                    }
                }
            }
        },

        // Form 2 cột: Mã phiếu & Ngày yêu cầu
        {
            xtype: 'container',
            layout: 'hbox',
            margin: '16 0 0 0',
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Mã phiếu',
                    flex: 1,
                    readOnly: true,
                    bind: '{ticket.code} (tự sinh)'
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Ngày yêu cầu',
                    flex: 1,
                    format: 'd/m/Y',
                    bind: '{ticket.date}'
                }
            ]
        },

        // Form 2 cột: Loại tra cứu & Mức độ ưu tiên
        {
            xtype: 'container',
            layout: 'hbox',
            margin: '16 0 0 0',
            items: [
                {
                    xtype: 'combobox',
                    fieldLabel: 'Loại tra cứu',
                    flex: 1,
                    editable: false,
                    store: [
                        'Tra cứu nhân thân',
                        'Tra cứu lịch sử vi phạm',
                        'Tra cứu tài sản',
                        'Tra cứu khác'
                    ],
                    bind: '{ticket.type}'
                },
                {
                    xtype: 'container',
                    layout: { type: 'vbox', align: 'stretch' },
                    flex: 1,
                    padding: '0 5px',
                    items: [
                        {
                            xtype: 'component',
                            html: '<span style="font-size: 12px; color: #566172; font-weight: 500; margin-bottom: 2px; display: block;">Mức độ ưu tiên</span>'
                        },
                        {
                            xtype: 'segmentedbutton',
                            cls: 'seg',
                            bind: '{ticket.priority}',
                            defaults: { flex: 1, height: 38 },
                            items: [
                                { text: 'Thường', value: 'Thường' },
                                { text: 'Khẩn', value: 'Khẩn' },
                                { text: 'Hoả tốc', value: 'Hoả tốc' }
                            ]
                        }
                    ]
                }
            ]
        },

        // Đơn vị / người yêu cầu
        {
            xtype: 'textfield',
            fieldLabel: 'Đơn vị / người yêu cầu',
            margin: '16 0 0 0',
            emptyText: 'Ví dụ: Phòng Nghiệp vụ – Nguyễn Văn B',
            bind: '{ticket.unit}'
        },

        // Nội dung / mục đích tra cứu *
        {
            xtype: 'textareafield',
            reference: 'purposeField',
            fieldLabel: 'Nội dung / mục đích tra cứu',
            cls: 'field-csstyle required',
            margin: '16 0 0 0',
            rows: 3,
            emptyText: 'Mô tả ngắn gọn thông tin cần tra cứu và lý do',
            bind: '{ticket.purpose}',
            checkChangeBuffer: 50,
            enableKeyEvents: true,
            allowBlank: false,
            listeners: {
                change: 'onPurposeChange'
            }
        }
    ]
});
