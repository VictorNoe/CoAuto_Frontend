import apiGateway from '../../utils/Http.gateway';
const API_URL_GETUSER = 'https://c2vprhsq9l.execute-api.us-east-1.amazonaws.com/Prod/get_data';
const API_URL_ADDUSER = '';
const API_URL_UPDATEUSER = 'https://c2vprhsq9l.execute-api.us-east-1.amazonaws.com/Prod/update_data';

const getAllUsers = async () => {
    try {
        const response = await apiGateway.doGet(API_URL_GETUSER);
        return response.data;
    } catch (error) {
        return error;
    }
};

const addUser = async (dataUser) => {
    try {
        const response = await apiGateway.doPost(API_URL_ADDUSER, dataUser);
        return response.data;
    } catch (error) {
        console.error('Error agregando user', error);
        return error;
    }
};

const updateUser = async (dataUser) => {
    try {
        const response = await apiGateway.doPut(API_URL_UPDATEUSER, dataUser);
        return response.data;
    } catch (error) {
        console.error('Error actualizando user', error);
        return error;
    }
};

export default {
    getAllUsers, addUser, updateUser
}