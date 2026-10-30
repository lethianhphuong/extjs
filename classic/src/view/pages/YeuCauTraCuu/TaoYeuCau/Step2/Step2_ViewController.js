Ext.define('DEMO.view.pages.YeuCauTraCuu.TaoYeuCau.Step2.Step2_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.step2',

    setPerson: function (personData) {
        if (personData) {
            this.getViewModel().set('selectedPerson', personData);
        }
    },

    onChangePerson: function () {
        this.getView().fireEvent('changeperson');
    },

    onPurposeChange: function (field, newValue) {
        var me = this;
        me.getViewModel().set('ticket.purpose', newValue);
    },

    getTicketData: function () {
        return this.getViewModel().get('ticket');
    },

    validateTicket: function () {
        var me = this,
            vm = me.getViewModel(),
            purpose = vm.get('ticket.purpose');

        if (!purpose || !String(purpose).trim()) {
            if (typeof notiCommon !== 'undefined') {
                notiCommon.showWarning('Vui lòng nhập nội dung / mục đích tra cứu!');
            }
            return false;
        }
        return true;
    }
});
