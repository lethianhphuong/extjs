Ext.define('DEMO.view.pages.ToTrinh.ToTrinh_View', {
    extend: 'Ext.grid.Panel',
    xtype: 'ToTrinh_View',

    controller: 'totrinh',
    viewModel: 'totrinh',

    bind: { store: '{toTrinhStore}' },

    style: {
        background: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
    },
    header: false,

    dockedItems: [{
        dock: 'top',
        xtype: 'container',
        layout: { type: 'vbox', align: 'stretch' },
        style: {
            background: '#ffffff',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            padding: '16px'
        },
        margin: '0 0 16 0',
        items: [
            {
                xtype: 'container',
                layout: { type: 'hbox', align: 'stretch' },
                defaults: { margin: '0 10 0 0' },
                items: [
                    {
                        xtype: 'combobox',
                        reference: 'cboLoaiVanBan',
                        fieldLabel: 'Loại văn bản',
                        emptyText: 'Tất cả',
                        width: 180,
                        editable: false,
                        bind: { value: '{timKiemNangCao.loaiVanBan}' },
                        store: {
                            fields: ['value', 'text'],
                            data: [
                                { value: 'all', text: 'Tất cả' },
                                { value: 'de_xuat', text: 'Đề xuất' },
                                { value: 'quyet_dinh', text: 'Quyết định' },
                                { value: 'cong_van', text: 'Công văn' },
                                { value: 'bien_ban', text: 'Biên bản' }
                            ]
                        },
                        valueField: 'value',
                        displayField: 'text'
                    },
                    {
                        xtype: 'textfield',
                        reference: 'txtTuKhoa',
                        fieldLabel: 'Số văn bản / tên văn bản',
                        emptyText: 'Số văn bản / tên văn bản...',
                        flex: 1,
                        bind: { value: '{timKiemNangCao.tuKhoa}' }
                    },
                    {
                        xtype: 'combobox',
                        reference: 'cboTrangThai',
                        fieldLabel: 'Trạng thái',
                        emptyText: 'Chờ thẩm tra xử lý',
                        width: 200,
                        editable: false,
                        bind: { value: '{timKiemNangCao.trangThai}' },
                        store: {
                            fields: ['value', 'text'],
                            data: [
                                { value: 'all', text: 'Tất cả' },
                                { value: 'cho_tham_tra', text: 'Chờ thẩm tra xử lý' },
                                { value: 'da_tiep_nhan', text: 'Đã tiếp nhận' },
                                { value: 'yeu_cau_chinh_sua', text: 'Yêu cầu chỉnh sửa' },
                                { value: 'cho_y_kien', text: 'Chờ ý kiến' },
                                { value: 'chi_tap_nhan', text: 'Chỉ tập nhận' }
                            ]
                        },
                        valueField: 'value',
                        displayField: 'text'
                    },
                    {
                        xtype: 'datefield',
                        fieldLabel: 'Từ ngày',
                        emptyText: 'dd/mm/yyyy',
                        width: 150
                    },
                    {
                        xtype: 'datefield',
                        fieldLabel: 'Đến ngày',
                        emptyText: 'dd/mm/yyyy',
                        width: 150
                    }
                ]
            },
            {
                xtype: 'container',
                layout: { type: 'hbox', pack: 'end' },
                margin: '10 0 0 0',
                items: [
                    {
                        xtype: 'button',
                        text: 'Làm mới',
                        iconCls: 'x-fa fa-refresh',
                        ui: 'default',
                        style: 'border-radius:6px;font-weight:600;',
                        handler: 'onLamMoi'
                    },
                    {
                        xtype: 'button',
                        text: 'Tìm kiếm',
                        iconCls: 'x-fa fa-search',
                        ui: 'soft-green',
                        margin: '0 0 0 8',
                        style: 'border-radius:6px;font-weight:600;',
                        handler: 'onTimKiem'
                    }
                ]
            }
        ]
    }],

    columns: [
        { text: 'STT', dataIndex: 'stt', width: 50, align: 'center' },
        {
            text: 'SỐ VĂN BẢN',
            dataIndex: 'soVanBan',
            width: 120,
            renderer: function (value) {
                return '<span style="color:#1d4ed8;font-weight:600;">' + value + '</span>';
            }
        },
        { text: 'TÊN VĂN BẢN', dataIndex: 'tenVanBan', flex: 2 },
        { text: 'MÃ VỤ VIỆC/VỤ ÁN', dataIndex: 'maVuAn', width: 130, align: 'center' },
        { text: 'VĂN BẢN TỔNG THỨC', dataIndex: 'vanBanTongThuc', width: 100, align: 'center' },
        { text: 'CÁN BỘ TẠO', dataIndex: 'canBoTao', width: 120 },
        { text: 'NGÀY TẠO', dataIndex: 'ngayTao', width: 110, align: 'center' },
        { text: 'LÃNH ĐẠO XỬ LÝ', dataIndex: 'lanhDaoXuLy', width: 130 },
        { text: 'NỘI DUNG YÊU CẦU CHỈNH SỬA', dataIndex: 'noiDungChinhSua', flex: 1.5 },
        {
            text: 'TRẠNG THÁI',
            dataIndex: 'trangThai',
            width: 140,
            align: 'center',
            renderer: function (value) {
                var map = {
                    'Chỉ tập nhận': { bg: '#fef2f2', color: '#dc2626' },
                    'Đã tiếp nhận': { bg: '#f0fdf4', color: '#16a34a' },
                    'Yêu cầu chỉnh sửa': { bg: '#fefce8', color: '#ca8a04' },
                    'Chờ ý kiến': { bg: '#eff6ff', color: '#2563eb' }
                };
                var s = map[value] || { bg: '#f1f5f9', color: '#64748b' };
                return '<span style="display:inline-block;padding:4px 10px;border-radius:12px;font-size:11px;font-weight:600;background:' + s.bg + ';color:' + s.color + ';">' + value + '</span>';
            }
        },
        {
            text: 'SẮP XẾP',
            width: 90,
            align: 'center',
            sortable: false,
            menuDisabled: true,
            renderer: function () {
                return '<span class="x-fa fa-arrow-circle-down" style="color:#16a34a;cursor:pointer;margin-right:6px;font-size:15px;" title="Di chuyển xuống"></span>' +
                       '<span class="x-fa fa-arrow-circle-up" style="color:#2563eb;cursor:pointer;font-size:15px;" title="Di chuyển lên"></span>';
            }
        },
        {
            xtype: 'actioncolumn',
            text: 'THAO TÁC',
            width: 110,
            align: 'center',
            sortable: false,
            menuDisabled: true,
            items: [
                { iconCls: 'x-fa fa-eye', tooltip: 'Xem chi tiết', handler: 'onXemChiTiet' },
                { iconCls: 'x-fa fa-history', tooltip: 'Lịch sử xử lý', handler: 'onXemLichSu' },
                { iconCls: 'x-fa fa-pencil', tooltip: 'Chỉnh sửa', handler: 'onChinhSua' }
            ]
        }
    ],

    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true,
        displayMsg: 'Số bản ghi/trang',
        emptyMsg: 'Không có dữ liệu',
        beforePageText: 'TRANG',
        afterPageText: '/ {0}'
    }
});
