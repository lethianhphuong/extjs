Ext.define('DEMO.view.pages.XemPdfDemo.XemPdfDemo_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.xempdfdemo',

    stores: {
        sampleDocStore: {
            fields: ['stt', 'soVanBan', 'tenVanBan', 'ngayTao', 'loaiFile', 'linkPdf'],
            data: [
                {
                    stt: 1,
                    soVanBan: 'VB-2026/001',
                    tenVanBan: 'Hướng dẫn WCAG 2.1 cho PDF',
                    ngayTao: '15/07/2026',
                    loaiFile: 'PDF',
                    linkPdf: 'resources/pdf/huong-dan-wcag.pdf'
                },
                {
                    stt: 2,
                    soVanBan: 'VB-2026/002',
                    tenVanBan: 'Mẫu hợp đồng dịch vụ',
                    ngayTao: '18/07/2026',
                    loaiFile: 'PDF',
                    linkPdf: 'resources/pdf/hop-dong-dich-vu.pdf'
                },
                {
                    stt: 3,
                    soVanBan: 'VB-2026/003',
                    tenVanBan: 'Báo cáo tài chính quý 2/2026',
                    ngayTao: '20/07/2026',
                    loaiFile: 'PDF',
                    linkPdf: 'resources/pdf/bao-cao-tai-chinh.pdf'
                }
            ]
        }
    }
});
