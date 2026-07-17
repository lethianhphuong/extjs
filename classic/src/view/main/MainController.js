Ext.define('DEMO.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    requires: [
        'DEMO.view.main.Settings',
        'DEMO.view.dashboard.Dashboard_View',
        'DEMO.view.pages.Ecommerce.Ecommerce_View',
        'DEMO.view.pages.Analytics.Analytics_View',
        'DEMO.view.pages.Banking.Banking_View',
        'DEMO.view.pages.Booking.Booking_View',
        'DEMO.view.pages.FilePage.FilePage_View',
        'DEMO.view.pages.Course.Course_View',
        'DEMO.view.pages.UserPage.UserPage_View',
        'DEMO.view.pages.ProductPage.ProductPage_View',
        'DEMO.view.pages.OrderPage.OrderPage_View',
        'DEMO.view.pages.InvoicePage.InvoicePage_View',
        'DEMO.view.pages.BlogPage.BlogPage_View',
        'DEMO.view.pages.UserList.UserList_View',
        'DEMO.view.pages.UserRoles.UserRoles_View',
        'DEMO.view.pages.ProductList.ProductList_View',
        'DEMO.view.pages.ProductCategories.ProductCategories_View',
        'DEMO.view.pages.OrderList.OrderList_View',
        'DEMO.view.pages.InvoiceList.InvoiceList_View',
        'DEMO.view.pages.ToTrinh.ToTrinh_View',
        'DEMO.view.pages.Icons.Icons_View'
    ],

    // ---- Navigation ----

    onNavigationTreeSelectionChange: function (tree, record) {
        var me = this,
            route;

        if (!record || !record.get('route')) {
            return;
        }

        // Nếu là node cha có con → redirect đến con đầu tiên
        if (!record.isLeaf() && record.childNodes && record.childNodes.length) {
            var firstChild = me.findFirstLeafChild(record);
            if (firstChild) {
                me.navigateTo(firstChild);
                return;
            }
        }

        me.navigateTo(record);
    },

    navigateTo: function (record) {
        var me = this,
            center = me.getCenter(),
            id = record.get('route'),
            xtype = record.get('component');

        if (!center || !xtype) return;

        // Tạo view nếu chưa có
        var target = center.getComponent('view-' + id);
        if (!target) {
            center.add({
                xtype: xtype,
                itemId: 'view-' + id
            });
            target = center.getComponent('view-' + id);
        }

        // Chuyển card
        if (target) {
            center.setActiveItem(target);
        }

        me.getViewModel().set('currentView', id);
    },

    findFirstLeafChild: function (node) {
        var children = node.childNodes,
            i, found;

        for (i = 0; i < children.length; i++) {
            if (children[i].isLeaf()) {
                return children[i];
            }
            if (children[i].childNodes && children[i].childNodes.length) {
                found = this.findFirstLeafChild(children[i]);
                if (found) {
                    return found;
                }
            }
        }
        return null;
    },

    // ---- Helpers ----

    getCenter: function () {
        var main = this.getView();
        return main ? main.getComponent('centerRegion') : null;
    },

    // ---- Micro toggle ----

    onToggleMicro: function () {
        var nav = this.getView().down('treelist');
        nav.setMicro(!nav.getMicro());
    },

    // ---- Settings ----

    onOpenSettings: function () {
        var header = this.getView().down('app-header');
        if (header && header.settingsPanel) {
            header.settingsPanel.show();
            header.settingsPanel.alignTo(Ext.getBody(), 'tr-tr', [-10, 0]);
        }
    }
});
