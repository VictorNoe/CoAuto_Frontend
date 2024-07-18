import axios from "axios"
const API_URL_REGISTER = 'https://uz8a3h8uc0.execute-api.us-east-1.amazonaws.com/Prod/register';

const Register = async (user) => {
    console.log(user);
    try {
        const response = await axios.post(API_URL_REGISTER, user);
        return response.data;

    } catch (error) {
        return error
    }
}

export default {
    Register,
}