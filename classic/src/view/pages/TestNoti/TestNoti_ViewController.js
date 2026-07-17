Ext.define('DEMO.view.pages.TestNoti.TestNoti_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.testnoti',

    onTestSuccess: function () {
        notiCommon.show({
            message: 'Luu du lieu thanh cong!',
            type: 'success'
        });
    },

    onTestError: function () {
        notiCommon.show({
            title: 'Loi he thong',
            message: 'Khong the ket noi toi may chu. Vui long thu lai sau.',
            type: 'error'
        });
    },

    onTestWarning: function () {
        notiCommon.show({
            message: 'Ban con 5 ngay de hoan thanh tac vu nay.',
            type: 'warning'
        });
    },

    onTestInfo: function () {
        notiCommon.show({
            message: 'Phien ban he thong hien tai: v1.0.0',
            type: 'info'
        });
    },

    onTestConfirm: function () {
        notiCommon.show({
            title: 'Xoa ban ghi',
            message: 'Ban co chac chan muon xoa ban ghi nay? Thao tac nay khong the hoan tac.',
            type: 'confirm',
            confirmText: 'Xoa',
            cancelText: 'Huy',
            onConfirm: function () {
                Ext.toast({
                    html: 'Da xoa ban ghi thanh cong',
                    title: 'Thanh cong',
                    align: 't',
                    ui: 'success',
                    closable: false
                });
            },
            onCancel: function () {
                Ext.toast({
                    html: 'Da huy thao tac',
                    title: 'Thong bao',
                    align: 't',
                    ui: 'info',
                    closable: false
                });
            }
        });
    },

    onTestGrid: function () {
        notiCommon.showCustom({
            title: 'Danh sach loi validation',
            type: 'error',
            showGrid: true,
            gridColumns: [
                { text: 'STT', dataIndex: 'stt', width: 50 },
                { text: 'Truong', dataIndex: 'truong', width: 140 },
                { text: 'Loi', dataIndex: 'loi', flex: 1 }
            ],
            gridData: [
                { stt: 1, truong: 'Ho ten', loi: 'Khong duoc de trong' },
                { stt: 2, truong: 'Email', loi: 'Sai dinh dang' },
                { stt: 3, truong: 'So dien thoai', loi: 'Phai la so hop le' },
                { stt: 4, truong: 'Dia chi', loi: 'Khong duoc de trong' },
                { stt: 5, truong: 'Ngay sinh', loi: 'Ngay khong hop le' }
            ],
            autoClose: 8000
        });
    },

    onTestCustomHtml: function () {
        notiCommon.showCustom({
            title: 'Noi dung tuy chinh',
            type: 'info',
            customHtml: '<div style="padding:24px;">' +
                '<h3 style="color:var(--theme-text-primary, #1e293b);margin:0 0 12px 0;">Bao cao tong hop</h3>' +
                '<table style="width:100%;border-collapse:collapse;font-size:13px;color:var(--theme-text-primary, #1e293b);">' +
                '<tr style="background:var(--theme-bg-card-hover, #f9fafb);"><td style="padding:8px;border-bottom:1px solid var(--theme-border, #e2e8f0);">Tong so vu</td><td style="padding:8px;border-bottom:1px solid var(--theme-border, #e2e8f0);text-align:right;font-weight:600;">1,234</td></tr>' +
                '<tr><td style="padding:8px;border-bottom:1px solid var(--theme-border, #e2e8f0);">Dang xu ly</td><td style="padding:8px;border-bottom:1px solid var(--theme-border, #e2e8f0);text-align:right;font-weight:600;">456</td></tr>' +
                '<tr style="background:var(--theme-bg-card-hover, #f9fafb);"><td style="padding:8px;border-bottom:1px solid var(--theme-border, #e2e8f0);">Hoan thanh</td><td style="padding:8px;border-bottom:1px solid var(--theme-border, #e2e8f0);text-align:right;font-weight:600;">778</td></tr>' +
                '</table></div>'
        });
    }
});
