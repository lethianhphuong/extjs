Ext.define('DEMO.view.pages.YeuCauTraCuu.TaoYeuCau.Step3.Step3_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.step3',

    /**
     * Cập nhật dữ liệu vào ViewModel để View tự động render qua cơ chế Data Binding
     */
    renderPreview: function (personData, ticketData) {
        var vm = this.getViewModel();
        if (personData) vm.set('selectedPerson', personData);
        if (ticketData) vm.set('ticket', ticketData);
    },

    onPrintTicket: function () {
        window.print();
    },

    onDownloadPdf: function () {
        if (typeof notiCommon !== 'undefined') {
            notiCommon.showSuccess('Đang xuất tệp PDF phiếu yêu cầu tra cứu...');
        }
    }
});
