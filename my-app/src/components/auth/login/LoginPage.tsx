import {ILoginPage, ILoginResult} from "./types";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import default_http from "../../../http_common";
import {useFormik} from "formik";
import classNames from "classnames";


const LoginPage = () => {

    const init: ILoginPage = {
        email: "",
        password: ""
    };

    const [message, setMessage] = useState<string>("");

    // const [data, setData] = useState<ILoginPage>(init);
    // // errors useState using ILoginError
    // const navigate = useNavigate();
    // const dispatch = useDispatch();

    const onSubmitFormik = async (values: ILoginPage)=> {
        console.log("Values", values);
        try {
            const result = await default_http.post<ILoginResult>("api/auth/login", values);
            console.log("Login is good", result);

        } catch {
            setMessage("Дані вказано невірно")
        }
    }

    const formik = useFormik({
        initialValues: init,
        onSubmit: onSubmitFormik,
    })

    const {values, errors, touched, handleChange, handleSubmit} = formik;


    return (
        <>
            <h1 className={"text-center"}>Вхід</h1>

            <form onSubmit={handleSubmit} className="col-md-10 w-50 container-fluid">
                {message && (
                    <div className="alert alert-danger text-center fw-bold" role="alert">
                        Не вірно введені дані
                    </div>
                )}
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Пошта</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className={classNames(
                            "form-control",
                            { "is-invalid": touched.email && errors.email }
                        )}
                        value={values.email}
                        onChange={handleChange}
                        placeholder="Введіть пошту"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Пароль</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className={classNames(
                            "form-control",
                            { "is-invalid": touched.password && errors.password }
                        )}
                        value={values.password}
                        onChange={handleChange}
                        placeholder="Введіть пароль"
                    />
                </div>
                <button type="submit" className={"btn btn-primary"}>Вхід</button>
            </form>
        </>
    )
}

export default LoginPage;