Ext.define('DEMO.view.pages.TrangChuNew.View3.TrangChuNew3_ViewGrid', {
    extend: 'Ext.panel.Panel',
    xtype: 'TrangChuNew3_ViewGrid',
    requires: [
        'Ext.grid.Panel',
        'Ext.tab.Bar',
        'Ext.toolbar.Fill'
    ],
    cls: 'tcn3-card tcn3-grid-tabpanel',
    margin: '12 0 16 0',
    minHeight: 380,
    layout: 'fit',
    dockedItems: [
        {
            xtype: 'tabbar',
            dock: 'top',
            cls: 'tcn3-tabbar',
            itemId: 'gridTabBar_IdView',
            items: [
                {
                    xtype: 'tab',
                    itemId: 'cucTab_IdView',
                    text: 'Cấp Cục',
                    iconCls: 'x-fa fa-university',
                    capDonVi: 'CUC',
                    closable: false,
                    active: true,
                    handler: 'onGridTabClick'
                },
                {
                    xtype: 'tab',
                    itemId: 'tinhTab_IdView',
                    text: 'Cấp Tỉnh',
                    iconCls: 'x-fa fa-map-marker-alt',
                    capDonVi: 'TINH',
                    closable: false,
                    handler: 'onGridTabClick'
                },
                {
                    xtype: 'tab',
                    itemId: 'xaTab_IdView',
                    text: 'Cấp Xã',
                    iconCls: 'x-fa fa-sitemap',
                    capDonVi: 'XA',
                    closable: false,
                    handler: 'onGridTabClick'
                },
                {
                    xtype: 'tbfill'
                },
                {
                    xtype: 'button',
                    text: 'Xuất báo cáo',
                    cls: 'tcn3-btn-export-outline',
                    iconCls: 'x-fa fa-download',
                    handler: 'onExportReport'
                }
            ]
        }
    ],
    items: [
        {
            xtype: 'grid',
            itemId: 'tinhHinhDonViGrid_IdView',
            cls: 'tcn3-main-grid',
            bind: { store: '{gridStore}' },
            enableColumnHide: true,
            enableColumnMove: true,
            scrollable: 'x',
            viewConfig: {
                stripeRows: true,
                enableTextSelection: true,
                getRowClass: function (record) {
                    if (record.get('isSummary') || record.get('maDonVi') === 'TONG') {
                        return 'tcn3-summary-row';
                    }
                    return '';
                }
            },
            columns: [
                {
                    text: 'STT',
                    dataIndex: 'stt',
                    width: 50,
                    align: 'center',
                    renderer: function (val, meta, record) {
                        if (record.get('isSummary') || record.get('maDonVi') === 'TONG') {
                            return '';
                        }
                        return val;
                    }
                },
                {
                    text: 'Đơn vị',
                    dataIndex: 'tenDonVi',
                    minWidth: 200,
                    flex: 1.5,
                    renderer: function (val, meta, record) {
                        if (record.get('isSummary') || record.get('maDonVi') === 'TONG') {
                            return '<strong style="color: #1e3a8a; font-size: 13.5px;">' + Ext.String.htmlEncode(val) + '</strong>';
                        }
                        return '<a href="javascript:void(0)" class="tcn3-unit-link">' + Ext.String.htmlEncode(val) + '</a>';
                    }
                },
                {
                    text: 'Tổng số hồ sơ<br>đang quản lý',
                    dataIndex: 'tongHoSo',
                    width: 140,
                    align: 'right',
                    renderer: function (val) {
                        return '<strong>' + Number(val || 0).toLocaleString('vi-VN') + '</strong>';
                    }
                },
                {
                    text: 'Mở mới<br>trong kỳ',
                    dataIndex: 'moMoi',
                    width: 110,
                    align: 'right',
                    renderer: function (val, meta, record) {
                        const formatted = Number(val || 0).toLocaleString('vi-VN');
                        if (record.get('isSummary') || record.get('maDonVi') === 'TONG') {
                            return '<strong>' + formatted + '</strong>';
                        }
                        return formatted;
                    }
                },
                {
                    text: 'Kết thúc<br>trong kỳ',
                    dataIndex: 'ketThuc',
                    width: 110,
                    align: 'right',
                    renderer: function (val, meta, record) {
                        const formatted = Number(val || 0).toLocaleString('vi-VN');
                        if (record.get('isSummary') || record.get('maDonVi') === 'TONG') {
                            return '<strong>' + formatted + '</strong>';
                        }
                        return formatted;
                    }
                },
                {
                    text: 'Chuyển mức<br>trong kỳ',
                    dataIndex: 'chuyenMuc',
                    width: 110,
                    align: 'right',
                    renderer: function (val, meta, record) {
                        const formatted = Number(val || 0).toLocaleString('vi-VN');
                        if (record.get('isSummary') || record.get('maDonVi') === 'TONG') {
                            return '<strong>' + formatted + '</strong>';
                        }
                        return formatted;
                    }
                },
                {
                    text: 'ĐTCB',
                    dataIndex: 'dtcb',
                    width: 95,
                    align: 'right',
                    renderer: function (val, meta, record) {
                        const formatted = Number(val || 0).toLocaleString('vi-VN');
                        if (record.get('isSummary') || record.get('maDonVi') === 'TONG') {
                            return '<strong>' + formatted + '</strong>';
                        }
                        return formatted;
                    }
                },
                {
                    text: 'Sưu tra',
                    dataIndex: 'suuTra',
                    width: 95,
                    align: 'right',
                    renderer: function (val, meta, record) {
                        const formatted = Number(val || 0).toLocaleString('vi-VN');
                        if (record.get('isSummary') || record.get('maDonVi') === 'TONG') {
                            return '<strong>' + formatted + '</strong>';
                        }
                        return formatted;
                    }
                },
                {
                    text: 'Hiềm nghi',
                    dataIndex: 'hiemNghi',
                    width: 95,
                    align: 'right',
                    renderer: function (val, meta, record) {
                        const formatted = Number(val || 0).toLocaleString('vi-VN');
                        if (record.get('isSummary') || record.get('maDonVi') === 'TONG') {
                            return '<strong>' + formatted + '</strong>';
                        }
                        return formatted;
                    }
                },
                {
                    text: 'Chuyên án',
                    dataIndex: 'chuyenAn',
                    width: 95,
                    align: 'right',
                    renderer: function (val, meta, record) {
                        const formatted = Number(val || 0).toLocaleString('vi-VN');
                        if (record.get('isSummary') || record.get('maDonVi') === 'TONG') {
                            return '<strong>' + formatted + '</strong>';
                        }
                        return formatted;
                    }
                },
                {
                    text: 'CTVBM',
                    dataIndex: 'ctvbm',
                    width: 95,
                    align: 'right',
                    renderer: function (val, meta, record) {
                        const formatted = Number(val || 0).toLocaleString('vi-VN');
                        if (record.get('isSummary') || record.get('maDonVi') === 'TONG') {
                            return '<strong>' + formatted + '</strong>';
                        }
                        return formatted;
                    }
                },
                {
                    text: 'HTBM',
                    dataIndex: 'htbm',
                    width: 95,
                    align: 'right',
                    renderer: function (val, meta, record) {
                        const formatted = Number(val || 0).toLocaleString('vi-VN');
                        if (record.get('isSummary') || record.get('maDonVi') === 'TONG') {
                            return '<strong>' + formatted + '</strong>';
                        }
                        return formatted;
                    }
                },
                {
                    text: 'VANV',
                    dataIndex: 'vanv',
                    width: 95,
                    align: 'right',
                    renderer: function (val, meta, record) {
                        const formatted = Number(val || 0).toLocaleString('vi-VN');
                        if (record.get('isSummary') || record.get('maDonVi') === 'TONG') {
                            return '<strong>' + formatted + '</strong>';
                        }
                        return formatted;
                    }
                },
                {
                    text: 'NNV',
                    dataIndex: 'nnv',
                    width: 95,
                    align: 'right',
                    renderer: function (val, meta, record) {
                        const formatted = Number(val || 0).toLocaleString('vi-VN');
                        if (record.get('isSummary') || record.get('maDonVi') === 'TONG') {
                            return '<strong>' + formatted + '</strong>';
                        }
                        return formatted;
                    }
                }
            ]
        }
    ]
});
