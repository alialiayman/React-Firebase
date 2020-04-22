import axios from 'axios';
const apiKey = 'AIzaSyDxggzPT57iqEo-tohF6HqdpYj4YmIopnM';
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