Ext.define('DEMO.view.pages.ToTrinh.LichSuToTrinh_ViewPopup_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.lichSuToTrinhPopup',

    onClosePopup: function (btn) {
        btn.up('window').close();
    }
});
