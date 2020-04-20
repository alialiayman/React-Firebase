import axios from 'axios';

const firebaseProj = 'my-project-1486841534385';
const tableName = 'customer';

const firebaseService = () => {
    return {createRecord: async (user, customer)=> {
        const fbCustomer = await axios.post(`https://${firebaseProj}.firebaseio.com/${user.localId}/${tableName}.json?auth=${user.idToken}`, {name: customer.name, address: customer.address});
        return fbCustomer;
    },
    updateRecord: async (user, customerId, customer)=> {
        const fbCustomer = await axios.put(`https://${firebaseProj}.firebaseio.com/${user.localId}/${tableName}/${customerId}.json?auth=${user.idToken}`, {name: customer.name, address: customer.address});
        return {...customer, id: customerId};
    },
    deleteRecord: async (user, customerId, customer)=> {
        const fbCustomer = await axios.delete(`https://${firebaseProj}.firebaseio.com/${user.localId}/${tableName}/${customerId}.json?auth=${user.idToken}`);
        return {...customer, id: customerId};
    },
    getRecord: async (user, customerId)=> {
        const fbCustomer = await axios.get(`https://${firebaseProj}.firebaseio.com/${user.localId}/${tableName}/${customerId}.json?auth=${user.idToken}`);
        return fbCustomer;
    },
    getRecords: async (user, limit)=> { // TODO: implement limit on number of records returned 
        const fbCustomer = await axios.get(`https://${firebaseProj}.firebaseio.com/${user.localId}/${tableName}.json?auth=${user.idToken}`);
        return fbCustomer;
    }}
}


export default firebaseService;
