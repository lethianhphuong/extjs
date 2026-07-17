Ext.define('DEMO.view.pages.Booking.Booking_View', {
    extend: 'Ext.container.Container',
    xtype: 'Booking_View',
    scrollable: 'y',
    padding: 20,

    requires: [
        'Ext.chart.*',
        'Ext.data.Store',
        'DEMO.view.pages.Booking.Booking_ViewChart'
    ],

    controller: 'booking',
    viewModel: 'booking',

    layout: { type: 'vbox', align: 'stretch' },

    listeners: {
        afterrender: function () {
            this.drawIncomeChart();
            this.drawDonutChart();
            this.drawCircularProgress('sold-circle', 73.9, '#14b8a6');
            this.drawCircularProgress('pending-circle', 45.6, '#f59e0b');
        }
    },

    drawIncomeChart: function () {
        var el = document.getElementById('income-line-chart');
        if (!el) return;
        var ctx = el.getContext('2d');
        var w = el.width = el.offsetWidth;
        var h = el.height = el.offsetHeight;

        var data = [30, 35, 28, 40, 32, 45, 38, 50, 42, 55, 48, 60, 52, 58, 55, 62, 58, 65, 60, 68];
        var max = Math.max.apply(null, data);
        var min = Math.min.apply(null, data) - 5;
        var range = max - min || 1;
        var stepX = w / (data.length - 1);

        // gradient fill
        var grad = ctx.createLinearGradient(0, 0, 0, h);
        grad.addColorStop(0, 'rgba(255,255,255,0.25)');
        grad.addColorStop(1, 'rgba(255,255,255,0.02)');

        ctx.beginPath();
        ctx.moveTo(0, h);
        for (var i = 0; i < data.length; i++) {
            var x = i * stepX;
            var y = h - ((data[i] - min) / range) * (h * 0.8);
            if (i === 0) {
                ctx.lineTo(x, y);
            } else {
                var prevX = (i - 1) * stepX;
                var prevY = h - ((data[i - 1] - min) / range) * (h * 0.8);
                var cpx1 = prevX + stepX * 0.4;
                var cpx2 = x - stepX * 0.4;
                ctx.bezierCurveTo(cpx1, prevY, cpx2, y, x, y);
            }
        }
        ctx.lineTo(w, h);
        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.fill();

        // line
        ctx.beginPath();
        for (var i = 0; i < data.length; i++) {
            var x = i * stepX;
            var y = h - ((data[i] - min) / range) * (h * 0.8);
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                var prevX = (i - 1) * stepX;
                var prevY = h - ((data[i - 1] - min) / range) * (h * 0.8);
                var cpx1 = prevX + stepX * 0.4;
                var cpx2 = x - stepX * 0.4;
                ctx.bezierCurveTo(cpx1, prevY, cpx2, y, x, y);
            }
        }
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2.5;
        ctx.stroke();
    },

    drawDonutChart: function () {
        var el = document.getElementById('tours-donut');
        if (!el) return;
        var ctx = el.getContext('2d');
        var size = 200;
        el.width = size;
        el.height = size;
        var cx = size / 2, cy = size / 2, r = 75, lw = 22;

        var soldOut = 120, available = 66, total = soldOut + available;
        var pctSold = soldOut / total;

        // bg ring
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = '#e5e7eb';
        ctx.lineWidth = lw;
        ctx.stroke();

        // sold out arc
        ctx.beginPath();
        ctx.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * pctSold);
        ctx.strokeStyle = '#14b8a6';
        ctx.lineWidth = lw;
        ctx.lineCap = 'round';
        ctx.stroke();
    },

    drawCircularProgress: function (canvasId, pct, color) {
        var el = document.getElementById(canvasId);
        if (!el) return;
        var ctx = el.getContext('2d');
        var size = 120;
        el.width = size;
        el.height = size;
        var cx = size / 2, cy = size / 2, r = 48, lw = 8;

        // bg
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = '#f1f5f9';
        ctx.lineWidth = lw;
        ctx.stroke();

        // progress
        ctx.beginPath();
        ctx.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * (pct / 100));
        ctx.strokeStyle = color;
        ctx.lineWidth = lw;
        ctx.lineCap = 'round';
        ctx.stroke();

        // text
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 18px Inter, -apple-system, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(pct + '%', cx, cy);
    },

    items: [
        // HEADER
        {
            xtype: 'component',
            html: '<div style="margin-bottom:24px;"><span style="color:#64748b;font-size:13px;font-weight:500;">OVERVIEW</span><h2 style="margin:4px 0 0;color:#0f172a;font-size:24px;font-weight:700;">Booking</h2></div>'
        },

        // TOP ROW -- 3 KPI Cards
        {
            xtype: 'container',
            layout: { type: 'hbox', align: 'stretch' },
            margin: '0 0 20 0',
            defaults: {
                flex: 1,
                margin: '0 16 0 0',
                style: {
                    background: '#fff',
                    borderRadius: '16px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
                    overflow: 'hidden'
                }
            },
            items: [
                // Total Booking
                {
                    xtype: 'component',
                    height: 140,
                    html: [
                        '<div style="display:flex;align-items:center;justify-content:space-between;padding:24px 28px;height:100%;box-sizing:border-box;">',
                        '  <div>',
                        '    <div style="font-size:13px;color:#94a3b8;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Total booking</div>',
                        '    <div style="font-size:34px;font-weight:800;color:#0f172a;margin:10px 0 8px;line-height:1;">714k</div>',
                        '    <div style="display:flex;align-items:center;gap:4px;font-size:13px;color:#22c55e;font-weight:600;">',
                        '      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 11V3M7 3L3.5 6.5M7 3l3.5 3.5" stroke="#22c55e" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
                        '      +2.6%',
                        '    </div>',
                        '  </div>',
                        '  <div style="width:100px;height:90px;flex-shrink:0;">',
                        '    <svg viewBox="0 0 120 100" width="100" height="90">',
                        '      <circle cx="45" cy="50" r="28" fill="#e0f7f5" />',
                        '      <circle cx="45" cy="38" r="12" fill="#14b8a6"/>',
                        '      <ellipse cx="45" cy="62" rx="18" ry="12" fill="#14b8a6"/>',
                        '      <circle cx="75" cy="55" r="22" fill="#ccfbf1"/>',
                        '      <circle cx="75" cy="45" r="10" fill="#0d9488"/>',
                        '      <ellipse cx="75" cy="64" rx="15" ry="10" fill="#0d9488"/>',
                        '      <rect x="58" y="30" width="22" height="16" rx="3" fill="#f0fdfa" stroke="#99f6e4" stroke-width="1"/>',
                        '      <line x1="62" y1="36" x2="76" y2="36" stroke="#99f6e4" stroke-width="1.5"/>',
                        '      <line x1="62" y1="40" x2="72" y2="40" stroke="#99f6e4" stroke-width="1.5"/>',
                        '    </svg>',
                        '  </div>',
                        '</div>'
                    ].join('')
                },
                // Sold
                {
                    xtype: 'component',
                    height: 140,
                    html: [
                        '<div style="display:flex;align-items:center;justify-content:space-between;padding:24px 28px;height:100%;box-sizing:border-box;">',
                        '  <div>',
                        '    <div style="font-size:13px;color:#94a3b8;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Sold</div>',
                        '    <div style="font-size:34px;font-weight:800;color:#0f172a;margin:10px 0 8px;line-height:1;">311k</div>',
                        '    <div style="display:flex;align-items:center;gap:4px;font-size:13px;color:#22c55e;font-weight:600;">',
                        '      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 11V3M7 3L3.5 6.5M7 3l3.5 3.5" stroke="#22c55e" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
                        '      +0.2%',
                        '    </div>',
                        '  </div>',
                        '  <div style="width:100px;height:90px;flex-shrink:0;">',
                        '    <svg viewBox="0 0 120 100" width="100" height="90">',
                        '      <rect x="30" y="22" width="32" height="55" rx="6" fill="#e0f7f5" />',
                        '      <rect x="36" y="28" width="20" height="6" rx="2" fill="#14b8a6"/>',
                        '      <rect x="36" y="38" width="20" height="6" rx="2" fill="#14b8a6"/>',
                        '      <rect x="36" y="48" width="14" height="6" rx="2" fill="#14b8a6"/>',
                        '      <circle cx="78" cy="42" r="22" fill="#ccfbf1"/>',
                        '      <circle cx="78" cy="32" r="10" fill="#0d9488"/>',
                        '      <ellipse cx="78" cy="50" rx="14" ry="10" fill="#0d9488"/>',
                        '      <rect x="90" y="52" width="8" height="18" rx="4" fill="#99f6e4"/>',
                        '      <circle cx="94" cy="72" r="4" fill="#99f6e4"/>',
                        '    </svg>',
                        '  </div>',
                        '</div>'
                    ].join('')
                },
                // Canceled
                {
                    xtype: 'component',
                    height: 140,
                    margin: '0',
                    html: [
                        '<div style="display:flex;align-items:center;justify-content:space-between;padding:24px 28px;height:100%;box-sizing:border-box;">',
                        '  <div>',
                        '    <div style="font-size:13px;color:#94a3b8;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Canceled</div>',
                        '    <div style="font-size:34px;font-weight:800;color:#0f172a;margin:10px 0 8px;line-height:1;">124k</div>',
                        '    <div style="display:flex;align-items:center;gap:4px;font-size:13px;color:#ef4444;font-weight:600;">',
                        '      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 3v8M7 11l3.5-3.5M7 11L3.5 7.5" stroke="#ef4444" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
                        '      -0.1%',
                        '    </div>',
                        '  </div>',
                        '  <div style="width:100px;height:90px;flex-shrink:0;">',
                        '    <svg viewBox="0 0 120 100" width="100" height="90">',
                        '      <circle cx="55" cy="45" r="24" fill="#fef2f2"/>',
                        '      <circle cx="55" cy="35" r="10" fill="#f87171"/>',
                        '      <ellipse cx="55" cy="53" rx="15" ry="10" fill="#f87171"/>',
                        '      <rect x="72" y="50" width="12" height="22" rx="5" fill="#fecaca"/>',
                        '      <circle cx="78" cy="74" r="5" fill="#fecaca"/>',
                        '      <line x1="62" y1="58" x2="72" y2="55" stroke="#fecaca" stroke-width="2"/>',
                        '    </svg>',
                        '  </div>',
                        '</div>'
                    ].join('')
                }
            ]
        },

        // MIDDLE ROW -- Income | Booked | Tours
        {
            xtype: 'container',
            layout: { type: 'hbox', align: 'stretch' },
            margin: '0 0 20 0',
            defaults: {
                style: {
                    borderRadius: '16px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)'
                }
            },
            items: [
                // Total Incomes (dark card)
                {
                    xtype: 'component',
                    flex: 1.1,
                    margin: '0 16 0 0',
                    height: 280,
                    style: {
                        background: 'linear-gradient(135deg, #0d3d38 0%, #14b8a6 100%)',
                        borderRadius: '16px',
                        position: 'relative',
                        overflow: 'hidden'
                    },
                    html: [
                        '<div style="padding:28px;height:100%;box-sizing:border-box;display:flex;flex-direction:column;justify-content:space-between;position:relative;z-index:2;">',
                        '  <div>',
                        '    <div style="display:flex;justify-content:space-between;align-items:flex-start;">',
                        '      <div>',
                        '        <div style="font-size:14px;color:rgba(255,255,255,0.7);font-weight:500;">Total incomes</div>',
                        '        <div style="font-size:38px;font-weight:800;color:#fff;margin:8px 0 0;line-height:1;">$18,765</div>',
                        '      </div>',
                        '      <div style="text-align:right;">',
                        '        <div style="display:flex;align-items:center;justify-content:flex-end;gap:4px;font-size:13px;color:#4ade80;font-weight:600;">',
                        '          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 10l3-3 2 2 5-5" stroke="#4ade80" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
                        '          +2.6%',
                        '        </div>',
                        '        <div style="font-size:12px;color:rgba(255,255,255,0.5);margin-top:2px;">last month</div>',
                        '      </div>',
                        '    </div>',
                        '  </div>',
                        '  <div style="margin:0 -28px -28px;">',
                        '    <canvas id="income-line-chart" style="width:100%;height:120px;"></canvas>',
                        '  </div>',
                        '</div>',
                        // decorative dots
                        '<div style="position:absolute;top:0;right:0;width:100%;height:100%;opacity:0.06;background-image:radial-gradient(circle,#fff 1px,transparent 1px);background-size:16px 16px;z-index:1;"></div>'
                    ].join('')
                },

                // Booked (progress bars)
                {
                    xtype: 'component',
                    flex: 1,
                    margin: '0 16 0 0',
                    height: 280,
                    style: {
                        background: '#fff',
                        borderRadius: '16px',
                        padding: '28px',
                        boxSizing: 'border-box'
                    },
                    html: [
                        '<div style="font-size:18px;font-weight:700;color:#0f172a;margin-bottom:28px;">Booked</div>',
                        // Pending
                        '<div style="margin-bottom:24px;">',
                        '  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">',
                        '    <span style="font-size:12px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.8px;">Pending</span>',
                        '    <span style="font-size:15px;font-weight:700;color:#0f172a;">9.91k</span>',
                        '  </div>',
                        '  <div style="height:8px;background:#f1f5f9;border-radius:8px;overflow:hidden;">',
                        '    <div style="width:65%;height:100%;background:linear-gradient(90deg,#f59e0b,#fbbf24);border-radius:8px;"></div>',
                        '  </div>',
                        '</div>',
                        // Canceled
                        '<div style="margin-bottom:24px;">',
                        '  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">',
                        '    <span style="font-size:12px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.8px;">Canceled</span>',
                        '    <span style="font-size:15px;font-weight:700;color:#0f172a;">1.95k</span>',
                        '  </div>',
                        '  <div style="height:8px;background:#f1f5f9;border-radius:8px;overflow:hidden;">',
                        '    <div style="width:25%;height:100%;background:linear-gradient(90deg,#ef4444,#f87171);border-radius:8px;"></div>',
                        '  </div>',
                        '</div>',
                        // Sold
                        '<div>',
                        '  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">',
                        '    <span style="font-size:12px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.8px;">Sold</span>',
                        '    <span style="font-size:15px;font-weight:700;color:#0f172a;">9.12k</span>',
                        '  </div>',
                        '  <div style="height:8px;background:#f1f5f9;border-radius:8px;overflow:hidden;">',
                        '    <div style="width:60%;height:100%;background:linear-gradient(90deg,#14b8a6,#2dd4bf);border-radius:8px;"></div>',
                        '  </div>',
                        '</div>'
                    ].join('')
                },

                // Tours Available (donut)
                {
                    xtype: 'component',
                    flex: 0.9,
                    height: 280,
                    style: {
                        background: '#fff',
                        borderRadius: '16px',
                        padding: '28px',
                        boxSizing: 'border-box'
                    },
                    html: [
                        '<div style="font-size:18px;font-weight:700;color:#0f172a;margin-bottom:20px;">Tours available</div>',
                        '<div style="display:flex;justify-content:center;margin-bottom:16px;position:relative;">',
                        '  <canvas id="tours-donut" width="200" height="200" style="width:180px;height:180px;"></canvas>',
                        '  <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;">',
                        '    <div style="font-size:12px;color:#94a3b8;font-weight:500;">Tours</div>',
                        '    <div style="font-size:28px;font-weight:800;color:#0f172a;line-height:1.2;">186</div>',
                        '  </div>',
                        '</div>',
                        '<div style="display:flex;flex-direction:column;gap:10px;">',
                        '  <div style="display:flex;align-items:center;justify-content:space-between;">',
                        '    <div style="display:flex;align-items:center;gap:8px;">',
                        '      <div style="width:10px;height:10px;border-radius:50%;background:#14b8a6;"></div>',
                        '      <span style="font-size:13px;color:#64748b;">Sold out</span>',
                        '    </div>',
                        '    <span style="font-size:13px;font-weight:700;color:#0f172a;">120 tours</span>',
                        '  </div>',
                        '  <div style="display:flex;align-items:center;justify-content:space-between;">',
                        '    <div style="display:flex;align-items:center;gap:8px;">',
                        '      <div style="width:10px;height:10px;border-radius:50%;background:#e5e7eb;"></div>',
                        '      <span style="font-size:13px;color:#64748b;">Available</span>',
                        '    </div>',
                        '    <span style="font-size:13px;font-weight:700;color:#0f172a;">66 tours</span>',
                        '  </div>',
                        '</div>'
                    ].join('')
                }
            ]
        },

        // BOTTOM ROW -- Circular Progress Cards
        {
            xtype: 'container',
            layout: { type: 'hbox', align: 'stretch' },
            margin: '0 0 10 0',
            defaults: {
                flex: 1,
                style: {
                    background: '#fff',
                    borderRadius: '16px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)'
                }
            },
            items: [
                // Sold circular
                {
                    xtype: 'component',
                    margin: '0 16 0 0',
                    height: 160,
                    html: [
                        '<div style="display:flex;align-items:center;justify-content:center;padding:28px;height:100%;box-sizing:border-box;gap:24px;">',
                        '  <canvas id="sold-circle" width="120" height="120" style="width:110px;height:110px;"></canvas>',
                        '  <div>',
                        '    <div style="font-size:30px;font-weight:800;color:#0f172a;line-height:1;">38,566</div>',
                        '    <div style="font-size:14px;color:#94a3b8;font-weight:500;margin-top:4px;">Sold</div>',
                        '  </div>',
                        '</div>'
                    ].join('')
                },
                // Pending circular
                {
                    xtype: 'component',
                    height: 160,
                    html: [
                        '<div style="display:flex;align-items:center;justify-content:center;padding:28px;height:100%;box-sizing:border-box;gap:24px;">',
                        '  <canvas id="pending-circle" width="120" height="120" style="width:110px;height:110px;"></canvas>',
                        '  <div>',
                        '    <div style="font-size:30px;font-weight:800;color:#0f172a;line-height:1;">18,472</div>',
                        '    <div style="font-size:14px;color:#94a3b8;font-weight:500;margin-top:4px;">Pending for payment</div>',
                        '  </div>',
                        '</div>'
                    ].join('')
                }
            ]
        },

        // STATISTICS + CUSTOMER REVIEWS ROW
        {
            xtype: 'container',
            layout: { type: 'hbox', align: 'stretch' },
            margin: '0 0 20 0',
            items: [
                // Statistics Bar Chart (ExtJS Chart)
                {
                    xtype: 'panel',
                    flex: 2,
                    margin: '0 16 0 0',
                    style: {
                        background: '#fff',
                        borderRadius: '16px',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)'
                    },
                    layout: 'vbox',
                    bodyStyle: {
                        background: 'transparent',
                        borderRadius: '16px'
                    },
                    items: [
                        // Custom header with legend + totals + dropdown
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'top'
                            },
                            width: '100%',
                            padding: '24px 28px 0',
                            items: [
                                {
                                    xtype: 'container',
                                    layout: 'vbox',
                                    flex: 1,
                                    items: [
                                        {
                                            xtype: 'component',
                                            html: '<div style="font-size:20px;font-weight:700;color:#0f172a;">Statistics</div>'
                                        },
                                        {
                                            xtype: 'container',
                                            layout: 'hbox',
                                            margin: '10 0 0 0',
                                            items: [
                                                {
                                                    xtype: 'component',
                                                    html: '<div style="display:flex;align-items:center;gap:6px;margin-right:16px;"><div style="width:10px;height:10px;border-radius:50%;background:#0d9488;"></div><span style="font-size:13px;color:#64748b;">Sold</span></div>'
                                                },
                                                {
                                                    xtype: 'component',
                                                    html: '<div style="display:flex;align-items:center;gap:6px;"><div style="width:10px;height:10px;border-radius:50%;background:#fca5a1;"></div><span style="font-size:13px;color:#64748b;">Canceled</span></div>'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            layout: 'hbox',
                                            margin: '6 0 0 0',
                                            items: [
                                                {
                                                    xtype: 'component',
                                                    html: '<span style="font-size:22px;font-weight:800;color:#0f172a;margin-right:24px;">6.79k</span>'
                                                },
                                                {
                                                    xtype: 'component',
                                                    html: '<span style="font-size:22px;font-weight:800;color:#0f172a;">1.23k</span>'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'component',
                                    html: '<div style="display:flex;align-items:center;gap:6px;padding:8px 16px;border:1px solid #e2e8f0;border-radius:8px;cursor:pointer;font-size:13px;color:#64748b;font-weight:500;">Yearly <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 5l3 3 3-3" stroke="#94a3b8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>'
                                }
                            ]
                        },
                        // Chart
                        {
                            xtype: 'Booking_ViewChart'
                        }
                    ]
                },

                // Customer Reviews
                {
                    xtype: 'component',
                    flex: 1.1,
                    height: 420,
                    style: {
                        background: '#fff',
                        borderRadius: '16px',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
                        padding: '24px 28px',
                        boxSizing: 'border-box'
                    },
                    html: [
                        '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">',
                        '  <div style="font-size:20px;font-weight:700;color:#0f172a;">Customer reviews</div>',
                        '  <div style="display:flex;gap:8px;">',
                        '    <div style="width:32px;height:32px;border-radius:50%;border:1px solid #e2e8f0;display:flex;align-items:center;justify-content:center;cursor:pointer;">',
                        '      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 3L5 7l4 4" stroke="#94a3b8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
                        '    </div>',
                        '    <div style="width:32px;height:32px;border-radius:50%;border:1px solid #e2e8f0;display:flex;align-items:center;justify-content:center;cursor:pointer;">',
                        '      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 3l4 4-4 4" stroke="#94a3b8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
                        '    </div>',
                        '  </div>',
                        '</div>',
                        '<div style="font-size:13px;color:#94a3b8;margin-bottom:20px;">5 Reviews</div>',
                        // Review Card
                        '<div style="display:flex;gap:14px;margin-bottom:20px;">',
                        '  <div style="width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,#fde68a,#f59e0b);flex-shrink:0;display:flex;align-items:center;justify-content:center;overflow:hidden;">',
                        '    <svg width="30" height="30" viewBox="0 0 40 40"><circle cx="20" cy="15" r="8" fill="#fff"/><ellipse cx="20" cy="32" rx="14" ry="10" fill="#fff"/></svg>',
                        '  </div>',
                        '  <div style="flex:1;">',
                        '    <div style="font-size:15px;font-weight:600;color:#0f172a;">Jayvion Simon</div>',
                        '    <div style="font-size:12px;color:#94a3b8;margin-bottom:8px;">Posted 09 Jul 2026 10:29 pm</div>',
                        '    <div style="display:flex;gap:2px;margin-bottom:10px;">',
                        '      <svg width="16" height="16" viewBox="0 0 16 16"><polygon points="8,1 10,6 15,6 11,9.5 12.5,15 8,11.5 3.5,15 5,9.5 1,6 6,6" fill="#f59e0b"/></svg>',
                        '      <svg width="16" height="16" viewBox="0 0 16 16"><polygon points="8,1 10,6 15,6 11,9.5 12.5,15 8,11.5 3.5,15 5,9.5 1,6 6,6" fill="#f59e0b"/></svg>',
                        '      <svg width="16" height="16" viewBox="0 0 16 16"><polygon points="8,1 10,6 15,6 11,9.5 12.5,15 8,11.5 3.5,15 5,9.5 1,6 6,6" fill="#f59e0b"/></svg>',
                        '      <svg width="16" height="16" viewBox="0 0 16 16"><polygon points="8,1 10,6 15,6 11,9.5 12.5,15 8,11.5 3.5,15 5,9.5 1,6 6,6" fill="#f59e0b"/></svg>',
                        '      <svg width="16" height="16" viewBox="0 0 16 16"><defs><linearGradient id="half"><stop offset="50%" stop-color="#f59e0b"/><stop offset="50%" stop-color="#e5e7eb"/></linearGradient></defs><polygon points="8,1 10,6 15,6 11,9.5 12.5,15 8,11.5 3.5,15 5,9.5 1,6 6,6" fill="url(#half)"/></svg>',
                        '    </div>',
                        '    <div style="font-size:13px;color:#64748b;line-height:1.7;margin-bottom:16px;">Occaecati est et illo quibusdam accusamus qui. Incidunt aut et molestiae ut facere aut. Est quidem iusto praesentium excepturi harum nihil tenetur facilis. Ut omnis voluptates nihil accusantium doloribus eaque debitis.</div>',
                        '    <div style="display:flex;gap:8px;margin-bottom:20px;">',
                        '      <span style="padding:5px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:11px;color:#64748b;font-weight:500;">Great service</span>',
                        '      <span style="padding:5px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:11px;color:#64748b;font-weight:500;">Recommended</span>',
                        '      <span style="padding:5px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:11px;color:#64748b;font-weight:500;">Best price</span>',
                        '    </div>',
                        '  </div>',
                        '</div>',
                        // Action Buttons
                        '<div style="display:flex;gap:12px;margin-top:auto;">',
                        '  <div style="flex:1;padding:12px 0;border:1px solid #e2e8f0;border-radius:10px;text-align:center;font-size:14px;font-weight:600;color:#ef4444;cursor:pointer;">Reject</div>',
                        '  <div style="flex:1;padding:12px 0;border:none;border-radius:10px;text-align:center;font-size:14px;font-weight:600;color:#fff;background:#0f172a;cursor:pointer;">Accept</div>',
                        '</div>'
                    ].join('')
                }
            ]
        },

        // NEWEST BOOKING -- Card Carousel
        {
            xtype: 'component',
            style: {
                background: '#fff',
                borderRadius: '16px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
                padding: '24px 28px',
                boxSizing: 'border-box',
                marginBottom: '20px'
            },
            html: [
                '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:20px;">',
                '  <div>',
                '    <div style="font-size:20px;font-weight:700;color:#0f172a;">Newest booking</div>',
                '    <div style="font-size:13px;color:#94a3b8;margin-top:4px;">8 bookings</div>',
                '  </div>',
                '  <div style="display:flex;gap:8px;">',
                '    <div style="width:32px;height:32px;border-radius:50%;border:1px solid #e2e8f0;display:flex;align-items:center;justify-content:center;cursor:pointer;">',
                '      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 3L5 7l4 4" stroke="#94a3b8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
                '    </div>',
                '    <div style="width:32px;height:32px;border-radius:50%;border:1px solid #e2e8f0;display:flex;align-items:center;justify-content:center;cursor:pointer;">',
                '      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 3l4 4-4 4" stroke="#94a3b8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
                '    </div>',
                '  </div>',
                '</div>',
                '<div id="booking-cards-scroll" style="display:flex;gap:20px;overflow-x:auto;scroll-behavior:smooth;padding-bottom:8px;">',

                // Card 1: Jayvion Simon
                '<div style="min-width:260px;max-width:260px;background:#f8fafc;border-radius:16px;padding:16px;box-sizing:border-box;flex-shrink:0;">',
                '  <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px;">',
                '    <div style="display:flex;gap:12px;align-items:center;">',
                '      <div style="width:42px;height:42px;border-radius:50%;background:linear-gradient(135deg,#fde68a,#f59e0b);display:flex;align-items:center;justify-content:center;">',
                '        <svg width="26" height="26" viewBox="0 0 40 40"><circle cx="20" cy="15" r="8" fill="#fff"/><ellipse cx="20" cy="32" rx="14" ry="10" fill="#fff"/></svg>',
                '      </div>',
                '      <div>',
                '        <div style="font-size:14px;font-weight:600;color:#0f172a;">Jayvion Simon</div>',
                '        <div style="font-size:11px;color:#94a3b8;">09 Jul 2026 10:29 pm</div>',
                '      </div>',
                '    </div>',
                '    <div style="cursor:pointer;color:#94a3b8;font-size:18px;letter-spacing:2px;">&#8942;</div>',
                '  </div>',
                '  <div style="display:flex;gap:16px;margin-bottom:14px;">',
                '    <div style="display:flex;align-items:center;gap:4px;font-size:12px;color:#64748b;">',
                '      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1.5" y="2.5" width="11" height="10" rx="1.5" stroke="#94a3b8" stroke-width="1.2"/><line x1="1.5" y1="5.5" x2="12.5" y2="5.5" stroke="#94a3b8" stroke-width="1.2"/><line x1="4.5" y1="1" x2="4.5" y2="4" stroke="#94a3b8" stroke-width="1.2" stroke-linecap="round"/><line x1="9.5" y1="1" x2="9.5" y2="4" stroke="#94a3b8" stroke-width="1.2" stroke-linecap="round"/></svg>',
                '      3 days 2 nights',
                '    </div>',
                '    <div style="display:flex;align-items:center;gap:4px;font-size:12px;color:#64748b;">',
                '      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="4" r="2.5" stroke="#94a3b8" stroke-width="1.2"/><circle cx="4" cy="6" r="2" stroke="#94a3b8" stroke-width="1"/><circle cx="10" cy="6" r="2" stroke="#94a3b8" stroke-width="1"/><path d="M2 12c0-2 2-3 5-3s5 1 5 3" stroke="#94a3b8" stroke-width="1.2" stroke-linecap="round"/></svg>',
                '      3-5 guests',
                '    </div>',
                '  </div>',
                '  <div style="position:relative;border-radius:12px;overflow:hidden;height:170px;">',
                '    <div style="width:100%;height:100%;background:linear-gradient(135deg,#0ea5e9 0%,#06b6d4 30%,#14b8a6 60%,#2dd4bf 100%);"></div>',
                '    <div style="position:absolute;top:20%;left:10%;width:80%;height:60%;background:linear-gradient(135deg,#fbbf24 0%,#f59e0b 100%);border-radius:40% 60% 50% 50%;opacity:0.3;"></div>',
                '    <div style="position:absolute;bottom:12px;right:12px;background:rgba(0,0,0,0.55);backdrop-filter:blur(8px);color:#fff;padding:4px 10px;border-radius:8px;font-size:13px;font-weight:700;">$83.74</div>',
                '  </div>',
                '</div>',

                // Card 2: Lucian Obrien
                '<div style="min-width:260px;max-width:260px;background:#f8fafc;border-radius:16px;padding:16px;box-sizing:border-box;flex-shrink:0;">',
                '  <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px;">',
                '    <div style="display:flex;gap:12px;align-items:center;">',
                '      <div style="width:42px;height:42px;border-radius:50%;background:linear-gradient(135deg,#c4b5fd,#8b5cf6);display:flex;align-items:center;justify-content:center;">',
                '        <svg width="26" height="26" viewBox="0 0 40 40"><circle cx="20" cy="15" r="8" fill="#fff"/><ellipse cx="20" cy="32" rx="14" ry="10" fill="#fff"/></svg>',
                '      </div>',
                '      <div>',
                '        <div style="font-size:14px;font-weight:600;color:#0f172a;">Lucian Obrien</div>',
                '        <div style="font-size:11px;color:#94a3b8;">08 Jul 2026 9:29 pm</div>',
                '      </div>',
                '    </div>',
                '    <div style="cursor:pointer;color:#94a3b8;font-size:18px;letter-spacing:2px;">&#8942;</div>',
                '  </div>',
                '  <div style="display:flex;gap:16px;margin-bottom:14px;">',
                '    <div style="display:flex;align-items:center;gap:4px;font-size:12px;color:#64748b;">',
                '      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1.5" y="2.5" width="11" height="10" rx="1.5" stroke="#94a3b8" stroke-width="1.2"/><line x1="1.5" y1="5.5" x2="12.5" y2="5.5" stroke="#94a3b8" stroke-width="1.2"/><line x1="4.5" y1="1" x2="4.5" y2="4" stroke="#94a3b8" stroke-width="1.2" stroke-linecap="round"/><line x1="9.5" y1="1" x2="9.5" y2="4" stroke="#94a3b8" stroke-width="1.2" stroke-linecap="round"/></svg>',
                '      3 days 2 nights',
                '    </div>',
                '    <div style="display:flex;align-items:center;gap:4px;font-size:12px;color:#64748b;">',
                '      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="4" r="2.5" stroke="#94a3b8" stroke-width="1.2"/><circle cx="4" cy="6" r="2" stroke="#94a3b8" stroke-width="1"/><circle cx="10" cy="6" r="2" stroke="#94a3b8" stroke-width="1"/><path d="M2 12c0-2 2-3 5-3s5 1 5 3" stroke="#94a3b8" stroke-width="1.2" stroke-linecap="round"/></svg>',
                '      3-5 guests',
                '    </div>',
                '  </div>',
                '  <div style="position:relative;border-radius:12px;overflow:hidden;height:170px;">',
                '    <div style="width:100%;height:100%;background:linear-gradient(135deg,#1e3a5f 0%,#f97316 40%,#fbbf24 80%,#7c3aed 100%);"></div>',
                '    <div style="position:absolute;bottom:0;left:0;right:0;height:40%;background:linear-gradient(0deg,rgba(30,58,95,0.8),transparent);"></div>',
                '    <div style="position:absolute;bottom:12px;right:12px;background:rgba(0,0,0,0.55);backdrop-filter:blur(8px);color:#fff;padding:4px 10px;border-radius:8px;font-size:13px;font-weight:700;">$97.14</div>',
                '  </div>',
                '</div>',

                // Card 3: Deja Brady
                '<div style="min-width:260px;max-width:260px;background:#f8fafc;border-radius:16px;padding:16px;box-sizing:border-box;flex-shrink:0;">',
                '  <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px;">',
                '    <div style="display:flex;gap:12px;align-items:center;">',
                '      <div style="width:42px;height:42px;border-radius:50%;background:linear-gradient(135deg,#fca5a1,#ef4444);display:flex;align-items:center;justify-content:center;">',
                '        <svg width="26" height="26" viewBox="0 0 40 40"><circle cx="20" cy="15" r="8" fill="#fff"/><ellipse cx="20" cy="32" rx="14" ry="10" fill="#fff"/></svg>',
                '      </div>',
                '      <div>',
                '        <div style="font-size:14px;font-weight:600;color:#0f172a;">Deja Brady</div>',
                '        <div style="font-size:11px;color:#94a3b8;">07 Jul 2026 8:29 pm</div>',
                '      </div>',
                '    </div>',
                '    <div style="cursor:pointer;color:#94a3b8;font-size:18px;letter-spacing:2px;">&#8942;</div>',
                '  </div>',
                '  <div style="display:flex;gap:16px;margin-bottom:14px;">',
                '    <div style="display:flex;align-items:center;gap:4px;font-size:12px;color:#64748b;">',
                '      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1.5" y="2.5" width="11" height="10" rx="1.5" stroke="#94a3b8" stroke-width="1.2"/><line x1="1.5" y1="5.5" x2="12.5" y2="5.5" stroke="#94a3b8" stroke-width="1.2"/><line x1="4.5" y1="1" x2="4.5" y2="4" stroke="#94a3b8" stroke-width="1.2" stroke-linecap="round"/><line x1="9.5" y1="1" x2="9.5" y2="4" stroke="#94a3b8" stroke-width="1.2" stroke-linecap="round"/></svg>',
                '      3 days 2 nights',
                '    </div>',
                '    <div style="display:flex;align-items:center;gap:4px;font-size:12px;color:#64748b;">',
                '      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="4" r="2.5" stroke="#94a3b8" stroke-width="1.2"/><circle cx="4" cy="6" r="2" stroke="#94a3b8" stroke-width="1"/><circle cx="10" cy="6" r="2" stroke="#94a3b8" stroke-width="1"/><path d="M2 12c0-2 2-3 5-3s5 1 5 3" stroke="#94a3b8" stroke-width="1.2" stroke-linecap="round"/></svg>',
                '      3-5 guests',
                '    </div>',
                '  </div>',
                '  <div style="position:relative;border-radius:12px;overflow:hidden;height:170px;">',
                '    <div style="width:100%;height:100%;background:linear-gradient(135deg,#065f46 0%,#0d9488 40%,#2dd4bf 80%,#14b8a6 100%);"></div>',
                '    <div style="position:absolute;top:30%;left:30%;width:40%;height:50%;background:linear-gradient(135deg,#b45309,#d97706);border-radius:30% 50% 40% 60%;opacity:0.6;"></div>',
                '    <div style="position:absolute;bottom:12px;right:12px;background:rgba(0,0,0,0.55);backdrop-filter:blur(8px);color:#fff;padding:4px 10px;border-radius:8px;font-size:13px;font-weight:700;">$68.71</div>',
                '  </div>',
                '</div>',

                // Card 4: Harrison Stein
                '<div style="min-width:260px;max-width:260px;background:#f8fafc;border-radius:16px;padding:16px;box-sizing:border-box;flex-shrink:0;">',
                '  <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px;">',
                '    <div style="display:flex;gap:12px;align-items:center;">',
                '      <div style="width:42px;height:42px;border-radius:50%;background:linear-gradient(135deg,#a5f3fc,#06b6d4);display:flex;align-items:center;justify-content:center;">',
                '        <svg width="26" height="26" viewBox="0 0 40 40"><circle cx="20" cy="15" r="8" fill="#fff"/><ellipse cx="20" cy="32" rx="14" ry="10" fill="#fff"/></svg>',
                '      </div>',
                '      <div>',
                '        <div style="font-size:14px;font-weight:600;color:#0f172a;">Harrison Stein</div>',
                '        <div style="font-size:11px;color:#94a3b8;">06 Jul 2026 7:29 pm</div>',
                '      </div>',
                '    </div>',
                '    <div style="cursor:pointer;color:#94a3b8;font-size:18px;letter-spacing:2px;">&#8942;</div>',
                '  </div>',
                '  <div style="display:flex;gap:16px;margin-bottom:14px;">',
                '    <div style="display:flex;align-items:center;gap:4px;font-size:12px;color:#64748b;">',
                '      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1.5" y="2.5" width="11" height="10" rx="1.5" stroke="#94a3b8" stroke-width="1.2"/><line x1="1.5" y1="5.5" x2="12.5" y2="5.5" stroke="#94a3b8" stroke-width="1.2"/><line x1="4.5" y1="1" x2="4.5" y2="4" stroke="#94a3b8" stroke-width="1.2" stroke-linecap="round"/><line x1="9.5" y1="1" x2="9.5" y2="4" stroke="#94a3b8" stroke-width="1.2" stroke-linecap="round"/></svg>',
                '      3 days 2 nights',
                '    </div>',
                '    <div style="display:flex;align-items:center;gap:4px;font-size:12px;color:#64748b;">',
                '      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="4" r="2.5" stroke="#94a3b8" stroke-width="1.2"/><circle cx="4" cy="6" r="2" stroke="#94a3b8" stroke-width="1"/><circle cx="10" cy="6" r="2" stroke="#94a3b8" stroke-width="1"/><path d="M2 12c0-2 2-3 5-3s5 1 5 3" stroke="#94a3b8" stroke-width="1.2" stroke-linecap="round"/></svg>',
                '      3-5 guests',
                '    </div>',
                '  </div>',
                '  <div style="position:relative;border-radius:12px;overflow:hidden;height:170px;">',
                '    <div style="width:100%;height:100%;background:linear-gradient(135deg,#0ea5e9 0%,#38bdf8 30%,#67e8f9 60%,#22d3ee 100%);"></div>',
                '    <div style="position:absolute;top:10%;right:10%;width:35%;height:80%;background:linear-gradient(180deg,#fde68a,#a3e635);border-radius:50% 50% 40% 40%;opacity:0.4;"></div>',
                '    <div style="position:absolute;bottom:12px;right:12px;background:rgba(0,0,0,0.55);backdrop-filter:blur(8px);color:#fff;padding:4px 10px;border-radius:8px;font-size:13px;font-weight:700;">$85.21</div>',
                '  </div>',
                '</div>',

                '</div>'
            ].join('')
        }
    ]
});
