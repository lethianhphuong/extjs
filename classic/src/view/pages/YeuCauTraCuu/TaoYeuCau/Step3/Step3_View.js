Ext.define('DEMO.view.pages.YeuCauTraCuu.TaoYeuCau.Step3.Step3_View', {
    extend: 'Ext.container.Container',
    xtype: 'Step3_View',

    requires: [
        'DEMO.view.pages.YeuCauTraCuu.TaoYeuCau.Step3.Step3_ViewController',
        'DEMO.view.pages.YeuCauTraCuu.TaoYeuCau.Step3.Step3_ViewModel'
    ],

    controller: 'step3',
    viewModel: 'step3',

    cls: 'pyc-dialog-body',
    scrollable: 'y',
    style: 'padding: 16px 28px !important;',
    layout: { type: 'vbox', align: 'stretch' },

    items: [
        {
            xtype: 'component',
            reference: 'previewContainer',
            bind: {
                data: {
                    person: '{selectedPerson}',
                    ticket: '{ticket}',
                    dateFormatted: '{ticketDateFormat}',
                    dobFormatted: '{personDobFormat}',
                    qrPersonSvg: '{qrPersonSvg}',
                    qrTicketSvg: '{qrTicketSvg}',
                    purposeStr: '{purposeDisplay}',
                    unitStr: '{unitDisplay}'
                }
            },
            tpl: new Ext.XTemplate(
                // --- Banner thông báo thành công ---
                '<div class="pyc-alert-banner" style="display: flex; align-items: center; gap: 10px; background: #E7F4EC; color: #14532D; font-size: 13px; font-weight: 600; padding: 10px 16px; border-radius: 8px; margin-bottom: 14px;">',
                    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#14532D" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" style="flex: none;"><circle cx="12" cy="12" r="9"></circle><path d="M8 12.5l4.5 4.5L19 7.5"></path></svg>',
                    '<span>Đã tạo phiếu {ticket.code} cho {person.name}.</span>',
                '</div>',

                // --- Biểu mẫu phiếu yêu cầu ---
                '<div class="pyc-ticket-sheet" style="background: #ffffff; border: 1px solid #D5DAE1; border-radius: 8px; padding: 20px 24px; box-sizing: border-box; font-family: inherit;">',
                    // --- Header (chỉ có duy nhất 1 đường viền gạch dưới) ---
                    '<div class="pyc-ticket-sheet__header" style="display: flex; justify-content: space-between; align-items: flex-start; padding-bottom: 12px; border-bottom: 2px solid #1B2430; margin-bottom: 16px;">',
                        '<div>',
                            '<div style="font-size: 12px; font-weight: 600; letter-spacing: 0.08em; color: #566172; text-transform: uppercase;">BIỂU MẪU</div>',
                            '<div style="font-size: 18px; font-weight: 700; color: #1B2430; margin-top: 2px;">PHIẾU YÊU CẦU TRA CỨU</div>',
                        '</div>',
                        '<div style="text-align: right;">',
                            '<div style="font-size: 12px; color: #566172;">Mã phiếu</div>',
                            '<div style="font-size: 16px; font-weight: 700; color: #0F5C8C; margin-top: 2px;">{ticket.code}</div>',
                        '</div>',
                    '</div>',

                    // --- Body: 2 cột (Cột trái: Thông tin bảng 2 cột | Cột phải: 2 mã QR) ---
                    '<div class="pyc-ticket-sheet__body" style="display: flex; justify-content: space-between; align-items: flex-start; gap: 24px;">',
                        // Cột trái: Danh sách thông tin
                        '<div style="flex: 1; min-width: 0;">',
                            '<table style="width: 100%; border-collapse: collapse; font-family: inherit;">',
                                '<tbody>',
                                    '<tr style="line-height: 24px;">',
                                        '<td style="width: 120px; color: #566172; font-size: 13px; vertical-align: top; padding: 2px 0;">Họ và tên</td>',
                                        '<td style="color: #1B2430; font-size: 13px; font-weight: 700; vertical-align: top; padding: 2px 0;">{person.name}</td>',
                                    '</tr>',
                                    '<tr style="line-height: 24px;">',
                                        '<td style="color: #566172; font-size: 13px; vertical-align: top; padding: 2px 0;">Mã con người</td>',
                                        '<td style="color: #1B2430; font-size: 13px; font-weight: 700; vertical-align: top; padding: 2px 0;">{person.code}</td>',
                                    '</tr>',
                                    '<tr style="line-height: 24px;">',
                                        '<td style="color: #566172; font-size: 13px; vertical-align: top; padding: 2px 0;">Ngày sinh</td>',
                                        '<td style="color: #1B2430; font-size: 13px; vertical-align: top; padding: 2px 0;">{dobFormatted}</td>',
                                    '</tr>',
                                    '<tr style="line-height: 24px;">',
                                        '<td style="color: #566172; font-size: 13px; vertical-align: top; padding: 2px 0;">CCCD</td>',
                                        '<td style="color: #1B2430; font-size: 13px; vertical-align: top; padding: 2px 0;">{person.cccd}</td>',
                                    '</tr>',
                                    '<tr style="line-height: 24px;">',
                                        '<td style="color: #566172; font-size: 13px; vertical-align: top; padding: 2px 0;">Điện thoại</td>',
                                        '<td style="color: #1B2430; font-size: 13px; vertical-align: top; padding: 2px 0;">{person.phone}</td>',
                                    '</tr>',
                                    '<tr style="line-height: 24px;">',
                                        '<td style="color: #566172; font-size: 13px; vertical-align: top; padding: 2px 0;">Loại tra cứu</td>',
                                        '<td style="color: #1B2430; font-size: 13px; vertical-align: top; padding: 2px 0;">{ticket.type} · Ưu tiên: <strong>{ticket.priority}</strong></td>',
                                    '</tr>',
                                    '<tr style="line-height: 24px;">',
                                        '<td style="color: #566172; font-size: 13px; vertical-align: top; padding: 2px 0;">Ngày yêu cầu</td>',
                                        '<td style="color: #1B2430; font-size: 13px; vertical-align: top; padding: 2px 0;">{dateFormatted}</td>',
                                    '</tr>',
                                    '<tr style="line-height: 24px;">',
                                        '<td style="color: #566172; font-size: 13px; vertical-align: top; padding: 2px 0;">Đơn vị yêu cầu</td>',
                                        '<td style="color: #1B2430; font-size: 13px; vertical-align: top; padding: 2px 0;">{unitStr}</td>',
                                    '</tr>',
                                    '<tr style="line-height: 24px;">',
                                        '<td style="color: #566172; font-size: 13px; vertical-align: top; padding: 2px 0;">Nội dung</td>',
                                        '<td style="color: #1B2430; font-size: 13px; vertical-align: top; padding: 2px 0; word-break: break-word; white-space: pre-wrap;">{purposeStr}</td>',
                                    '</tr>',
                                '</tbody>',
                            '</table>',
                        '</div>',

                        // Cột phải: 2 mã QR cạnh nhau
                        '<div style="display: flex; gap: 16px; align-items: flex-start; flex: none;">',
                            // QR 1: Con người
                            '<div style="display: flex; flex-direction: column; align-items: center;">',
                                '<div style="padding: 6px; border: 1px solid #CBD5E1; border-radius: 4px; background: #ffffff; display: flex; align-items: center; justify-content: center;">{qrPersonSvg}</div>',
                                '<div style="font-size: 12px; font-weight: 700; color: #1B2430; text-align: center; margin-top: 6px;">QR con người</div>',
                                '<div style="font-size: 11px; color: #566172; text-align: center; margin-top: 2px;">{person.code}</div>',
                            '</div>',
                            // QR 2: Phiếu yêu cầu
                            '<div style="display: flex; flex-direction: column; align-items: center;">',
                                '<div style="padding: 6px; border: 1px solid #CBD5E1; border-radius: 4px; background: #ffffff; display: flex; align-items: center; justify-content: center;">{qrTicketSvg}</div>',
                                '<div style="font-size: 12px; font-weight: 700; color: #1B2430; text-align: center; margin-top: 6px;">QR phiếu yêu cầu</div>',
                                '<div style="font-size: 11px; color: #566172; text-align: center; margin-top: 2px;">{ticket.code}</div>',
                            '</div>',
                        '</div>',
                    '</div>',
                '</div>'
            )
        }
    ]
});
