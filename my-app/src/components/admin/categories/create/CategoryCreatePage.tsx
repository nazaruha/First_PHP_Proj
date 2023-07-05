import selectImage from "../../../../assets/select-image.png";
import {CategoryCreateSchema} from "../validation";
import {useFormik} from "formik";
import classNames from "classnames";
import {ICategoryCreate} from "../types";
import {useNavigate} from "react-router-dom";
import {ChangeEvent, useRef, useState} from "react";
import default_http from "../../../../http_common";

const CategoryCreatePage = () => {
    const navigate = useNavigate();

    const [imageError, setImageError] = useState<string>("");

    const init: ICategoryCreate = {
        name: "",
        image: null,
        description: ""
    };

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

    const onFormikSubmit = async (values: ICategoryCreate) => {
        if (values.image === null) {
            setImageError("Оберіть фотографію");
            return;
        }

        console.log("VALUES", values);

        try {
            const result = await default_http.post("api/category", values,{
                headers: {
                    "Content-Type": "multipart/form-data"
                } // ЦЕЙ HEADERS ТРЕБА ЩОБ ФОТКА ПЕРЕДАВАЛАСЬ У СЕРВЕР
            });
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

    const imageRef = useRef<HTMLImageElement>(null);

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
                    <label htmlFor="image">
                        Фото
                        <img
                            src={values.image == null ? selectImage : URL.createObjectURL(values.image)}
                            width="200"
                            style={{objectFit: "contain", display: 'block'}}
                            alt="ФОТОГРАФІЯ"
                            className={classNames(
                                "img-thumbnail d-block",
                                {"border border-danger-subtle": imageError !== ""}
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
                    {errors.image && touched.image && (
                        <div className="invalid-feedback">{errors.image}</div>
                    )}

                    {imageError !== "" && (
                        <span className={"d-block invalid-feedback"}>{imageError}</span>
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