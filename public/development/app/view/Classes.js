Ext.define('iSchool.view.Classes', {
    extend: 'Ext.view.View',

    alias: 'widget.Classes',

    cls: 'Classes',

    requires:[
        'Ext.tab.Panel',
        'Ext.layout.container.Border'
    ],

    autoScroll : true,

    store: 'Classes',
    tpl: new Ext.XTemplate(
        '<div class="nouveau"><div class="titre">Nouvelle classe <i class="fa fa-plus-square"></i></div></div>',
        '<tpl for=".">',
        '<div class="classe">',
        '<div class="titre">{libelle}</div>',
        '<div class="nb_eleve">{[this.renderNbEleves(values)]}</div>',
        '<div class="top">{[this.renderTopEleve(values)]}</div>',
        '</div>',
        '</tpl>',{
            renderNbEleves : function(values){

                return 'Nombre d\'élèves : ' + Ext.getStore('Eleves').getGroups(values.id).children.length;

            },
            renderTopEleve : function(values){

                var eleve = Ext.getStore('Eleves').getGroups(values.id).children[0] ;

                if ( !eleve )
                    return '';

                return 'Meilleur élève : ' + eleve.get('nom') + ' ' + eleve.get('prenom');

            },
            renderState2 : function(logo, type, connected){

                //
                // render statut element
                //

                if ( connected === null ){

                    return '<i class="fa fa-spinner fa-pulse fa-2x"></i>';

                }

                return '<i class="' + logo + ' ' + type + ' ' + (connected ? 'actif' : 'inactif') + '" title="' + (!connected && type ? 'Démarrer' : 'Arrêter') + '"></i>';

            },
            renderMaintenance : function(maintenance){

                //
                // Render maintenance
                //

                if ( !maintenance ){

                    return '<i class="fa fa-spinner fa-pulse"></i>';

                }

                var lastExecute = new Date(maintenance.lastExecute);
                var moment = new Date();
                var html = '';
                var obsolete = false ;

                if ((moment.getTime() - lastExecute.getTime()) > (24 * 60 * 60 * 1000) )
                    obsolete = true ;

                html+= '<span class="left">Maintenance : ' + (maintenance.success ? '<span style="color:green">Ok</span>' : '<span style="color:red">Echec</span>' ) + '</span>' ;
                html+= '<span class="droite">' + this.formatDate(lastExecute) + (obsolete ? ' <i style="color:orange" class="fa fa-exclamation-triangle"></i>' : '') + '</span>';
                html+= maintenance.lastCommand ? ('<br/>Dern. cmd : ' + maintenance.lastCommand) : '' ;
                html+= maintenance.error ? ('<br/>Erreur : ' + maintenance.error) : '' ;

                return html;

            },
            renderTache : function(tache){

                //
                // Render tache journaliere
                //

                if ( !tache ){

                    return '<i class="fa fa-spinner fa-pulse"></i>';

                }

                var lastExecute = new Date(tache.lastExecute);
                var moment = new Date();
                var html = '';
                var obsolete = false ;

                if ((moment.getTime() - lastExecute.getTime()) > (24 * 60 * 60 * 1000) )
                    obsolete = true ;

                html+= '<span class="left">Tâche journalière : ' + (tache.success ? '<span style="color:green">Ok</span>' : '<span style="color:red">Echec</span>') + '</span>' ;
                html+= '<span class="droite">' + this.formatDate(lastExecute) + (obsolete ? ' <i style="color:orange" class="fa fa-exclamation-triangle"></i>' : '') + '</span>';
                html+= tache.error ? ('<br/>Erreur : ' + tache.error) : '' ;

                return html;

            },
            renderChrome : function(values){

                var origin = window.location.origin ;
                origin = origin.slice(0, origin.length-4 ) + values.port;

                if ( values.serverConnected && values.serverFirebirdConnected && values.serverFrsConnected && values.serverRedisConnected )
                    return '<a href="'+ origin +'" target="_blank"><i class="fa fa-chrome fa-spin"></i></a>';

            },
            formatDate : function(date){

                //
                // retourne la date au format jj-mm-yyyy hh:mm
                //

                var day = date.getDate() <= 9 ? "0"+date.getDate() : date.getDate() ;
                var month = date.getMonth() <= 9 ? "0"+date.getMonth()+1 : date.getMonth()+1 ;
                var hour = date.getHours() <= 9 ? "0"+date.getHours() : date.getHours() ;
                var minutes = date.getMinutes() <= 9 ? "0"+date.getMinutes() : date.getMinutes() ;

                return day + '-' + month + '-' + date.getFullYear() + ' ' + hour + ':' + minutes;

            }
        }
    ),
    itemSelector: 'div.client',
    emptyText: 'Aucun client installé',
    renderTo: Ext.getBody()
});