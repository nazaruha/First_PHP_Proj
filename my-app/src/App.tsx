import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { APP_ENV } from './env';
import http from './http';

interface ICategoryItem {
  id: number;
  name: string;
  image: string;
  description: string;
}

const App = () => {

  const [categories, setCategories] = useState<ICategoryItem[]>([]);

  useEffect(() => {
    http.get<ICategoryItem[]>("/api/category")
      .then((resp) => {
        const { data } = resp;
        console.log("get categories", resp.data);
        setCategories(data);
      }).catch((err) => {
        console.log("ERROR GET CATEGORY LIST", err);
      });
  }, []);

  return (
    <>
      <div className="container mt-3">
        <h1 className="text-center">Список категорій</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Назва</th>
              <th scope="col">Фото</th>
              <th scope="col">Опис</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <th scope="row">{category.id}</th>
                <td>{category.name}</td>
                <td>{category.image}</td>
                <td>{category.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </>
  );
}

export default App;
