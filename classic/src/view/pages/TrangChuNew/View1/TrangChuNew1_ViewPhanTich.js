Ext.define('DEMO.view.pages.TrangChuNew.View1.TrangChuNew1_ViewPhanTich', {
    extend: 'Ext.container.Container',
    xtype: 'TrangChuNew1_ViewPhanTich',
    cls: 'tcn-analysis',
    layout: 'auto',
    items: [
        {
            xtype: 'component',
            cls: 'tcn-card dash-card',
            bind: { data: '{trangThai}' },
            tpl: [
                '<h2>Số hồ sơ theo trạng thái</h2><div class="tcn-status">',
                '<tpl for="."><div class="tcn-status-column"><strong>{giaTri:htmlEncode}</strong>',
                '<div class="tcn-bar tcn-bg-{mau:htmlEncode}" style="height:{tyLe}%"></div>',
                '<span>{ten:htmlEncode}</span></div></tpl></div>',
                '<p class="tcn-note">Phân bổ hồ sơ theo từng giai đoạn xử lý</p>'
            ]
        },
        {
            xtype: 'component',
            cls: 'tcn-card dash-card',
            bind: { data: '{dtcb}' },
            tpl: ['<h2>Hiệu quả công tác ĐTCB <small>Chuyển hóa</small></h2>', '<tpl for="."><div class="tcn-value-row"><span>{ten:htmlEncode}</span><strong>{giaTri:htmlEncode}</strong></div></tpl>']
        },
        {
            xtype: 'component',
            cls: 'tcn-card dash-card',
            bind: { data: '{suuTra}' },
            tpl: ['<h2>Hiệu quả công tác Sưu tra <small>Chuyển hóa</small></h2>', '<tpl for="."><div class="tcn-value-row"><span>{ten:htmlEncode}</span><strong>{giaTri:htmlEncode}</strong></div></tpl>']
        },
        {
            xtype: 'component',
            cls: 'tcn-card dash-card',
            bind: { data: '{lucLuong}' },
            tpl: ['<h2>Hồ sơ theo hệ lực lượng</h2>', '<tpl for="."><div class="tcn-value-row"><span>{ten:htmlEncode}</span><strong>{giaTri:htmlEncode}</strong></div></tpl>']
        }
    ]
});
