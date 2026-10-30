Ext.define('DEMO.view.pages.YeuCauTraCuu.TaoYeuCau.TaoYeuCau_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.taoyeucau',

    data: {
        currentStep: 0, // 0: Bước 1, 1: Bước 2, 2: Bước 3
        step1Mode: 0,   // 0: Search, 1: Create
        searchKeyword: '',
        selectedPerson: null,
        justCreated: false,

        ticket: {
            code: 'PYC-20261024-0001',
            date: new Date(),
            type: 'Tra cứu nhân thân',
            priority: 'Thường',
            unit: '',
            purpose: ''
        },

        newPerson: {
            name: '',
            dob: null,
            gender: 'Nam',
            cccd: '',
            phone: '',
            address: ''
        }
    },

    formulas: {
        dialogSubtitle: function (get) {
            var step = get('currentStep');
            var mode = get('step1Mode');
            if (step === 0) {
                return mode === 1 ? 'Bước 1/3 · Tạo mới con người' : 'Bước 1/3 · Chọn người cần tra cứu';
            }
            if (step === 1) {
                return 'Bước 2/3 · Lập phiếu yêu cầu';
            }
            return 'Bước 3/3 · Xuất biểu mẫu';
        },

        isStep1: function (get) { return get('currentStep') === 0; },
        isStep2: function (get) { return get('currentStep') === 1; },
        isStep3: function (get) { return get('currentStep') === 2; },

        canContinueStep1: function (get) {
            return !!get('selectedPerson');
        },

        canContinueStep2: function (get) {
            var p = get('ticket.purpose');
            return !!(p && String(p).trim().length > 0);
        },

        canContinue: function (get) {
            var step = get('currentStep');
            var mode = get('step1Mode');
            if (step === 0) {
                return mode === 1 ? !!(get('newPerson.name') && get('newPerson.name').trim().length > 0) : !!get('selectedPerson');
            }
            if (step === 1) {
                return get('canContinueStep2');
            }
            return true;
        },

        footerHint: function (get) {
            var step = get('currentStep');
            var mode = get('step1Mode');
            var person = get('selectedPerson');
            if (step === 0) {
                if (mode === 1) return 'Tạo mới con người';
                return person ? ('Đã chọn: ' + person.name) : 'Chưa chọn con người nào';
            }
            if (step === 1) {
                return 'Bước tiếp theo sẽ sinh mã QR cho con người và phiếu';
            }
            return 'Biểu mẫu đã sẵn sàng để in hoặc tải về';
        },

        nextBtnText: function (get) {
            var step = get('currentStep');
            var mode = get('step1Mode');
            if (step === 0) {
                return mode === 1 ? 'Lưu và chọn người này' : 'Tiếp tục';
            }
            if (step === 1) {
                return 'Tạo phiếu và tiếp tục';
            }
            return 'In biểu mẫu';
        },

        prevBtnText: function (get) {
            var step = get('currentStep');
            var mode = get('step1Mode');
            if (step === 0) {
                return mode === 1 ? 'Quay lại tìm kiếm' : 'Huỷ';
            }
            return 'Quay lại';
        },

        personInitials: function (get) {
            var p = get('selectedPerson');
            if (!p || !p.name) return 'ND';
            var parts = p.name.trim().split(/\s+/);
            if (parts.length >= 2) {
                return (parts[parts.length - 2][0] + parts[parts.length - 1][0]).toUpperCase();
            }
            return parts[0].substring(0, 2).toUpperCase();
        },

        personMetaFormatted: function (get) {
            var p = get('selectedPerson');
            if (!p) return '';
            var dob = p.dob ? (Ext.isDate(p.dob) ? Ext.Date.format(p.dob, 'd/m/Y') : p.dob) : '—';
            return dob + ' · ' + (p.gender || 'Nam') + ' · CCCD ' + (p.cccd || '—') + ' · ' + (p.phone || '—');
        },

        ticketDateFormat: function (get) {
            var d = get('ticket.date');
            return d ? (Ext.isDate(d) ? Ext.Date.format(d, 'd/m/Y') : d) : '24/10/2026';
        },

        stepperHtml: function (get) {
            var step = get('currentStep');
            var checkSvg = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"></path></svg>';

            var dot1Cls = step === 0 ? 'dot dot-on' : 'dot dot-done';
            var dot1Content = step === 0 ? '<span>1</span>' : checkSvg;
            var slb1Cls = step === 0 ? 'slb slb-on' : 'slb slb-done';
            var ln1Cls = step > 0 ? 'ln ln-done' : 'ln';

            var dot2Cls = step === 1 ? 'dot dot-on' : (step > 1 ? 'dot dot-done' : 'dot dot-off');
            var dot2Content = step > 1 ? checkSvg : '<span>2</span>';
            var slb2Cls = step === 1 ? 'slb slb-on' : (step > 1 ? 'slb slb-done' : 'slb');
            var ln2Cls = step > 1 ? 'ln ln-done' : 'ln';

            var dot3Cls = step === 2 ? 'dot dot-on' : 'dot dot-off';
            var slb3Cls = step === 2 ? 'slb slb-on' : 'slb';

            return [
                '<div class="pyc-stepper-inner">',
                    // Step 1
                    '<div class="pyc-step-item">',
                        '<div class="' + dot1Cls + '">' + dot1Content + '</div>',
                        '<span class="' + slb1Cls + '">Tìm hoặc tạo con người</span>',
                        '<div class="' + ln1Cls + '"></div>',
                    '</div>',
                    // Step 2
                    '<div class="pyc-step-item">',
                        '<div class="' + dot2Cls + '">' + dot2Content + '</div>',
                        '<span class="' + slb2Cls + '">Tạo phiếu yêu cầu tra cứu</span>',
                        '<div class="' + ln2Cls + '"></div>',
                    '</div>',
                    // Step 3
                    '<div class="pyc-step-item pyc-step-item--last">',
                        '<div class="' + dot3Cls + '"><span>3</span></div>',
                        '<span class="' + slb3Cls + '">Biểu mẫu & mã QR</span>',
                    '</div>',
                '</div>'
            ].join('');
        }
    },

    stores: {
        peopleStore: {
            fields: ['id', 'code', 'name', 'dob', 'gender', 'cccd', 'phone', 'address', 'initials', 'meta'],
            data: [
                { id: 'p1', code: 'ND-000124', name: 'Nguyễn Văn An', dob: '12/03/1985', gender: 'Nam', cccd: '001085012345', phone: '0903 123 456', address: 'Quận 1, TP. Hồ Chí Minh', initials: 'VA', meta: '12/03/1985 · Nam · CCCD 001085012345 · 0903 123 456' },
                { id: 'p2', code: 'ND-000131', name: 'Trần Thị Bích Ngọc', dob: '27/09/1992', gender: 'Nữ', cccd: '001192067890', phone: '0912 456 789', address: 'Ba Đình, Hà Nội', initials: 'BN', meta: '27/09/1992 · Nữ · CCCD 001192067890 · 0912 456 789' },
                { id: 'p3', code: 'ND-000147', name: 'Lê Minh Quân', dob: '05/01/1978', gender: 'Nam', cccd: '001078034567', phone: '0987 654 321', address: 'Hải Châu, Đà Nẵng', initials: 'MQ', meta: '05/01/1978 · Nam · CCCD 001078034567 · 0987 654 321' },
                { id: 'p4', code: 'ND-000152', name: 'Phạm Thu Hà', dob: '19/06/2001', gender: 'Nữ', cccd: '001301089012', phone: '0934 111 222', address: 'Ninh Kiều, Cần Thơ', initials: 'TH', meta: '19/06/2001 · Nữ · CCCD 001301089012 · 0934 111 222' },
                { id: 'p5', code: 'ND-000168', name: 'Nguyễn Hoàng Long', dob: '30/11/1969', gender: 'Nam', cccd: '001069045678', phone: '0868 333 444', address: 'Hạ Long, Quảng Ninh', initials: 'HL', meta: '30/11/1969 · Nam · CCCD 001069045678 · 0868 333 444' }
            ]
        }
    }
});
