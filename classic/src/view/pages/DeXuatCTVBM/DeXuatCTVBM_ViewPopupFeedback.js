Ext.define('DEMO.view.pages.DeXuatCTVBM.DeXuatCTVBM_ViewPopupFeedback', {
    extend: 'Ext.window.Window',
    xtype: 'DeXuatCTVBM_ViewPopupFeedback',

    title: 'Gửi phản ánh, góp ý',
    width: 448,
    cls: 'dexuat-modal',
    bodyStyle: 'background-color: #ffffff;',

    header: {
        style: 'background-color: #7c1c24; color: #ffffff;',
        title: {
            text: 'Gửi phản ánh, góp ý',
            style: 'color: #ffffff; font-weight: 700; font-size: 12px;'
        }
    },

    bodyPadding: '16 20 16 20',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    fieldDefaults: {
        labelAlign: 'top',
        labelSeparator: ''
    },

    requires: [
        'Ext.form.field.Text',
        'Ext.form.field.TextArea',
        'Ext.toolbar.Toolbar',
        'Ext.toolbar.Spacer',
        'Ext.button.Button'
    ],

    items: [
        {
            xtype: 'textfield',
            name: 'tieuDe',
            reference: 'txtFeedbackTieuDe',
            fieldLabel: 'Tiêu đề phản ánh',
            cls: 'field-csstyle',
            emptyText: 'Nhập tiêu đề tóm tắt...',
            bind: '{feedbackData.tieuDe}',
            margin: '0 0 12 0'
        },
        {
            xtype: 'textareafield',
            name: 'noiDung',
            reference: 'txtFeedbackNoiDung',
            fieldLabel: 'Nội dung chi tiết',
            cls: 'field-csstyle required',
            allowBlank: false,
            blankText: 'Vui lòng nhập nội dung góp ý!',
            emptyText: 'Nhập nội dung góp ý hoặc phản ánh sự cố...',
            rows: 4,
            height: 110,
            bind: '{feedbackData.noiDung}',
            margin: '0 0 16 0'
        }
    ],

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            padding: '10 0 4 0',
            layout: {
                type: 'hbox',
                pack: 'end'
            },
            style: {
                backgroundColor: '#ffffff',
                borderTop: '1px solid #e2e8f0'
            },
            items: [
                {
                    text: 'Đóng',
                    style: {
                        backgroundColor: '#f1f5f9',
                        color: '#475569',
                        border: '1px solid #cbd5e1',
                        fontWeight: '500',
                        fontSize: '11.5px',
                        borderRadius: '4px',
                        padding: '6px 16px'
                    },
                    handler: 'onCloseFeedback'
                },
                {
                    xtype: 'tbspacer',
                    width: 8
                },
                {
                    text: 'Gửi đi',
                    style: {
                        backgroundColor: '#7c1c24',
                        color: '#ffffff',
                        border: '1px solid #7c1c24',
                        fontWeight: '500',
                        fontSize: '11.5px',
                        borderRadius: '4px',
                        padding: '6px 18px'
                    },
                    handler: 'onSubmitFeedback'
                }
            ]
        }
    ]
});
