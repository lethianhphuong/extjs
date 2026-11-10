Ext.define('DEMO.view.pages.TrangChuNew.TrangChuNew_ViewTab', {
    extend: 'Ext.tab.Panel',
    xtype: 'TrangChuNew_ViewTab',
    requires: [
        'DEMO.view.pages.TrangChuNew.View1.TrangChuNew1_View',
        'DEMO.view.pages.TrangChuNew.View2.TrangChuNew2_View',
        'DEMO.view.pages.TrangChuNew.View3.TrangChuNew3_View',
        'Ext.chart.PolarChart',
        'Ext.chart.CartesianChart',
        'Ext.chart.series.Pie',
        'Ext.chart.series.Bar',
        'Ext.chart.series.Line',
        'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Category',
        'DEMO.view.pages.TrangChuNew.View5.TrangChuNew5_MockData',
        'DEMO.view.pages.TrangChuNew.View5.TrangChuNew5_View',
        'DEMO.view.pages.TrangChuNew.View5.TrangChuNew5_ViewBarChart',
        'DEMO.view.pages.TrangChuNew.View5.TrangChuNew5_ViewController',
        'DEMO.view.pages.TrangChuNew.View5.TrangChuNew5_ViewDienBienChart',
        'DEMO.view.pages.TrangChuNew.View5.TrangChuNew5_ViewDonVi',
        'DEMO.view.pages.TrangChuNew.View5.TrangChuNew5_ViewLucLuong',
        'DEMO.view.pages.TrangChuNew.View5.TrangChuNew5_ViewModel',
        'DEMO.view.pages.TrangChuNew.View5.TrangChuNew5_ViewThongKe',
        'DEMO.view.pages.TrangChuNew.View5.TrangChuNew5_ViewTopDonVi',
        'DEMO.view.pages.TrangChuNew.View6.TrangChuNew6_MockData',
        'DEMO.view.pages.TrangChuNew.View6.TrangChuNew6_View',
        'DEMO.view.pages.TrangChuNew.View6.TrangChuNew6_ViewCanBo',
        'DEMO.view.pages.TrangChuNew.View6.TrangChuNew6_ViewController',
        'DEMO.view.pages.TrangChuNew.View6.TrangChuNew6_ViewGrid',
        'DEMO.view.pages.TrangChuNew.View6.TrangChuNew6_ViewKetQua',
        'DEMO.view.pages.TrangChuNew.View6.TrangChuNew6_ViewModel'
    ],
    activeTab: 0,
    border: false,
    items: [{
        xtype: 'TrangChuNew1_View',
        title: 'view1',
        closable: false
    }, {
        xtype: 'TrangChuNew2_View',
        title: 'view2',
        closable: false
    },
    {
        xtype: 'TrangChuNew3_View',
        title: 'view3',
        closable: false
    }, {
        xtype: 'TrangChuNew5_View',
        title: 'view5',
        closable: false
    }, {
        xtype: 'TrangChuNew6_View',
        title: 'view6',
        closable: false
    }]
});
