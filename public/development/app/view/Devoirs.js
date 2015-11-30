Ext.define('iSchool.view.Devoirs', {
    extend: 'Ext.grid.Panel',

    alias: 'widget.Devoirs',

    cls: 'Devoirs',

    requires:[
        'Ext.tab.Panel',
        'Ext.layout.container.Border',
        'Ext.grid.column.Date',
        'Ext.grid.column.Action'
    ],

   // autoScroll : true,

    store: 'Devoirs',

    columns: {
        items: [
            { text: 'Classe', dataIndex: 'classe_id', flex: 1, renderer: function(value){ return Ext.getStore('Classes').getById(value).get('libelle'); } },
            { text: 'Libellé', dataIndex: 'libelle', flex: 1 },
            { text: 'Libellé court', dataIndex: 'libcourt', flex: 1 },
            {
                dataIndex: 'id',
                renderer : function(){
                    return '<i class="fa fa-bar-chart" title="Voir les notes"></i>';
                }
            }
        ],
        defaults: {
            align: 'center',
            //flex: 1
        }
    },

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [
            { xtype: 'button', text: 'Button 1' }
        ]
    }],

    emptyText: 'Aucun devoir',
    renderTo: Ext.getBody()
});