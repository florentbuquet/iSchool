Ext.define('iSchool.controller.Eleves', {
    extend: 'Ext.app.Controller',

    refs: [
        {
            ref: 'Main',
            selector: 'Main'
        }
    ],

    loadEleves: function(){

        var me = this ;

        Ext.getStore('Eleves').load({
            callback : function(){

                console.log('ELEVES LOADED');

                me.getMain().down('#pnlGeneral').removeAll();

                me.getMain().down('#pnlGeneral').add({xtype: 'Eleves'});

            }
        });

    }

});
