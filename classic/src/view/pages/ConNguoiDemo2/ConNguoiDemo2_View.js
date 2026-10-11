Ext.define('DEMO.view.pages.ConNguoiDemo2.ConNguoiDemo2_View', {
    extend: 'Ext.container.Container',
    xtype: 'ConNguoiDemo2_View',

    controller: 'connguoidemo2',
    viewModel: 'connguoidemo2',

    requires: [
        'Ext.toolbar.Paging',
        'Ext.grid.column.Action',
        'Ext.grid.column.RowNumberer',
        'DEMO.view.pages.ConNguoiDemo2.ConNguoiDemo2_ViewController',
        'DEMO.view.pages.ConNguoiDemo2.ConNguoiDemo2_ViewModel',
        'DEMO.view.pages.ConNguoiDemo2.ConNguoiDemo2_ViewPopup'
    ],

    scrollable: 'y',
    padding: '16 20 24 20',
    cls: 'dash-page',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [
        // ================= HEADER COMMAND BAR =================
        {
            xtype: 'container',
            cls: 'dash-card',
            padding: '12 18',
            margin: '0 0 16 0',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            items: [
                {
                    xtype: 'component',
                    html: '<div style="display:flex; align-items:center; gap:12px;">' +
                            '<div style="width:40px; height:40px; border-radius:8px; display:grid; place-items:center; background:linear-gradient(135deg, #10b981, #059669); color:#fff; box-shadow:0 4px 12px rgba(16,185,129,0.3); font-size:18px;">' +
                                '<i class="x-fa fa-users"></i>' +
                            '</div>' +
                            '<div>' +
                                '<div style="font-size:18px; font-weight:700; color:var(--theme-text-primary, #1e293b); line-height:1.2;">antigravity</div>' +
                                '<div style="font-size:12px; color:var(--theme-text-secondary, #64748b); margin-top:2px;">Quản lý &amp; theo dõi danh sách con người liên quan trong hồ sơ tố tụng</div>' +
                            '</div>' +
                          '</div>'
                },
                { xtype: 'tbspacer', flex: 1 },
                {
                    xtype: 'button',
                    text: 'Thêm mới con người liên quan',
                    iconCls: 'x-fa fa-plus',
                    ui: 'soft-green',
                    scale: 'medium',
                    handler: 'onOpenAddWindow'
                }
            ]
        },

        // ================= FILTER BAR =================
        {
            xtype: 'container',
            cls: 'dash-card',
            padding: '14 18',
            margin: '0 0 16 0',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            defaults: {
                margin: '0 10 0 0'
            },
            items: [
                {
                    xtype: 'textfield',
                    reference: 'txtSearchTuKhoa',
                    fieldLabel: 'Từ khóa',
                    emptyText: 'Họ tên, CCCD, SĐT...',
                    width: 260,
                    bind: { value: '{timKiemNangCao.tuKhoa}' },
                    enableKeyEvents: true,
                    listeners: {
                        specialkey: function (field, e) {
                            if (e.getKey() === e.ENTER) {
                                field.up('ConNguoiDemo2_View').getController().onSearch();
                            }
                        }
                    }
                },
                {
                    xtype: 'combobox',
                    reference: 'cboSearchVaiTro',
                    fieldLabel: 'Vai trò tố tụng',
                    editable: false,
                    width: 200,
                    value: 'all',
                    bind: { value: '{timKiemNangCao.vaiTro}' },
                    store: [
                        ['all', 'Tất cả vai trò'],
                        ['Bị can', 'Bị can'],
                        ['Bị cáo', 'Bị cáo'],
                        ['Bị hại', 'Bị hại'],
                        ['Người làm chứng', 'Người làm chứng'],
                        ['Nguyên đơn dân sự', 'Nguyên đơn dân sự'],
                        ['Bị đơn dân sự', 'Bị đơn dân sự'],
                        ['Người có quyền lợi, nghĩa vụ liên quan', 'Người có QLNV liên quan'],
                        ['Người bào chữa', 'Người bào chữa'],
                        ['Người đại diện hợp pháp', 'Người đại diện hợp pháp']
                    ]
                },
                {
                    xtype: 'combobox',
                    reference: 'cboSearchTienAn',
                    fieldLabel: 'Tiền án / Tiền sự',
                    editable: false,
                    width: 190,
                    value: 'all',
                    bind: { value: '{timKiemNangCao.tienAn}' },
                    store: [
                        ['all', 'Tất cả'],
                        ['Không', 'Không'],
                        ['Tiền án', 'Tiền án'],
                        ['Tiền sự', 'Tiền sự'],
                        ['Cả tiền án và tiền sự', 'Cả tiền án & tiền sự']
                    ]
                },
                {
                    xtype: 'button',
                    text: 'Tìm kiếm',
                    iconCls: 'x-fa fa-search',
                    ui: 'soft-green',
                    margin: '22 8 0 0',
                    handler: 'onSearch'
                },
                {
                    xtype: 'button',
                    text: 'Làm mới',
                    iconCls: 'x-fa fa-refresh',
                    margin: '22 0 0 0',
                    handler: 'onResetSearch'
                }
            ]
        },

        // ================= GRID DANH SÁCH =================
        {
            xtype: 'grid',
            reference: 'gridConNguoi',
            cls: 'dash-card',
            bind: { store: '{conNguoiStore}' },
            emptyText: 'Không có thông tin con người liên quan nào phù hợp.',
            viewConfig: {
                stripeRows: true,
                enableTextSelection: true
            },
            columns: [
                {
                    xtype: 'rownumberer',
                    text: 'STT',
                    width: 50,
                    align: 'center'
                },
                {
                    text: 'Họ và tên',
                    dataIndex: 'hoTen',
                    flex: 1.5,
                    minWidth: 180,
                    renderer: function (val, meta, rec) {
                        const tenKhac = rec.get('tenKhac');
                        let html = '<div style="font-weight:600; color:var(--theme-text-primary, #1e293b);">' + Ext.String.htmlEncode(val) + '</div>';
                        if (tenKhac) {
                            html += '<div style="font-size:11px; color:var(--theme-text-secondary, #64748b);">Tên khác: ' + Ext.String.htmlEncode(tenKhac) + '</div>';
                        }
                        return html;
                    }
                },
                {
                    text: 'Giới tính',
                    dataIndex: 'gioiTinh',
                    width: 80,
                    align: 'center'
                },
                {
                    text: 'Ngày sinh',
                    dataIndex: 'ngaySinh',
                    width: 100,
                    align: 'center'
                },
                {
                    text: 'CCCD/CMT',
                    dataIndex: 'cccd',
                    width: 130,
                    renderer: function (val) {
                        return val ? '<span style="font-family:monospace; font-weight:600;">' + Ext.String.htmlEncode(val) + '</span>' : '<span style="color:var(--theme-text-muted, #94a3b8);">—</span>';
                    }
                },
                {
                    text: 'Vai trò',
                    dataIndex: 'vaiTro',
                    width: 130,
                    renderer: function (val) {
                        let colorBg = '#e0f2fe', colorText = '#0369a1';
                        if (val === 'Bị can' || val === 'Bị cáo') {
                            colorBg = '#fee2e2'; colorText = '#b91c1c';
                        } else if (val === 'Bị hại') {
                            colorBg = '#fef3c7'; colorText = '#b45309';
                        }
                        return '<span style="display:inline-block; padding:2px 8px; border-radius:12px; font-size:12px; font-weight:600; background:' + colorBg + '; color:' + colorText + ';">' + Ext.String.htmlEncode(val) + '</span>';
                    }
                },
                {
                    text: 'Nghề nghiệp',
                    dataIndex: 'ngheNghiep',
                    width: 130
                },
                {
                    text: 'Số điện thoại',
                    dataIndex: 'soDt',
                    width: 110,
                    renderer: function (val) {
                        return val ? '<a href="tel:' + val + '" style="color:var(--accent, #1c5cab); text-decoration:none;">' + Ext.String.htmlEncode(val) + '</a>' : '—';
                    }
                },
                {
                    text: 'Nơi ở hiện tại',
                    dataIndex: 'diaChiHienTai',
                    flex: 2,
                    minWidth: 220
                },
                {
                    text: 'Tiền án/Tiền sự',
                    dataIndex: 'tienAn',
                    width: 140,
                    renderer: function (val) {
                        if (val === 'Không') {
                            return '<span style="color:var(--theme-text-secondary, #64748b);">Không</span>';
                        }
                        return '<span style="color:#b91c1c; font-weight:600;">' + Ext.String.htmlEncode(val) + '</span>';
                    }
                },
                {
                    text: 'Trạng thái',
                    dataIndex: 'trangThai',
                    width: 110,
                    align: 'center',
                    renderer: function (val) {
                        if (val === 'Trốn') {
                            return '<span style="background:#fee2e2; color:#b91c1c; padding:2px 6px; border-radius:4px; font-weight:600; font-size:11px;">Trốn</span>';
                        }
                        if (val === 'Đã bắt lại') {
                            return '<span style="background:#e0e7ff; color:#4338ca; padding:2px 6px; border-radius:4px; font-weight:600; font-size:11px;">Đã bắt lại</span>';
                        }
                        return '<span style="background:#f1f5f9; color:#475569; padding:2px 6px; border-radius:4px; font-size:11px;">Bình thường</span>';
                    }
                },
                {
                    xtype: 'actioncolumn',
                    text: 'Thao tác',
                    width: 90,
                    align: 'center',
                    items: [
                        {
                            iconCls: 'x-fa fa-pencil text-primary',
                            tooltip: 'Sửa thông tin',
                            handler: 'onEditRecord'
                        },
                        {
                            iconCls: 'x-fa fa-trash text-danger',
                            tooltip: 'Xóa bản ghi',
                            margin: '0 0 0 8',
                            handler: 'onDeleteRecord'
                        }
                    ]
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                displayInfo: true,
                displayMsg: 'Hiển thị {0} - {1} trên {2} bản ghi',
                emptyMsg: 'Không có dữ liệu'
            }
        }
    ]
});
