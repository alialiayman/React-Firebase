const model = {
  name: 'table',
  child: 'column',
  fields: [
    { name: 'name', label: 'Table name' },
    { name: 'child', label: 'Child name' },
    {name: 'enabled', label: 'Active', type: 'checkbox', defaultValue: true}
  ]
}

export default model;