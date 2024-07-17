import axios from 'axios';

const API_URL_LOGIN = 'https://uz8a3h8uc0.execute-api.us-east-1.amazonaws.com/Prod/login';
const API_URL_RECOVERY_ACCOUNT = '';
const API_URL_CONFIRM_ACCOUNT = 'https://uz8a3h8uc0.execute-api.us-east-1.amazonaws.com/Prod/confirm_sign_up';
const API_URL_RECOVERY_CODE = 'https://uz8a3h8uc0.execute-api.us-east-1.amazonaws.com/Prod/resend_confirmation_code'

const login = async (email, password) => {
    try {
        const response = await axios.post(API_URL_LOGIN, {
            email,
            password
        });
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

const confirmAccount = async (email, confirmation_code) => {
    try {
        const response = await axios.post(API_URL_CONFIRM_ACCOUNT, {
            email,
            confirmation_code
        });
        return response.data
    } catch (error) {
        return error
    }
};

const RecendCode = async (email) => {
    try {
        const response = await axios.post(API_URL_RECOVERY_CODE, {
            email
        })
        return response.data;
    } catch (error) {
        return error;
    }
}

export default {
    login,
    recoveryAccount,
    confirmAccount,
    RecendCode,
};