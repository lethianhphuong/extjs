Ext.define('DEMO.view.pages.TrangChuNew.View1.TrangChuNew1_ViewFilter', {
    extend: 'Ext.form.Panel',
    xtype: 'TrangChuNew1_ViewFilter',
    reference: 'boLoc',
    cls: 'tcn-filter dash-card padding5',
    border: false,
    bodyCls: 'tcn-filter-body',
    layout: 'auto',
    defaults: { width: 160 },
    items: [
        {
            xtype: 'combobox',
            name: 'thoiGian',
            reference: 'thoiGian',
            fieldLabel: 'Thời gian',
            bind: { value: '{timKiemNangCao.thoiGian}' },
            editable: false,
            store: ['Năm 2026', 'Năm 2025', 'Quý I/2026']
        },
        {
            xtype: 'datefield',
            name: 'tuNgay',
            reference: 'tuNgay',
            fieldLabel: 'Từ ngày',
            bind: { value: '{timKiemNangCao.tuNgay}' },
            emptyText: 'dd/mm/yyyy'
        },
        {
            xtype: 'datefield',
            name: 'denNgay',
            reference: 'denNgay',
            fieldLabel: 'Đến ngày',
            bind: { value: '{timKiemNangCao.denNgay}' },
            emptyText: 'dd/mm/yyyy'
        },
        {
            xtype: 'combobox',
            name: 'donVi',
            reference: 'donVi',
            fieldLabel: 'Đơn vị',
            bind: { value: '{timKiemNangCao.donVi}' },
            editable: false,
            store: ['Toàn quốc', 'Miền Bắc', 'Miền Trung', 'Miền Nam']
        },
        {
            xtype: 'combobox',
            name: 'cucTinh',
            reference: 'cucTinh',
            fieldLabel: 'Cục/Tỉnh',
            bind: { value: '{timKiemNangCao.cucTinh}' },
            editable: false,
            store: ['CA TP. Hà Nội', 'CA TP. Hồ Chí Minh', 'CA tỉnh Thanh Hóa', 'Cục CSHS (C02)', 'Cục CSĐT Ma túy (C04)']
        },
        {
            xtype: 'combobox',
            name: 'loaiHoSo',
            reference: 'loaiHoSo',
            fieldLabel: 'Loại hồ sơ',
            bind: { value: '{timKiemNangCao.loaiHoSo}' },
            editable: false,
            store: ['Tất cả', 'ĐTCB', 'Sưu tra', 'Hiềm nghi', 'Chuyên án']
        },
        {
            xtype: 'combobox',
            name: 'heLucLuong',
            reference: 'heLucLuong',
            fieldLabel: 'Hệ lực lượng',
            bind: { value: '{timKiemNangCao.heLucLuong}' },
            editable: false,
            store: ['Tất cả', 'Ma túy', 'Kinh tế', 'Môi trường', 'Trật tự xã hội']
        },
        {
            xtype: 'combobox',
            name: 'tinhTrang',
            reference: 'tinhTrang',
            fieldLabel: 'Tình trạng hồ sơ',
            bind: { value: '{timKiemNangCao.tinhTrang}' },
            editable: false,
            store: ['Tất cả', 'Đang quản lý', 'Đã kết thúc', 'Lập mới', 'Chưa có số HS']
        },
        { xtype: 'button', text: 'Tìm kiếm', iconCls: 'x-fa fa-search', handler: 'onSearch', width: 120 }
    ]
});
