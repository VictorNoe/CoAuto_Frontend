import apiGateway from '../../utils/Http.gateway';
const API_URL_GET_RATE = 'https://ut6t5bzpua.execute-api.us-east-1.amazonaws.com/Prod/get_data_one/?id_auto=';
const API_URL_DELETE_RATE = 'https://ut6t5bzpua.execute-api.us-east-1.amazonaws.com/Prod/delete_data';
const API_URL_GET_AUTO = 'https://syr3x8vt0g.execute-api.us-east-1.amazonaws.com/Prod/get_data_one/?id_auto=';

const getByIdRate = async (id) => {
    try {
        const respone = await apiGateway.doGet(`${API_URL_GET_RATE}${id}`)
        return respone;
    } catch (error) {
        return error;
    }
}

const deleteByIdRate = async (id_rate) => {
    const id_status = 6;
    try {
        const respone = await apiGateway.doDelete(API_URL_DELETE_RATE, {
            id_rate,
            id_status
        })
        return respone
    } catch (error) {
        return error
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
    deleteByIdRate,
}
