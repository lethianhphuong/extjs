Ext.define('DEMO.Application', {
    extend: 'Ext.app.Application',
    name: 'DEMO',
    defaultToken: 'app',
    launch: function () {
        let me = this;
        document.title = 'app demo';


        me.setVietnameseDate();
        Ext.create('DEMO.view.main.Main', { fullscreen: true });

        document.getElementsByClassName('loading-app') && (document.getElementsByClassName('loading-app')[0].style.display = 'none')
    },

    //#endregion

    onAppUpdate: function () {
        window.location.reload();
    },

    setVietnameseDate: function () {
        Ext.Date.monthNames = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];

        /// Ext.Date.dayNames = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
        Ext.Date.dayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

        Ext.Date.monthNumbers = {
            'Tháng 1': 0,
            'Tháng 2': 1,
            'Tháng 3': 2,
            'Tháng 4': 3,
            'Tháng 5': 4,
            'Tháng 6': 5,
            'Tháng 7': 6,
            'Tháng 8': 7,
            'Tháng 9': 8,
            'Tháng 10': 9,
            'Tháng 11': 10,
            'Tháng 12': 11
        };

        Ext.Date.getShortMonthName = function (month) {
            return Ext.Date.monthNames[month];
        };

        Ext.Date.getMonthNumber = function (name) {
            return Ext.Date.monthNumbers[name];
        };

        Ext.Date.getShortDayName = function (day) {
            return Ext.Date.dayNames[day];
        };

        /// Ext.Date.firstDayOfWeek = 1;
    }
});