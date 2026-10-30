Ext.define('DEMO.view.pages.YeuCauTraCuu.TaoYeuCau.TaoYeuCau_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.taoyeucau',

    onViewReady: function () {
        var me = this,
            vm = me.getViewModel(),
            step1View = me.lookup('step1View'),
            step2View = me.lookup('step2View');

        if (step1View) {
            var step1Vm = step1View.getViewModel();
            var p = step1Vm.get('selectedPerson');
            if (p) {
                vm.set('selectedPerson', p);
                if (step2View && step2View.getController()) {
                    step2View.getController().setPerson(p);
                }
            }
        }
    },

    onPersonSelectedFromStep1: function (personData) {
        var me = this,
            vm = me.getViewModel();

        vm.set('selectedPerson', personData);

        var step2View = me.lookup('step2View');
        if (step2View && step2View.getController()) {
            step2View.getController().setPerson(personData);
        }
    },

    onStep1ModeSwitch: function (mode) {
        this.getViewModel().set('step1Mode', mode);
    },

    onNextClick: function () {
        var me = this,
            vm = me.getViewModel(),
            step = vm.get('currentStep'),
            mode = vm.get('step1Mode'),
            step1View = me.lookup('step1View'),
            step2View = me.lookup('step2View'),
            step3View = me.lookup('step3View');

        if (step === 0) {
            if (mode === 1) {
                if (step1View) {
                    step1View.getController().onSaveNewPerson();
                }
            } else {
                var p = vm.get('selectedPerson');
                if (!p) {
                    if (typeof notiCommon !== 'undefined') {
                        notiCommon.showWarning('Vui lòng chọn một con người để tiếp tục!');
                    }
                    return;
                }
                if (step2View) {
                    step2View.getViewModel().set('selectedPerson', p);
                }
                vm.set('currentStep', 1);
            }
        } else if (step === 1) {
            if (step2View) {
                var isValid = step2View.getController().validateTicket();
                if (!isValid) return;

                var ticketData = step2View.getController().getTicketData();
                vm.set('ticket', ticketData);

                var person = vm.get('selectedPerson');
                vm.set('currentStep', 2);

                if (step3View) {
                    step3View.getController().renderPreview(person, ticketData);
                }
            }
        } else if (step === 2) {
            window.print();
        }
    },

    onPrevClick: function () {
        var me = this,
            vm = me.getViewModel(),
            step = vm.get('currentStep'),
            mode = vm.get('step1Mode'),
            step1View = me.lookup('step1View');

        if (step === 0) {
            if (mode === 1) {
                if (step1View) {
                    step1View.getController().onSwitchToSearch();
                }
            } else {
                me.onCloseWindow();
            }
        } else if (step === 1) {
            vm.set('currentStep', 0);
        } else if (step === 2) {
            vm.set('currentStep', 1);
        }
    },

    onBackToStep1: function () {
        this.getViewModel().set('currentStep', 0);
    },

    onCloseWindow: function () {
        this.getView().close();
    },

    onPrintTicket: function () {
        window.print();
    },

    onDownloadPdf: function () {
        if (typeof notiCommon !== 'undefined') {
            notiCommon.showSuccess('Đang xuất tệp PDF phiếu yêu cầu tra cứu...');
        }
    },

    onFinishTicket: function () {
        var me = this,
            vm = me.getViewModel(),
            p = vm.get('selectedPerson') || {},
            t = vm.get('ticket') || {},
            dateFormatted = t.date ? (Ext.isDate(t.date) ? Ext.Date.format(t.date, 'd/m/Y') : t.date) : '24/10/2026';

        var newRecord = {
            id: 'tk_' + Ext.id(),
            maPhieu: t.code,
            hoTen: p.name,
            maNguoi: p.code,
            cccd: p.cccd,
            loaiTraCuu: t.type,
            mucDoUuTien: t.priority,
            ngayYeuCau: dateFormatted,
            donViYeuCau: t.unit || 'Phòng Nghiệp vụ',
            noiDung: t.purpose,
            trangThai: 'Mới tạo'
        };

        me.getView().fireEvent('ticketcreated', newRecord);

        if (typeof notiCommon !== 'undefined') {
            notiCommon.showSuccess('Tạo phiếu yêu cầu tra cứu ' + t.code + ' thành công!');
        }

        me.getView().close();
    }
});
