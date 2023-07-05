import { Link, useNavigate, useParams } from "react-router-dom";
import classNames from "classnames";
import {ICategoryEdit, ICategoryItem} from "../types";
import { useFormik } from "formik";
import { CategoryEditSchema } from "../validation";
import http_common from "../../../../http_common";
import {ChangeEvent, useEffect, useState} from "react";
import defaultImage from "../../../../assets/select-image.png";
import {APP_ENV} from "../../../../env";
import selectImage from "../../../../assets/select-image.png";

const CategoryEditPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [oldImage, setOldImage] = useState<string>("");

    const init: ICategoryEdit = {
        id: id ? Number(id) : 0,
        name: "",
        image: null,
        description: ""
    }

    const onEditCategory = async (values: ICategoryEdit) => {
        console.log("EDIT VALUES", values);
        try {
            const result = await http_common.post(`api/category/edit/${id}`, values, {
                headers: {
                    "Content-Type": "multipart/form-data"
                } // ЦЕЙ HEADERS ТРЕБА ЩОБ ФОТКА ПЕРЕДАВАЛАСЬ У СЕРВЕР
            });
            console.log("RESULT", result);
            navigate("../..");

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

    const onChangeFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const file = files[0];
            if (file) {
                const allowedTypes = ["image/jpeg", "image/png", "image/gif"]
                if (!allowedTypes.includes(file.type)) {
                    alert("Недопустимий тип файлу!");
                    return;
                }
                setFieldValue(e.target.name, file);
                console.log(`${e.target.name}`);
            }
        }
    }

    useEffect(() => {
        http_common.get<ICategoryItem>(`api/category/${id}`)
            .then(resp => {
                const { data } = resp;
                console.log(data);
                setFieldValue("name", data.name);
                setFieldValue("description", data.description);
                // setFieldValue("image", data.image);
                setOldImage(`${APP_ENV.BASE_URL}uploads/300_${data.image}`)
            }).catch(err => {
                console.log("ERR", err);
            })
    }, [id]);

    const imgView = oldImage ? oldImage: defaultImage;

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
                    <label htmlFor="image">
                        Фото
                        <img
                            src={values.image == null ? imgView : URL.createObjectURL(values.image)}
                            width="200"
                            style={{objectFit: "contain", display: 'block', cursor: 'pointer'}}
                            alt="ФОТОГРАФІЯ"
                            className={classNames(
                                "img-thumbnail d-block",
                            )}
                        />
                    </label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/jpeg, image/png, image/gif" // обмеження для файлу
                        className="d-none"
                        // value={values.image}
                        onChange={onChangeFileHandler}
                    />
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
                    <button type="submit" className="btn btn-primary me-4 w-25">Зберегти</button>
                    <Link to="../.." className="btn btn-warning w-25">Відхілити</Link>
                </div>
            </form>
        </>
    )
}

export default CategoryEditPage;