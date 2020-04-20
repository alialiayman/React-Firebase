import axios from 'axios';

const firebaseProj = 'my-project-1486841534385';
const tableName = 'customer';

const customerService = () => {
    return {createCustomer: async (user, customer)=> {
        const fbCustomer = await axios.post(`https://${firebaseProj}.firebaseio.com/${user.localId}/${tableName}.json?auth=${user.idToken}`, {name: customer.name, address: customer.address});
        return fbCustomer;
    },
    updateCustomer: async (user, customerId, customer)=> {
        const fbCustomer = await axios.put(`https://${firebaseProj}.firebaseio.com/${user.localId}/${tableName}/${customerId}.json?auth=${user.idToken}`, {name: customer.name, address: customer.address});
        return {...customer, id: customerId};
    },
    deleteCustomer: async (user, customerId, customer)=> {
        const fbCustomer = await axios.delete(`https://${firebaseProj}.firebaseio.com/${user.localId}/${tableName}/${customerId}.json?auth=${user.idToken}`);
        return {...customer, id: customerId};
    },
    getCustomer: async (user, customerId)=> {
        const fbCustomer = await axios.get(`https://${firebaseProj}.firebaseio.com/${user.localId}/${tableName}/${customerId}.json?auth=${user.idToken}`);
        return fbCustomer;
    },
    getCustomers: async (user, limit)=> { // TODO: implement limit on number of records returned 
        const fbCustomer = await axios.get(`https://${firebaseProj}.firebaseio.com/${user.localId}/${tableName}.json?auth=${user.idToken}`);
        return fbCustomer;
    }}
}


export default customerService;
