/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('DEMO.Application', {
    extend: 'Ext.app.Application',

    name: 'DEMO',
    requires: [
        'DEMO.util.State',
        'DEMO.model.Session',
        'DEMO.view.*'
    ],
    //defaultToken : 'dashboard',

    //mainView: 'DEMO.view.main.Main',

    profiles: [
        'Phone',
        'Tablet'
    ],

    stores: [
        'NavigationTree'
    ],

    launch: function () {
        console.log('.... launch modern app!');
    },

    onAppUpdate: function () {
        window.location.reload();
    }
});
