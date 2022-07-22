import {AuthAPI} from '../api/api';
import {AppThunk} from './reduxStore';

export enum AUTH_TYPE {
    SET_AUTH_DATA = 'SET-AUTH-DATA',
    ERROR_ONE = 'ERROR-ONE',
    SET_CAPTCHA = 'SET-CAPTCHA'
}

export type AuthActionsType =
    | ReturnType<typeof authUserData>
    | ReturnType<typeof errOneAC>
    | ReturnType<typeof setCaptchaURL>
export type InitStateType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    isErrOne: boolean
    captchaUrl: string | null
}

export const initialState: InitStateType = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    isErrOne: false,
    captchaUrl: null
};

export const authReducer = (state: InitStateType = initialState, action: AuthActionsType): InitStateType => {
    switch (action.type) {
        case AUTH_TYPE.SET_AUTH_DATA: {
            return {...state, ...action.payload};
        }
        case AUTH_TYPE.ERROR_ONE: {
            return {...state, isErrOne: action.isError};
        }
        case AUTH_TYPE.SET_CAPTCHA: {
            return {...state, captchaUrl: action.url};
        }
        default:
            return state;
    }
};


///////////////////Action Creators

export const authUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: AUTH_TYPE.SET_AUTH_DATA, payload: {id, email, login, isAuth}
} as const);

export const errOneAC = (isError: boolean) => ({type: AUTH_TYPE.ERROR_ONE, isError} as const);

const setCaptchaURL = (url: string | null) => ({type: AUTH_TYPE.SET_CAPTCHA, url} as const);

////////////////// Thunk

export const userAuthorization = (): AppThunk<any> => async (dispatch) => {
    const response = await AuthAPI.authorization();
    if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data;
        dispatch(authUserData(id, email, login, true));
        dispatch(setCaptchaURL(null));
    }
};

export const login = (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string
): AppThunk => async (dispatch) => {
    if (captcha) {
        await AuthAPI.sendCaptcha(email, password, rememberMe, captcha);
    }

    const response = await AuthAPI.login(email, password, rememberMe);
    if (response.data.resultCode === 0) {
        dispatch(userAuthorization());
    } else if (response.data.resultCode === 1) {
        dispatch(errOneAC(true));
    } else if (response.data.resultCode === 10) {
        const response = await AuthAPI.getCaptcha();
        dispatch(setCaptchaURL(response.data.url));
    }
    dispatch(errOneAC(false));
};

export const logout = (): AppThunk => async (dispatch) => {
    const response = await AuthAPI.logout();
    if (response.data.resultCode === 0) {
        dispatch(authUserData(null, null, null, false));
    }
};