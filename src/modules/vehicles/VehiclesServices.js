import apiGateway from '../../utils/Http.gateway';
const API_URL_ADDCAR = 'https://syr3x8vt0g.execute-api.us-east-1.amazonaws.com/Prod/insert_data';
const API_URL_GETCAR = 'https://syr3x8vt0g.execute-api.us-east-1.amazonaws.com/Prod/get_data';
const API_URL_UPDATECAR = 'https://syr3x8vt0g.execute-api.us-east-1.amazonaws.com/Prod/update_data';
const API_UTL_DELETE = 'https://syr3x8vt0g.execute-api.us-east-1.amazonaws.com/Prod/delete_data'
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
    console.log(dataCar);
    try {
        const response = await apiGateway.doPut(API_URL_UPDATECAR, dataCar);
        return response.data;
    } catch (error) {
        console.error('Error actualizando car', error);
        return error;
    }
};

const getAllCars = async () => {
    try {
        const response = await apiGateway.doGet(API_URL_GETCAR);
        return response.data;
    } catch (error) {
        return error;
    }
};
const deleteCar = async (data)=>{
    try {
        const response = await apiGateway.doDelete(API_UTL_DELETE, { id_auto: data.id_auto, id_status: data.id_status });
        return response.data;
    } catch (error) {
        console.error('Error eliminando car', error);
        return error;
    }
 }
export default {
    addCar, getAllCars, updateCar,deleteCar
}