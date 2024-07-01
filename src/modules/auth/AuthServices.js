import axios from 'axios';

const API_URL = 'https://o9fjw01k72.execute-api.us-east-1.amazonaws.com/Prod/login';

export const login = async (email, password) => {
    console.log(API_URL);
    try {
        const response = await axios.post(API_URL, {
            email,
            password
        });
        console.log(response);
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : 'Login failed');
    }
};
