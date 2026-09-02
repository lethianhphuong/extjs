Ext.define('DEMO.view.dashboard.Dashboard_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dashboard',

    /**
     * Navigate to featured app (prev)
     */
    onFeaturedPrev: function () {
        var vm = this.getViewModel();
        var store = vm.getStore('featuredAppsStore');
        var idx = vm.get('featuredAppIndex');
        idx = (idx - 1 + store.getCount()) % store.getCount();
        vm.set('featuredAppIndex', idx);
        this.updateFeaturedCard();
    },

    /**
     * Navigate to featured app (next)
     */
    onFeaturedNext: function () {
        var vm = this.getViewModel();
        var store = vm.getStore('featuredAppsStore');
        var idx = vm.get('featuredAppIndex');
        idx = (idx + 1) % store.getCount();
        vm.set('featuredAppIndex', idx);
        this.updateFeaturedCard();
    },

    /**
     * Update the Featured App card display
     */
    updateFeaturedCard: function () {
        var vm = this.getViewModel();
        var app = vm.get('currentFeaturedApp');
        if (!app) return;

        var gradients = [
            'linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #4c1d95 100%)',
            'linear-gradient(135deg, #0c4a6e 0%, #075985 40%, #0369a1 100%)',
            'linear-gradient(135deg, #7f1d1d 0%, #991b1b 40%, #b91c1c 100%)'
        ];

        var featuredPanel = this.getView().down('Dashboard_ViewFeaturedApp');
        if (featuredPanel) {
            var idx = vm.get('featuredAppIndex');
            var data = app.data;

            // Update body gradient
            var gradient = gradients[idx] || gradients[0];
            featuredPanel.body.setStyle('background', gradient);

            // Update body HTML
            featuredPanel.body.update([
                '<div class="dash-featured-dots" id="featuredDots">',
                '<div class="dash-featured-dot' + (idx === 0 ? ' dash-featured-dot-active' : '') + '" data-idx="0"></div>',
                '<div class="dash-featured-dot' + (idx === 1 ? ' dash-featured-dot-active' : '') + '" data-idx="1"></div>',
                '<div class="dash-featured-dot' + (idx === 2 ? ' dash-featured-dot-active' : '') + '" data-idx="2"></div>',
                '</div>',
                '<div class="dash-featured-nav">',
                '<div class="dash-featured-nav-btn" id="featuredPrev"><i class="fa fa-chevron-left"></i></div>',
                '<div class="dash-featured-nav-btn" id="featuredNext"><i class="fa fa-chevron-right"></i></div>',
                '</div>',
                '<div style="position:relative;z-index:2;margin-top:180px;">',
                '<div class="dash-featured-tag">' + (data.tag || '') + '</div>',
                '<div class="dash-featured-title">' + (data.title || '') + '</div>',
                '<div class="dash-featured-desc">' + (data.description || '') + '</div>',
                '</div>'
            ].join(''));

            // Re-bind click after body update
            featuredPanel.getEl().on('click', function (e, t) {
                if (t.id === 'featuredPrev' || t.id === 'featuredNext') {
                    var vc = featuredPanel.up('Dashboard_View').getController();
                    if (t.id === 'featuredPrev') {
                        vc.onFeaturedPrev();
                    } else {
                        vc.onFeaturedNext();
                    }
                }
            });
        }
    },

    /**
     * Handle "Go now" button click
     */
    onGoNow: function () {
        Ext.toast({
            html: 'Đang chuyển hướng...',
            title: 'Navigate',
            align: 't',
            ui: 'primary',
            iconCls: 'x-fa fa-arrow-right',
            closable: false,
            slideInDuration: 200,
            minWidth: 200
        });
    },

    /**
     * Handle KPI card click
     */
    onKpiClick: function (record) {
        var title = record.get('title');
        var value = record.get('value');

        Ext.toast({
            html: 'Xem chi tiết: <b>' + title + '</b> (' + Ext.util.Format.number(value, '0,000') + ')',
            title: 'KPI',
            align: 't',
            ui: 'info',
            closable: false,
            slideInDuration: 200,
            minWidth: 200
        });
    }
});
