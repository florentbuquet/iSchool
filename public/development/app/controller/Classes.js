Ext.define('iSchool.controller.Classes', {
    extend: 'Ext.app.Controller',

    refs: [
        {
            ref: 'Main',
            selector: 'Main'
        }
    ],

    loadClasses: function(){

        var me = this ;

        Ext.getStore('Classes').load({
            callback : function(){
                console.log('CLASSES LOADED');

                Ext.getStore('Eleves').load({
                    callback : function(){

                        console.log('ELEVES LOADED');

                        me.getMain().down('#pnlGeneral').removeAll();

                        me.getMain().down('#pnlGeneral').add({xtype: 'Classes'});

                    }
                });

            }
        });

    }

});
