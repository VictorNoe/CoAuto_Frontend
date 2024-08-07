import apiGateway from '../../utils/Http.gateway';

const API_URL_GETCAR = 'https://fohggt0wwd.execute-api.us-east-1.amazonaws.com/Prod/get_data_one/';
const API_URL_GETCOMMENTS = 'https://i6dyqony58.execute-api.us-east-1.amazonaws.com/Prod/get_data_one/';
const API_URL_GETALLCARS = 'https://fohggt0wwd.execute-api.us-east-1.amazonaws.com/Prod/get_data';
const API_URL_CREATERATE = 'https://i6dyqony58.execute-api.us-east-1.amazonaws.com/Prod/insert_data';
const API_URL_GETUSERINFO = 'https://uz8a3h8uc0.execute-api.us-east-1.amazonaws.com/Prod/get_user';

const getCar = async (id) => {
    try {
        const response = await apiGateway.doGet(`${API_URL_GETCAR}?id_auto=${id}`);
        return response.data;
    } catch (err) {
        return err;
    }
};

const getComments = async (id) => {
    try {
        const response = await apiGateway.doGet(`${API_URL_GETCOMMENTS}?id_auto=${id}`);
        return response.data;
    } catch (err) {
        return err;
    }
}

const getAllCars = async() => {
    try {
        const response = await apiGateway.doGet(`${API_URL_GETALLCARS}`);
        return response.data;
    } catch(err) {
        return err;
    }
}

const rate = async(payload) => {
    try {
        const response = await apiGateway.doPost(API_URL_CREATERATE, payload);
        return response.data;
    } catch (err) {
        return err;
    }
}

const getUser = async() => {
    try {
        const response = await apiGateway.doPost(API_URL_GETUSERINFO);
        const data = response.data.userInfo;
        return {
            profileImage: data.profileImage,
            name: `${data.nameUser} ${data.lastname}`,
            email: data.email,
        };
    } catch(err) {
        return err;
    }
}
export default {
    getCar,
    getComments,
    getAllCars,
    rate,
    getUser,
}