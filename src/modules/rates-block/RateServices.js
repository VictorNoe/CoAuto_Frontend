import apiGateway from '../../utils/Http.gateway';
const API_URL_GET_RATE = 'https://i6dyqony58.execute-api.us-east-1.amazonaws.com/Prod/get_data_one/?id_auto=';
const API_URL_GET_AUTO = 'https://fohggt0wwd.execute-api.us-east-1.amazonaws.com/Prod/get_data_one/?id_auto=';

const getByIdRate = async (id) => {
    try {
        const respone = await apiGateway.doGet(`${API_URL_GET_RATE}${id}`)
        return respone;
    } catch (error) {
        return error;
    }
}

const getByIdAuto = async (id) => {
    try {
        const respone = await apiGateway.doGet(`${API_URL_GET_AUTO}${id}`)  
        return respone
    } catch (error) {
        return error
    }
}

export default {
    getByIdRate,
    getByIdAuto,
}
