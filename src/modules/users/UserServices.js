import apiGateway from '../../utils/Http.gateway';
const API_URL_GETUSER = 'https://c2vprhsq9l.execute-api.us-east-1.amazonaws.com/Prod/get_data';

const getAllUsers = async()=>{
    try {
        const response = await apiGateway.doGet(API_URL_GETUSER);
        return response.data;
    } catch (error) {
        return error;
    }
};

export default {
    getAllUsers
}