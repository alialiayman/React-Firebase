import axios from 'axios';

async function createCustomerService(user, customer) {

    const fbCustomer = await axios.post(`https://my-project-1486841534385.firebaseio.com/${user.localId}/customer.json?auth=${user.idToken}`, customer);
    return fbCustomer;
};

export default createCustomerService;
