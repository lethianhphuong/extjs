Ext.define('DEMO.view.pages.YeuCauTraCuu.TaoYeuCau.Step1.Step1_View', {
    extend: 'Ext.container.Container',
    xtype: 'Step1_View',

    requires: [
        'DEMO.view.pages.YeuCauTraCuu.TaoYeuCau.Step1.Step1_ViewController',
        'DEMO.view.pages.YeuCauTraCuu.TaoYeuCau.Step1.Step1_ViewModel',
        'Ext.view.View',
        'Ext.button.Segmented'
    ],

    controller: 'step1',
    viewModel: 'step1',

    layout: 'card',
    bind: {
        activeItem: '{step1Mode}'
    },

    items: [
        // ==========================================
        // SUB-CARD 0: TÌM KIẾM CON NGƯỜI
        // ==========================================
        {
            xtype: 'container',
            cls: 'pyc-dialog-body',
            layout: { type: 'vbox', align: 'stretch' },
            items: [
                {
                    xtype: 'component',
                    html: '<label class="lbl" for="pyc-search-input">Tìm con người theo họ tên, số CCCD hoặc số điện thoại</label>'
                },
                {
                    xtype: 'textfield',
                    reference: 'searchField',
                    cls: 'pyc-search-fld',
                    emptyText: 'Ví dụ: Nguyễn Văn An hoặc 001085…',
                    enableKeyEvents: true,
                    listeners: {
                        change: 'onSearchChange'
                    }
                },
                // Banner thông báo khi vừa tạo mới người xong
                {
                    xtype: 'component',
                    bind: {
                        hidden: '{!justCreated}'
                    },
                    margin: '12 0 0 0',
                    html: '<div class="pyc-alert-banner">Đã tạo mới và chọn người này. Bấm “Tiếp tục” để lập phiếu yêu cầu tra cứu.</div>'
                },
                // Hàng số lượng kết quả + Link tạo mới con người
                {
                    xtype: 'container',
                    layout: { type: 'hbox', align: 'middle' },
                    margin: '12 0',
                    items: [
                        {
                            xtype: 'component',
                            bind: {
                                html: '<span class="pyc-count-text">{countText}</span>'
                            }
                        },
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'component',
                            html: '<button type="button" class="pyc-link">Không thấy? Tạo mới con người</button>',
                            listeners: {
                                el: {
                                    click: 'onSwitchToCreate'
                                }
                            }
                        }
                    ]
                },
                // DataView danh sách người dùng
                {
                    xtype: 'dataview',
                    reference: 'peopleDataView',
                    cls: 'pyc-people-dataview',
                    flex: 1,
                    scrollable: 'y',
                    bind: {
                        store: '{peopleStore}',
                        hidden: '{hasNoResults}'
                    },
                    itemSelector: '.prow',
                    selectedItemCls: 'prow-on',
                    tpl: [
                        '<div class="pyc-prow-list">',
                        '<tpl for=".">',
                        '<div class="prow">',
                        '<span class="pyc-avatar">{initials}</span>',
                        '<span class="pyc-person-info">',
                        '<span class="pyc-person-name">{name}</span>',
                        '<span class="pyc-person-meta">{meta}</span>',
                        '</span>',
                        '<span class="pyc-person-code">{code}</span>',
                        '<span class="pyc-check-badge">',
                        '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"></path></svg>',
                        '</span>',
                        '</div>',
                        '</tpl>',
                        '</div>'
                    ],
                    listeners: {
                        select: 'onPersonSelect'
                    }
                },
                // Hộp thông báo rỗng khi không tìm thấy kết quả
                {
                    xtype: 'container',
                    bind: {
                        hidden: '{!hasNoResults}'
                    },
                    items: [
                        {
                            xtype: 'component',
                            bind: {
                                html: [
                                    '<div class="pyc-empty-box">',
                                    '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#566172" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="8" r="4"></circle><path d="M3 20c0-3.5 3-6 7-6M17 14v6M14 17h6"></path></svg>',
                                    '<div class="pyc-empty-box__title">{emptyMessage}</div>',
                                    '<div class="pyc-empty-box__desc">Kiểm tra lại chính tả hoặc thử số CCCD, số điện thoại. Nếu người này chưa có trong hệ thống, hãy tạo mới.</div>',
                                    '</div>'
                                ].join('')
                            }
                        },
                        {
                            xtype: 'container',
                            layout: { type: 'hbox', pack: 'center' },
                            margin: '12 0 0 0',
                            items: [
                                {
                                    xtype: 'button',
                                    text: 'Tạo mới con người',
                                    cls: 'btn btn-primary',
                                    handler: 'onSwitchToCreate'
                                }
                            ]
                        }
                    ]
                }
            ]
        },

        // ==========================================
        // SUB-CARD 1: FORM TẠO MỚI CON NGƯỜI
        // ==========================================
        {
            xtype: 'form',
            cls: 'pyc-dialog-body',
            scrollable: 'y',
            layout: { type: 'vbox', align: 'stretch' },
            items: [
                {
                    xtype: 'component',
                    html: '<div class="pyc-form-section-title">Thông tin con người mới</div>'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Họ và tên',
                    cls: 'field-csstyle required',
                    emptyText: 'Nhập đầy đủ họ và tên',
                    bind: '{newPerson.name}',
                    allowBlank: false,
                    margin: '0 0 16 0'
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 16 0',
                    items: [
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Ngày sinh',
                            format: 'd/m/Y',
                            flex: 1,
                            bind: '{newPerson.dob}'
                        },
                        {
                            xtype: 'container',
                            layout: { type: 'vbox', align: 'stretch' },
                            flex: 1,
                            padding: '0 5px',
                            items: [
                                {
                                    xtype: 'component',
                                    html: '<span style="font-size: 12px; color: #566172; font-weight: 500; margin-bottom: 2px; display: block;">Giới tính</span>'
                                },
                                {
                                    xtype: 'segmentedbutton',
                                    cls: 'seg',
                                    bind: '{newPerson.gender}',
                                    defaults: { flex: 1, height: 38 },
                                    items: [
                                        { text: 'Nam', value: 'Nam' },
                                        { text: 'Nữ', value: 'Nữ' },
                                        { text: 'Khác', value: 'Khác' }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 16 0',
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Số CCCD / Định danh',
                            flex: 1,
                            emptyText: '12 chữ số',
                            bind: '{newPerson.cccd}'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Số điện thoại',
                            flex: 1,
                            emptyText: '09xx xxx xxx',
                            bind: '{newPerson.phone}'
                        }
                    ]
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Địa chỉ thường trú',
                    margin: '0 0 16 0',
                    emptyText: 'Số nhà, đường, phường/xã, tỉnh/thành phố',
                    bind: '{newPerson.address}'
                },
                {
                    xtype: 'component',
                    html: '<div class="pyc-form-hint"><span style="color: red; font-weight: bold;">*</span> Bắt buộc. Hệ thống sẽ tự sinh mã con người và mã QR sau khi lưu.</div>'
                }
            ]
        }
    ]
});
