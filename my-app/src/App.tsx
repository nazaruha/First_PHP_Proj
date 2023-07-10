import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import './App.css';
import DefaultLayout from "./components/containers/DefaultLayout";
import HomePage from "./components/admin/home/HomePage";
import AdminHomePage from "./components/admin/home/AdminHomePage";
import CategoryListPage from "./components/admin/categories/list/CategoryListPage";
import CategoryCreatePage from "./components/admin/categories/create/CategoryCreatePage";
import CategoryEditPage from "./components/admin/categories/edit/CategoryEditPage";
import React from "react";
import AdminLayout from "./components/admin/container/AdminLayout";
import LoginPage from "./components/auth/login/LoginPage";
import RegisterPage from "./components/auth/register/RegisterPage";
import Loader from "./components/common/loader_spinners/Loader/Loader";
import ToastNotification from "./components/common/ToastNotification/ToastNotification";

const App = () => {

    return (
        <>
            <Loader/> {/* підгрузили наш лоадер */}
            <ToastNotification/> {/* щоб нотифікація висвітлювалась повсюду */}
            <Routes>
                <Route path="/" element={<DefaultLayout/>}>
                    <Route index element={<HomePage/>}/>
                    <Route path="login" element={<LoginPage/>}/>
                    <Route path="register" element={<RegisterPage/>}/>
                </Route>

                <Route path="/admin" element={<AdminLayout/>}>
                    <Route index element={<AdminHomePage/>}/>
                    <Route path="category">
                        <Route index element={<CategoryListPage/>}/>
                        <Route path="create" element={<CategoryCreatePage/>}/>
                        {/*<Route path="edit/:id" element={} />*/}
                        <Route path="edit">
                            <Route path={":id"} element={<CategoryEditPage/>}/>
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </>
    );
}

export default App;
