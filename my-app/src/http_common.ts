import axios from "axios";
import { APP_ENV } from "./env";
import {store} from "./store";
import {IsLoadingActionTypes} from "./store/reducers/IsLoadingReducer/IsLoadingReducer";

const default_http = axios.create({
    baseURL: APP_ENV.BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

default_http.interceptors.request.use(
    (config: any) => {
        store.dispatch({
            type: IsLoadingActionTypes.SET_LOADING,
            payload: true
        });
        return config;
    },
    (error) => { // шо буде якщо буде помилка
        store.dispatch({
            type: IsLoadingActionTypes.SET_LOADING,
            payload: false
        });
    }
)

default_http.interceptors.response.use(
    (resp: any) => {
        store.dispatch({
            type: IsLoadingActionTypes.SET_LOADING,
            payload: false
        });
        return resp;
    },
    (error) => { // шо буде якщо буде помилка
        store.dispatch({
            type: IsLoadingActionTypes.SET_LOADING,
            payload: false
        });
    }
)

export default default_http;