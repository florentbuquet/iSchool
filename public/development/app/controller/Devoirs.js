Ext.define('iSchool.controller.Devoirs', {
    extend: 'Ext.app.Controller',

    refs: [
        {
            ref: 'Main',
            selector: 'Main'
        }
    ],

    loadDevoirs: function(){

        var me = this ;

        Ext.getStore('Devoirs').load({
            callback : function(){
                console.log('DEVOIRS LOADED');

                me.getMain().down('#pnlGeneral').removeAll();

                me.getMain().down('#pnlGeneral').add({xtype: 'Devoirs'});
            }
        });

    }

});
