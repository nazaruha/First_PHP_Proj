import * as yup from 'yup';

export const CategoryCreateSchema = yup.object().shape({
    name: yup.string()
        .max(255, "Максимум 255 символів")
        .required("Введіть ім'я"),
    image: yup.string()
        .required("Оберіть фото"), // допрацюєм пізніше
    description: yup.string()
        .max(4000, "Максимум 4000 символів")
        .required("Введіть опис")
})

export const CategoryEditSchema = yup.object().shape({
    name: yup.string()
        .max(255, "Максимум 255 символів")
        .required("Введіть ім'я"),
    image: yup.string()
        .required("Оберіть фото"), // допрацюєм пізніше
    description: yup.string()
        .max(4000, "Максимум 4000 символів")
        .required("Введіть опис")
})