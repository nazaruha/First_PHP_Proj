export interface IToastState {
    text: string;
    type: "info" | "success" | "warning" | "error" | "default";
    isShow: boolean
}

export enum ToastActionTypes {
    SET_TOAST = "SET_TOAST",
}

interface SetToastAction {
    type: ToastActionTypes.SET_TOAST,
    payload: IToastState
}

export type IToastTypes = SetToastAction;