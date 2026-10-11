Ext.define('DEMO.view.pages.ConNguoiLienQuan.ThemMoi.MoiQuanHe.MoiQuanHe_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.moiquanhe',
    data: { person: { qhGt: 'Nam' } },
    stores: {
        qhGtComboStore: {
            fields: [
                'value',
                'text'
            ],
            data: [
                {
                    value: 'Nam',
                    text: 'Nam'
                },
                {
                    value: 'Nữ',
                    text: 'Nữ'
                },
                {
                    value: 'Khác',
                    text: 'Khác'
                }
            ]
        },
        qhQuanHeComboStore: {
            fields: [
                'value',
                'text'
            ],
            data: [
                {
                    value: 'Bố',
                    text: 'Bố'
                },
                {
                    value: 'Mẹ',
                    text: 'Mẹ'
                },
                {
                    value: 'Vợ',
                    text: 'Vợ'
                },
                {
                    value: 'Chồng',
                    text: 'Chồng'
                },
                {
                    value: 'Con',
                    text: 'Con'
                },
                {
                    value: 'Anh',
                    text: 'Anh'
                },
                {
                    value: 'Chị',
                    text: 'Chị'
                },
                {
                    value: 'Em',
                    text: 'Em'
                },
                {
                    value: 'Ông',
                    text: 'Ông'
                },
                {
                    value: 'Bà',
                    text: 'Bà'
                },
                {
                    value: 'Khác',
                    text: 'Khác'
                }
            ]
        }
    }
});
