import {AuthUserActionType, IAuthUser, IUser} from "./types";

const initState: IAuthUser = {
    isAuth: false,
    user: undefined
};

export const AuthReducer = (state = initState, action: any): IAuthUser => { // state - це значення яке там буде
    switch (action.type) {
        case AuthUserActionType.LOGIN_USER: {
            const _user = action.payload as IUser;
            return {
                ...state,
                isAuth: true,
                user: _user
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