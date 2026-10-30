Ext.define('DEMO.view.pages.DeXuatCTVBM.DeXuatCTVBM_ViewFormChung', {
    extend: 'Ext.form.Panel',
    xtype: 'DeXuatCTVBM_ViewFormChung',

    reference: 'formThongTinChung',
    border: false,
    bodyStyle: 'background: transparent;',

    requires: [
        'Ext.form.FieldSet',
        'Ext.form.field.Text',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
        'Ext.form.field.Checkbox',
        'Ext.toolbar.Spacer'
    ],

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [
        {
            xtype: 'fieldset',
            cls: 'custom',
            title: 'Thông tin chung',
            collapsible: false,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                // ==================== HÀNG 1 ====================
                // Độ mật (2) | Ngày xây dựng (2) | Loại CTVBM (3) | Nguồn lập (3) | Loại (2)
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 6 0',
                    items: [
                        {
                            xtype: 'textfield',
                            reference: 'txtDoMat',
                            name: 'doMat',
                            fieldLabel: 'Độ mật',
                            allowBlank: false,
                            cls: 'field-csstyle required',
                            readOnly: true,
                            fieldStyle: 'color: #dc2626; font-weight: bold; background-color: #f3f4f6; cursor: not-allowed;',
                            flex: 2,
                            bind: {
                                value: '{thongTinChung.doMat}'
                            }
                        },
                        {
                            xtype: 'datefield',
                            reference: 'dtNgayXayDung',
                            name: 'ngayXayDung',
                            fieldLabel: 'Ngày xây dựng',
                            flex: 2,
                            bind: {
                                value: '{thongTinChung.ngayXayDung}'
                            }
                        },
                        {
                            xtype: 'combobox',
                            reference: 'cboLoaiCtvbm',
                            name: 'loaiCtvbm',
                            fieldLabel: 'Loại CTVBM',
                            allowBlank: false,
                            cls: 'field-csstyle required',
                            editable: false,
                            displayField: 'text',
                            valueField: 'value',
                            flex: 3,
                            bind: {
                                value: '{thongTinChung.loaiCtvbm}',
                                store: '{loaiCtvbmStore}'
                            }
                        },
                        {
                            xtype: 'combobox',
                            reference: 'cboNguonLap',
                            name: 'nguonLap',
                            fieldLabel: 'Nguồn lập',
                            allowBlank: false,
                            cls: 'field-csstyle required',
                            editable: false,
                            displayField: 'text',
                            valueField: 'value',
                            flex: 3,
                            bind: {
                                value: '{thongTinChung.nguonLap}',
                                store: '{nguonLapStore}'
                            }
                        },
                        {
                            xtype: 'combobox',
                            reference: 'cboLoai',
                            name: 'loai',
                            fieldLabel: 'Loại',
                            allowBlank: false,
                            cls: 'field-csstyle required',
                            editable: false,
                            displayField: 'text',
                            valueField: 'value',
                            flex: 2,
                            bind: {
                                value: '{thongTinChung.loai}',
                                store: '{loaiStore}'
                            }
                        }
                    ]
                },

                // ==================== HÀNG 2 ====================
                // Bí danh CTVBM (2) | Ghi chú (7) | Vai ảo CTVBM Checkbox (3)
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 6 0',
                    items: [
                        {
                            xtype: 'textfield',
                            reference: 'txtBiDanh',
                            name: 'biDanh',
                            fieldLabel: 'Bí danh CTVBM',
                            fieldStyle: 'font-weight: bold;',
                            flex: 2,
                            bind: {
                                value: '{thongTinChung.biDanh}'
                            }
                        },
                        {
                            xtype: 'textfield',
                            reference: 'txtGhiChu',
                            name: 'ghiChu',
                            fieldLabel: 'Ghi chú',
                            emptyText: 'Nhập ghi chú...',
                            flex: 7,
                            bind: {
                                value: '{thongTinChung.ghiChu}'
                            }
                        },
                        {
                            xtype: 'checkboxfield',
                            reference: 'chkVaiAo',
                            name: 'vaiAo',
                            boxLabel: 'Vai ảo CTVBM',
                            margin: '22 0 0 0',
                            flex: 3,
                            bind: {
                                value: '{thongTinChung.vaiAo}'
                            }
                        }
                    ]
                },

                // ==================== HÀNG 3 ====================
                // Hệ lực lượng (4) | Lĩnh vực chính (5) | Lĩnh vực liên quan (3)
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 6 0',
                    items: [
                        {
                            xtype: 'combobox',
                            reference: 'cboHeLucLuong',
                            name: 'heLucLuong',
                            fieldLabel: 'Hệ lực lượng',
                            allowBlank: false,
                            cls: 'field-csstyle required',
                            editable: false,
                            displayField: 'text',
                            valueField: 'value',
                            flex: 4,
                            bind: {
                                value: '{thongTinChung.heLucLuong}',
                                store: '{heLucLuongStore}'
                            }
                        },
                        {
                            xtype: 'combobox',
                            reference: 'cboLinhVucChinh',
                            name: 'linhVucChinh',
                            fieldLabel: 'Lĩnh vực chính',
                            allowBlank: false,
                            cls: 'field-csstyle required',
                            editable: false,
                            displayField: 'text',
                            valueField: 'value',
                            flex: 5,
                            bind: {
                                value: '{thongTinChung.linhVucChinh}',
                                store: '{linhVucChinhStore}'
                            }
                        },
                        {
                            xtype: 'combobox',
                            reference: 'cboLinhVucLienQuan',
                            name: 'linhVucLienQuan',
                            fieldLabel: 'Lĩnh vực liên quan',
                            emptyText: '-- Chọn lĩnh vực liên quan --',
                            editable: false,
                            displayField: 'text',
                            valueField: 'value',
                            flex: 3,
                            bind: {
                                value: '{thongTinChung.linhVucLienQuan}',
                                store: '{linhVucLienQuanStore}'
                            }
                        }
                    ]
                },

                // ==================== HÀNG 4 ====================
                // Ngày ký (2) | Ngày dự kiến sinh hoạt (2) | Lãnh đạo ký Switch (4) | Nhiệm vụ CTVBM (4)
                {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 6 0',
                    items: [
                        {
                            xtype: 'datefield',
                            reference: 'dtNgayKy',
                            name: 'ngayKy',
                            fieldLabel: 'Ngày ký',
                            allowBlank: false,
                            cls: 'field-csstyle required',
                            flex: 2,
                            bind: {
                                value: '{thongTinChung.ngayKy}'
                            }
                        },
                        {
                            xtype: 'datefield',
                            reference: 'dtNgayDuKienSinhHoat',
                            name: 'ngayDuKienSinhHoat',
                            fieldLabel: 'Ngày dự kiến sinh hoạt',
                            emptyText: 'dd/mm/yyyy',
                            flex: 2,
                            bind: {
                                value: '{thongTinChung.ngayDuKienSinhHoat}'
                            }
                        },
                        // Container Lãnh đạo ký (flex 4)
                        {
                            xtype: 'container',
                            flex: 4,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                // Dòng tiêu đề: Checkbox LĐ chưa có TK (trái) + Nhãn Lãnh đạo ký * (phải)
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    margin: '0 0 2 0',
                                    items: [
                                        {
                                            xtype: 'checkboxfield',
                                            reference: 'chkNoLeaderAcc',
                                            name: 'isNoLeaderAcc',
                                            boxLabel: 'LĐ chưa có tài khoản',
                                            bind: {
                                                value: '{thongTinChung.isNoLeaderAcc}'
                                            },
                                            listeners: {
                                                change: 'onChangeNoLeaderAcc'
                                            }
                                        },
                                        {
                                            xtype: 'tbspacer',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'component',
                                            html: '<span style="font-weight: 500; font-size: 11px; color: #374151;">Lãnh đạo ký <span style="color: #dc2626; font-weight: bold;">*</span></span>'
                                        }
                                    ]
                                },
                                // Controls: Combobox (khi có tài khoản) & Textfield (khi chưa có tài khoản)
                                {
                                    xtype: 'combobox',
                                    reference: 'cbbLanhDaoKy',
                                    name: 'lanhDaoKy',
                                    hideLabel: true,
                                    allowBlank: false,
                                    cls: 'field-csstyle required',
                                    editable: false,
                                    emptyText: '-- Chọn lãnh đạo ký --',
                                    displayField: 'text',
                                    valueField: 'value',
                                    bind: {
                                        value: '{thongTinChung.lanhDaoKy}',
                                        store: '{lanhDaoKyStore}',
                                        hidden: '{thongTinChung.isNoLeaderAcc}',
                                        disabled: '{thongTinChung.isNoLeaderAcc}'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    reference: 'txtLanhDaoKy',
                                    name: 'lanhDaoKyText',
                                    hideLabel: true,
                                    allowBlank: false,
                                    cls: 'field-csstyle required',
                                    emptyText: 'Nhập họ và tên Lãnh đạo ký...',
                                    hidden: true,
                                    disabled: true,
                                    bind: {
                                        value: '{thongTinChung.lanhDaoKyText}',
                                        hidden: '{!thongTinChung.isNoLeaderAcc}',
                                        disabled: '{!thongTinChung.isNoLeaderAcc}'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'textfield',
                            reference: 'txtNhiemVuCtvbm',
                            name: 'nhiemVuCtvbm',
                            fieldLabel: 'Nhiệm vụ CTVBM',
                            allowBlank: false,
                            cls: 'field-csstyle required',
                            flex: 4,
                            bind: {
                                value: '{thongTinChung.nhiemVuCtvbm}'
                            }
                        }
                    ]
                },

                // ==================== HÀNG 5 ====================
                // Mục đích xây dựng chính (6) | Mục đích xây dựng kèm theo (6)
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'textfield',
                            reference: 'txtMucDichChinh',
                            name: 'mucDichChinh',
                            fieldLabel: 'Mục đích xây dựng chính',
                            allowBlank: false,
                            cls: 'field-csstyle required',
                            flex: 1,
                            bind: {
                                value: '{thongTinChung.mucDichChinh}'
                            }
                        },
                        {
                            xtype: 'combobox',
                            reference: 'cboMucDichKemTheo',
                            name: 'mucDichKemTheo',
                            fieldLabel: 'Mục đích xây dựng kèm theo',
                            emptyText: '-- Chọn mục đích xây dựng kèm theo --',
                            editable: false,
                            displayField: 'text',
                            valueField: 'value',
                            flex: 1,
                            bind: {
                                value: '{thongTinChung.mucDichKemTheo}',
                                store: '{mucDichKemTheoStore}'
                            }
                        }
                    ]
                }
            ]
        }
    ]
});
