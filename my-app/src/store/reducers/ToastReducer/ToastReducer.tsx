import {IToastState, IToastTypes, ToastActionTypes} from "./types";

const initState: IToastState = {
    text: "Toast Text",
    type: "default",
    isShow: false
}

export const ToastReducer = (
    state: IToastState = initState,
    action: IToastTypes
): IToastState => {
    switch (action.type) {
        case ToastActionTypes.SET_TOAST: {
            return {
                text: action.payload.text,
                type: action.payload.type,
                isShow: action.payload.isShow
            };
        }
    }
    return state;
}