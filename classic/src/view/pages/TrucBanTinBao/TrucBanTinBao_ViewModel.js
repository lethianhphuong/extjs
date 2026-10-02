Ext.define('DEMO.view.pages.TrucBanTinBao.TrucBanTinBao_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.trucbantinbao',

    privates: {
        _records: null,
        _crimeCatalog: null,
        _provs: null,
        _provByName: null,
        _offenseById: null,
        _units: [
            { k: 'PC01', d: 'Văn phòng CSĐT', c: 'var(--c1, #2a78d6)' },
            { k: 'PC02', d: 'Cảnh sát hình sự', c: 'var(--c2, #eb6834)' },
            { k: 'PC03', d: 'Kinh tế, tham nhũng', c: 'var(--c3, #1baf7a)' },
            { k: 'PC04', d: 'Tội phạm ma túy', c: 'var(--c4, #eda100)' }
        ],
        _statusList: [
            { k: 'Chờ duyệt đề xuất', c: 'var(--info, #2a78d6)' },
            { k: 'Đang chờ thẩm định', c: 'var(--warning, #e39400)' },
            { k: 'Yêu cầu chỉnh sửa', c: 'var(--serious, #e0703a)' },
            { k: 'Từ chối đề xuất', c: 'var(--critical, #d0342f)' },
            { k: 'Đã hoàn thành đề xuất', c: 'var(--good, #0c9a3d)' }
        ],
        _results: [
            { k: 'Phân công', c: 'var(--c1, #2a78d6)' },
            { k: 'Khởi tố', c: 'var(--c3, #1baf7a)' },
            { k: 'Tạm đình chỉ', c: 'var(--c4, #eda100)' },
            { k: 'Không khởi tố', c: 'var(--c-muted, #8a97ab)' }
        ],
        _shortName: {
            'TP. Hồ Chí Minh': 'TP.HCM',
            'Quảng Ninh': 'Q.Ninh',
            'Hải Phòng': 'H.Phòng',
            'Thanh Hóa': 'T.Hóa',
            'Khánh Hòa': 'K.Hòa'
        }
    },

    data: {
        scopeBadge: 'TOÀN QUỐC',
        scopeText: 'Tổng hợp tất cả đơn vị',
        entitySummary: '',
        currentTimeText: '--:--:--',
        currentDateText: '',
        onlineAgoText: '0s',
        rangeSelection: '30',
        customPeriodVisible: false,

        // KPIs
        kpiCases: 0,
        kpiProposals: 0,
        kpiProposalsPct: '100%',
        kpiInprog: 0,
        kpiDone: 0,
        kpiDoneRate: '0%',
        kpiWarning: 0,
        kpiCritical: 0,

        // Filter object theo quy chuẩn mục 3.2.1 CONVENTIONS.md
        timKiemNangCao: {
            province: '',
            xa: '',
            unit: '',
            status: '',
            crimeGroup: '',
            offense: '',
            range: 30,
            customFrom: null,
            customTo: null
        }
    },

    stores: {
        provinceStore: {
            fields: ['value', 'text'],
            data: [
                { value: '', text: 'Tất cả tỉnh/thành' },
                { value: 'Hà Nội', text: 'Hà Nội' },
                { value: 'TP. Hồ Chí Minh', text: 'TP. Hồ Chí Minh' },
                { value: 'Nghệ An', text: 'Nghệ An' },
                { value: 'Thanh Hóa', text: 'Thanh Hóa' },
                { value: 'Đà Nẵng', text: 'Đà Nẵng' },
                { value: 'Bình Dương', text: 'Bình Dương' },
                { value: 'Đắk Lắk', text: 'Đắk Lắk' },
                { value: 'Khánh Hòa', text: 'Khánh Hòa' },
                { value: 'Cần Thơ', text: 'Cần Thơ' },
                { value: 'Hải Phòng', text: 'Hải Phòng' },
                { value: 'Quảng Ninh', text: 'Quảng Ninh' },
                { value: 'Cà Mau', text: 'Cà Mau' }
            ]
        },

        xaStore: {
            fields: ['value', 'text'],
            data: [
                { value: '', text: 'Tất cả xã/phường' }
            ]
        },

        unitStore: {
            fields: ['value', 'text'],
            data: [
                { value: '', text: 'Tất cả đơn vị' },
                { value: 'PC01', text: 'PC01 — Văn phòng CSĐT' },
                { value: 'PC02', text: 'PC02 — Cảnh sát hình sự' },
                { value: 'PC03', text: 'PC03 — Kinh tế, tham nhũng' },
                { value: 'PC04', text: 'PC04 — Tội phạm ma túy' }
            ]
        },

        statusStore: {
            fields: ['value', 'text'],
            data: [
                { value: '', text: 'Tất cả trạng thái' },
                { value: 'Chờ duyệt đề xuất', text: 'Chờ duyệt đề xuất' },
                { value: 'Đang chờ thẩm định', text: 'Đang chờ thẩm định' },
                { value: 'Yêu cầu chỉnh sửa', text: 'Yêu cầu chỉnh sửa' },
                { value: 'Từ chối đề xuất', text: 'Từ chối đề xuất' },
                { value: 'Đã hoàn thành đề xuất', text: 'Đã hoàn thành đề xuất' }
            ]
        },

        crimeGroupStore: {
            fields: ['value', 'text'],
            data: [
                { value: '', text: 'Tất cả nhóm tội phạm' },
                { value: 'XIII', text: 'Chương XIII - Các tội xâm phạm an ninh quốc gia' },
                { value: 'XIV', text: 'Chương XIV - Các tội xâm phạm tính mạng, sức khỏe, nhân phẩm' },
                { value: 'XV', text: 'Chương XV - Các tội xâm phạm quyền tự do của con người, dân chủ' },
                { value: 'XVI', text: 'Chương XVI - Các tội xâm phạm sở hữu' },
                { value: 'XVII', text: 'Chương XVII - Các tội xâm phạm chế độ hôn nhân và gia đình' },
                { value: 'XVIII', text: 'Chương XVIII - Các tội xâm phạm trật tự quản lý kinh tế' },
                { value: 'XIX', text: 'Chương XIX - Các tội phạm về môi trường' },
                { value: 'XX', text: 'Chương XX - Các tội phạm về ma túy' },
                { value: 'XXI', text: 'Chương XXI - Các tội xâm phạm an toàn công cộng, trật tự công cộng' },
                { value: 'XXII', text: 'Chương XXII - Các tội xâm phạm trật tự quản lý hành chính' },
                { value: 'XXIII', text: 'Chương XXIII - Các tội phạm về chức vụ' },
                { value: 'XXIV', text: 'Chương XXIV - Các tội xâm phạm hoạt động tư pháp' },
                { value: 'XXV', text: 'Chương XXV - Các tội xâm phạm nghĩa vụ, trách nhiệm quân nhân' },
                { value: 'XXVI', text: 'Chương XXVI - Các tội phá hoại hòa bình, chống loài người' }
            ]
        },

        offenseStore: {
            fields: ['value', 'text'],
            data: [
                { value: '', text: 'Tất cả tội danh' }
            ]
        },

        drillGridStore: {
            fields: [
                'id', 'caseId', 'proposalId', 'crimeGroup',
                'offense', 'province', 'xa', 'unit',
                'status', 'result', 'trinh', 'xuly', 'date'
            ],
            pageSize: 50,
            proxy: {
                type: 'memory',
                enablePaging: true,
                reader: {
                    type: 'json'
                }
            }
        }
    },

    // =========================================================================
    //  INIT & DATA SERVICE METHODS
    // =========================================================================

    constructor: function () {
        var me = this;
        me.callParent(arguments);
        me._initDataCatalog();
        me.initMockData();
    },

    _initDataCatalog: function () {
        var me = this;
        var groups = [
            { id: 'XIII', name: 'Chương XIII - Các tội xâm phạm an ninh quốc gia' },
            { id: 'XIV', name: 'Chương XIV - Các tội xâm phạm tính mạng, sức khỏe, nhân phẩm' },
            { id: 'XV', name: 'Chương XV - Các tội xâm phạm quyền tự do của con người' },
            { id: 'XVI', name: 'Chương XVI - Các tội xâm phạm sở hữu' },
            { id: 'XVII', name: 'Chương XVII - Các tội xâm phạm chế độ hôn nhân và gia đình' },
            { id: 'XVIII', name: 'Chương XVIII - Các tội xâm phạm trật tự quản lý kinh tế' },
            { id: 'XIX', name: 'Chương XIX - Các tội phạm về môi trường' },
            { id: 'XX', name: 'Chương XX - Các tội phạm về ma túy' },
            { id: 'XXI', name: 'Chương XXI - Các tội xâm phạm an toàn, trật tự công cộng' },
            { id: 'XXII', name: 'Chương XXII - Các tội xâm phạm trật tự quản lý hành chính' },
            { id: 'XXIII', name: 'Chương XXIII - Các tội phạm về chức vụ' },
            { id: 'XXIV', name: 'Chương XXIV - Các tội xâm phạm hoạt động tư pháp' },
            { id: 'XXV', name: 'Chương XXV - Các tội xâm phạm nghĩa vụ quân nhân' },
            { id: 'XXVI', name: 'Chương XXVI - Các tội phá hoại hòa bình, chống loài người' }
        ];

        var offenses = [
            { id: '108', group: 'XIII', name: 'Tội phản bội Tổ quốc' },
            { id: '109', group: 'XIII', name: 'Tội hoạt động nhằm lật đổ chính quyền nhân dân' },
            { id: '113', group: 'XIII', name: 'Tội khủng bố nhằm chống chính quyền nhân dân' },
            { id: '123', group: 'XIV', name: 'Tội giết người' },
            { id: '128', group: 'XIV', name: 'Tội vô ý làm chết người' },
            { id: '134', group: 'XIV', name: 'Tội cố ý gây thương tích hoặc tổn hại sức khỏe' },
            { id: '141', group: 'XIV', name: 'Tội hiếp dâm' },
            { id: '150', group: 'XIV', name: 'Tội mua bán người' },
            { id: '157', group: 'XV', name: 'Tội bắt, giữ hoặc giam người trái pháp luật' },
            { id: '158', group: 'XV', name: 'Tội xâm phạm chỗ ở của người khác' },
            { id: '168', group: 'XVI', name: 'Tội cướp tài sản' },
            { id: '170', group: 'XVI', name: 'Tội cưỡng đoạt tài sản' },
            { id: '171', group: 'XVI', name: 'Tội cướp giật tài sản' },
            { id: '173', group: 'XVI', name: 'Tội trộm cắp tài sản' },
            { id: '174', group: 'XVI', name: 'Tội lừa đảo chiếm đoạt tài sản' },
            { id: '175', group: 'XVI', name: 'Tội lạm dụng tín nhiệm chiếm đoạt tài sản' },
            { id: '182', group: 'XVII', name: 'Tội vi phạm chế độ một vợ, một chồng' },
            { id: '188', group: 'XVIII', name: 'Tội buôn lậu' },
            { id: '190', group: 'XVIII', name: 'Tội sản xuất, buôn bán hàng cấm' },
            { id: '200', group: 'XVIII', name: 'Tội trốn thuế' },
            { id: '201', group: 'XVIII', name: 'Tội cho vay lãi nặng trong giao dịch dân sự' },
            { id: '235', group: 'XIX', name: 'Tội gây ô nhiễm môi trường' },
            { id: '243', group: 'XIX', name: 'Tội hủy hoại rừng' },
            { id: '248', group: 'XX', name: 'Tội sản xuất trái phép chất ma túy' },
            { id: '249', group: 'XX', name: 'Tội tàng trữ trái phép chất ma túy' },
            { id: '250', group: 'XX', name: 'Tội vận chuyển trái phép chất ma túy' },
            { id: '251', group: 'XX', name: 'Tội mua bán trái phép chất ma túy' },
            { id: '255', group: 'XX', name: 'Tội tổ chức sử dụng trái phép chất ma túy' },
            { id: '260', group: 'XXI', name: 'Tội vi phạm quy định về tham gia giao thông đường bộ' },
            { id: '318', group: 'XXI', name: 'Tội gây rối trật tự công cộng' },
            { id: '321', group: 'XXI', name: 'Tội đánh bạc' },
            { id: '322', group: 'XXI', name: 'Tội tổ chức đánh bạc hoặc gá bạc' },
            { id: '324', group: 'XXI', name: 'Tội rửa tiền' },
            { id: '330', group: 'XXII', name: 'Tội chống người thi hành công vụ' },
            { id: '341', group: 'XXII', name: 'Tội làm giả con dấu, tài liệu của cơ quan, tổ chức' },
            { id: '353', group: 'XXIII', name: 'Tội tham ô tài sản' },
            { id: '354', group: 'XXIII', name: 'Tội nhận hối lộ' },
            { id: '356', group: 'XXIII', name: 'Tội lợi dụng chức vụ, quyền hạn khi thi hành công vụ' },
            { id: '364', group: 'XXIII', name: 'Tội đưa hối lộ' },
            { id: '373', group: 'XXIV', name: 'Tội dùng nhục hình' },
            { id: '389', group: 'XXIV', name: 'Tội che giấu tội phạm' },
            { id: '390', group: 'XXIV', name: 'Tội không tố giác tội phạm' }
        ];

        me._crimeCatalog = { groups: groups, offenses: offenses };
        me._offenseById = {};
        offenses.forEach(function (o) {
            me._offenseById[o.id] = o;
        });

        var xaPool = ['Tân Hội', 'Đông Thành', 'Vĩnh Lộc', 'Bình Minh', 'Nghi Phú', 'An Phú', 'Hải Châu', 'Trần Đề', 'Long Hòa', 'Phú Mỹ', 'Tân Lập', 'Hòa Bình', 'Đại Đồng', 'Kim Sơn', 'Thạch Hà', 'Quảng Tiến'];
        var provs = [
            { n: 'Hà Nội', w: 16, nx: 9 },
            { n: 'TP. Hồ Chí Minh', w: 18, nx: 9 },
            { n: 'Nghệ An', w: 8, nx: 7 },
            { n: 'Thanh Hóa', w: 7, nx: 7 },
            { n: 'Đà Nẵng', w: 5, nx: 6 },
            { n: 'Bình Dương', w: 6, nx: 6 },
            { n: 'Đắk Lắk', w: 5, nx: 6 },
            { n: 'Khánh Hòa', w: 4, nx: 5 },
            { n: 'Cần Thơ', w: 5, nx: 6 },
            { n: 'Hải Phòng', w: 5, nx: 6 },
            { n: 'Quảng Ninh', w: 4, nx: 5 },
            { n: 'Cà Mau', w: 3, nx: 5 }
        ];

        var start = 0;
        provs.forEach(function (p) {
            p.xas = [];
            for (var k = 0; k < p.nx; k++) {
                var idx = (start + k) % xaPool.length;
                p.xas.push((idx % 4 === 0 ? 'Phường ' : 'Xã ') + xaPool[idx]);
            }
            start += p.nx;
        });

        me._provs = provs;
        me._provByName = {};
        provs.forEach(function (p) {
            me._provByName[p.n] = p;
        });
    },

    initMockData: function () {
        var me = this;
        function mulberry32(a) {
            return function () {
                a |= 0; a = a + 0x6D2B79F5 | 0;
                var t = Math.imul(a ^ a >>> 15, 1 | a);
                t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
                return ((t ^ t >>> 14) >>> 0) / 4294967296;
            };
        }
        var rnd = mulberry32(20260915);
        function wpick(pairs) {
            var tot = 0, i;
            for (i = 0; i < pairs.length; i++) tot += pairs[i][1];
            var r = rnd() * tot;
            for (i = 0; i < pairs.length; i++) {
                r -= pairs[i][1];
                if (r <= 0) return pairs[i][0];
            }
            return pairs[pairs.length - 1][0];
        }

        var provWeights = me._provs.map(function (p) { return [p.n, p.w]; });
        var records = [];
        var now = Date.now();
        var N = 3600;

        for (var i = 0; i < N; i++) {
            var pn = wpick(provWeights);
            var p = me._provByName[pn];
            var xa = p.xas[Math.floor(rnd() * p.xas.length)];
            var unit = wpick([['PC01', 30], ['PC02', 34], ['PC03', 22], ['PC04', 14]]);
            var status = wpick([
                ['Chờ duyệt đề xuất', 11],
                ['Đang chờ thẩm định', 17],
                ['Yêu cầu chỉnh sửa', 7],
                ['Từ chối đề xuất', 5],
                ['Đã hoàn thành đề xuất', 60]
            ]);
            var result = null, trinh = 'na', xuly = 'na';
            if (status === 'Đã hoàn thành đề xuất') {
                result = wpick([['Phân công', 40], ['Khởi tố', 34], ['Tạm đình chỉ', 14], ['Không khởi tố', 12]]);
            } else if (status === 'Từ chối đề xuất') {
                // finished
            } else {
                xuly = wpick([['con', 80], ['sap', 13], ['qua', 7]]);
                trinh = (status === 'Chờ duyệt đề xuất' || status === 'Yêu cầu chỉnh sửa') ?
                    wpick([['con', 78], ['sap', 14], ['qua', 8]]) : 'con';
            }
            var date = now - Math.floor(rnd() * 90) * 864e5 - Math.floor(rnd() * 864e5);
            records.push({
                id: 'TB-2026-' + (10000 + i),
                province: pn,
                xa: xa,
                unit: unit,
                status: status,
                result: result,
                trinh: trinh,
                xuly: xuly,
                date: date
            });
        }

        // Link with case and crime
        var offenses = me._crimeCatalog.offenses;
        var cases = [], currentCase = null, remaining = 0;
        records.forEach(function (r, idx) {
            if (!remaining) {
                var crime = offenses[cases.length % offenses.length];
                currentCase = {
                    caseId: 'VU-2026-' + (10001 + cases.length),
                    province: r.province,
                    xa: r.xa,
                    crimeGroup: crime.group,
                    offense: crime.id,
                    offenseName: crime.name
                };
                cases.push(currentCase);
                remaining = 1 + (cases.length % 4);
            }
            r.caseId = currentCase.caseId;
            r.proposalId = 'DX-2026-' + (10001 + idx);
            r.province = currentCase.province;
            r.xa = currentCase.xa;
            r.crimeGroup = currentCase.crimeGroup;
            r.offense = currentCase.offense;
            r.offenseName = currentCase.offenseName;
            remaining--;
        });

        me._records = records;
    },

    // Public setter for API Integration
    setRawData: function (records) {
        this._records = records || [];
    },

    getRawData: function () {
        return this._records || [];
    },

    getCrimeCatalog: function () {
        return this._crimeCatalog;
    },

    getProvByName: function () {
        return this._provByName;
    },

    getShortName: function () {
        return this._shortName;
    },

    getUnits: function () {
        return this._units;
    },

    getStatusList: function () {
        return this._statusList;
    },

    getResultsList: function () {
        return this._results;
    },

    // =========================================================================
    //  CENTRALIZED DATA COMPUTATION (Used by Controller & API calls)
    // =========================================================================

    computeDashboardData: function (f) {
        var me = this;
        var fCriteria = f || me.get('timKiemNangCao');
        var now = Date.now();
        var inprogStatuses = ['Chờ duyệt đề xuất', 'Đang chờ thẩm định', 'Yêu cầu chỉnh sửa'];

        function matchRecord(r) {
            if (fCriteria.province && r.province !== fCriteria.province) return false;
            if (fCriteria.xa && r.xa !== fCriteria.xa) return false;
            if (fCriteria.unit && r.unit !== fCriteria.unit) return false;
            if (fCriteria.status && r.status !== fCriteria.status) return false;
            if (fCriteria.crimeGroup && r.crimeGroup !== fCriteria.crimeGroup) return false;
            if (fCriteria.offense && r.offense !== fCriteria.offense) return false;

            if (fCriteria.range === 'today') {
                var startOfToday = new Date();
                startOfToday.setHours(0, 0, 0, 0);
                if (r.date < startOfToday.getTime()) return false;
            } else if (typeof fCriteria.range === 'number' && fCriteria.range > 0) {
                if (now - r.date > fCriteria.range * 864e5) return false;
            } else if (fCriteria.range === 'custom' && fCriteria.customFrom && fCriteria.customTo) {
                var fromMs = new Date(fCriteria.customFrom).getTime();
                var toDate = new Date(fCriteria.customTo);
                toDate.setDate(toDate.getDate() + 1);
                var untilMs = toDate.getTime();
                if (r.date < fromMs || r.date >= untilMs) return false;
            }
            return true;
        }

        var cur = (me._records || []).filter(matchRecord);
        var totalAll = (me._records || []).filter(function (r) {
            if (typeof fCriteria.range === 'number' && fCriteria.range > 0) {
                return (now - r.date <= fCriteria.range * 864e5);
            }
            return true;
        }).length || 1;

        var caseIdSet = new Set(cur.map(function (r) { return r.caseId; }));
        var nCases = caseIdSet.size;
        var nTong = cur.length;
        var nDang = cur.filter(function (r) { return inprogStatuses.indexOf(r.status) >= 0; }).length;
        var nDone = cur.filter(function (r) { return r.status === 'Đã hoàn thành đề xuất'; }).length;
        var nSap = cur.filter(function (r) { return r.trinh === 'sap' || r.xuly === 'sap'; }).length;
        var nQua = cur.filter(function (r) { return r.trinh === 'qua' || r.xuly === 'qua'; }).length;
        var doneRate = nTong ? (nDone / nTong * 100) : 0;
        var propPct = ((nTong / totalAll) * 100).toFixed(1).replace('.', ',');

        // 1. Scope
        var badge = 'TOÀN QUỐC', scopeHtml = 'Tổng hợp tất cả đơn vị';
        if (fCriteria.unit && fCriteria.province) {
            badge = fCriteria.unit;
            scopeHtml = 'Phòng ' + fCriteria.unit + ' · ' + fCriteria.province + (fCriteria.xa ? ' · ' + fCriteria.xa : '');
        } else if (fCriteria.unit) {
            badge = fCriteria.unit;
            scopeHtml = 'Phòng ' + fCriteria.unit + ' · toàn quốc';
        } else if (fCriteria.province) {
            badge = me._shortName[fCriteria.province] || fCriteria.province;
            scopeHtml = fCriteria.province + (fCriteria.xa ? ' · ' + fCriteria.xa : '') + ' · tất cả đơn vị';
        }

        // 2. Summary
        var entitySummary = nCases.toLocaleString('vi-VN') + ' vụ duy nhất · ' +
            nTong.toLocaleString('vi-VN') + ' đề xuất phù hợp. Các trạng thái, kết quả và thời hạn tính theo đề xuất. Một vụ có thể có nhiều đề xuất.';

        // Cập nhật State trong ViewModel
        me.set({
            scopeBadge: badge.toUpperCase(),
            scopeText: scopeHtml,
            entitySummary: entitySummary,
            kpiCases: nCases,
            kpiProposals: nTong,
            kpiProposalsPct: propPct + '%',
            kpiInprog: nDang,
            kpiDone: nDone,
            kpiDoneRate: doneRate.toFixed(1).replace('.', ',') + '%',
            kpiWarning: nSap,
            kpiCritical: nQua
        });

        // 3. Top 10 Geo
        var isXa = !!fCriteria.province;
        var geo = [];
        if (isXa) {
            var byXa = {};
            cur.forEach(function (r) { byXa[r.xa] = (byXa[r.xa] || 0) + 1; });
            geo = Object.keys(byXa).map(function (x) {
                var caseCount = new Set(cur.filter(function (r) { return r.xa === x; }).map(function (r) { return r.caseId; })).size;
                return {
                    nm: x.replace(/^(Xã|Phường)\s/, ''),
                    full: x,
                    v: byXa[x],
                    caseCount: caseCount,
                    drill: { province: fCriteria.province, xa: x, title: x + ' · ' + fCriteria.province }
                };
            });
        } else {
            var byP = {};
            cur.forEach(function (r) { byP[r.province] = (byP[r.province] || 0) + 1; });
            geo = Object.keys(byP).map(function (pn) {
                var caseCount = new Set(cur.filter(function (r) { return r.province === pn; }).map(function (r) { return r.caseId; })).size;
                return {
                    nm: me._shortName[pn] || pn,
                    full: pn,
                    v: byP[pn],
                    caseCount: caseCount,
                    drill: { province: pn, title: pn }
                };
            });
        }
        geo.sort(function (a, b) { return b.v - a.v; });
        var geoTop10 = geo.slice(0, 10);
        var geoMaxV = Math.max.apply(null, geoTop10.map(function (d) { return d.v; }).concat([1]));

        // 4. Status Donut
        var stCounts = {};
        cur.forEach(function (r) { stCounts[r.status] = (stCounts[r.status] || 0) + 1; });
        var statusDonutData = me._statusList.map(function (s) {
            return {
                nm: s.k,
                v: stCounts[s.k] || 0,
                c: s.c,
                drill: { status: s.k, title: 'Trạng thái: ' + s.k }
            };
        });

        // 5. PC Bars
        var pcCounts = {};
        cur.forEach(function (r) { pcCounts[r.unit] = (pcCounts[r.unit] || 0) + 1; });
        var maxPc = Math.max.apply(null, me._units.map(function (u) { return pcCounts[u.k] || 0; }).concat([1]));
        var pcBarsData = me._units.map(function (u) {
            var v = pcCounts[u.k] || 0;
            return {
                k: u.k,
                d: u.d,
                c: u.c,
                v: v,
                wPct: Math.round((v / maxPc) * 100),
                drill: { unit: u.k, title: 'Đề xuất đến ' + u.k + ' — ' + u.d }
            };
        });

        // 6. Crime Groups (so sánh 2 thanh dùng chung max)
        var filteredGroups = me._crimeCatalog.groups.filter(function (g) {
            return !fCriteria.crimeGroup || fCriteria.crimeGroup === g.id;
        }).map(function (g) {
            var proposals = cur.filter(function (r) { return r.crimeGroup === g.id; });
            var cases = new Set(proposals.map(function (r) { return r.caseId; })).size;
            return {
                id: g.id,
                name: g.name,
                cases: cases,
                proposals: proposals.length
            };
        }).sort(function (a, b) { return b.proposals - a.proposals; });

        var crimeMax = Math.max.apply(null, filteredGroups.map(function (g) {
            return Math.max(g.cases, g.proposals);
        }).concat([1]));

        var crimeGroupsData = filteredGroups.map(function (g) {
            return {
                id: g.id,
                name: g.name,
                cases: g.cases,
                proposals: g.proposals,
                casePct: Math.round((g.cases / crimeMax) * 100),
                propPct: Math.round((g.proposals / crimeMax) * 100),
                drill: { crimeGroup: g.id, title: g.name }
            };
        });

        // 7. Result Donut
        var doneList = cur.filter(function (r) { return r.status === 'Đã hoàn thành đề xuất'; });
        var rsCounts = {};
        doneList.forEach(function (r) { rsCounts[r.result] = (rsCounts[r.result] || 0) + 1; });
        var resultDonutData = me._results.map(function (r) {
            return {
                nm: r.k,
                v: rsCounts[r.k] || 0,
                c: r.c,
                drill: { status: 'Đã hoàn thành đề xuất', result: r.k, title: 'Kết quả: ' + r.k }
            };
        });

        // 8. Gauges
        var trinhList = cur.filter(function (r) { return r.trinh !== 'na'; });
        var xulyList = cur.filter(function (r) { return r.xuly !== 'na'; });
        function buildSeg(list, field) {
            var c = { con: 0, sap: 0, qua: 0 };
            list.forEach(function (r) { if (c[r[field]] !== undefined) c[r[field]]++; });
            return [
                { v: c.con, c: 'var(--good, #0c9a3d)', drill: { deadline: 'con', title: 'Còn hạn' } },
                { v: c.sap, c: 'var(--warning, #e39400)', drill: { deadline: 'sap', title: 'Sắp hết hạn' } },
                { v: c.qua, c: 'var(--critical, #d0342f)', drill: { deadline: 'qua', title: 'Quá hạn' } }
            ];
        }
        var gaugesData = {
            propose: buildSeg(trinhList.length ? trinhList : [{ trinh: 'con' }], 'trinh'),
            process: buildSeg(xulyList.length ? xulyList : [{ xuly: 'con' }], 'xuly')
        };

        // 9. Ranking
        var rankKeyer = isXa ? function (r) { return r.xa; } : function (r) { return r.province; };
        var rankAgg = {};
        cur.forEach(function (r) {
            var k = rankKeyer(r);
            if (!rankAgg[k]) rankAgg[k] = { n: 0, done: 0, act: 0, od: 0, cases: new Set() };
            var a = rankAgg[k];
            a.cases.add(r.caseId);
            a.n++;
            if (r.status === 'Đã hoàn thành đề xuất') a.done++;
            if (inprogStatuses.indexOf(r.status) >= 0) a.act++;
            if (r.trinh === 'qua' || r.xuly === 'qua') a.od++;
        });
        var rankingRows = Object.keys(rankAgg).map(function (k) {
            var a = rankAgg[k];
            a.k = k;
            a.drill = isXa ? { province: fCriteria.province, xa: k, title: k + ' · ' + fCriteria.province } : { province: k, title: k };
            return a;
        }).sort(function (x, y) { return y.n - x.n; }).slice(0, 8);

        // 10. Ticker Feed (10 most recent)
        var tickerFeed = (me._records || []).slice().sort(function (a, b) {
            return b.date - a.date;
        }).slice(0, 10).map(function (r) {
            var d = new Date(r.date);
            return {
                id: r.proposalId,
                xa: r.xa,
                prov: me._shortName[r.province] || r.province,
                st: r.status,
                t: ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2)
            };
        });

        return {
            cur: cur,
            nTong: nTong,
            nDone: nDone,
            nCases: nCases,
            isXa: isXa,
            geoTop10: geoTop10,
            geoMaxV: geoMaxV,
            statusDonut: statusDonutData,
            pcBars: pcBarsData,
            crimeGroups: crimeGroupsData,
            resultDonut: resultDonutData,
            gauges: gaugesData,
            rankingRows: rankingRows,
            tickerFeed: tickerFeed
        };
    }
});
