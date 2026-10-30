Ext.define('DEMO.view.pages.DeXuatCTVBM.DeXuatCTVBM_ViewPopupChonNguoi', {
    extend: 'Ext.window.Window',
    xtype: 'DeXuatCTVBM_ViewPopupChonNguoi',

    title: 'Chọn con người',
    width: 960,
    height: 640,
    cls: 'dexuat-modal',
    bodyStyle: 'background-color: #fafbfa;',

    header: {
        style: 'background-color: #104e38; color: #ffffff;',
        title: {
            text: 'Chọn con người',
            style: 'color: #ffffff; font-weight: 700; font-size: 12px;'
        }
    },

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    bodyPadding: 10,

    requires: [
        'Ext.form.field.Text',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
        'Ext.grid.Panel',
        'Ext.grid.column.RowNumberer',
        'Ext.grid.column.Action',
        'Ext.selection.CheckboxModel',
        'Ext.button.Button'
    ],

    items: [
        // ================= Phân đoạn 1: Khung tiêu chí tìm kiếm =================
        {
            xtype: 'container',
            cls: 'dash-card',
            margin: '0 0 8 0',
            padding: '8 10',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'container',
                    layout: 'hbox',
                    defaults: {
                        labelAlign: 'top',
                        labelSeparator: '',
                        margin: '0 8 0 0'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            reference: 'searchHoTen',
                            name: 'hoTen',
                            fieldLabel: 'Họ và tên',
                            fieldStyle: 'font-weight: 600; color: #1f2937;',
                            flex: 3,
                            enableKeyEvents: true,
                            listeners: {
                                specialkey: 'onSearchPersonSpecialKey'
                            }
                        },
                        {
                            xtype: 'combobox',
                            reference: 'searchGioiTinh',
                            name: 'gioiTinh',
                            fieldLabel: 'Giới tính',
                            editable: false,
                            flex: 2,
                            store: ['', 'Nam', 'Nữ'],
                            value: ''
                        },
                        {
                            xtype: 'datefield',
                            reference: 'searchNgaySinh',
                            name: 'ngaySinh',
                            fieldLabel: 'Ngày sinh',
                            format: 'd/m/Y',
                            flex: 2
                        },
                        {
                            xtype: 'textfield',
                            reference: 'searchCCCD',
                            name: 'cccd',
                            fieldLabel: 'CCCD/CMND/CMT',
                            flex: 3
                        },
                        {
                            xtype: 'textfield',
                            reference: 'searchHoChieu',
                            name: 'hoChieu',
                            fieldLabel: 'Hộ chiếu',
                            margin: '0',
                            flex: 2
                        }
                    ]
                },
                // Cụm 3 nút tìm kiếm (Căn giữa)
                {
                    xtype: 'container',
                    margin: '8 0 0 0',
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    defaults: {
                        margin: '0 4'
                    },
                    items: [
                        {
                            xtype: 'button',
                            text: 'Tìm kiếm',
                            iconCls: 'x-fa fa-search',
                            style: {
                                backgroundColor: '#104e38',
                                borderColor: '#104e38',
                                color: '#ffffff',
                                borderRadius: '4px',
                                padding: '4px 14px'
                            },
                            handler: 'onSearchPerson'
                        },
                        {
                            xtype: 'button',
                            text: 'Làm mới',
                            iconCls: 'x-fa fa-refresh',
                            style: {
                                backgroundColor: '#104e38',
                                borderColor: '#104e38',
                                color: '#ffffff',
                                borderRadius: '4px',
                                padding: '4px 14px'
                            },
                            handler: 'onResetSearchPerson'
                        },
                        {
                            xtype: 'button',
                            text: 'Thêm mới',
                            iconCls: 'x-fa fa-plus',
                            style: {
                                backgroundColor: '#104e38',
                                borderColor: '#104e38',
                                color: '#ffffff',
                                borderRadius: '4px',
                                padding: '4px 14px'
                            },
                            handler: 'onAddNewPerson'
                        }
                    ]
                }
            ]
        },

        // ================= Phân đoạn 2: Bảng kết quả nhân thân =================
        {
            xtype: 'grid',
            reference: 'gridKetQuaNhanThan',
            height: 145,
            cls: 'dash-card',
            emptyText: '<div style="text-align: center; color: #9ca3af; font-style: italic; padding: 24px 0;">Nhập tiêu chí tìm kiếm (Họ và tên: <b style="color: #047857;">Vũ Tiến Phúc</b>) và nhấn <b>Tìm kiếm</b></div>',
            deferEmptyText: false,
            bind: {
                store: '{mockPeopleStore}'
            },
            selModel: {
                selType: 'checkboxmodel',
                mode: 'SINGLE',
                allowDeselect: true,
                listeners: {
                    selectionchange: 'onPersonSelectionChange'
                }
            },
            columns: [
                {
                    xtype: 'rownumberer',
                    text: 'STT',
                    width: 45,
                    align: 'center'
                },
                {
                    text: 'Họ và tên',
                    dataIndex: 'hoTen',
                    flex: 1.2,
                    renderer: function (v) {
                        return '<b style="color: #1f2937;">' + Ext.util.Format.htmlEncode(v) + '</b>';
                    }
                },
                {
                    text: 'Giới tính',
                    dataIndex: 'gioiTinh',
                    width: 75,
                    align: 'center',
                    renderer: Ext.util.Format.htmlEncode
                },
                {
                    text: 'Ngày sinh',
                    dataIndex: 'ngaySinh',
                    width: 95,
                    align: 'center',
                    renderer: Ext.util.Format.htmlEncode
                },
                {
                    text: 'CCCD/CMND/CMT',
                    dataIndex: 'cccd',
                    width: 140,
                    align: 'center',
                    renderer: Ext.util.Format.htmlEncode
                },
                {
                    text: 'Hộ chiếu',
                    dataIndex: 'hoChieu',
                    width: 90,
                    align: 'center',
                    renderer: function (v) {
                        return v ? Ext.util.Format.htmlEncode(v) : '-';
                    }
                },
                {
                    xtype: 'actioncolumn',
                    text: 'Thao tác',
                    width: 70,
                    align: 'center',
                    items: [
                        {
                            iconCls: 'x-fa fa-eye',
                            tooltip: 'Xem chi tiết',
                            iconStyle: 'color: #104e38; cursor: pointer;',
                            handler: 'onViewPersonDetail'
                        }
                    ]
                }
            ]
        },

        // ================= Phân đoạn 3: Khu vực QR & Nút hành động đáy =================
        {
            xtype: 'container',
            height: 230,
            layout: {
                type: 'vbox',
                align: 'center',
                pack: 'space-between'
            },
            padding: '8 0 4 0',
            items: [
                // Khối QR Code (Mặc định ẩn)
                {
                    xtype: 'container',
                    reference: 'containerQrPerson',
                    hidden: true,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'component',
                            html: '<div style="font-size: 11.5px; font-weight: 700; color: #1f2937; margin-bottom: 6px;">Mã con người</div>'
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'component',
                                    reference: 'compPersonQrSvg',
                                    width: 96,
                                    height: 96,
                                    style: {
                                        backgroundColor: '#ffffff',
                                        border: '1px solid #9ca3af',
                                        borderRadius: '4px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }
                                },
                                {
                                    xtype: 'container',
                                    margin: '0 0 0 16',
                                    width: 140,
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'component',
                                            reference: 'lblMaConNguoi',
                                            html: '<div style="border: 1px solid #9ca3af; background: #fff; border-radius: 4px; padding: 4px 8px; text-align: center; font-size: 11px; font-weight: 700; color: #1f2937; letter-spacing: 0.5px; margin-bottom: 6px;">Mã: <span id="txtPersonCode">8377KGY833</span></div>'
                                        },
                                        {
                                            xtype: 'button',
                                            text: 'Sao chép mã',
                                            margin: '0 0 6 0',
                                            style: {
                                                backgroundColor: '#104e38',
                                                borderColor: '#104e38',
                                                color: '#ffffff',
                                                borderRadius: '4px'
                                            },
                                            handler: 'onCopyPersonCode'
                                        },
                                        {
                                            xtype: 'button',
                                            text: 'Tải QR',
                                            iconCls: 'x-fa fa-file-text-o',
                                            style: {
                                                backgroundColor: '#104e38',
                                                borderColor: '#104e38',
                                                color: '#ffffff',
                                                borderRadius: '4px'
                                            },
                                            handler: 'onDownloadPersonQr'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                // Cụm nút Chọn & Tạo YCTC
                {
                    xtype: 'container',
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
                            reference: 'btnSelectPerson',
                            text: 'Chọn',
                            hidden: true,
                            style: {
                                backgroundColor: '#104e38',
                                borderColor: '#104e38',
                                color: '#ffffff',
                                borderRadius: '4px',
                                padding: '6px 28px',
                                fontWeight: '600'
                            },
                            handler: 'onConfirmPersonChoice'
                        },
                        {
                            xtype: 'button',
                            reference: 'btnCreateYCTC',
                            text: 'Tạo YCTC',
                            hidden: true,
                            style: {
                                backgroundColor: '#104e38',
                                borderColor: '#104e38',
                                color: '#ffffff',
                                borderRadius: '4px',
                                padding: '6px 24px',
                                fontWeight: '600'
                            },
                            handler: 'onNextToB5'
                        }
                    ]
                }
            ]
        }
    ]
});
