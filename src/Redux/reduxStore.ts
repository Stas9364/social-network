import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux';
import dialogsReducer, {DialogsActionType} from './dialogsReducer';
import userReducer, {UserActionType} from './userReducer';
import {ProfileActionType, profileReducer} from './profileReducer';
import {AuthActionsType, authReducer} from './authReducer';
import thunk, {ThunkAction} from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {AppActionsType, appReducer} from './appReducer';


const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: userReducer,
    authorization: authReducer,
    initialized: appReducer
});

export type AppStateType = ReturnType <typeof rootReducer>;
type AppStateActionsType =
    | AuthActionsType
    | UserActionType
    | ProfileActionType
    | DialogsActionType
    | AppActionsType;
export type AppThunk <ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AppStateActionsType>

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));