Ext.define('DEMO.view.dashboard.Dashboard_ViewHeroCard', {
    extend: 'Ext.panel.Panel',
    xtype: 'Dashboard_ViewHeroCard',

    cls: 'dash-hero-card',
    flex: 2,
    margin: '0 16 0 0',

    bodyStyle: {
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #1a2744 100%)',
        'border-radius': '16px',
        padding: '32px',
        position: 'relative',
        overflow: 'hidden'
    },

    data: { name: 'Jaydon Frankie' },

    tpl: [
        '<div style="position:relative;z-index:2;">',
        '<div class="dash-hero-greeting">Welcome back hello 888</div>',
        '<div class="dash-hero-name">{name} 👋</div>',
        '<div class="dash-hero-desc">If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text.</div>',
        '<div class="dash-hero-cta" id="heroGoNow">Go now</div>',
        '</div>',

        '<div class="dash-hero-illustration">',
        '<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;">',
        '<circle cx="100" cy="100" r="90" fill="rgba(34,197,94,0.08)" />',
        '<circle cx="100" cy="100" r="65" fill="rgba(59,130,246,0.06)" />',
        '<rect x="60" y="40" width="80" height="100" rx="6" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>',
        '<rect x="72" y="56" width="40" height="4" rx="2" fill="#3b82f6"/>',
        '<rect x="72" y="66" width="56" height="3" rx="1.5" fill="#475569"/>',
        '<rect x="72" y="74" width="48" height="3" rx="1.5" fill="#475569"/>',
        '<rect x="72" y="82" width="52" height="3" rx="1.5" fill="#475569"/>',
        '<rect x="72" y="96" width="12" height="20" rx="2" fill="#22c55e"/>',
        '<rect x="88" y="104" width="12" height="12" rx="2" fill="#3b82f6"/>',
        '<rect x="104" y="100" width="12" height="16" rx="2" fill="#f59e0b"/>',
        '<rect x="120" y="96" width="12" height="20" rx="2" fill="#22c55e"/>',
        '<circle cx="140" cy="55" r="16" fill="#f59e0b"/>',
        '<circle cx="135" cy="52" r="2" fill="#1e293b"/>',
        '<circle cx="145" cy="52" r="2" fill="#1e293b"/>',
        '<path d="M136 60 Q140 64 144 60" stroke="#1e293b" stroke-width="1.5" fill="none"/>',
        '<path d="M124 50 Q128 36 140 38 Q152 36 156 50" fill="#92400e"/>',
        '<rect x="128" y="70" width="24" height="30" rx="4" fill="#22c55e"/>',
        '<line x1="152" y1="78" x2="168" y2="68" stroke="#f59e0b" stroke-width="3" stroke-linecap="round"/>',
        '<circle cx="170" cy="66" r="4" fill="#f59e0b"/>',
        '<polygon points="160,40 172,48 160,56" fill="#22c55e" opacity="0.7"/>',
        '</svg>',
        '</div>'
    ],

    listeners: {
        afterrender: function (cmp) {
            var view = cmp.up('Dashboard_View');
            if (!view) return;
            var vm = view.getViewModel();
            if (!vm) return;
            var user = vm.get('currentUser');
            if (user) {
                cmp.setData(user);
            }

            cmp.getEl().on('click', function (e, t) {
                if (t.id === 'heroGoNow') {
                    view.getController().onGoNow();
                }
            });
        }
    }
});
