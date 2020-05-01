import axios from 'axios';
import firebaseConfig from './firebaseConfig';

const apiKey = firebaseConfig.apiKey;
const authService = {
    webApiKey: apiKey,
    signIn: async function signInService(user) {

        const fbuser = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, { ...user, returnSecureToken: true });
        return fbuser;
    },
    signUp: async function signUpService(user) {

        const fbuser = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, { ...user, returnSecureToken: true });
        return fbuser;
    }

};

export default authService;