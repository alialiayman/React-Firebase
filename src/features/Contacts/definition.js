const definition = {
    name: 'Contact',
    fields: [
      {name: 'id', label: 'Id', type: 'text', isKey: true, defaultValue: ''},
      {name: 'fullName',  label: 'FullName', type: 'text', isKey: false,  isSummary: true, summaryOrder: 0, editOrder: 0, defaultValue: '', autoFocus: true},
      {name: 'tel',  label: 'Telephone', type: 'tel', isKey: false,  isSummary: true, summaryOrder: 1, editOrder: 1, defaultValue: ''},
      {name: 'country',  label: 'Country', type: 'text', isKey: false, isSummary: true, summaryOrder: 2, editOrder: 2, defaultValue: ''},
      {name: 'birthDate',  label: 'Birth Date', type: 'date', isKey: false, editOrder: 3, defaultValue: ''},
    ]
  }

  export default definition;