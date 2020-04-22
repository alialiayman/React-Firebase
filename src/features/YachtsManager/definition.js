const definition = {
  name: 'yAcht',
  fields: [
    { name: 'newname', label: 'New name', summary: 1 },
    { name: 'oldname', label: 'Old name', summary: 2 },
    { name: 'builder', summary: 3 },
    { name: 'hull', summary: 4 },
    { name: 'sellingbroker', label: 'Selling broker' },
    { name: 'brokeragehouse', label: 'Brokerage house' },
    { name: 'length', type: 'number' },
    { name: 'beam' },
    { name: 'depth' },
    { name: 'newreg', label: 'New Registration' },
    { name: 'dinghyreg', label: 'Dinghy Registration' },
    { name: 'flag' },
    { name: 'hailingport', label: 'Hailing Port' },
    { name: 'oldreg', label: 'Old Registration' },
    { name: 'tender' },
    { name: 'hin' },
    { name: 'owner', summary: 5 },
    { name: 'corp' },
    { name: 'documentation' },
    { name: 'mailing' },
    { name: 'email', type: 'email' },
    { name: 'phone', type: 'tel', summary: 6 },
    { name: 'lienholder', label: 'Lien Holder' },
    { name: 'lien' },
    { name: 'fileno', label: 'File No' },
    { name: 'storage' },
    { name: 'id' },
    { name: 'notes' },
  ]
}


export default definition;