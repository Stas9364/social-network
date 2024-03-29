import {nanoid} from 'nanoid';
import {ProfileAPI, UserProfileType} from '../api/api';
import {AppThunk} from './reduxStore';

let id = () => nanoid(5);

export enum PROFILE_TYPE {
    ADD_MY_POST = 'ADD-MY-POST',
    UPDATE_LIKES_COUNTER = 'UPDATE-LIKES-COUNTER',
    SET_USER_PROFILE = 'SET-USER-PROFILE',
    GET_USER_STATUS = 'GET-USER-STATUS',
    UPDATE_USER_STATUS = 'UPDATE-USER-STATUS',
    DOWNLOAD_PHOTO = 'DOWNLOAD-PHOTO'
}

export type ProfileActionType =
    | ReturnType<typeof addMyPosts>
    | ReturnType<typeof updateLikesCounter>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof getUserStatus>
    | ReturnType<typeof updateUserStatus>
    | ReturnType<typeof downloadPhotoSuccess>

export type PostsType = {
    id: string
    message: string
    likesCount: number
}
export type InitialStateType = typeof initialState;

export const initialState = {
    myPosts: [
        {id: id(), message: 'How are you?', likesCount: 12000},
        {id: id(), message: 'I am working', likesCount: 5111},
        {id: '5', message: 'It is me!!', likesCount: 7},
        {id: id(), message: 'New message', likesCount: 2},
        {id: id(), message: 'Through props', likesCount: 200},
    ] as Array<PostsType>,
    newLikesCounter: 0,
    profile: {} as UserProfileType,
    status: ''
};


export const profileReducer = (state: InitialStateType = initialState, action: ProfileActionType): InitialStateType => {
    switch (action.type) {
        case PROFILE_TYPE.ADD_MY_POST:
            return {
                ...state,
                myPosts: [{id: id(), message: action.text, likesCount: state.newLikesCounter}, ...state.myPosts],
            };
        case PROFILE_TYPE.UPDATE_LIKES_COUNTER:
            return {
                ...state,
                myPosts: [...state.myPosts.map(el => el.id === action.id
                    ? {...el, likesCount: el.likesCount + 1}
                    : el)]
            };
        case PROFILE_TYPE.SET_USER_PROFILE:
            return {...state, profile: action.profile};
        case PROFILE_TYPE.GET_USER_STATUS:
            return {...state, status: action.status};
        case PROFILE_TYPE.UPDATE_USER_STATUS:
            return {...state, status: action.status};
        case PROFILE_TYPE.DOWNLOAD_PHOTO:
            return {...state, profile: {...state.profile, photos: action.photos}};
        default:
            return state;
    }
};

/////Actions

export const addMyPosts = (text: string) => ({type: PROFILE_TYPE.ADD_MY_POST, text} as const);
export const updateLikesCounter = (id: string) => ({type: PROFILE_TYPE.UPDATE_LIKES_COUNTER, id} as const);
export const setUserProfile = (profile: UserProfileType) => ({type: PROFILE_TYPE.SET_USER_PROFILE, profile} as const);
export const getUserStatus = (status: string) => ({type: PROFILE_TYPE.GET_USER_STATUS, status} as const);
export const updateUserStatus = (status: string) => ({type: PROFILE_TYPE.UPDATE_USER_STATUS, status} as const);
export const downloadPhotoSuccess = (photos: {small: string, large: string}) => ({type: PROFILE_TYPE.DOWNLOAD_PHOTO, photos} as const);

//////Thunk

export const getUserDescription = (userId: number): AppThunk => async (dispatch) => {
    const response = await ProfileAPI.getProfile(userId);
    dispatch(setUserProfile(response.data));
};

export const getStatus = (userId: number): AppThunk => async (dispatch) => {
    const response = await ProfileAPI.getStatus(userId);
    dispatch(getUserStatus(response.data));
};

export const updateStatus = (newStatus: string): AppThunk => async (dispatch) => {
    const response = await ProfileAPI.updateStatus(newStatus);
    if (response.data.resultCode === 0) {
        dispatch(updateUserStatus(newStatus));
    }
};
export const downloadPhoto = (photo: File): AppThunk => async (dispatch) => {
    const response = await ProfileAPI.sendPhoto(photo);
    if (response.data.resultCode === 0) {
        dispatch(downloadPhotoSuccess(response.data.data.photos));
    }
};