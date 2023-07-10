import {configureStore} from "@reduxjs/toolkit";
import {combineReducers} from "redux";
import thunk from "redux-thunk";
import {AuthReducer} from "../components/auth/AuthReducer";
import {ToastReducer} from "./reducers/ToastReducer/ToastReducer";
import {IsLoadingReducer} from "./reducers/IsLoadingReducer/IsLoadingReducer";

export const rootReducer = combineReducers({
    auth: AuthReducer,
    loading: IsLoadingReducer,
    toast: ToastReducer
});

export const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: [thunk]
})