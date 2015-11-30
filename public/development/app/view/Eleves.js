Ext.define('iSchool.view.Eleves', {
    extend: 'Ext.grid.Panel',

    alias: 'widget.Eleves',

    cls: 'Eleves',

    requires:[
        'Ext.tab.Panel',
        'Ext.layout.container.Border',
        'Ext.grid.column.Date'
    ],

    autoScroll : true,

    store: 'Eleves',

    columns: {
        items: [
            { text: 'Identité',
                dataIndex: 'id',
                flex: 1,
                renderer: function(value, sprite, record){
                    return record.get('nom') + ' ' + record.get('prenom');
                }
            },
            { text: '<i class="fa fa-birthday-cake"></i>', dataIndex: 'date_naissance', xtype:'datecolumn', format:'d/m/Y', flex: 1 },
            { text: 'Email', dataIndex: 'mail', flex: 1 }
        ],
        defaults: {
            align: 'center',
            flex: 1
        }
    },

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [
            { xtype: 'button', text: 'Button 1' }
        ]
    }],

    emptyText: 'Aucun élève',
    renderTo: Ext.getBody()
});