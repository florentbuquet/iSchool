Ext.define('iSchool.view.Main', {
    extend: 'Ext.container.Container',

    alias: 'widget.Main',

    cls: 'Main',

    xtype : 'app-main',

    requires:[
        'Ext.tab.Panel',
        'Ext.layout.container.Border'
    ],

    layout: {
        type: 'border'
    },

    items: [{
        region: 'west',
        xtype: 'menu',
        itemId: 'menuGeneral',
        cls: 'MenuGeneral',
        title: '<i class="fa fa-graduation-cap"></i> iSchool',
        collapsible: true,
        collapseDirection: 'left' ,
        border: false ,
        width: 170,
        plain: true,
        floating: false,  // usually you want this set to True (default)
        renderTo: Ext.getBody(),
        activeItem : 0,
        items: [{
            text: '<i class="fa fa-book"></i> Mes classes',
            itemId: 'Classes'
        },{
            text: '<i class="fa fa-users"></i> Mes élèves',
            itemId: 'Eleves'
        },{
            text: '<i class="fa fa-tasks"></i> Mes devoirs',
            itemId: 'Devoirs'
        },{
            text: '<i class="fa fa-cog fa-spin"></i> Paramètres',
            itemId: 'Parametres'
        },{
            text: '<i class="fa fa-sign-out"></i> Déconnexion',
            itemId: 'Deconnexion'
        }]
    },{
        region: 'center',
        xtype: 'panel',
        itemId: 'pnlGeneral',
        titleAlign :'center',
        autoScroll : true
    }]
});