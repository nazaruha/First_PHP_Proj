import { Link, useNavigate, useParams } from "react-router-dom";
import uniqid from 'uniqid';
import classNames from "classnames";
import { ICategoryEdit } from "../types";
import { useFormik } from "formik";
import { CategoryEditSchema } from "../validation";
import http from "../../../../http";
import { useEffect } from "react";

const CategoryEditPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const init: ICategoryEdit = {
        name: "",
        image: uniqid() + '.jpg',
        description: ""
    }

    const onEditCategory = async (values: ICategoryEdit) => {
        console.log("EDIT VALUES", values);
        try {
            const result = http.post(`api/category/edit/${id}`, values);
            console.log("RESULT", result);
            navigate("..");

        } catch (err) {
            console.log("ERR RES", err);
        }

    }

    const formik = useFormik({
        initialValues: init,
        validationSchema: CategoryEditSchema,
        onSubmit: onEditCategory
    });

    const { errors, values, touched, handleChange, handleSubmit, setFieldValue } = formik;

    useEffect(() => {
        http.get(`api/category/${id}`)
            .then(resp => {
                const { data } = resp;
                console.log(data);
                setFieldValue("name", data.name);
                setFieldValue("description", data.description);
                setFieldValue("image", data.image);
            }).catch(err => {
                console.log("ERR", err);
            })
    }, [])

    return (
        <>
            <h1 className="text-center">Зміна категорії</h1>
            <form onSubmit={handleSubmit} className="col-md-6 offset-md-3">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Назва</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className={classNames(
                            "form-control",
                            { "is-invalid": errors.name && touched.name }
                        )}
                        value={values.name}
                        onChange={handleChange}
                        placeholder="Введіть назву категорії"
                    />
                    {errors.name && touched.name && (
                        <div className="invalid-feedback">
                            {errors.name}
                        </div>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Опис</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        className={classNames(
                            "form-control",
                            { "is-invalid": errors.description && touched.description }
                        )}
                        value={values.description}
                        onChange={handleChange}
                        placeholder="Введіть опис категорії"
                    />
                    {errors.description && touched.description && (
                        <div className="invalid-feedback">
                            {errors.description}
                        </div>
                    )}
                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary me-4 w-25">Змінити</button>
                    <Link to=".." className="btn btn-warning w-25">Відхілити</Link>
                </div>
            </form>
        </>
    )
}

export default CategoryEditPage;