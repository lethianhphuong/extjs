Ext.define('DEMO.view.pages.YeuCauTraCuu.TaoYeuCau.Step2.Step2_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.step2',

    data: {},

    formulas: {
        personCardHtml: function (get) {
            var p = get('selectedPerson');
            if (!p) {
                // Dự phòng lấy dữ liệu mẫu nếu chưa có
                p = {
                    code: 'ND-000124',
                    name: 'Nguyễn Văn An',
                    dob: '12/03/1985',
                    gender: 'Nam',
                    cccd: '001085012345',
                    phone: '0903 123 456'
                };
            }

            var parts = (p.name || '').trim().split(/\s+/),
                initials = parts.length >= 2 ? (parts[parts.length - 2][0] + parts[parts.length - 1][0]).toUpperCase() : 'ND',
                dobStr = p.dob ? (Ext.isDate(p.dob) ? Ext.Date.format(p.dob, 'd/m/Y') : p.dob) : '—',
                meta = dobStr + ' · ' + (p.gender || 'Nam') + ' · CCCD ' + (p.cccd || '—') + ' · ' + (p.phone || '—');

            return [
                '<div class="prow prow--preview">',
                    '<span class="pyc-avatar">' + initials + '</span>',
                    '<div class="pyc-person-info" style="margin: 0 14px;">',
                        '<span class="pyc-person-label">Người được tra cứu</span>',
                        '<span class="pyc-person-name">' + Ext.util.Format.htmlEncode(p.name) + '</span>',
                        '<span class="pyc-person-meta">' + meta + '</span>',
                    '</div>',
                    '<span class="pyc-person-code">' + (p.code || '') + '</span>',
                    '<button type="button" class="pyc-link btn-change-person" style="margin-left: 12px;">Đổi người</button>',
                '</div>'
            ].join('');
        }
    }
});
