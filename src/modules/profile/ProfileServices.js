import apiGateway from '../../utils/Http.gateway';

const API_URL_GET_INFO = 'https://ovxtk6zcwf.execute-api.us-east-1.amazonaws.com/Prod/get_user';
const API_URL_CHANGE_PASSWORD = 'https://ovxtk6zcwf.execute-api.us-east-1.amazonaws.com/Prod/change_password';
const API_URL_UPDATE_INFO = 'https://focsahce29.execute-api.us-east-1.amazonaws.com/Prod/update_data';

const getInfo = async () => {
    try {
        const response = await apiGateway.doPost(API_URL_GET_INFO);
        const data = response.data.userInfo;
        return data;
    } catch (error) {
        return error
    }
};

const changePasword = async (previous_password, new_password) => {
    const access_token = localStorage.getItem("accessToken")
    try {
        const response = await apiGateway.doPost(API_URL_CHANGE_PASSWORD, {
            previous_password,
            new_password,
            access_token,
        });
        return response;
    } catch (error) {
        return error
    }
};

const updateInfo = async (id_user, name, lastname) => {
    try {
        const response = await apiGateway.doPut(API_URL_UPDATE_INFO, {
            id_user,
            name,
            lastname
        })
        return response;
    } catch (error) {
        return error
    }
};

export default {
    getInfo,
    changePasword,
    updateInfo,
}