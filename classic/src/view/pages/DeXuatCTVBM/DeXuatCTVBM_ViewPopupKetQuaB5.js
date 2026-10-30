Ext.define('DEMO.view.pages.DeXuatCTVBM.DeXuatCTVBM_ViewPopupKetQuaB5', {
    extend: 'Ext.window.Window',
    xtype: 'DeXuatCTVBM_ViewPopupKetQuaB5',

    title: 'Thông tin yêu cầu tra cứu B5',
    width: 840,
    cls: 'dexuat-modal',
    bodyStyle: 'background-color: #fafbfa;',

    header: {
        style: 'background-color: #104e38; color: #ffffff;',
        title: {
            text: 'Thông tin yêu cầu tra cứu B5',
            style: 'color: #ffffff; font-weight: 700; font-size: 12px;'
        }
    },

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    bodyPadding: 20,

    requires: [
        'Ext.button.Button'
    ],

    items: [
        // ================= Khu vực 1: Khối Mã con người (Căn giữa) =================
        {
            xtype: 'container',
            margin: '0 0 16 0',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            items: [
                {
                    xtype: 'component',
                    html: '<div style="font-size: 12px; font-weight: 700; color: #1f2937; margin-bottom: 6px;">Mã con người</div>'
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'component',
                            reference: 'compResultPersonQrSvg',
                            width: 96,
                            height: 96,
                            style: {
                                backgroundColor: '#ffffff',
                                border: '1px solid #9ca3af',
                                borderRadius: '4px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }
                        },
                        {
                            xtype: 'container',
                            margin: '0 0 0 14',
                            width: 140,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'component',
                                    reference: 'lblResultPersonCode',
                                    html: '<div style="border: 1px solid #9ca3af; background: #fff; border-radius: 4px; padding: 4px 8px; text-align: center; font-size: 11px; font-weight: 700; color: #1f2937; letter-spacing: 0.5px; margin-bottom: 6px;">Mã: <span id="r4PersonCode">8377KGY833</span></div>'
                                },
                                {
                                    xtype: 'button',
                                    text: 'Sao chép mã',
                                    margin: '0 0 6 0',
                                    style: {
                                        backgroundColor: '#104e38',
                                        borderColor: '#104e38',
                                        color: '#ffffff',
                                        borderRadius: '4px'
                                    },
                                    handler: 'onCopyPersonCode'
                                },
                                {
                                    xtype: 'button',
                                    text: 'Tải QR',
                                    iconCls: 'x-fa fa-file-text-o',
                                    style: {
                                        backgroundColor: '#104e38',
                                        borderColor: '#104e38',
                                        color: '#ffffff',
                                        borderRadius: '4px'
                                    },
                                    handler: 'onDownloadPersonQr'
                                }
                            ]
                        }
                    ]
                }
            ]
        },

        // ================= Khu vực 2: Khối Mã YCTC gửi V06 & PV06 =================
        {
            xtype: 'container',
            reference: 'containerYCTCBlocks',
            margin: '0 0 20 0',
            layout: {
                type: 'hbox',
                pack: 'center'
            },
            defaults: {
                margin: '0 16'
            },
            items: [
                // Block 1: Mã YCTC gửi V06
                {
                    xtype: 'container',
                    reference: 'blockV06',
                    hidden: true,
                    bind: {
                        hidden: '{!modal3Config.blockV06Visible}'
                    },
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'component',
                            html: '<div style="font-size: 12px; font-weight: 700; color: #1f2937; margin-bottom: 6px;">Mã YCTC gửi V06</div>'
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'component',
                                    reference: 'compV06QrSvg',
                                    width: 96,
                                    height: 96,
                                    style: {
                                        backgroundColor: '#ffffff',
                                        border: '1px solid #9ca3af',
                                        borderRadius: '4px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }
                                },
                                {
                                    xtype: 'container',
                                    margin: '0 0 0 14',
                                    width: 140,
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'component',
                                            reference: 'lblMaV06',
                                            html: '<div style="border: 1px solid #9ca3af; background: #fff; border-radius: 4px; padding: 4px 8px; text-align: center; font-size: 11px; font-weight: 700; color: #1f2937; letter-spacing: 0.5px; margin-bottom: 6px;">Mã: <span>8377KGY834</span></div>'
                                        },
                                        {
                                            xtype: 'button',
                                            text: 'Sao chép mã',
                                            margin: '0 0 6 0',
                                            style: {
                                                backgroundColor: '#104e38',
                                                borderColor: '#104e38',
                                                color: '#ffffff',
                                                borderRadius: '4px'
                                            },
                                            handler: 'onCopyV06Code'
                                        },
                                        {
                                            xtype: 'button',
                                            text: 'Tải QR',
                                            iconCls: 'x-fa fa-file-text-o',
                                            style: {
                                                backgroundColor: '#104e38',
                                                borderColor: '#104e38',
                                                color: '#ffffff',
                                                borderRadius: '4px'
                                            },
                                            handler: 'onDownloadV06Qr'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },

                // Block 2: Mã YCTC gửi PV06
                {
                    xtype: 'container',
                    reference: 'blockPV06',
                    hidden: true,
                    bind: {
                        hidden: '{!modal3Config.blockPV06Visible}'
                    },
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'component',
                            html: '<div style="font-size: 12px; font-weight: 700; color: #1f2937; margin-bottom: 6px;">Mã YCTC gửi PV06</div>'
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'component',
                                    reference: 'compPV06QrSvg',
                                    width: 96,
                                    height: 96,
                                    style: {
                                        backgroundColor: '#ffffff',
                                        border: '1px solid #9ca3af',
                                        borderRadius: '4px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }
                                },
                                {
                                    xtype: 'container',
                                    margin: '0 0 0 14',
                                    width: 140,
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'component',
                                            reference: 'lblMaPV06',
                                            html: '<div style="border: 1px solid #9ca3af; background: #fff; border-radius: 4px; padding: 4px 8px; text-align: center; font-size: 11px; font-weight: 700; color: #1f2937; letter-spacing: 0.5px; margin-bottom: 6px;">Mã: <span>8377KGY836</span></div>'
                                        },
                                        {
                                            xtype: 'button',
                                            text: 'Sao chép mã',
                                            margin: '0 0 6 0',
                                            style: {
                                                backgroundColor: '#104e38',
                                                borderColor: '#104e38',
                                                color: '#ffffff',
                                                borderRadius: '4px'
                                            },
                                            handler: 'onCopyPV06Code'
                                        },
                                        {
                                            xtype: 'button',
                                            text: 'Tải QR',
                                            iconCls: 'x-fa fa-file-text-o',
                                            style: {
                                                backgroundColor: '#104e38',
                                                borderColor: '#104e38',
                                                color: '#ffffff',
                                                borderRadius: '4px'
                                            },
                                            handler: 'onDownloadPV06Qr'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },

        // ================= Khu vực 3: Thanh nút tác vụ đáy =================
        {
            xtype: 'container',
            padding: '16 0 4 0',
            style: {
                borderTop: '1px solid #e5e7eb'
            },
            layout: {
                type: 'hbox',
                pack: 'center'
            },
            defaults: {
                margin: '0 8'
            },
            items: [
                {
                    xtype: 'button',
                    text: 'Xem biểu mẫu',
                    style: {
                        backgroundColor: '#104e38',
                        borderColor: '#104e38',
                        color: '#ffffff',
                        borderRadius: '4px',
                        padding: '6px 24px',
                        fontWeight: '600'
                    },
                    handler: 'onXemBieuMau'
                },
                {
                    xtype: 'button',
                    text: 'Tải YCTC',
                    style: {
                        backgroundColor: '#104e38',
                        borderColor: '#104e38',
                        color: '#ffffff',
                        borderRadius: '4px',
                        padding: '6px 24px',
                        fontWeight: '600'
                    },
                    handler: 'onTaiYCTC'
                },
                {
                    xtype: 'button',
                    reference: 'btnCompleteYCTCResult',
                    text: 'Hoàn thành',
                    bind: {
                        hidden: '{!modal3Config.btnHoanThanhVisible}'
                    },
                    style: {
                        backgroundColor: '#104e38',
                        borderColor: '#104e38',
                        color: '#ffffff',
                        borderRadius: '4px',
                        padding: '6px 24px',
                        fontWeight: '600'
                    },
                    handler: 'onHoanThanhModal3'
                }
            ]
        }
    ]
});
