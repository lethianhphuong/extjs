Ext.define('MyApp.view.dashboard.DashboardModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.dashboard',

    data: {
        // 'vuan' (Cases) or 'vuviec' (Affairs)
        currentView: 'vuviec', // Default to Vụ việc based on the image's active state

        // Static info for filters or current user
        currentUser: {
            name: 'Đại tá Nguyễn Văn A',
            title: 'Thứ trưởng Bộ Công an'
        }
    },

    formulas: {
        // Tự động xác định danh sách fields dựa trên dữ liệu thực tế từ Store
        vuAnStatusFields: {
            bind: {
                bindTo: '{vuAnStatusPeriodStore}',
                deep: true
            },
            get: function (store) {
                if (!store || store.getCount() === 0) return [];

                // Lấy bản ghi đầu tiên để phân tích các trường dữ liệu
                var firstRec = store.getAt(0);
                var data = firstRec.data;
                var fields = [];

                // Tự động nhận diện các trường có giá trị là số (loại trừ các trường hệ thống)
                Object.keys(data).forEach(function (key) {
                    if (key !== 'id' && key !== 'unit' && typeof data[key] === 'number') {
                        fields.push(key);
                    }
                });

                return fields;
            }
        },

        // Tự động tạo Title cho các trường dữ liệu động
        vuAnStatusTitles: function (get) {
            var fields = get('vuAnStatusFields');
            var mapping = {
                'trongHan': 'Trong hạn',
                'sapHetHan': 'Sắp hết hạn',
                'quaHan': 'Quá hạn',
                'daKetLuan': 'Đã kết luận',
                'tamDinhChi': 'Tạm đình chỉ'
            };

            return fields.map(function (f) {
                // Nếu có trong map thì lấy, không thì chuyển camelCase thành khoảng trắng
                return mapping[f] || f.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) { return str.toUpperCase(); });
            });
        },

        isVuAn: function (get) {
            return get('currentView') === 'vuan';
        },
        isVuViec: function (get) {
            return get('currentView') === 'vuviec';
        },
        // Returns the correct card index: 0 for Vụ Án, 1 for Vụ Việc
        activeCardIndex: function (get) {
            return get('currentView') === 'vuan' ? 0 : 1;
        },

        // Dynamic series config for the Status Period Chart
        vuAnStatusSeries: function (get) {
            var fields = get('vuAnStatusFields'),
                titles = get('vuAnStatusTitles');

            return [{
                type: 'bar3d',
                xField: 'unit',
                yField: fields,
                title: titles,
                stacked: true, // Quay lại dùng stacked để không phí vị trí cho các giá trị null/0
                colors: ['#84cc16', '#ef4444', '#3b82f6', '#f59e0b', '#6366f1'],
                style: {
                    maxBarWidth: 45,
                    borderWidth: 1,
                    stroke: '#fff'
                },
                renderer: function (sprite, config, data, index) {
                    var field = sprite.getField ? sprite.getField() : null,
                        record = data.store && data.store.getAt(index);

                    if (record && field) {
                        var val = record.get(field);
                        if (val > 0) {
                            // Trick hiển thị cho dữ liệu khập khiễng mà không làm sai lệch hover:
                            // Chúng ta chỉ can thiệp vào chiều cao hiển thị tối thiểu để "thấy màu"
                            var minH = 6;
                            if (Math.abs(config.height) < minH) {
                                // Trả về config mới với chiều cao tối thiểu, giúp mẩu 2 vẫn có màu sắc rõ ràng
                                return {
                                    height: config.height < 0 ? -minH : minH,
                                    stroke: '#fff',
                                    lineWidth: 1
                                };
                            }
                        }
                    }
                },
                label: {
                    field: fields,
                    display: 'insideEnd',
                    textAlign: 'center',
                    fontSize: 9,
                    fontWeight: 'bold',
                    fillStyle: '#ffffff',
                    renderer: function (v) {
                        // Chỉ hiện số nếu giá trị đủ lớn để không làm rối biểu đồ
                        return v > 5 ? v : '';
                    }
                },
                tooltip: {
                    trackMouse: true,
                    renderer: function (tooltip, record, item) {
                        var fields = item.series.getYField(),
                            titles = item.series.getTitle(),
                            unit = record.get('unit'),
                            currentField = item.field,
                            total = 0;

                        // Tính tổng để tính tỉ lệ %
                        fields.forEach(function (f) { total += (record.get(f) || 0); });

                        var html = '<div style="font-weight: bold; border-bottom: 1px solid #ddd; margin-bottom: 5px; padding-bottom: 2px;">' + unit + ' (Tổng: ' + total + ')</div>';

                        fields.forEach(function (f, idx) {
                            var val = record.get(f) || 0;
                            var pct = total > 0 ? ((val / total) * 100).toFixed(1) : 0;
                            var title = titles[idx] || f;
                            var isCurrent = (f === currentField);

                            html += '<div style="' + (isCurrent ? 'font-weight: bold; color: #000;' : 'color: #666;') + '">' +
                                (isCurrent ? '● ' : '○ ') + title + ': ' + val + ' (' + pct + '%)' +
                                '</div>';
                        });

                        tooltip.setHtml(html);
                    }
                }
            }];
        }
    },

    stores: {
        // --- METRICS STORES ---
        vuAnMetricsStore: {
            fields: ['title', 'value', 'trendValue', 'trendDir', 'iconCls', 'color', 'bgColor'],
            data: [
                { title: 'ĐANG ĐIỀU TRA', value: 7125, trendValue: '6,8%', trendDir: 'up', iconCls: 'fa fa-balance-scale', color: '#10b981', bgColor: '#ecfdf5' },
                { title: 'SẮP HẾT HẠN (≤ 10 NGÀY)', value: 856, trendValue: '8,2%', trendDir: 'up', iconCls: 'fa fa-clock', color: '#f97316', bgColor: '#fff7ed' },
                { title: 'ĐÃ QUÁ HẠN', value: 294, trendValue: '18,7%', trendDir: 'up', iconCls: 'fa fa-exclamation-triangle', color: '#ef4444', bgColor: '#fef2f2' },
                { title: 'KẾT LUẬN ĐIỀU TRA', value: 2156, trendValue: '7,3%', trendDir: 'up', iconCls: 'fa fa-file-signature', color: '#3b82f6', bgColor: '#eff6ff' },
                { title: 'TẠM ĐÌNH CHỈ', value: 1150, trendValue: '4,3%', trendDir: 'up', iconCls: 'fa fa-pause-circle', color: '#8b5cf6', bgColor: '#f5f3ff' }
            ]
        },

        vuViecMetricsStore: {
            fields: ['title', 'value', 'trendValue', 'trendDir', 'iconCls', 'color', 'bgColor'],
            data: [
                { title: 'ĐANG XÁC MINH', value: 21356, trendValue: '6,8%', trendDir: 'up', iconCls: 'fa fa-search', color: '#3b82f6', bgColor: '#eff6ff' },
                { title: 'SẮP HẾT HẠN (≤ 10 NGÀY)', value: 3256, trendValue: '8,4%', trendDir: 'up', iconCls: 'fa fa-clock', color: '#f97316', bgColor: '#fff7ed' },
                { title: 'ĐÃ QUÁ HẠN', value: 1842, trendValue: '18,7%', trendDir: 'up', iconCls: 'fa fa-exclamation-triangle', color: '#ef4444', bgColor: '#fef2f2' },
                { title: 'CÒN HẠN (> 10 NGÀY)', value: 13682, trendValue: '4,3%', trendDir: 'up', iconCls: 'fa fa-check-circle', color: '#10b981', bgColor: '#ecfdf5' },
                { title: 'KHỞI TỐ', value: 2156, trendValue: '5,6%', trendDir: 'up', iconCls: 'fa fa-gavel', color: '#6366f1', bgColor: '#e0e7ff' },
                { title: 'KHÔNG KHỞI TỐ', value: 1982, trendValue: '3,9%', trendDir: 'up', iconCls: 'fa fa-ban', color: '#0d9488', bgColor: '#f0fdfa' },
                { title: 'TẠM ĐÌNH CHỈ', value: 1102, trendValue: '2,1%', trendDir: 'up', iconCls: 'fa fa-pause', color: '#64748b', bgColor: '#f1f5f9' },
                { title: 'CHUYỂN ĐƠN VỊ KHÁC', value: 496, trendValue: '3,3%', trendDir: 'up', iconCls: 'fa fa-share', color: '#d97706', bgColor: '#fef3c7' }
            ]
        },

        // --- VỤ ÁN STORES ---
        vuAnGridStore: {
            fields: ['stt', 'maVuAn', 'tenVuAn', 'donVi', 'dieuTraVien', 'giaiDoan', 'trangThai', 'hanDieuTra', 'soNgayConLai', 'canhBao'],
            data: [
                { stt: 1, maVuAn: 'VA-2025-0001', tenVuAn: 'Lừa đảo chiếm đoạt tài sản', donVi: 'C01', dieuTraVien: 'Nguyễn Văn A', giaiDoan: 'Đang điều tra', trangThai: 'Đang điều tra', hanDieuTra: '25/07/2025', soNgayConLai: 65, canhBao: '' },
                { stt: 2, maVuAn: 'VA-2025-0002', tenVuAn: 'Đánh bạc', donVi: 'C02', dieuTraVien: 'Trần Văn B', giaiDoan: 'Đang điều tra', trangThai: 'Sắp hết hạn', hanDieuTra: '25/05/2025', soNgayConLai: 5, canhBao: 'Sắp hết hạn' },
                { stt: 3, maVuAn: 'VA-2025-0003', tenVuAn: 'Buôn bán ma túy', donVi: 'C03', dieuTraVien: 'Lê Văn C', giaiDoan: 'Đang điều tra', trangThai: 'Đã quá hạn', hanDieuTra: '15/05/2025', soNgayConLai: -6, canhBao: 'Quá hạn' },
                { stt: 4, maVuAn: 'VA-2025-0004', tenVuAn: 'Tham ô tài sản', donVi: 'C01', dieuTraVien: 'Phạm Văn D', giaiDoan: 'Kết luận điều tra', trangThai: 'Kết luận điều tra', hanDieuTra: '', soNgayConLai: null, canhBao: '' },
                { stt: 5, maVuAn: 'VA-2025-0005', tenVuAn: 'Cố ý gây thương tích', donVi: 'C04', dieuTraVien: 'Hoàng Văn E', giaiDoan: 'Tạm đình chỉ', trangThai: 'Tạm đình chỉ', hanDieuTra: '', soNgayConLai: null, canhBao: '' }
            ]
        },

        vuAnCrimeTypeStore: {
            fields: ['name', 'value', 'color'],
            data: [
                { name: 'Tội phạm về trật tự xã hội', value: 7245, color: '#1e3a8a' },
                { name: 'Tội phạm về tham nhũng, chức vụ', value: 1642, color: '#0d9488' },
                { name: 'Tội phạm về ma túy', value: 1328, color: '#ef4444' },
                { name: 'Tội phạm về kinh tế', value: 1156, color: '#f59e0b' },
                { name: 'Tội phạm khác', value: 1087, color: '#94a3b8' }
            ]
        },

        vuAnStatusPeriodStore: {
            fields: ['unit', 'trongHan', 'sapHetHan', 'quaHan'],
            data: [
                { unit: 'C01', trongHan: 850, sapHetHan: 150, quaHan: 50 },
                { unit: 'C02', trongHan: 720, sapHetHan: 180, quaHan: 80 },
                { unit: 'C03', trongHan: 610, sapHetHan: 220, quaHan: 120 },
                { unit: 'C04', trongHan: 540, sapHetHan: 130, quaHan: 40 },
                { unit: 'C05', trongHan: 480, sapHetHan: 90, quaHan: 30 }
            ]
        },

        vuAnTopUnitsStore: {
            fields: ['unit', 'value'],
            data: [
                { unit: 'C01', value: 1560 },
                { unit: 'C02', value: 1248 },
                { unit: 'C03', value: 1102 },
                { unit: 'C04', value: 962 },
                { unit: 'C05', value: 854 }
            ]
        },

        ThongKeCongTacNghiemVuStore: {
            fields: ['title', 'value', 'subValue', 'iconCls', 'color', 'bgColor', 'subTitle', 'details'],
            data: [
                {
                    title: 'ĐANG ĐIỀU TRA CƠ BẢN', value: 176, subValue: 64, subTitle: 'Chưa có số hồ sơ', iconCls: 'fa fa-search', color: '#3b82f6', bgColor: '#eff6ff',
                    details: [{ label: 'Cấp Bộ', val: 12 }, { label: 'Cấp Tỉnh', val: 84 }, { label: 'Cấp Huyện', val: 80 }]
                },
                {
                    title: 'ĐANG SƯU TRA', value: 128, subValue: 76, subTitle: 'Chưa có số hồ sơ', iconCls: 'fa fa-folder-open', color: '#f59e0b', bgColor: '#fffbeb',
                    details: [{ label: 'Cấp Bộ', val: 8 }, { label: 'Cấp Tỉnh', val: 50 }, { label: 'Cấp Huyện', val: 70 }]
                },
                {
                    title: 'ĐANG HIỀM NGHI', value: 149, subValue: 96, subTitle: 'Chưa có số hồ sơ', iconCls: 'fa fa-user', color: '#1e293b', bgColor: '#f1f5f9',
                    details: [{ label: 'Cấp Bộ', val: 15 }, { label: 'Cấp Tỉnh', val: 45 }, { label: 'Cấp Huyện', val: 89 }]
                },
                {
                    title: 'ĐANG CHUYÊN ÁN', value: 94, subValue: 393, subTitle: 'Chưa có số hồ sơ', iconCls: 'fa fa-briefcase', color: '#92400e', bgColor: '#fef3c7',
                    details: [{ label: 'Cấp Bộ', val: 24 }, { label: 'Cấp Tỉnh', val: 40 }, { label: 'Cấp Huyện', val: 30 }]
                },
                {
                    title: 'ĐANG CỘNG TÁC VIÊN BÍ MẬT', value: 95, subValue: 71, subTitle: 'Chưa có số hồ sơ', iconCls: 'fa fa-user-secret', color: '#8b5cf6', bgColor: '#f5f3ff',
                    details: [{ label: 'Cấp Bộ', val: 5 }, { label: 'Cấp Tỉnh', val: 30 }, { label: 'Cấp Huyện', val: 60 }]
                },
                {
                    title: 'ĐANG VAI ẢO NGHIỆP VỤ', value: 23, subValue: 21, subTitle: 'Chưa có số hồ sơ', iconCls: 'fa fa-user-cog', color: '#10b981', bgColor: '#ecfdf5',
                    details: [{ label: 'Cấp Bộ', val: 3 }, { label: 'Cấp Tỉnh', val: 10 }, { label: 'Cấp Huyện', val: 10 }]
                },
                {
                    title: 'ĐANG HỘP THƯ BÍ MẬT', value: 11, subValue: 10, subTitle: 'Chưa có số hồ sơ', iconCls: 'fa fa-envelope', color: '#059669', bgColor: '#ecfdf5',
                    details: [{ label: 'Cấp Bộ', val: 1 }, { label: 'Cấp Tỉnh', val: 5 }, { label: 'Cấp Huyện', val: 5 }]
                }
            ]
        },

        vuViecExtensionStore: {
            fields: ['label', 'value'],
            data: [
                { label: 'Gia hạn 1', value: 1245 },
                { label: 'Gia hạn 2', value: 856 },
                { label: 'Gia hạn 3', value: 432 },
                { label: 'Gia hạn 4', value: 128 }
            ]
        },

        // --- VỤ VIỆC STORES ---
        vuViecGridStore: {
            fields: ['stt', 'maVuViec', 'nguonTin', 'donVi', 'dieuTraVien', 'trangThai', 'hanXacMinh', 'soNgayConLai', 'ketQuaDuKien'],
            data: [
                { stt: 1, maVuViec: 'VV-2025-0001', nguonTin: 'Tin báo tội phạm', donVi: 'C01', dieuTraVien: 'Nguyễn Văn A', trangThai: 'Đang xác minh', hanXacMinh: '28/05/2025', soNgayConLai: 7, ketQuaDuKien: '-' },
                { stt: 2, maVuViec: 'VV-2025-0002', nguonTin: 'Tin báo tội phạm', donVi: 'C02', dieuTraVien: 'Trần Văn B', trangThai: 'Sắp hết hạn (≤ 10 ngày)', hanXacMinh: '18/05/2025', soNgayConLai: 3, ketQuaDuKien: '-' },
                { stt: 3, maVuViec: 'VV-2025-0003', nguonTin: 'Kiến nghị khởi tố', donVi: 'C03', dieuTraVien: 'Lê Văn C', trangThai: 'Đã quá hạn', hanXacMinh: '10/05/2025', soNgayConLai: -2, ketQuaDuKien: '-' },
                { stt: 4, maVuViec: 'VV-2025-0004', nguonTin: 'Phản ánh, kiến nghị', donVi: 'C04', dieuTraVien: 'Phạm Văn D', trangThai: 'Khởi tố', hanXacMinh: '25/06/2025', soNgayConLai: 35, ketQuaDuKien: '-' },
                { stt: 5, maVuViec: 'VV-2025-0005', nguonTin: 'Đơn khiếu nại, tố cáo', donVi: 'C05', dieuTraVien: 'Hoàng Văn E', trangThai: 'Không khởi tố', hanXacMinh: '', soNgayConLai: null, ketQuaDuKien: '-' }
            ]
        },

        vuViecStatusStore: {
            fields: ['name', 'value', 'color'],
            data: [
                { name: 'Đang xác minh', value: 21356, color: '#3b82f6' },
                { name: 'Sắp hết hạn (≤ 10 ngày)', value: 3256, color: '#f97316' },
                { name: 'Đã quá hạn', value: 1842, color: '#ef4444' },
                { name: 'Còn hạn (> 10 ngày)', value: 13682, color: '#10b981' },
                { name: 'Khởi tố', value: 2156, color: '#6366f1' },
                { name: 'Không khởi tố', value: 1982, color: '#0d9488' },
                { name: 'Tạm đình chỉ', value: 1102, color: '#64748b' },
                { name: 'Chuyển đơn vị khác', value: 496, color: '#d97706' }
            ]
        },

        vuViecPeriodStore: {
            fields: ['status', 'value', 'percentage'],
            data: [
                { status: 'Còn hạn\n(> 10 ngày)', value: 13682, percentage: 29.8 },
                { status: 'Sắp hết hạn\n(≤ 10 ngày)', value: 3256, percentage: 7.1 },
                { status: 'Đã quá hạn', value: 1842, percentage: 4.0 },
                { status: 'Đang xác minh', value: 21356, percentage: 46.5 }
            ]
        },

        vuViecTopUnitsStore: {
            fields: ['unit', 'value'],
            data: [
                { unit: 'C01', value: 5882 },
                { unit: 'C02', value: 4085 },
                { unit: 'C03', value: 4523 },
                { unit: 'C04', value: 3985 },
                { unit: 'C05', value: 2856 }
            ]
        }
    }
});
