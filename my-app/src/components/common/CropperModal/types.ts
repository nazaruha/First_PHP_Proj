export interface ICropperModal {
    onChange: (field: string, value: File) => void, // callback метод
    field: string, // назва input'a
    value?: File | null, // значення
    error?: string, // помилка
    touched?: boolean, // подія відправки фоми
    aspectRatio?: number // співвідношення сторін фотки
}