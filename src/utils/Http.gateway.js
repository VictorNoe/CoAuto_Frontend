import axios from "axios";
import router from "../routers/index";
import Alert from "./Alert";
import store from "./store";
const client = axios.create()
client.interceptors.request.use(
    function (config) {
        const auth_token = localStorage.getItem('token')
        if(auth_token !== undefined && auth_token !== null && auth_token !== ""){
            if(!config.url.includes('auth')){
                config.headers.Authorization = `Bearer ${auth_token}`
            }
        }
        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)

client.interceptors.response.use(
    (response) => {
        if (response.status === 200 || response.status === 201) {
            if (response.data.data === null) {
                return Promise.resolve(response);
            }
            return Promise.resolve(response)
        } else {
            return Promise.reject(response)
        }
    },
    async (error) => {
        if (!error.response) {
            Alert.Toast('error',"El servidor no respondio")
            store.dispatch('logout');
            router.push({ name: 'login' });
            return Promise.reject(error)
        }
        if (error.response.status) {
            switch (error.response.status) {
                case 400:
                    Alert.Toast("error","Error en la peticion")
                    break;
                case 401:
                    Alert.Toast("error",'Sin sesión')
                    store.dispatch('logout');
                    router.push({ name: 'login' });
                    break;
                case 403:
                    Alert.Toast("error","Acceso denegado")
                    .then(() => {
                        store.dispatch('logout');
                    });
                    break;
                case 404:
                    Alert.Toast("error","Recurso no encontrado")
                    break;
                case 500:
                    Alert.Toast("error","Error en el servidor")
                    break;
        
            }
            return Promise.reject(error)
        }
        return Promise.reject(error)
    }
)

export default {
    doGet: function (endPoint, config) {
        return client.get(endPoint, config);
    },
    doPost: function (endPoint, object, config) {
        return client.post(endPoint, object, config || {});
    },
    doPut: function (endPoint, object, config) {
        return client.put(endPoint, object, config || {});
    },
    doDelete: function (endPoint) {
        return client.delete(endPoint);
    },
};