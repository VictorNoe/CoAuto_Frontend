import axios from 'axios';

const API_URL = 'https://uz8a3h8uc0.execute-api.us-east-1.amazonaws.com/Prod/login';

export const login = async (email, password) => {
    try {
        const response = await axios.post(API_URL, {
            email,
            password
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        return error
    }
};
