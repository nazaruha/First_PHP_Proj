import {CategoryCreateSchema} from "../validation";
import {useFormik} from "formik";
import uniqid from 'uniqid';
import classNames from "classnames";
import {ICategoryCreate} from "../types";
import {useNavigate} from "react-router-dom";
import http from "../../../../http";

const CategoryCreatePage = () => {
    const navigate = useNavigate();

    const init: ICategoryCreate = {
        name: "",
        image: uniqid() + '.jpg',
        description: ""
    };

    const onFormikSubmit = async (values: ICategoryCreate) => {
        try {
            const result = await http.post("api/category", values);
            console.log("Category create", result);
            navigate("..");
        } catch (error) {
            console.log("error", error);
        }
    }

    const formik = useFormik({
        onSubmit: onFormikSubmit,
        initialValues: init,
        validationSchema: CategoryCreateSchema,
    })

    const {values, errors, touched, handleSubmit, handleChange, setFieldValue} = formik;

    return (
        <>
            <h1 className="text-center mb-5">Створення категорії</h1>

            <form onSubmit={handleSubmit} className="col-md-10 w-50 container-fluid">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Назва</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className={classNames(
                            "form-control",
                            {"is-invalid": touched.name && errors.name}
                        )}
                        value={values.name}
                        onChange={handleChange}
                        placeholder="Введіть назву"
                    />
                    {(errors.name && touched.name) && (
                        <div className="invalid-feedback">
                            <span>{errors.name}</span>
                        </div>
                    )}
                </div>

                <div className="mb-3">
                    <label htmlFor="image">Фото</label>
                    <input
                        type="text"
                        id="image"
                        name="image"
                        className={classNames(
                            "form-control",
                            {"is-invalid": touched.image && errors.image}
                        )}
                        value={values.image}
                        onChange={handleChange}
                        placeholder="Вкажіть фото"
                    />
                    {errors.image && touched.image && (
                        <div className="invalid-feedback">{errors.image}</div>
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
                            {"is-invalid": touched.description && errors.description}
                        )}
                        value={values.description}
                        onChange={handleChange}
                        placeholder="Введіть опис"
                    />
                    {errors.description && touched.description && (
                        <div className="invalid-feedback">
                            <span>{errors.description}</span>
                        </div>
                    )}
                </div>

                <div className="mb-3 d-flex justify-content-center">
                    <button className="btn btn-primary fs-5">Створити</button>
                </div>
            </form>
        </>
    )
}

export default CategoryCreatePage;