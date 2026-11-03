Ext.define('DEMO.view.pages.TrangChuNew.View1.TT_TimKiem.TT_TimKiem_View', {
    extend: 'Ext.form.Panel',
    xtype: 'TT_TimKiem_View',
    controller: 'TT_TimKiem_ViewController',
    viewModel: 'TT_TimKiem_ViewModel',
    cls: 'tt-tim-kiem tcn-filter padding5 dash-card',
    bodyCls: 'tcn-filter-body',
    border: false,
    width: '100%',
    layout: { type: 'vbox', align: 'stretch' },
    listeners: { afterrender: 'onSearchReady' },
    items: [
        {
            layout: 'hbox',
            width: '100%',
            items: [
                {
                    xtype: 'combobox',
                    flex: 0.6,
                    itemId: 'phamViThongKe_IdView',
                    editable: false,
                    allowBlank: false,
                    cls: 'field-csstyle required',
                    fieldLabel: 'Phạm vi thống kê',
                    valueField: 'code',
                    displayField: 'name',
                    bind: {
                        value: '{tieuChiKhacParams.capDonVi}',
                        store: '{PhamViThongKeStore}',
                        readOnly: '{readOnlyCapDonVi}'
                    },
                    listeners: {
                        select: 'onSelectCapDonVi'
                    }
                },
                {
                    xtype: 'combobox',
                    itemId: 'heLucLuong_IdView',
                    flex: 1,
                    queryMode: 'local',
                    fieldLabel: 'Chọn hệ lực lượng',
                    valueField: 'code',
                    displayField: 'name',
                    bind: {
                        store: '{DM_HeLucLuong_Store}',
                        hidden: '{isHiddenHeLL}',
                        value: '{tieuChiKhacParams.maDonViHeLL}'
                    },
                    listeners: {
                        change: 'onChangeHeLL'
                    }
                },
                {
                    xtype: 'tagfield',
                    itemId: 'cuc_IdView',
                    flex: 1,
                    queryMode: 'local',
                    fieldLabel: 'Chọn Cục',
                    valueField: 'code',
                    displayField: 'name',
                    anyMatch: true,
                    filterPickList: true,
                    bind: {
                        store: '{DM_CucTrucThuoc_Store}',
                        hidden: '{isHiddenCuc}',
                        disabled: '{readOnlyCuc}',
                        value: '{tieuChiKhacParams.maCuc}'
                    },
                    listeners: {
                        change: 'onChangeCuc'
                    }
                },
                {
                    itemId: 'phongCuc_IdView',
                    xtype: 'tagfield',
                    queryMode: 'local',
                    flex: 1,
                    fieldLabel: 'Chọn phòng thuộc Cục',
                    valueField: 'code',
                    displayField: 'name',
                    anyMatch: true,
                    filterPickList: true,
                    bind: {
                        store: '{DM_PhongThuocCuc_Store}',
                        hidden: '{isHiddenPhongCuc}',
                        value: '{tieuChiKhacParams.maPhongCuc}',
                        disabled: '{readOnlyPhongCuc}'
                    },
                    listeners: {
                        change: 'onUpdateDoiSelect'
                    }
                },
                {
                    xtype: 'tagfield',
                    itemId: 'tinhThanh_IdView',
                    flex: 1,
                    queryMode: 'local',
                    fieldLabel: 'Chọn tỉnh thành',
                    valueField: 'code',
                    displayField: 'name',
                    anyMatch: true,
                    filterPickList: true,
                    grow: false,
                    bind: {
                        store: '{DM_TinhTrucThuoc_Store}',
                        hidden: '{isHiddenTinhThanh}',
                        disabled: '{readOnlyTinh}',
                        value: '{tieuChiKhacParams.maTinh}'
                    },
                    listeners: {
                        change: 'onChangeTinhThanh'
                    }
                },
                {
                    itemId: 'phongTinh_IdView',
                    xtype: 'tagfield',
                    queryMode: 'local',
                    flex: 1,
                    fieldLabel: 'Chọn Phòng/Xã/Phường',
                    valueField: 'code',
                    displayField: 'name',
                    anyMatch: true,
                    filterPickList: true,
                    grow: false,
                    bind: {
                        store: '{DM_PhongThuocTinh_Store}',
                        hidden: '{isHiddenPhongTinh}',
                        value: '{tieuChiKhacParams.maPhongTinh}',
                        disabled: '{readOnlyPhongTinh}'
                    },
                    listeners: {
                        change: 'onUpdateDoiSelect'
                    }
                },
                {
                    itemId: 'doi_IdView',
                    xtype: 'tagfield',
                    queryMode: 'local',
                    flex: 1,
                    fieldLabel: 'Chọn đội',
                    valueField: 'code',
                    displayField: 'name',
                    anyMatch: true,
                    filterPickList: true,
                    grow: false,
                    bind: {
                        store: '{DM_DoiThuocPhong_Store}',
                        value: '{tieuChiKhacParams.maDoi}',
                        disabled: '{readOnlyDoi}'
                    }
                }
            ]
        },
        //#endregion

        //#region NOTE: KY BAO CAO
        {
            layout: 'hbox',
            width: '100%',
            items: [
                {
                    xtype: 'combobox',
                    flex: 1,
                    itemId: 'baoCaoDinhKy_IdView',
                    fieldLabel: 'Báo cáo định kỳ',
                    valueField: 'id',
                    displayField: 'name',
                    cls: 'field-csstyle required',
                    bind: {
                        store: '{DM_BaoCaoDinhKy_Store}',
                        value: '{tieuChiKhacParams.baoCaoDinhKy}'
                    },
                    allowBlank: false,
                    editable: false,
                    listeners: { change: 'onPeriodChange' }
                },

                {
                    layout: 'hbox',
                    flex: 2,
                    bind: {
                        hidden: '{!isMonth}'
                    },
                    items: [
                        {
                            xtype: 'numberfield',
                            allowBlank: false,
                            stripCharsRe: /\D/,
                            allowDecimals: false,
                            blankText: 'Trường này là bắt buộc',
                            msgTarget: 'under',
                            flex: 1,
                            fieldLabel: 'Nhập năm',
                    cls: 'field-csstyle required',
                            maxLength: 4,
                            enforceMaxLength: 4,
                            bind: {
                                maxValue: '{maxYear}',
                                minValue: '{minYear}',
                                value: '{tieuChiKhacParams.monthYear}',
                                hidden: '{!isMonth}',
                                disabled: '{!isMonth}'
                            }
                        },
                        //Chọn tháng
                        {
                            xtype: 'combobox',
                            flex: 1,
                            editable: false,
                            fieldLabel: 'Chọn tháng',
                            allowBlank: false,
                            cls: 'field-csstyle required',
                            valueField: 'id',
                            displayField: 'name',

                            bind: {
                                hidden: '{!isMonth}',
                                disabled: '{!isMonth}',
                                value: '{tieuChiKhacParams.month}',
                                store: '{DM_ThangTrongNamStore}'
                            }

                        }

                    ]
                },
                {
                    layout: 'hbox',
                    flex: 2,
                    bind: {
                        hidden: '{!isQuarter}'
                    },
                    items: [
                        //quý năm
                        {
                            xtype: 'numberfield',
                            allowBlank: false,
                            stripCharsRe: /\D/,
                            allowDecimals: false,
                            blankText: 'Trường này là bắt buộc',
                            msgTarget: 'under',
                            maxLength: 4,
                            enforceMaxLength: 4,
                            flex: 1,
                            fieldLabel: 'Nhập năm',
                    cls: 'field-csstyle required',
                            bind: {
                                maxValue: '{maxYear}',
                                minValue: '{minYear}',
                                value: '{tieuChiKhacParams.quarterYear}',
                                hidden: '{!isQuarter}',
                                disabled: '{!isQuarter}'
                            }
                        },
                        //Chọn quý
                        {
                            xtype: 'combobox',
                            flex: 1,
                            editable: false,
                            fieldLabel: 'Chọn quý',
                            allowBlank: false,
                            cls: 'field-csstyle required',
                            valueField: 'id',
                            displayField: 'name',
                            bind: {
                                store: '{DM_QuyTrongNamStore}',
                                hidden: '{!isQuarter}',
                                disabled: '{!isQuarter}',
                                value: '{tieuChiKhacParams.quarter}'
                            }
                        }
                    ]
                },
                {
                    xtype: 'numberfield',
                    allowBlank: false,
                    blankText: 'Trường này là bắt buộc',
                    stripCharsRe: /\D/,
                    allowDecimals: false,
                    msgTarget: 'under',
                    minLength: 4,
                    maxLength: 4,
                    enforceMaxLength: 4,
                    flex: 1,
                    fieldLabel: 'Nhập năm',
                    cls: 'field-csstyle required',
                    bind: {
                        maxValue: '{maxYear}',
                        minValue: '{minYear}',
                        value: '{tieuChiKhacParams.toYear}',
                        hidden: '{!isYear}',
                        disabled: '{!isYear}'
                    }
                },
                {
                    bind: {
                        flex: '{flexKy}'
                    }
                }
            ]

        },
        //#endregion
        {
            layout: 'hbox',
            width: '100%',
            items: [
                {
                    flex: 1
                },
                {
                    xtype: 'button',
                    text: 'Tìm kiếm',
                    cls: 'button-csstyle',
                    margin: 5,
                    handler: 'onSearch'
                },
                {
                    xtype: 'button',
                    cls: 'button-csstyle',
                    text: 'Làm mới',
                    margin: 5,
                    handler: 'onRefresh'
                },
                {
                    flex: 1
                }
            ]
        }
    ]
});
