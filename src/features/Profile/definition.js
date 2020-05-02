const definition = {
  name: 'profile',
  fields: [
    { name: 'name', label: 'Name', summary: 1 },
    { name: 'email', type: 'email', summary: 2  },
    { name: 'phone', type: 'tel', summary: 3 },
    { name: 'notes', type: 'textarea' },
  ]
}


export default definition;