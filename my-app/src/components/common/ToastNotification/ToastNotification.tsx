import {useDispatch, useSelector} from "react-redux";
import {toast, ToastContainer} from "react-toastify";
import {AuthUserActionType} from "../../auth/types";
import {ToastActionTypes} from "../../../store/reducers/ToastReducer/types";

const ToastOptions = {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
}


const OutputToast = (text: string, type: string) => {
    const dispatch = useDispatch();
    switch (type) {
        case "info": {
            toast.info(text, ToastOptions);
            break;
        }
        case "success": {
            toast.success(text, ToastOptions);
            break;
        }
        case "warning": {
            toast.warn(text, ToastOptions);
            break;
        }
        case "error": {
            toast.error(text, ToastOptions);
            break;
        }
        case "default": {
            toast(text, ToastOptions);
            break;
        }
    }
    dispatch({
        type: ToastActionTypes.SET_TOAST,
        payload: {
            text: "",
            type: "default",
            isShow: false
        }
    })
}

const ToastNotification = () => {
    const {text, type, isShow} = useSelector((store: any) => store.toast);
    return (
        <>
            {
                isShow ?
                    OutputToast(text, type)
                    : <></>
            }
            <ToastContainer
                position="top-right"
                autoClose={1000}
                limit={3}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
}

export default ToastNotification;