Ext.define('DEMO.view.dashboard.Dashboard_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dashboard',

    init: function () {
        // Initialization logic if any
    },

    /**
     * Handles switching between "Vụ án" and "Vụ việc" views.
     * Updates the ViewModel variable 'currentView' which triggers card layout updates.
     */
    onViewToggle: function (btn, value) {
        if (!value) return; // Ignore unpressing events in single-select mode

        var vm = this.getViewModel();
        vm.set('currentView', value);

        // Log action for verification
        console.log('Switched dashboard view context to: ' + value);
    },

    /**
     * Handles clicks on professional work statistics cards (KPI cards).
     */
    onMetricClick: function (dataview, record) {
        var title = record.get('title');
        var value = record.get('value');

        Ext.toast({
            html: 'Đang xem danh sách: <b>' + title + '</b> (' + value + ')',
            title: 'Chuyển hướng',
            align: 't',
            ui: 'primary',
            iconCls: record.get('iconCls')
        });

        // Logic to filter main grid or navigate to details could go here
        console.log('Selected Professional Metric:', title, record.data);
    },

    /**
     * Search button click handler.
     * Captures filter field values and filters the active grid store.
     */
    onSearch: function () {
        var view = this.getView(),
            vm = this.getViewModel(),
            currentView = vm.get('currentView'),

            // Get filter field values
            capDonVi = view.down('#comboCapDonVi').getValue(),
            donViThuLy = view.down('#comboDonViThuLy').getValue(),
            loaiVuViec = view.down('#comboLoaiVuViec').getValue(),
            dateRange = view.down('#dateRangeField').getValue();

        // Get the active store
        var store = currentView === 'vuan' ? vm.getStore('vuAnGridStore') : vm.getStore('vuViecGridStore');

        store.clearFilter(true);

        var filters = [];
        if (capDonVi && capDonVi !== 'all') {
            filters.push({ property: 'capDonVi', value: capDonVi });
        }
        if (donViThuLy && donViThuLy !== 'all') {
            filters.push({ property: 'donVi', value: donViThuLy });
        }
        if (loaiVuViec && loaiVuViec !== 'all') {
            filters.push({ property: 'nguonTin', value: loaiVuViec });
        }

        if (filters.length > 0) {
            store.addFilter(filters);
        } else {
            store.load(); // Refresh store if filters cleared
        }

        Ext.toast({
            html: 'Đã áp dụng bộ lọc và tìm kiếm.',
            title: 'Thông báo',
            align: 't',
            ui: 'success',
            closable: false,
            slideInDuration: 200,
            minWidth: 200
        });
    },

    /**
     * Export report button handler.
     */
    onExportReport: function () {
        var vm = this.getViewModel(),
            currentView = vm.get('currentView') === 'vuan' ? 'Vụ án' : 'Vụ việc';

        Ext.Msg.show({
            title: 'Xuất Báo Cáo',
            message: 'Hệ thống đang khởi tạo file báo cáo danh sách ' + currentView + '. Bạn có muốn tải xuống không?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function (btn) {
                if (btn === 'yes') {
                    Ext.toast({
                        html: 'Đang tải xuống báo cáo...',
                        ui: 'info',
                        align: 't'
                    });
                }
            }
        });
    },

    /**
     * Row action: View details
     */
    onRowView: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var idVal = rec.get('maVuAn') || rec.get('maVuViec');
        Ext.Msg.alert('Chi tiết', 'Đang xem thông tin chi tiết mã: ' + idVal);
    },

    /**
     * Row action: Edit record
     */
    onRowEdit: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var idVal = rec.get('maVuAn') || rec.get('maVuViec');
        Ext.Msg.alert('Cập nhật', 'Mở biểu mẫu chỉnh sửa cho mã: ' + idVal);
    },

    /**
     * Row action: More choices/Action context menu
     */
    onRowMore: function (grid, rowIndex, colIndex, item, e) {
        var rec = grid.getStore().getAt(rowIndex);
        var idVal = rec.get('maVuAn') || rec.get('maVuViec');

        var menu = Ext.create('Ext.menu.Menu', {
            items: [
                {
                    text: 'In quyết định',
                    iconCls: 'x-fa fa-print',
                    handler: function () {
                        Ext.toast('Đang in quyết định cho ' + idVal);
                    }
                },
                {
                    text: 'Chuyển lưu trữ',
                    iconCls: 'x-fa fa-archive',
                    handler: function () {
                        Ext.toast('Đã lưu trữ hồ sơ ' + idVal);
                    }
                },
                {
                    text: 'Xóa bản ghi',
                    iconCls: 'x-fa fa-trash',
                    ui: 'danger',
                    handler: function () {
                        Ext.Msg.confirm('Xác nhận', 'Bạn có chắc chắn muốn xóa bản ghi này?', function (btn) {
                            if (btn === 'yes') {
                                grid.getStore().remove(rec);
                                Ext.toast('Đã xóa thành công!');
                            }
                        });
                    }
                }
            ]
        });
        menu.showAt(e.getXY());
    },

    /**
     * Handler for "Xem tất cả" links
     */
    onViewAll: function () {
        var vm = this.getViewModel(),
            currentView = vm.get('currentView') === 'vuan' ? 'Vụ án' : 'Vụ việc';
        Ext.Msg.alert('Danh sách chi tiết', 'Đang chuyển hướng đến trang danh sách đầy đủ của ' + currentView);
    }
});
