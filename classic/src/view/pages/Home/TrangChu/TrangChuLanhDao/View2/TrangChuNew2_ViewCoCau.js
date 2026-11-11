Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View2.TrangChuNew2_ViewCoCau', {
    extend: 'Ext.container.Container',
    xtype: 'TrangChuNew2_ViewCoCau',
    requires: ['DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View2.TrangChuNew2_ViewDonut'],
    cls: 'tcn2-section tcn2-suu-tra tcn2-co-cau',
    layout: { type: 'vbox', align: 'stretch' },
    items: [
        {
            xtype: 'component',
            cls: 'tcn2-section-header',
            style: 'text-align: center;',
            html: '<h2 style="text-align: center; margin: 0 0 10px;">Cơ cấu phân loại</h2>'
        },
        {
            xtype: 'container',
            cls: 'tcn2-card-grid',
            items: [
                { xtype: 'TrangChuNew2_ViewDonut', nhom: 'dtcb' },
                { xtype: 'TrangChuNew2_ViewDonut', nhom: 'hiemNghi' },
                { xtype: 'TrangChuNew2_ViewDonut', nhom: 'chuyenAn' },
                { xtype: 'TrangChuNew2_ViewDonut', nhom: 'ctvbm' }
            ]
        }
    ]
});
