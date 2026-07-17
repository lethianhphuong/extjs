
Ext.define('DEMO.override.TextArea', {
    override: 'Ext.form.field.TextArea',

    inputAttrTpl: [
        'spellcheck=false'
    ],
    labelSeparator: '',
    labelAlign: 'top',
    cls: 'field-csstyle',
    readOnlyCls: 'readOnlyCls',
    blankText: 'Không được để trống trường này',
    minLengthText: 'Thông tin nhập vào không ngắn hơn độ dài cho phép ({0} ký tự)',
    maxLengthText: 'Thông tin nhập vào vượt quá độ dài cho phép({0} ký tự)',

    grow: true,
    growMax: 170, // dp du do cao 10 dong theo tester
    growMin: 60 // do cao it nhat 1 dong 

    // minHeight: 28,      // blur: dp du do cao 2 dong
    // grow: false,
    // growMin: 5,         // do cao it nhat 1 dong 
    // growMax: 40,        // blur: dp du do cao 2 dong
    // // enforceMaxLength: true,

    // listeners: {
    //     focus: function () {
    //         var me = this;
    //         if (!me.grow) {
    //             me.grow = true;
    //         }
    //         me.growMax = 170;               // focus: du do cao = 10 dong theo tester
    //         me.autoSize();
    //     },
    //     blur: function () {
    //         var me = this;
    //         me.growMin = 55;
    //         me.growMax = 170;                // blur: dp du do cao 2 dong
    //         me.autoSize();
    //     },
    // },
});