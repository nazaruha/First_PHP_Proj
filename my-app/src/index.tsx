import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from "./containers/default/DefaultLayout";
import CategoryListPage from "./components/admin/categories/list/CategoryListPage";
import CategoryCreatePage from "./components/admin/categories/create/CategoryCreatePage";
import CategoryEditPage from "./components/admin/categories/edit/CategoryEditPage";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  //<React.StrictMode> -> ЦЕ ТРЕБА  УБРАТЬ, ЩОБ НЕ БУЛО ДУПЛІКАТІВ ОТРИМАННЯ ДАНИХ З СЄРВАКА
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<App />} />
      </Route>

      <Route path="/admin" element={<DefaultLayout />}>
        <Route index element={<App />} />
        <Route path="category">
          <Route index element={<CategoryListPage />} />
          <Route path="create" element={<CategoryCreatePage />} />
          {/*<Route path="edit/:id" element={} />*/}
          <Route path="edit">
            <Route path={":id"} element={<CategoryEditPage />}/>
          </Route>
        </Route>
      </Route>
    </Routes>
  </BrowserRouter >
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();