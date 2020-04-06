import axios from 'axios';

async function createCustomerService(idToken, customer) {

    const fbCustomer = await axios.post('https://my-project-1486841534385.firebaseio.com/HajOnSoft/customer.json?auth=' + idToken, customer);
    return fbCustomer;
};

export default createCustomerService;
