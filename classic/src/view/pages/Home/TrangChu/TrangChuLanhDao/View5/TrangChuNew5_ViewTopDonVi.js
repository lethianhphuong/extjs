Ext.define('DEMO.view.pages.Home.TrangChu.TrangChuLanhDao.View5.TrangChuNew5_ViewTopDonVi', {
    extend: 'Ext.Component',
    xtype: 'TrangChuNew5_ViewTopDonVi',
    cls: 'tcn5-top-table',
    listeners: { afterrender: 'onTooltipReady' },
    tpl: '<table><thead><tr><th>STT</th><th>ĐƠN VỊ</th><th>TỔNG SỐ HỒ SƠ<br>ĐANG QUẢN LÝ</th></tr></thead>' +
        '<tbody><tpl for="."><tr><td>{#}</td><td data-tcn5-tip="{name:htmlEncode}: {[Number(values.val || values.soLuong || values.tongSo || values.giaTri || 0).toLocaleString("vi-VN")]} hồ sơ">{name:htmlEncode}</td><td><b>{[Number(values.val || values.soLuong || values.tongSo || values.giaTri || 0).toLocaleString("vi-VN")]}</b></td></tr></tpl></tbody></table>' 
});
