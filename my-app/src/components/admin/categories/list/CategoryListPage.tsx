import { useEffect, useState } from "react";
import { ICategoryItem } from "../types";
import default_http from "../../../../http_common";
import { Link } from "react-router-dom";
import ModalDelete from "../../../common/ModalDelete";
import { APP_ENV } from "../../../../env";

const CategoryListPage = () => {

    const [categories, setCategories] = useState<ICategoryItem[]>([]);

    useEffect(() => {
        default_http.get<ICategoryItem[]>("/api/category")
            .then((resp) => {
                const { data } = resp;
                console.log("get categories", resp.data);
                setCategories(data);
            }).catch((err) => {
                console.log("ERROR GET CATEGORY LIST", err);
            });
    }, []);

    const onDeleteCategory = async (id: number) => {
        try {
            const result = await default_http.delete(`api/category/${id}`)
            const lst = categories.filter(x => x.id !== id);
            setCategories(lst);
            console.log(result);
        } catch (err) {
            console.log("ERR DELETE CATEGORY", err);
        }

    }

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
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category) => (
                            <tr key={category.id}>
                                <th scope="row">{category.id}</th>
                                <td>{category.name}</td>
                                <td>
                                    <img src={`${APP_ENV.BASE_URL}uploads\\50_${category.image}`} alt="ФОТО" width={50} />
                                </td>
                                <td>{category.description}</td>
                                <td className="">
                                    <Link to={`edit/${category.id}`} className="btn btn-warning me-3">Змінити <i className="fa fa-pencil" aria-hidden="true"></i></Link>
                                    <ModalDelete id={category.id} text={category.name} deleteFunc={onDeleteCategory} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default CategoryListPage;