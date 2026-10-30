Ext.define('DEMO.view.pages.YeuCauTraCuu.TaoYeuCau.Step1.Step1_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.step1',

    data: {
        step1Mode: 0, // 0: Search, 1: Create
        searchKeyword: '',
        selectedPerson: null,
        justCreated: false,
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
        countText: function (get) {
            var count = get('peopleStore.count') || 0;
            var q = (get('searchKeyword') || '').trim();
            if (q) {
                return count + ' kết quả cho “' + Ext.util.Format.htmlEncode(q) + '”';
            }
            return count + ' kết quả gần đây';
        },

        hasNoResults: function (get) {
            var count = get('peopleStore.count');
            return count === 0;
        },

        emptyMessage: function (get) {
            var q = (get('searchKeyword') || '').trim();
            return 'Không tìm thấy kết quả cho “' + Ext.util.Format.htmlEncode(q) + '”';
        },

        canSaveNewPerson: function (get) {
            var name = get('newPerson.name');
            return !!(name && name.trim().length > 0);
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
