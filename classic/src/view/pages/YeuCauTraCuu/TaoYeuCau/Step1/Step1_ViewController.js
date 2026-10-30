Ext.define('DEMO.view.pages.YeuCauTraCuu.TaoYeuCau.Step1.Step1_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.step1',

    init: function () {
        var me = this,
            vm = me.getViewModel(),
            store = vm.getStore('peopleStore');

        if (store && store.getCount() > 1) {
            var defaultPerson = store.getAt(1).getData();
            vm.set('selectedPerson', defaultPerson);
        }
    },

    onSearchChange: function (field, newValue) {
        var me = this,
            vm = me.getViewModel(),
            store = vm.getStore('peopleStore');

        if (!store) return;
        var val = (newValue || '').trim();
        vm.set('searchKeyword', val);
        vm.set('justCreated', false);

        var valNorm = val.toLowerCase();
        store.clearFilter();
        if (valNorm) {
            store.filterBy(function (rec) {
                var name = (rec.get('name') || '').toLowerCase(),
                    cccd = (rec.get('cccd') || '').toLowerCase(),
                    phone = (rec.get('phone') || '').toLowerCase();
                return name.includes(valNorm) || cccd.includes(valNorm) || phone.includes(valNorm);
            });
        }
    },

    onPersonSelect: function (dataview, record) {
        var me = this,
            vm = me.getViewModel(),
            personData = record.getData();

        vm.set('selectedPerson', personData);
        vm.set('justCreated', false);
        me.getView().fireEvent('personselected', personData);
    },

    onSwitchToCreate: function () {
        var me = this,
            vm = me.getViewModel(),
            q = (vm.get('searchKeyword') || '').trim();

        vm.set('step1Mode', 1);
        vm.set('newPerson', {
            name: q || '',
            dob: null,
            gender: 'Nam',
            cccd: '',
            phone: '',
            address: ''
        });
        me.getView().fireEvent('modeswitch', 1);
    },

    onSwitchToSearch: function () {
        var me = this;
        me.getViewModel().set('step1Mode', 0);
        me.getView().fireEvent('modeswitch', 0);
    },

    onSaveNewPerson: function () {
        var me = this,
            vm = me.getViewModel(),
            np = vm.get('newPerson');

        if (!np.name || !np.name.trim()) {
            if (typeof notiCommon !== 'undefined') {
                notiCommon.showWarning('Vui lòng nhập họ và tên!');
            }
            return;
        }

        var store = vm.getStore('peopleStore'),
            newCode = 'ND-' + Ext.String.leftPad(store.getCount() + 125, 6, '0'),
            dobStr = np.dob ? (Ext.isDate(np.dob) ? Ext.Date.format(np.dob, 'd/m/Y') : np.dob) : '—',
            metaStr = dobStr + ' · ' + (np.gender || 'Nam') + ' · CCCD ' + (np.cccd || '—') + ' · ' + (np.phone || '—');

        var parts = np.name.trim().split(/\s+/),
            initials = parts.length >= 2 ? (parts[parts.length - 2][0] + parts[parts.length - 1][0]).toUpperCase() : 'ND';

        var newPersonData = {
            id: 'p_' + Ext.id(),
            code: newCode,
            name: np.name.trim(),
            dob: dobStr,
            gender: np.gender || 'Nam',
            cccd: np.cccd ? np.cccd.trim() : '—',
            phone: np.phone ? np.phone.trim() : '—',
            address: np.address ? np.address.trim() : '',
            initials: initials,
            meta: metaStr
        };

        // Reset filter để người mới tạo hiện lên
        store.clearFilter();
        vm.set('searchKeyword', '');
        var searchFld = me.lookup('searchField');
        if (searchFld) {
            searchFld.setValue('');
        }

        var insertedRec = store.insert(0, newPersonData)[0];
        vm.set('selectedPerson', newPersonData);
        vm.set('justCreated', true);
        vm.set('step1Mode', 0);

        var dataview = me.lookup('peopleDataView');
        if (dataview && insertedRec) {
            dataview.getSelectionModel().select(insertedRec);
        }

        me.getView().fireEvent('personselected', newPersonData);
        me.getView().fireEvent('modeswitch', 0);

        if (typeof notiCommon !== 'undefined') {
            notiCommon.showSuccess('Đã thêm mới con người và tự động chọn!');
        }
    }
});
