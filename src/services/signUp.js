import axios from 'axios';

async function signUpService(user) {

    const fbuser = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDxggzPT57iqEo-tohF6HqdpYj4YmIopnM', { ...user, returnSecureToken: true });
    return fbuser;
};

export default signUpService;
