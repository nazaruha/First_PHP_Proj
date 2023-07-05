import * as yup from 'yup';

export const RegisterSchema = yup.object({
    email: yup.string()
        .email("Невірна пошта")
        .required("Введіть пошту"),
    lastName: yup.string()
        .required("Введіть фамілію"),
    name: yup.string()
        .required("Введіть ім'я"),
    phone: yup.string()
        .required("Введіть телефон"),
    password: yup.string()
        .min(6, "Мінімум 6 символів")
        .matches(/[0-9a-zA-Z]/, "Лише латинські символи і цифри")
        .required("Введіть пароль"),
    password_confirmation: yup.string()
        .oneOf([yup.ref("password")], () => "Паролі повинні співпадати")
        .required("Введіть підтвердження паролю")
})