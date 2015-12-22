Ext.define('iSchool.controller.Main', {
    extend: 'Ext.app.Controller',

    refs: [
        {
            ref: 'Main',
            selector: 'Main'
        }
    ],

    init: function() {
        this.control({
            'Main > menu#menuGeneral': {
                click: this.onMenuGeneralClick
            },
            'Main': {
                boxready:this.onMainBoxReady
            }
        });
    },

    onMainBoxReady: function(){

        //
        // Chargement de la vue par défaut : Clients
        //

        var menu = this.getMain().down('#menuGeneral') ;
        menu.fireEvent('click', menu, menu.down('#Classes') );

    },

    onMenuGeneralClick: function(menu , item , e) {

        if ( item ) {

            //
            // Chargement de la vue associé a l'item cliqué
            //

            this.loadView(item);

        }

    },

    activeMenuItem: function(item){

        //
        // Set la classe selected a l'item du menu selectionné
        //

        if( item )
        {
            var menu  = item.up( 'menu' );

            //
            // Permet de réset la selection dans le menu
            //

            var menuSelected = menu.getEl().query('.x-menu-item-selected');

            Ext.Array.each( menuSelected, function( menu ){

                Ext.get( menu ).removeCls('x-menu-item-selected');

            });

            //
            // Sélectionne l'item voulu
            //

            item.getEl().addCls('x-menu-item-selected');
        }

    },

    loadView: function(item){

        var me = this ;

        //
        // ACTIVE MENU ITEM
        //

        me.activeMenuItem( item );

        //
        // SET TITLE PANEL GENERAL
        //

        me.getMain().down('#pnlGeneral').setTitle( item.text );

        //
        // CHARGEMENTS DES DONNEES ET DE LA VUE EN FONCTION DE L'ITEM SELECTIONNE
        //

        switch( item.getItemId() ){

            case 'Classes' : me.getController('Classes').loadClasses();break ;
            case 'Eleves' : me.getController('Eleves').loadEleves();break;
            case 'Devoirs' : me.getController('Devoirs').loadDevoirs();break;
            case 'Documents' : me.getController('Documents').loadDocuments();break;
            //case 'Parametres' : me.getController('Parametres').loadParametres();break ;
            case 'Deconnexion' : window.location = 'logout';break ;

            default : console.log('Item non reconnu.');

        };

    }
});
