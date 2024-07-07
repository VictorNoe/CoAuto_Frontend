import axios from 'axios';

const API_URL_LOGIN = 'https://uz8a3h8uc0.execute-api.us-east-1.amazonaws.com/Prod/login';
const API_URL_RECOVERY_ACCOUNT = ''
const API_URL_CONFIRM_ACCOUNT = ''

const login = async (email, password) => {
    try {
        const response = await axios.post(API_URL_LOGIN, {
            email,
            password
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        return error
    }
};

const recoveryAccount = async (email) => {
    try {
        const response = await axios.post(API_URL_RECOVERY_ACCOUNT, {
            email,
        });
        return response.data; 
    } catch (error) {
        return error
    }
};

const confirmAccount = async (newPassword, email, code) => {
    try {
        const response = await axios.post(API_URL_CONFIRM_ACCOUNT, {
            newPassword,
            email,
            code
        });
        return response.data
    } catch (error) {
        return error
    }
};

export default {
    login,
    recoveryAccount,
    confirmAccount
};