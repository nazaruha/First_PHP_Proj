import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap-icons/font/bootstrap-icons.json";
import 'react-toastify/dist/ReactToastify.min.css'; // for Toasts
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {store} from "./store";
import {BrowserRouter} from "react-router-dom";
import jwtDecode from "jwt-decode";
import {AuthUserActionType, IUser} from "./components/auth/types";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

if (localStorage.token) {
    const token = localStorage.token;
    const user = jwtDecode(token) as IUser;
    store.dispatch({
        type: AuthUserActionType.LOGIN_USER,
        payload: {
            email: user.email,
            name: user.name
        }
    });
}

root.render(
    //<React.StrictMode> -> ЦЕ ТРЕБА  УБРАТЬ, ЩОБ НЕ БУЛО ДУПЛІКАТІВ ОТРИМАННЯ ДАНИХ З СЄРВАКА
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
)
;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
