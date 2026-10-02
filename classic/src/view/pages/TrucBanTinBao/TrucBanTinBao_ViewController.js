Ext.define('DEMO.view.pages.TrucBanTinBao.TrucBanTinBao_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.trucbantinbao',

    requires: [
        'DEMO.view.pages.TrucBanTinBao.TrucBanTinBao_ViewGrid'
    ],

    privates: {
        _clockInterval: null,
        _tickerInterval: null,
        _startT: null
    },

    init: function () {
        var me = this;
        me.callParent(arguments);
        me._startT = Date.now();
    },

    onViewAfterRender: function (view) {
        var me = this;
        var el = view.getEl();
        if (!el) return;

        // 1. Tách biệt bộ lắng nghe sự kiện chọn khoảng thời gian (Pill Buttons)
        el.on({
            click: me.onRangePillClick,
            scope: me,
            delegate: '.tb-pill[data-range]'
        });

        // 2. Tách biệt bộ lắng nghe sự kiện xem chi tiết (Drill-Down)
        el.on({
            click: me.onDrillDownClick,
            scope: me,
            delegate: '[data-drill]'
        });

        // 3. Khởi chạy đồng hồ thời gian thực
        me._startClock();

        // 4. Tính toán và phân phối dữ liệu ban đầu
        Ext.defer(function () {
            me.computeAll();
        }, 50);
    },

    destroy: function () {
        var me = this;
        if (me._clockInterval) {
            clearInterval(me._clockInterval);
            me._clockInterval = null;
        }
        if (me._tickerInterval) {
            clearInterval(me._tickerInterval);
            me._tickerInterval = null;
        }
        me.callParent(arguments);
    },

    // =========================================================================
    //  CENTRAL REFRESH & DISPATCHER (Controller chỉ nhận bundle đã map)
    // =========================================================================

    computeAll: function () {
        var me = this;
        var vm = me.getViewModel();

        // ViewModel đóng vai trò Service: tính toán và trả về bundle dữ liệu chuẩn hóa
        var bundle = vm.computeDashboardData();

        // Phân phối dữ liệu đã chuẩn hóa vào các khối render giao diện
        me._renderGeoColumns(bundle);
        me._renderStatusDonut(bundle);
        me._renderPcBars(bundle);
        me._renderCrimeChart(bundle);
        me._renderResultDonut(bundle);
        me._renderGauges(bundle);
        me._renderRankingTable(bundle);
        me._refreshTicker(bundle.tickerFeed);
    },

    /**
     * Phương thức mẫu sẵn sàng khi tích hợp API thực tế:
     * Chỉ cần gọi API rồi nạp vào ViewModel và gọi me.computeAll()
     */
    loadFromApi: function (apiUrl) {
        var me = this;
        var vm = me.getViewModel();

        Ext.Ajax.request({
            url: apiUrl || '/api/truc-ban-tin-bao',
            method: 'GET',
            params: vm.get('timKiemNangCao'),
            success: function (response) {
                var res = Ext.decode(response.responseText);
                if (res && res.data) {
                    vm.setRawData(res.data);
                    me.computeAll();
                }
            },
            failure: function () {
                Ext.Msg.alert('Lỗi', 'Không thể nạp dữ liệu từ máy chủ.');
            }
        });
    },

    // =========================================================================
    //  REALTIME CLOCK & TICKER
    // =========================================================================

    _startClock: function () {
        var me = this;
        var days = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
        var vm = me.getViewModel();

        function tick() {
            var d = new Date();
            var p = function (x) { return (x < 10 ? '0' : '') + x; };
            var timeStr = p(d.getHours()) + ':' + p(d.getMinutes()) + ':' + p(d.getSeconds());
            var dateStr = days[d.getDay()] + ', ' + p(d.getDate()) + '/' + p(d.getMonth() + 1) + '/' + d.getFullYear();
            var elapsed = Math.floor((Date.now() - me._startT) / 1000);
            var agoStr = (elapsed < 60 ? elapsed + 's' : Math.floor(elapsed / 60) + 'p ' + (elapsed % 60) + 's');

            vm.set('currentTimeText', timeStr);
            vm.set('currentDateText', dateStr);
            vm.set('onlineAgoText', agoStr);
        }

        tick();
        me._clockInterval = setInterval(tick, 1000);
    },

    _refreshTicker: function (feed) {
        var me = this;
        var host = document.getElementById('tb-ticker-view');
        if (!host || !feed || !feed.length) return;

        if (me._tickerInterval) {
            clearInterval(me._tickerInterval);
            me._tickerInterval = null;
        }

        host.style.position = 'relative';
        host.style.overflow = 'hidden';
        host.style.height = '22px';
        host.style.width = '100%';

        host.innerHTML = feed.map(function (f, i) {
            return '<div class="tb-tk-item' + (i === 0 ? ' on' : '') + '" style="position:absolute; inset:0; display:flex; align-items:center; gap:10px; font-size:12.5px; color:var(--theme-text-secondary, #46536b); white-space:nowrap; opacity:' + (i === 0 ? '1' : '0') + '; visibility:' + (i === 0 ? 'visible' : 'hidden') + '; transform:' + (i === 0 ? 'none' : 'translateY(8px)') + '; transition:opacity 0.4s ease, transform 0.4s ease;">' +
                '<span class="tb-tid" style="font-family:\'Barlow Condensed\', sans-serif; color:var(--accent, #1c5cab); font-weight:700;">#' + f.id + '</span>' +
                '<span><b>' + f.st + '</b> · ' + f.xa + ', ' + f.prov + '</span>' +
                '<span class="tb-tt" style="margin-left:auto; color:var(--theme-text-muted, #77869c); font-family:\'Barlow Condensed\', sans-serif;">' + f.t + '</span>' +
                '</div>';
        }).join('');

        var items = host.querySelectorAll('.tb-tk-item');
        var cur = 0;
        if (items.length > 1) {
            me._tickerInterval = setInterval(function () {
                if (!items[cur]) return;
                items[cur].classList.remove('on');
                items[cur].style.opacity = '0';
                items[cur].style.visibility = 'hidden';
                items[cur].style.transform = 'translateY(8px)';

                cur = (cur + 1) % items.length;

                items[cur].classList.add('on');
                items[cur].style.opacity = '1';
                items[cur].style.visibility = 'visible';
                items[cur].style.transform = 'none';
            }, 3400);
        }
    },

    // =========================================================================
    //  CHART RENDERERS
    // =========================================================================

    _renderGeoColumns: function (b) {
        var me = this;
        var host = document.getElementById('tb-geo-chart');
        if (!host) return;

        var top10 = b.geoTop10;
        var maxV = b.geoMaxV;

        if (!top10 || !top10.length) {
            host.innerHTML = '<div style="color:var(--theme-text-muted, #77869c); font-size:12px; padding:20px;">Không có dữ liệu phù hợp.</div>';
            return;
        }

        host.innerHTML = top10.map(function (d) {
            var h = Math.max(10, Math.round((d.v / maxV) * 160));
            var drillAttrs = me._buildDrillAttrs(d.drill);

            return '<div class="tb-col clickable" ' + drillAttrs + ' style="flex:1; display:flex; flex-direction:column; align-items:center; justify-content:flex-end; height:100%; cursor:pointer; padding:4px;">' +
                '<div style="font-size:12px; font-weight:700; font-family:\'Barlow Condensed\', sans-serif; color:var(--theme-text-primary, #1e293b); text-align:center;">' +
                    d.v.toLocaleString('vi-VN') +
                    '<small style="display:block; font-size:10px; font-weight:400; color:var(--theme-text-secondary, #64748b);">' + d.caseCount + ' vụ</small>' +
                '</div>' +
                '<div class="tb-cbar" style="width:75%; max-width:38px; height:' + h + 'px; border-radius:6px 6px 0 0; background:linear-gradient(180deg, var(--accent-2, #2a78d6), var(--accent, #1c5cab)); margin-top:4px;"></div>' +
                '<div style="font-size:10.5px; color:var(--theme-text-muted, #77869c); margin-top:6px; text-align:center; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; width:100%;">' + d.nm + '</div>' +
                '</div>';
        }).join('');
    },

    _renderStatusDonut: function (b) {
        var me = this;
        var host = document.getElementById('tb-status-donut');
        if (!host) return;
        me._renderSvgDonut(host, b.statusDonut, b.nTong, 'đề xuất');
    },

    _renderResultDonut: function (b) {
        var me = this;
        var host = document.getElementById('tb-res-donut');
        if (!host) return;
        me._renderSvgDonut(host, b.resultDonut, b.nDone, 'đã xong');
    },

    _renderSvgDonut: function (host, data, centerNum, centerLabel) {
        var me = this;
        var total = data.reduce(function (a, b) { return a + b.v; }, 0) || 1;
        var C = 2 * Math.PI * 46, gap = 2.4, off = 0;

        var segs = data.map(function (s) {
            var len = (s.v / total) * C;
            var dash = Math.max(0.4, len - gap);
            var el = '<circle class="donut-seg" cx="60" cy="60" r="46" fill="none" stroke="' + s.c + '" stroke-width="16" ' +
                'stroke-dasharray="' + dash.toFixed(2) + ' ' + (C - dash).toFixed(2) + '" stroke-dashoffset="' + (-off).toFixed(2) + '" transform="rotate(-90 60 60)" ' +
                me._buildDrillAttrs(s.drill) + ' style="cursor:pointer;"></circle>';
            off += len;
            return el;
        }).join('');

        var legend = data.map(function (s) {
            var pct = ((s.v / total) * 100).toFixed(1).replace('.', ',');
            return '<div class="dl-row clickable" ' + me._buildDrillAttrs(s.drill) + ' style="display:flex; align-items:center; gap:8px; font-size:12px; padding:3px 6px; cursor:pointer;">' +
                '<span style="width:10px; height:10px; border-radius:3px; background:' + s.c + '; flex:none;"></span>' +
                '<span style="color:var(--theme-text-primary, #1e293b);">' + s.nm + '</span>' +
                '<span style="margin-left:auto; font-weight:700; font-family:\'Barlow Condensed\', sans-serif;">' + s.v.toLocaleString('vi-VN') + '</span>' +
                '<span style="color:var(--theme-text-muted, #77869c); font-size:11px; min-width:42px; text-align:right;">' + pct + '%</span>' +
                '</div>';
        }).join('');

        host.innerHTML = '<div style="display:flex; align-items:center; gap:16px; flex-wrap:wrap;">' +
            '<svg viewBox="0 0 120 120" style="width:135px; height:135px; flex:none;">' +
                '<circle cx="60" cy="60" r="46" fill="none" stroke="var(--theme-border-light, #eef2f8)" stroke-width="16"/>' +
                segs +
                '<text x="60" y="58" text-anchor="middle" style="font-size:18px; font-weight:700; font-family:\'Barlow Condensed\', sans-serif; fill:var(--theme-text-primary, #1e293b);">' + centerNum.toLocaleString('vi-VN') + '</text>' +
                '<text x="60" y="73" text-anchor="middle" style="font-size:9px; fill:var(--theme-text-muted, #77869c);">' + centerLabel + '</text>' +
            '</svg>' +
            '<div style="flex:1; min-width:140px; display:flex; flex-direction:column; gap:4px;">' + legend + '</div>' +
            '</div>';
    },

    _renderPcBars: function (b) {
        var me = this;
        var host = document.getElementById('tb-pc-bars');
        if (!host) return;

        host.innerHTML = b.pcBars.map(function (u) {
            var drillAttrs = me._buildDrillAttrs(u.drill);

            return '<div class="pc-row clickable" ' + drillAttrs + ' style="display:grid; grid-template-columns:85px 1fr 50px; align-items:center; gap:10px; padding:4px; cursor:pointer;">' +
                '<div style="font-weight:700; font-size:12.5px; color:var(--theme-text-primary, #1e293b);">' + u.k +
                    '<small style="display:block; color:var(--theme-text-muted, #77869c); font-weight:400; font-size:10px;">' + u.d + '</small>' +
                '</div>' +
                '<div style="height:18px; background:var(--theme-border-light, #f1f5f9); border-radius:6px; overflow:hidden;">' +
                    '<div style="width:' + u.wPct + '%; height:100%; border-radius:6px; background:' + u.c + ';"></div>' +
                '</div>' +
                '<div style="font-size:15px; font-weight:700; font-family:\'Barlow Condensed\', sans-serif; text-align:right; color:var(--theme-text-primary, #1e293b);">' +
                    u.v.toLocaleString('vi-VN') +
                '</div>' +
                '</div>';
        }).join('');
    },

    _renderCrimeChart: function (b) {
        var me = this;
        var host = document.getElementById('tb-crime-chart');
        var subTitleEl = document.getElementById('tb-crime-sub-title');
        if (!host) return;

        if (subTitleEl) {
            subTitleEl.textContent = b.nCases.toLocaleString('vi-VN') + ' vụ · ' + b.nTong.toLocaleString('vi-VN') + ' đề xuất';
        }

        if (!b.crimeGroups || !b.crimeGroups.length) {
            host.innerHTML = '<div style="color:var(--theme-text-muted, #77869c); font-size:12px; padding:16px;">Không có nhóm tội phạm nào khớp bộ lọc.</div>';
            return;
        }

        host.innerHTML = b.crimeGroups.map(function (g) {
            var drillAttrs = me._buildDrillAttrs(g.drill);

            return '<div class="crime-row clickable" ' + drillAttrs + ' style="display:grid; grid-template-columns:minmax(240px, 0.9fr) minmax(0, 1.5fr); gap:16px; width:100%; padding:10px 8px; border-bottom:1px solid var(--theme-border, #e2e8f0); cursor:pointer; align-items:center;">' +
                '<div class="crime-name" style="font-size:12px; font-weight:600; line-height:1.4; color:var(--theme-text-primary, #1e293b);">' + Ext.String.htmlEncode(g.name) + '</div>' +
                '<div class="crime-bars" style="display:grid; gap:6px; width:100%;">' +
                    '<div class="crime-series" style="display:grid; grid-template-columns:minmax(0, 1fr) 85px; gap:10px; align-items:center;">' +
                        '<div class="crime-track" style="background:var(--theme-border-light, #eef2f8); height:10px; border-radius:3px; overflow:hidden; width:100%;">' +
                            '<div class="crime-fill" style="height:100%; width:' + g.casePct + '%; background:var(--accent, #1c5cab); border-radius:3px;"></div>' +
                        '</div>' +
                        '<span class="crime-value" style="font-size:11.5px; font-weight:700; font-family:\'Barlow Condensed\', sans-serif; white-space:nowrap; text-align:right; color:var(--theme-text-primary, #1e293b);">' + g.cases.toLocaleString('vi-VN') + ' vụ</span>' +
                    '</div>' +
                    '<div class="crime-series" style="display:grid; grid-template-columns:minmax(0, 1fr) 85px; gap:10px; align-items:center;">' +
                        '<div class="crime-track" style="background:var(--theme-border-light, #eef2f8); height:10px; border-radius:3px; overflow:hidden; width:100%;">' +
                            '<div class="crime-fill" style="height:100%; width:' + g.propPct + '%; background:var(--c3, #1baf7a); border-radius:3px;"></div>' +
                        '</div>' +
                        '<span class="crime-value" style="font-size:11.5px; font-weight:700; font-family:\'Barlow Condensed\', sans-serif; white-space:nowrap; text-align:right; color:var(--theme-text-primary, #1e293b);">' + g.proposals.toLocaleString('vi-VN') + ' đề xuất</span>' +
                    '</div>' +
                '</div>' +
                '</div>';
        }).join('');
    },

    _renderGauges: function (b) {
        var me = this;
        var pPropose = document.getElementById('tb-gauge-propose');
        var pProcess = document.getElementById('tb-gauge-process');
        if (!pPropose || !pProcess) return;

        me._renderSingleGauge(pPropose, b.gauges.propose, 'Thời hạn trình đề xuất');
        me._renderSingleGauge(pProcess, b.gauges.process, 'Thời hạn xử lý tin');
    },

    _renderSingleGauge: function (host, segData, title) {
        var me = this;
        var total = segData.reduce(function (a, b) { return a + b.v; }, 0) || 1;
        var cx = 90, cy = 96, r = 72, sw = 16, startA = Math.PI, acc = 0, arcs = '';

        segData.forEach(function (seg) {
            var frac = seg.v / total;
            var a0 = startA + acc * Math.PI;
            var a1 = startA + (acc + frac) * Math.PI;
            acc += frac;
            var x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
            var x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
            arcs += '<path d="M ' + x0.toFixed(1) + ' ' + y0.toFixed(1) + ' A ' + r + ' ' + r + ' 0 0 1 ' + x1.toFixed(1) + ' ' + y1.toFixed(1) + '" fill="none" stroke="' + seg.c + '" stroke-width="' + sw + '"/>';
        });

        var pctOk = Math.round((segData[0].v / total) * 100);

        host.innerHTML = '<div style="font-size:12.5px; font-weight:600; color:var(--theme-text-primary, #1e293b); margin-bottom:4px;">' + title + '</div>' +
            '<svg viewBox="0 0 180 118" style="width:100%; max-width:160px; height:auto;">' +
                '<path d="M 18 96 A 72 72 0 0 1 162 96" fill="none" stroke="var(--theme-border-light, #f1f5f9)" stroke-width="' + sw + '"/>' +
                arcs +
                '<text x="90" y="86" text-anchor="middle" style="font-size:28px; font-weight:700; font-family:\'Barlow Condensed\', sans-serif; fill:var(--good, #0c9a3d);">' +
                    pctOk + '<tspan style="font-size:14px; fill:var(--theme-text-muted, #77869c);">%</tspan>' +
                '</text>' +
                '<text x="90" y="104" text-anchor="middle" style="font-size:10px; fill:var(--theme-text-muted, #77869c);">còn hạn</text>' +
            '</svg>' +
            '<div style="display:flex; justify-content:center; gap:8px; margin-top:4px;">' +
                '<div class="clickable" ' + me._buildDrillAttrs(segData[0].drill) + ' style="text-align:center; cursor:pointer; padding:2px 6px;">' +
                    '<b style="display:block; font-size:15px; font-family:\'Barlow Condensed\', sans-serif; color:var(--good, #0c9a3d);">' + segData[0].v.toLocaleString('vi-VN') + '</b>' +
                    '<span style="font-size:10px; color:var(--theme-text-muted, #77869c);">Còn hạn</span>' +
                '</div>' +
                '<div class="clickable" ' + me._buildDrillAttrs(segData[1].drill) + ' style="text-align:center; cursor:pointer; padding:2px 6px;">' +
                    '<b style="display:block; font-size:15px; font-family:\'Barlow Condensed\', sans-serif; color:var(--warning, #e39400);">' + segData[1].v.toLocaleString('vi-VN') + '</b>' +
                    '<span style="font-size:10px; color:var(--theme-text-muted, #77869c);">Sắp hết</span>' +
                '</div>' +
                '<div class="clickable" ' + me._buildDrillAttrs(segData[2].drill) + ' style="text-align:center; cursor:pointer; padding:2px 6px;">' +
                    '<b style="display:block; font-size:15px; font-family:\'Barlow Condensed\', sans-serif; color:var(--critical, #d0342f);">' + segData[2].v.toLocaleString('vi-VN') + '</b>' +
                    '<span style="font-size:10px; color:var(--theme-text-muted, #77869c);">Quá hạn</span>' +
                '</div>' +
            '</div>';
    },

    _renderRankingTable: function (b) {
        var me = this;
        var host = document.getElementById('tb-rank-body');
        var colHeader = document.getElementById('tb-rank-col-name');
        if (!host || !colHeader) return;

        colHeader.textContent = b.isXa ? 'Xã / Phường' : 'Tỉnh / Thành phố';

        if (!b.rankingRows || !b.rankingRows.length) {
            host.innerHTML = '<tr><td colspan="6" style="text-align:center; color:var(--theme-text-muted, #77869c); padding:16px;">Không có dữ liệu.</td></tr>';
            return;
        }

        host.innerHTML = b.rankingRows.map(function (a, idx) {
            var drillAttrs = me._buildDrillAttrs(a.drill);

            return '<tr class="clickable" ' + drillAttrs + ' style="border-bottom:1px solid var(--theme-border-light, #f1f5f9); cursor:pointer;">' +
                '<td style="text-align:left; padding:8px 10px; font-weight:600; color:var(--theme-text-primary, #1e293b);">' +
                    '<span style="display:inline-grid; place-items:center; width:20px; height:20px; border-radius:5px; background:var(--accent-soft, rgba(28,92,171,0.1)); color:var(--accent, #1c5cab); font-size:11px; margin-right:8px;">' + (idx + 1) + '</span>' +
                    Ext.String.htmlEncode(a.k) +
                '</td>' +
                '<td style="text-align:right; padding:8px 10px; font-family:\'Barlow Condensed\', sans-serif;">' + a.cases.size.toLocaleString('vi-VN') + '</td>' +
                '<td style="text-align:right; padding:8px 10px; font-weight:700; font-family:\'Barlow Condensed\', sans-serif;">' + a.n.toLocaleString('vi-VN') + '</td>' +
                '<td style="text-align:right; padding:8px 10px; font-family:\'Barlow Condensed\', sans-serif; color:var(--warning, #e39400);">' + a.act.toLocaleString('vi-VN') + '</td>' +
                '<td style="text-align:right; padding:8px 10px; font-family:\'Barlow Condensed\', sans-serif; color:var(--good, #0c9a3d);">' + a.done.toLocaleString('vi-VN') + '</td>' +
                '<td style="text-align:right; padding:8px 10px; font-weight:700; font-family:\'Barlow Condensed\', sans-serif; color:' + (a.od > 0 ? 'var(--critical, #d0342f)' : 'inherit') + ';">' + a.od.toLocaleString('vi-VN') + '</td>' +
                '</tr>';
        }).join('');
    },

    // =========================================================================
    //  EVENT DELEGATION & DRILLDOWN POPUP
    // =========================================================================

    _buildDrillAttrs: function (o) {
        if (!o) return 'data-drill="1"';
        var s = 'data-drill="1"';
        ['status', 'unit', 'result', 'group', 'deadline', 'province', 'xa', 'crimeGroup', 'title'].forEach(function (k) {
            if (o[k]) {
                s += ' data-' + k + '="' + Ext.String.htmlEncode(String(o[k])) + '"';
            }
        });
        return s;
    },

    // =========================================================================
    //  TIME RANGE HANDLERS (Tách biệt xử lý cụm nút thời gian)
    // =========================================================================

    onRangePillClick: function (e, target) {
        var me = this;
        var vm = me.getViewModel();
        var pill = target && target.closest ? target.closest('.tb-pill[data-range]') : null;
        if (!pill && target) {
            var fly = Ext.fly(target).up('.tb-pill[data-range]');
            if (fly) pill = fly.dom;
        }
        if (!pill) return;

        var range = pill.getAttribute('data-range');

        // Cập nhật trạng thái hiển thị nút active
        var container = (pill.closest ? pill.closest('.tb-range-pills') : null) || document.getElementById('tb-range-pills');
        if (container) {
            var allPills = container.querySelectorAll('.tb-pill');
            for (var i = 0; i < allPills.length; i++) {
                allPills[i].classList.remove('active');
            }
        }
        pill.classList.add('active');

        // Phân nhánh logic theo khoảng thời gian
        if (range === 'custom') {
            vm.set('customPeriodVisible', true);
        } else {
            vm.set('customPeriodVisible', false);
            vm.set('rangeSelection', range);

            var rVal = (range === 'today' ? 'today' : Number(range));
            var f = Ext.clone(vm.get('timKiemNangCao'));
            f.range = rVal;
            vm.set('timKiemNangCao', f);

            me.computeAll();
        }
    },

    onApplyCustomRange: function () {
        var me = this;
        var vm = me.getViewModel();
        var fromDate = me.lookupReference('dfRangeFrom').getValue();
        var toDate = me.lookupReference('dfRangeTo').getValue();

        if (!fromDate || !toDate || fromDate > toDate) {
            Ext.Msg.alert('Thông báo', 'Vui lòng chọn ngày kết thúc sau ngày bắt đầu.');
            return;
        }

        vm.set('timKiemNangCao.range', 'custom');
        vm.set('timKiemNangCao.customFrom', fromDate);
        vm.set('timKiemNangCao.customTo', toDate);
        me.computeAll();
    },

    // =========================================================================
    //  DRILL-DOWN & MODAL HANDLERS (Tách biệt xử lý xem danh sách chi tiết)
    // =========================================================================

    onDrillDownClick: function (e, target) {
        var me = this;
        var el = target && target.closest ? target.closest('[data-drill]') : null;
        if (!el && target) {
            var fly = Ext.fly(target).up('[data-drill]');
            if (fly) el = fly.dom;
        }
        if (!el) return;

        var crit = me._extractDrillCriteria(el);
        var title = el.getAttribute('data-title') || 'Danh sách đề xuất chi tiết';
        me.openDrillDown(crit, title);
    },

    _extractDrillCriteria: function (el) {
        var crit = {};
        ['status', 'unit', 'result', 'group', 'deadline', 'province', 'xa', 'crimeGroup'].forEach(function (k) {
            var val = el.getAttribute('data-' + k);
            if (val) crit[k] = val;
        });
        return crit;
    },

    openDrillDown: function (crit, title) {
        var me = this;
        var vm = me.getViewModel();
        var gf = vm.get('timKiemNangCao');
        var rawRecords = vm.getRawData();

        var inprogStatuses = ['Chờ duyệt đề xuất', 'Đang chờ thẩm định', 'Yêu cầu chỉnh sửa'];
        var filtered = rawRecords.filter(function (r) {
            // Check crit
            if (crit.province && r.province !== crit.province) return false;
            if (crit.xa && r.xa !== crit.xa) return false;
            if (crit.unit && r.unit !== crit.unit) return false;
            if (crit.status && r.status !== crit.status) return false;
            if (crit.result && r.result !== crit.result) return false;
            if (crit.crimeGroup && r.crimeGroup !== crit.crimeGroup) return false;
            if (crit.group === 'inprogress' && inprogStatuses.indexOf(r.status) < 0) return false;
            if (crit.group === 'done' && r.status !== 'Đã hoàn thành đề xuất') return false;
            if (crit.deadline === 'sap' && !(r.trinh === 'sap' || r.xuly === 'sap')) return false;
            if (crit.deadline === 'qua' && !(r.trinh === 'qua' || r.xuly === 'qua')) return false;
            if (crit.deadline === 'con' && !(r.trinh === 'con' || r.xuly === 'con')) return false;

            // Check global filters
            if (!crit.province && gf.province && r.province !== gf.province) return false;
            if (!crit.xa && gf.xa && r.xa !== gf.xa) return false;
            if (!crit.unit && gf.unit && r.unit !== gf.unit) return false;
            if (!crit.status && gf.status && r.status !== gf.status) return false;
            if (!crit.crimeGroup && gf.crimeGroup && r.crimeGroup !== gf.crimeGroup) return false;
            if (gf.offense && r.offense !== gf.offense) return false;

            return true;
        }).sort(function (a, b) { return b.date - a.date; });

        var store = vm.getStore('drillGridStore');
        store.loadData(filtered);

        var countCases = new Set(filtered.map(function (r) { return r.caseId; })).size;
        var winTitle = title + ' (' + countCases + ' vụ · ' + filtered.length + ' đề xuất)';

        Ext.create('Ext.window.Window', {
            title: winTitle,
            width: '88%',
            height: '82%',
            layout: 'fit',
            items: [
                {
                    xtype: 'TrucBanTinBao_ViewGrid',
                    dockedItems: [
                        {
                            dock: 'top',
                            xtype: 'toolbar',
                            items: [
                                {
                                    xtype: 'textfield',
                                    emptyText: 'Tìm kiếm mã đề xuất, mã vụ, tội danh...',
                                    width: 320,
                                    listeners: {
                                        change: function (txt, newVal) {
                                            var query = (newVal || '').toLowerCase().trim();
                                            store.clearFilter();
                                            if (query) {
                                                store.filterBy(function (rec) {
                                                    var str = (rec.get('proposalId') + ' ' + rec.get('caseId') + ' ' + rec.get('offenseName') + ' ' + rec.get('xa') + ' ' + rec.get('province')).toLowerCase();
                                                    return str.indexOf(query) >= 0;
                                                });
                                            }
                                        }
                                    }
                                },
                                '->',
                                {
                                    xtype: 'button',
                                    text: 'Đóng',
                                    ui: 'soft-red',
                                    handler: 'onClosePopup'
                                }
                            ]
                        }
                    ]
                }
            ]
        }).show();
    },

    onClosePopup: function (btn) {
        btn.up('window').close();
    },

    // =========================================================================
    //  FILTER HANDLERS
    // =========================================================================

    onProvinceChange: function (combo, record) {
        var me = this;
        var vm = me.getViewModel();
        var prov = record ? record.get('value') : '';
        var xaStore = vm.getStore('xaStore');
        var provByName = vm.getProvByName();

        var xas = [{ value: '', text: 'Tất cả xã/phường' }];
        if (prov && provByName && provByName[prov]) {
            provByName[prov].xas.forEach(function (x) {
                xas.push({ value: x, text: x });
            });
        }
        xaStore.loadData(xas);
        vm.set('timKiemNangCao.xa', '');

        me.computeAll();
    },

    onXaChange: function () {
        this.computeAll();
    },

    onUnitChange: function () {
        this.computeAll();
    },

    onStatusChange: function () {
        this.computeAll();
    },

    onCrimeGroupChange: function (combo, record) {
        var me = this;
        var vm = me.getViewModel();
        var gid = record ? record.get('value') : '';
        var offStore = vm.getStore('offenseStore');
        var catalog = vm.getCrimeCatalog();

        var options = [{ value: '', text: 'Tất cả tội danh' }];
        if (catalog && catalog.offenses) {
            catalog.offenses.filter(function (o) {
                return !gid || o.group === gid;
            }).forEach(function (o) {
                options.push({ value: o.id, text: 'Điều ' + o.id + ' - ' + o.name });
            });
        }
        offStore.loadData(options);
        vm.set('timKiemNangCao.offense', '');

        me.computeAll();
    },

    onOffenseChange: function () {
        this.computeAll();
    },

    onResetFilter: function () {
        var me = this;
        var vm = me.getViewModel();
        vm.set('timKiemNangCao', {
            province: '',
            xa: '',
            unit: '',
            status: '',
            crimeGroup: '',
            offense: '',
            range: 30,
            customFrom: null,
            customTo: null
        });

        vm.getStore('xaStore').loadData([{ value: '', text: 'Tất cả xã/phường' }]);
        var catalog = vm.getCrimeCatalog();
        var offOptions = [{ value: '', text: 'Tất cả tội danh' }];
        if (catalog && catalog.offenses) {
            catalog.offenses.forEach(function (o) {
                offOptions.push({ value: o.id, text: 'Điều ' + o.id + ' - ' + o.name });
            });
        }
        vm.getStore('offenseStore').loadData(offOptions);

        me.computeAll();
    }
});
