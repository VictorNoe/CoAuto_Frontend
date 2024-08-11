import apiGateway from '../../utils/Http.gateway';

const API_URL_LOGIN = 'https://uz8a3h8uc0.execute-api.us-east-1.amazonaws.com/Prod/get_user';

const getInfo = async () => {
    try {
        const response = await apiGateway.doPost(API_URL_LOGIN);
        const data = response.data.userInfo;
        return data;
    } catch (error) {
        return error
    }
}

export default {
    getInfo
}