Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View2.TrangChuNew2_ViewSuuTra', {
    extend: 'Ext.container.Container',
    xtype: 'TrangChuNew2_ViewSuuTra',
    requires: ['DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View2.TrangChuNew2_ViewDonut'],
    cls: 'tcn2-section tcn2-suu-tra',
    layout: { type: 'vbox', align: 'stretch' },
    items: [
        {
            xtype: 'component',
            cls: 'tcn2-section-header',
            style: 'text-align: center;',
            html: '<h2 style="text-align: center; margin: 0 0 10px;">Sưu tra</h2>'
        },
        {
            xtype: 'container',
            cls: 'tcn2-card-grid',
            items: [
                { xtype: 'TrangChuNew2_ViewDonut', nhom: 'phanLoai' },
                { xtype: 'TrangChuNew2_ViewDonut', nhom: 'danhMuc' },
                { xtype: 'TrangChuNew2_ViewDonut', nhom: 'doiTuong' }
            ]
        }
    ]
});
