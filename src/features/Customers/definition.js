const definition = {
    name: 'Customer',
    fields: [
      {name: 'id', label: 'Id', type: 'text', isKey: true, isSummary: false, summaryOrder: 0, editOrder: 0, defaultValue: ''},
      {name: 'name',  label: 'Name', type: 'text', isKey: false, isSummary: true, summaryOrder: 0, editOrder: 0, defaultValue: '', autoFocus: true},
      {name: 'address',  label: 'Address', type: 'text', isKey: false, isSummary: true, summaryOrder: 1, editOrder: 1, defaultValue: ''},
    ]
  }

  export default definition;