import apiGateway from '../../utils/Http.gateway';

const API_URL_GETALLCARS = 'https://syr3x8vt0g.execute-api.us-east-1.amazonaws.com/Prod/get_data';

const getAllCars = async() => {
    try {
        const response = await apiGateway.doGet(API_URL_GETALLCARS);
        return response.data;
    } catch(err) {
        return err;
    }
}

export default {
    getAllCars,
}