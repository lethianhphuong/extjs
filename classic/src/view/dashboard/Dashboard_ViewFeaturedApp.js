Ext.define('DEMO.view.dashboard.Dashboard_ViewFeaturedApp', {
    extend: 'Ext.panel.Panel',
    xtype: 'Dashboard_ViewFeaturedApp',

    flex: 1,
    cls: 'dash-featured-card',

    bodyStyle: {
        background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #4c1d95 100%)',
        'border-radius': '16px',
        padding: '24px',
        position: 'relative',
        overflow: 'hidden',
        height: '100%'
    },

    html: [
        '<div class="dash-featured-dots" id="featuredDots">',
        '<div class="dash-featured-dot dash-featured-dot-active" data-idx="0"></div>',
        '<div class="dash-featured-dot" data-idx="1"></div>',
        '<div class="dash-featured-dot" data-idx="2"></div>',
        '</div>',
        '<div class="dash-featured-nav">',
        '<div class="dash-featured-nav-btn" id="featuredPrev"><i class="fa fa-chevron-left"></i></div>',
        '<div class="dash-featured-nav-btn" id="featuredNext"><i class="fa fa-chevron-right"></i></div>',
        '</div>',
        '<div style="position:relative;z-index:2;margin-top:180px;">',
        '<div class="dash-featured-tag">FEATURED APP</div>',
        '<div class="dash-featured-title">The Rise of Remote Work: Benefits and Challenges</div>',
        '<div class="dash-featured-desc">The aroma of freshly brewed coffee filled the air as teams adapt to new ways of collaborating across distances.</div>',
        '</div>'
    ].join(''),

    listeners: {
        afterrender: function (cmp) {
            var view = cmp.up('Dashboard_View');
            if (!view) return;

            cmp.getEl().on('click', function (e, t) {
                if (t.id === 'featuredPrev' || t.id === 'featuredNext') {
                    var vc = view.getController();
                    if (t.id === 'featuredPrev') {
                        vc.onFeaturedPrev();
                    } else {
                        vc.onFeaturedNext();
                    }
                }
            });
        }
    }
});
