Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.TrangChuNew_View', {
    extend: 'Ext.container.Container',
    xtype: 'TrangChuNew_View',
    requires: [
        'DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.TrangChuNew_ViewController',
        'DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.TrangChuNew_ViewModel',
        'DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.TrangChuNew_ViewTab'
    ],
    controller: 'trangchunew',
    viewModel: 'trangchunew',
    cls: 'trang-chu-new dash-page',
    layout: 'fit',
    items: [{ xtype: 'TrangChuNew_ViewTab' }]
});
