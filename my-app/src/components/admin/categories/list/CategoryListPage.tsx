import { useEffect, useState } from "react";
import { ICategoryItem } from "../types";
import http from "../../../../http";
import { Link } from "react-router-dom";

const CategoryListPage = () => {

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
                <h1 className="text-center mb-3">Список категорій</h1>
                <div className="mb-2">
                    <Link to="create" className="btn btn-success fs-5">Створити  <i className="fa fa-plus-circle fs-5" aria-hidden="true"></i></Link>
                </div>
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
    )
}

export default CategoryListPage;