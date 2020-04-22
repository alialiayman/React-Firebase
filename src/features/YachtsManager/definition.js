const definition = {
    name: 'Yacht',
    fields: [
      {name: 'id', label: 'Id', type: 'text', isKey: true, isSummary: false, summaryOrder: 0, editOrder: 0, defaultValue: ''},
      {name: 'newname',  label: 'New name', type: 'text', isKey: false, isSummary: true, summaryOrder: 1, editOrder: 1, defaultValue: ''},
      {name: 'oldname',  label: 'Old name', type: 'text', isKey: false, isSummary: true, summaryOrder: 1, editOrder: 1, defaultValue: ''},
      {name: 'builder',  label: 'Builder', type: 'text', isKey: false, isSummary: true, summaryOrder: 1, editOrder: 1, defaultValue: ''},
      {name: 'hull',  label: 'Hull', type: 'text', isKey: false, isSummary: true, summaryOrder: 1, editOrder: 1, defaultValue: ''},
      {name: 'sellingbroker',  label: 'Selling broker', type: 'text', isKey: false, isSummary: false, summaryOrder: 1, editOrder: 1, defaultValue: ''},
      {name: 'brokeragehouse',  label: 'Brokerage house', type: 'text', isKey: false, isSummary: false, summaryOrder: 1, editOrder: 1, defaultValue: ''},
      {name: 'length',  label: 'Length', type: 'number', isKey: false, isSummary: false, summaryOrder: 1, editOrder: 1, defaultValue: ''},
      {name: 'beam',  label: 'Beam', type: 'text', isKey: false, isSummary: false, summaryOrder: 1, editOrder: 1, defaultValue: ''},
      {name: 'depth',  label: 'Depth', type: 'text', isKey: false, isSummary: false, summaryOrder: 1, editOrder: 1, defaultValue: ''},
      {name: 'newreg',  label: 'New Registration', type: 'text', isKey: false, isSummary: false, summaryOrder: 1, editOrder: 1, defaultValue: ''},
      {name: 'dinghyreg',  label: 'Dinghy Registration', type: 'text', isKey: false, isSummary: false, summaryOrder: 1, editOrder: 1, defaultValue: ''},
      {name: 'flag',  label: 'Flag', type: 'text', isKey: false, isSummary: false, summaryOrder: 1, editOrder: 1, defaultValue: ''},
      {name: 'hailingport',  label: 'Hailing Port', type: 'text', isKey: false, isSummary: false, summaryOrder: 1, editOrder: 1, defaultValue: ''},
      {name: 'oldreg',  label: 'Old Registration', type: 'text', isKey: false, isSummary: false, summaryOrder: 1, editOrder: 1, defaultValue: ''},
      {name: 'tender',  label: 'Tender', type: 'text', isKey: false, isSummary: false, summaryOrder: 1, editOrder: 1, defaultValue: ''},
      {name: 'hin',  label: 'HIN', type: 'text', isKey: false, isSummary: false, summaryOrder: 1, editOrder: 1, defaultValue: ''},
      {name: 'owner',  label: 'Owner', type: 'text', isKey: false, isSummary: true, summaryOrder: 1, editOrder: 1, defaultValue: ''},
      {name: 'corp',  label: 'Corp', type: 'text', isKey: false, isSummary: false, summaryOrder: 1, editOrder: 1, defaultValue: ''},
      {name: 'documentation',  label: 'Documentation', type: 'text', isKey: false, isSummary: false, summaryOrder: 1, editOrder: 1, defaultValue: ''},
      {name: 'mailing',  label: 'Mailing', type: 'text', isKey: false, isSummary: false, summaryOrder: 1, editOrder: 1, defaultValue: ''},
      {name: 'email',  label: 'Email', type: 'email', isKey: false, isSummary: false, summaryOrder: 1, editOrder: 1, defaultValue: ''},
      {name: 'phone',  label: 'Phone', type: 'tel', isKey: false, isSummary: true, summaryOrder: 1, editOrder: 1, defaultValue: ''},
      {name: 'lienholder',  label: 'Lien Holder', type: 'text', isKey: false, isSummary: false, summaryOrder: 1, editOrder: 1, defaultValue: ''},
      {name: 'lien',  label: 'Lien', type: 'text', isKey: false, isSummary: false, summaryOrder: 1, editOrder: 1, defaultValue: ''},
      {name: 'fileno',  label: 'File No', type: 'text', isKey: false, isSummary: false, summaryOrder: 1, editOrder: 1, defaultValue: ''},
      {name: 'storage',  label: 'Storage', type: 'text', isKey: false, isSummary: false, summaryOrder: 1, editOrder: 1, defaultValue: ''},
      {name: 'notes',  label: 'Notes', type: 'text', isKey: false, isSummary: false, summaryOrder: 1, editOrder: 1, defaultValue: ''},
      ]
  }


  export default definition;