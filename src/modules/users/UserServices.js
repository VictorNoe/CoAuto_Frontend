import apiGateway from '../../utils/Http.gateway';
const API_URL_GETUSER = 'https://focsahce29.execute-api.us-east-1.amazonaws.com/Prod/get_data';
const API_URL_ADDUSER = '';
const API_URL_UPDATEUSER = 'https://focsahce29.execute-api.us-east-1.amazonaws.com/Prod/update_data';
const API_URL_DELETEUSER = 'https://focsahce29.execute-api.us-east-1.amazonaws.com/Prod/delete_data';

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
const deleteUser = async (data)=>{
    try {
        const response = await apiGateway.doDelete(API_URL_DELETEUSER, { id_user: data.id_user, id_status: data.id_status });
        return response.data;
    } catch (error) {
        console.error('Error eliminando car', error);
        return error;
    }
 }
 
export default {
    getAllUsers, addUser, updateUser,deleteUser
}