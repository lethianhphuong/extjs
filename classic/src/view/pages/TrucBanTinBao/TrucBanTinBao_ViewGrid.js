Ext.define('DEMO.view.pages.TrucBanTinBao.TrucBanTinBao_ViewGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'TrucBanTinBao_ViewGrid',

    requires: [
        'Ext.toolbar.Paging'
    ],

    bind: {
        store: '{drillGridStore}'
    },

    emptyText: 'Không có đề xuất nào khớp bộ lọc.',
    cls: 'dash-card-body',

    columns: [
        {
            text: 'Mã đề xuất',
            dataIndex: 'proposalId',
            width: 140,
            renderer: function (val) {
                return '<span style="font-family:\'Barlow Condensed\', sans-serif; color:var(--accent, #1c5cab); font-weight:700;">' + Ext.String.htmlEncode(val) + '</span>';
            }
        },
        {
            text: 'Mã vụ',
            dataIndex: 'caseId',
            width: 130,
            renderer: function (val) {
                return '<span style="font-weight:600;">' + Ext.String.htmlEncode(val) + '</span>';
            }
        },
        {
            text: 'Nhóm tội phạm',
            dataIndex: 'crimeGroup',
            width: 110,
            renderer: function (val) {
                return 'Chương ' + Ext.String.htmlEncode(val);
            }
        },
        {
            text: 'Tội danh',
            dataIndex: 'offenseName',
            flex: 1,
            minWidth: 200,
            renderer: function (val, meta, rec) {
                var offenseId = rec.get('offense');
                return '<span style="line-height:1.4;">Điều ' + Ext.String.htmlEncode(offenseId) + ' - ' + Ext.String.htmlEncode(val) + '</span>';
            }
        },
        {
            text: 'Nguồn (xã/phường)',
            dataIndex: 'xa',
            width: 130
        },
        {
            text: 'Tỉnh / TP',
            dataIndex: 'province',
            width: 130
        },
        {
            text: 'Đơn vị',
            dataIndex: 'unit',
            width: 80,
            align: 'center',
            renderer: function (val) {
                return '<strong>' + Ext.String.htmlEncode(val) + '</strong>';
            }
        },
        {
            text: 'Trạng thái',
            dataIndex: 'status',
            width: 165,
            renderer: function (val) {
                var colorMap = {
                    'Chờ duyệt đề xuất': 'var(--info, #2a78d6)',
                    'Đang chờ thẩm định': 'var(--warning, #e39400)',
                    'Yêu cầu chỉnh sửa': 'var(--serious, #e0703a)',
                    'Từ chối đề xuất': 'var(--critical, #d0342f)',
                    'Đã hoàn thành đề xuất': 'var(--good, #0c9a3d)'
                };
                var color = colorMap[val] || '#64748b';
                return '<span style="display:inline-flex; align-items:center; font-size:12px; font-weight:600;">' +
                    '<span style="display:inline-block; width:8px; height:8px; border-radius:50%; margin-right:6px; background:' + color + ';"></span>' +
                    Ext.String.htmlEncode(val) + '</span>';
            }
        },
        {
            text: 'Kết quả',
            dataIndex: 'result',
            width: 130,
            renderer: function (val) {
                if (!val) {
                    return '<span style="color:var(--theme-text-muted, #94a3b8);">—</span>';
                }
                var colorMap = {
                    'Phân công': 'var(--c1, #2a78d6)',
                    'Khởi tố': 'var(--c3, #1baf7a)',
                    'Tạm đình chỉ': 'var(--c4, #eda100)',
                    'Không khởi tố': 'var(--c-muted, #8a97ab)'
                };
                var color = colorMap[val] || '#64748b';
                return '<span style="display:inline-flex; align-items:center; font-size:12px; font-weight:600;">' +
                    '<span style="display:inline-block; width:8px; height:8px; border-radius:50%; margin-right:6px; background:' + color + ';"></span>' +
                    Ext.String.htmlEncode(val) + '</span>';
            }
        },
        {
            text: 'TH trình',
            dataIndex: 'trinh',
            width: 100,
            align: 'center',
            renderer: function (val) {
                var map = {
                    con: { text: 'Còn hạn', color: 'var(--good, #0c9a3d)' },
                    sap: { text: 'Sắp hết', color: 'var(--warning, #e39400)' },
                    qua: { text: 'Quá hạn', color: 'var(--critical, #d0342f)' },
                    na: { text: '—', color: 'var(--theme-text-muted, #94a3b8)' }
                };
                var item = map[val] || map.na;
                return '<span style="font-weight:700; color:' + item.color + ';">' + item.text + '</span>';
            }
        },
        {
            text: 'TH xử lý',
            dataIndex: 'xuly',
            width: 100,
            align: 'center',
            renderer: function (val) {
                var map = {
                    con: { text: 'Còn hạn', color: 'var(--good, #0c9a3d)' },
                    sap: { text: 'Sắp hết', color: 'var(--warning, #e39400)' },
                    qua: { text: 'Quá hạn', color: 'var(--critical, #d0342f)' },
                    na: { text: '—', color: 'var(--theme-text-muted, #94a3b8)' }
                };
                var item = map[val] || map.na;
                return '<span style="font-weight:700; color:' + item.color + ';">' + item.text + '</span>';
            }
        },
        {
            text: 'Ngày',
            dataIndex: 'date',
            width: 90,
            align: 'center',
            renderer: function (val) {
                if (!val) return '';
                var d = new Date(val);
                var dd = ('0' + d.getDate()).slice(-2);
                var mm = ('0' + (d.getMonth() + 1)).slice(-2);
                return '<span style="font-family:\'Barlow Condensed\', sans-serif; color:var(--theme-text-secondary, #64748b);">' + dd + '/' + mm + '</span>';
            }
        }
    ],

    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true,
        emptyMsg: 'Không có dữ liệu',
        beforePageText: 'Trang',
        afterPageText: 'của {0}',
        displayMsg: 'Hiển thị {0} - {1} của {2} đề xuất'
    }
});
