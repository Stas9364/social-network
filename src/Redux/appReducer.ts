import {AppThunk} from './reduxStore';
import {userAuthorization} from './authReducer';

export enum ACTIONS_TYPE {
    INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'
}

export type InitStateType = typeof initState;
export type AppActionsType = ReturnType<typeof initializedSuccess>

export const initState = {
    initialized: false
};

export const appReducer = (state: InitStateType = initState, action: AppActionsType): InitStateType => {
    switch (action.type) {
        case ACTIONS_TYPE.INITIALIZED_SUCCESS:
            return {
                ...state, initialized: true
            };
        default:
            return state;
    }
};

/////Actions

export const initializedSuccess = () => ({type: ACTIONS_TYPE.INITIALIZED_SUCCESS} as const);

/////Thunk

export const initializeApp = (): AppThunk => (dispatch) => {
    const promise = dispatch(userAuthorization());
    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess());
        });
};