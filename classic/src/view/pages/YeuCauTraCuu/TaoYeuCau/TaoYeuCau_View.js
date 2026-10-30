Ext.define('DEMO.view.pages.YeuCauTraCuu.TaoYeuCau.TaoYeuCau_View', {
    extend: 'Ext.window.Window',
    xtype: 'TaoYeuCau_View',

    requires: [
        'DEMO.view.pages.YeuCauTraCuu.TaoYeuCau.TaoYeuCau_ViewController',
        'DEMO.view.pages.YeuCauTraCuu.TaoYeuCau.TaoYeuCau_ViewModel',
        'DEMO.view.pages.YeuCauTraCuu.TaoYeuCau.Step1.Step1_View',
        'DEMO.view.pages.YeuCauTraCuu.TaoYeuCau.Step2.Step2_View',
        'DEMO.view.pages.YeuCauTraCuu.TaoYeuCau.Step3.Step3_View'
    ],

    controller: 'taoyeucau',
    viewModel: 'taoyeucau',

    header: false,
    modal: true,
    shadow: false,
    resizable: false,
    closable: false,
    border: false,
    bodyBorder: false,
    bodyPadding: 0,
    frame: false,
    width: 880,
    height: 700,
    cls: 'pyc-modal-window padding5',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [
        // ==========================================
        // 1. HEADER (TIÊU ĐỀ + PHỤ ĐỀ + NÚT ĐÓNG)
        // ==========================================
        {
            xtype: 'container',
            cls: 'pyc-dialog-header',
            height: 68,
            layout: {
                type: 'hbox',
                align: 'middle',
                pack: 'space-between'
            },
            items: [
                {
                    xtype: 'container',
                    layout: 'vbox',
                    items: [
                        {
                            xtype: 'component',
                            html: '<h2 class="pyc-dialog-title">Tạo yêu cầu tra cứu</h2>'
                        },
                        {
                            xtype: 'component',
                            bind: {
                                html: '<span class="pyc-dialog-subtitle">{dialogSubtitle}</span>'
                            }
                        }
                    ]
                },
                {
                    xtype: 'button',
                    cls: 'icon-btn',
                    ui: 'plain',
                    tooltip: 'Đóng',
                    html: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"></path></svg>',
                    handler: 'onCloseWindow'
                }
            ]
        },

        // ==========================================
        // 2. THANH STEPPER (3 BƯỚC TIẾN TRÌNH)
        // ==========================================
        {
            xtype: 'component',
            cls: 'pyc-stepper-wrap',
            height: 80,
            bind: {
                html: '{stepperHtml}'
            }
        },

        // ==========================================
        // 3. VÙNG THÂN CHÍNH: GỌI 3 VIEW ĐỘC LẬP
        // ==========================================
        {
            xtype: 'container',
            reference: 'wizardCards',
            flex: 1,
            layout: 'card',
            bind: {
                activeItem: '{currentStep}'
            },
            items: [
                {
                    xtype: 'Step1_View',
                    reference: 'step1View',
                    listeners: {
                        personselected: 'onPersonSelectedFromStep1',
                        modeswitch: 'onStep1ModeSwitch'
                    }
                },
                {
                    xtype: 'Step2_View',
                    reference: 'step2View',
                    listeners: {
                        changeperson: 'onBackToStep1'
                    }
                },
                {
                    xtype: 'Step3_View',
                    reference: 'step3View'
                }
            ]
        },

        // ==========================================
        // 4. FOOTER TOOLBAR
        // ==========================================
        {
            xtype: 'toolbar',
            cls: 'pyc-dialog-footer',
            height: 76,
            items: [
                {
                    xtype: 'component',
                    bind: {
                        html: '<span class="pyc-footer-hint">{footerHint}</span>'
                    }
                },
                '->',
                // Nút điều hướng Bước 1 & 2
                {
                    xtype: 'button',
                    cls: 'btn',
                    bind: {
                        text: '{prevBtnText}',
                        hidden: '{isStep3}'
                    },
                    handler: 'onPrevClick'
                },
                {
                    xtype: 'button',
                    cls: 'btn btn-primary',
                    bind: {
                        text: '{nextBtnText}',
                        disabled: '{!canContinue}',
                        hidden: '{isStep3}'
                    },
                    handler: 'onNextClick'
                },
                // Nút ở Bước 3 (khớp 100% ảnh thiết kế: [Tải PDF] [In biểu mẫu])
                {
                    xtype: 'button',
                    cls: 'btn',
                    text: 'Tải PDF',
                    bind: {
                        hidden: '{!isStep3}'
                    },
                    handler: 'onDownloadPdf'
                },
                {
                    xtype: 'button',
                    cls: 'btn btn-primary',
                    text: 'In biểu mẫu',
                    bind: {
                        hidden: '{!isStep3}'
                    },
                    handler: 'onPrintTicket'
                }
            ]
        }
    ],

    listeners: {
        afterrender: 'onViewReady'
    }
});
