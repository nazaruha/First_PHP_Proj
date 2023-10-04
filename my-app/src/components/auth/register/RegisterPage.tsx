import {IRegisterPage} from "./types";
import {useFormik} from "formik";
import {RegisterSchema} from "./validation";
import "./register.scss";
import classNames from "classnames";
import selectImage from "../../../assets/select-image.png";
import {ChangeEvent, useRef, useState} from "react";
import default_http from "../../../http_common";
import {useNavigate} from "react-router-dom";
import CropperModal from "../../common/CropperModal";

const RegisterPage = () => {
    const navigate = useNavigate();

    const init: IRegisterPage = {
        image: null,
        lastName: "",
        name: "",
        email: "",
        phone: "",
        password: "",
        password_confirmation: ""
    };

    const imageRef = useRef<HTMLInputElement>(null);
    const [imageBase64, setImageBase64] = useState<string>("");
    const [imageError, setImageError] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");



    const onSubmitRegister = async (values: IRegisterPage) => {
        if (values.image === null) {
            setImageError("Оберіть фотографію");
            return;
        }
        console.log("Values", values);
        // var result = null;
        // try {
        //     const result = await http_common.post("api/auth/register", values);
        //     console.log("Register is good", result);
        // } catch(err) {
        //     console.log("Server Error", err);
        //     setErrorMessage("Ой-ой, щось пішло не так ОоО");
        // }
        default_http.post("api/auth/register", values, {
            headers: {
                "Content-Type": "multipart/form-data"
            } // ЦЕЙ HEADERS ТРЕБА ЩОБ ФОТКА ПЕРЕДАВАЛАСЬ У СЕРВЕР
        })
            .then(resp => {
                console.log("RESP", resp)
                navigate("..");
            }).catch(err => {
                console.log("ERR", err);
        })
    }

    const formik = useFormik({
        initialValues: init,
        onSubmit: onSubmitRegister,
        validationSchema: RegisterSchema
    })

    const {values, errors, touched, handleSubmit, handleChange, setFieldError, setFieldValue} = formik;

    return (
        <>
            <h1 className="text-center">Реєстрація</h1>

            <form onSubmit={handleSubmit} className="col-md-10 w-50 container-fluid">
                {errorMessage && (
                    <div className="alert alert-danger text-center fw-bold" role="alert">
                        {errorMessage}
                    </div>
                )}
                <div className="mb-3 row">
                    <div className="col-md-6" id="name-div">
                        <label htmlFor="name" className="form-label">Ім'я</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            className={classNames(
                                "form-control",
                                {"is-invalid": errors.name && touched.name}
                            )}
                            placeholder="Введіть ім'я"/>
                        {errors.name && touched.name && (
                            <span className="invalid-feedback">
                                {errors.name}
                            </span>
                        )}
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="lastName" className="form-label">Фамілія</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={values.lastName}
                            onChange={handleChange}
                            className={classNames(
                                "form-control",
                                {"is-invalid": errors.lastName && touched.lastName}
                            )}
                            placeholder="Введіть фамілію"/>
                        {errors.lastName && touched.lastName && (
                            <span className="invalid-feedback">
                                {errors.lastName}
                            </span>
                        )}
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Пошта</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        className={classNames(
                            "form-control",
                            {"is-invalid": errors.email && touched.email}
                        )}
                        placeholder="Введіть пошту"/>
                    {errors.email && touched.email && (
                        <span className="invalid-feedback">
                            {errors.email}
                        </span>
                    )}
                </div>
                <CropperModal onChange={setFieldValue} field={"image"} value={values.image} error={errors.image} touched={touched.image} />
                <div className="mb-3">
                    <label htmlFor="phone" className="label-control">Телефон</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={values.phone}
                        onChange={handleChange}
                        className={classNames(
                            "form-control",
                            {"is-invalid": errors.phone && touched.phone}
                        )}
                        placeholder="Введіть номер телефону"/>
                    {errors.phone && touched.phone && (
                        <span className="invalid-feedback">
                            {errors.phone}
                        </span>
                    )}
                </div>
                <div className="mb-3 row">
                    <div className="col-md-6" id="password-div">
                        <label htmlFor="password" className="form-label">Пароль</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            className={classNames(
                                "form-control",
                                {"is-invalid": errors.password && touched.password}
                            )}
                            placeholder="Введіть Пароль"/>
                        {errors.password && touched.password && (
                            <span className="invalid-feedback">
                                {errors.password}
                            </span>
                        )}
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="password_confirmation" className="form-label">Підтвердження паролю</label>
                        <input
                            type="password"
                            id="password_confirmation"
                            name="password_confirmation"
                            value={values.password_confirmation}
                            onChange={handleChange}
                            className={classNames(
                                "form-control",
                                {"is-invalid": errors.password_confirmation && touched.password_confirmation}
                            )}
                            placeholder="Введіть підтвердження паролю"/>
                        {errors.password_confirmation && touched.password_confirmation && (
                            <span className="invalid-feedback">
                                {errors.password_confirmation}
                            </span>
                        )}
                    </div>
                </div>
                <button type="submit" onClick={() => {
                    console.log("Click button", values.image)
                    if (values.image == null)
                        setImageError("Оберіть фото")
                }} className="btn btn-primary">Реєстрація</button>
            </form>
        </>
    )
}

export default RegisterPage;