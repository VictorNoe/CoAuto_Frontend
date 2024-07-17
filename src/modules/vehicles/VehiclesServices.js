import apiGateway from '../../utils/Http.gateway';
const API_URL_ADDCAR = 'https://fohggt0wwd.execute-api.us-east-1.amazonaws.com/Prod/insert_data';
const API_URL_GETCAR = 'https://fohggt0wwd.execute-api.us-east-1.amazonaws.com/Prod/get_data';
const API_URL_UPDATECAR = 'https://fohggt0wwd.execute-api.us-east-1.amazonaws.com/Prod/update_data';

const addCar = async (dataCar) => {
    try {
        const response = await apiGateway.doPost(API_URL_ADDCAR, dataCar);
        return response.data;
    } catch (error) {
        console.error('Error agregando car', error);
        return error;
    }
};

const updateCar = async (dataCar) => {
    try {
        const response = await apiGateway.doPut(API_URL_UPDATECAR, dataCar);
        return response.data;
    } catch (error) {
        console.error('Error agregando car', error);
        return error;
    }
};
const getAllCars = async()=>{
    try {
        const response = await apiGateway.doGet(API_URL_GETCAR);
        return response.data;
    } catch (error) {
        return error;
    }
};

export default {
    addCar, getAllCars,updateCar
}