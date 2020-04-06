import axios from 'axios';

async function signInService(user) {

    const fbuser = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDxggzPT57iqEo-tohF6HqdpYj4YmIopnM', { ...user, returnSecureToken: true });
    return fbuser;
};

export default signInService;
