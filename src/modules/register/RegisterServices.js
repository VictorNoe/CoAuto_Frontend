import axios from "axios"
const API_URL_REGISTER = 'https://uz8a3h8uc0.execute-api.us-east-1.amazonaws.com/Prod/register';

const Register = async (user) => {
    try {
        const result = await axios.post(API_URL_REGISTER, user);
        return result.response;

    } catch (error) {
        return error
    }
}

export default {
    Register,
}