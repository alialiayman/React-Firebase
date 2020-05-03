const definition = {
  name: 'schema',
  childmodel: 'fields',
  fields: [
    { name: 'name', label: 'Dossier Name' },
    {name: 'enabled', label: 'Active', type: 'checkbox', defaultValue: true}
  ],
  childfields: [
    { name: 'name', label: 'Name',  summary: 1},
    {name: 'type', label: 'Type', summary: 2},
    {name: 'label', label: 'Label', summary: 3},
    {name: 'defaultValue', label: 'Default Value', summary: 4},
    {name: 'summary', label: 'List Order', summary: 5},
  ]
}


export default definition;