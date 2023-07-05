import {AuthUserActionType, IAuthUser} from "./types";

const initState: IAuthUser = {
    isAuth: false,
    user: undefined
};

export const AuthReducer = (state = initState, action: any): IAuthUser => { // state - це значення яке там буде
    switch (action.type) {
        case AuthUserActionType.LOGIN_USER: {
            return {
                ...state,
                isAuth: true,
                user: action.payload
            }
        }
        case AuthUserActionType.LOGOUT_USER: {
            return {
                ...state,
                isAuth: false,
                user: undefined
            }
        }
    }
    return state;
}