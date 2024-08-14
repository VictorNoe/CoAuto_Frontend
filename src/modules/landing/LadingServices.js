import apiGateway from '../../utils/Http.gateway';
const API_URL_GETRATE = 'https://ut6t5bzpua.execute-api.us-east-1.amazonaws.com/Prod/get_data';
const API_URL_GETCAR = 'https://syr3x8vt0g.execute-api.us-east-1.amazonaws.com/Prod/get_data';

const getAllCars = async () =>{
    try {
        const response = await apiGateway.doGet(API_URL_GETCAR);
        return response.data;
    } catch (error) {
        return error;
    }
};

const getAllRate = async () => {
    try {
        const response = await apiGateway.doGet(API_URL_GETRATE);
        return response.data;
    } catch (error) {
        return error;
    }
};

export default {
    getAllCars,
    getAllRate
}
