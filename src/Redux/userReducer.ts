import {UsersAPI, UserType} from '../api/api';
import {AppThunk} from './reduxStore';
import {Dispatch} from 'redux';

export enum USER_TYPE {
    FOLLOW_UNFOLLOW = 'FOLLOW-UNFOLLOW',
    SET_USERS = 'SET-USERS',
    SET_CURRENT_PAGE = 'SET-CURRENT-PAGE',
    SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT',
    SET_IS_FETCHING = 'SET-IS-FETCHING',
    SET_BUTTON_DISABLE = 'SET-BUTTON-DISABLE'
}

export type InitialStateType = {
    users: UserType[],
    pageSize: number,
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<any>
}
export type UserActionType =
    | ReturnType<typeof follow>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setTotalUsersCount>
    | ReturnType<typeof setIsFetching>
    | ReturnType<typeof setButtonDisable>

const initialState: InitialStateType = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
};

const userReducer = (state: InitialStateType = initialState, action: UserActionType): InitialStateType => {
    switch (action.type) {
        case USER_TYPE.FOLLOW_UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => u.id === action.userId
                    ? {...u, followed: !action.currentSubscriptionStatus}
                    : u)
            };
        case USER_TYPE.SET_USERS:
            return {...state, users: [...action.users]};
        case USER_TYPE.SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage};
        case USER_TYPE.SET_TOTAL_USERS_COUNT:
            return {...state, totalUsersCount: action.totalUsersCount};
        case USER_TYPE.SET_IS_FETCHING:
            return {...state, isFetching: action.isFetching};
        case USER_TYPE.SET_BUTTON_DISABLE:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : [state.followingInProgress.filter(id => id !== action.userId)]
            };
        default:
            return state;
    }
};

//////Actions

export const follow = (userId: number, currentSubscriptionStatus: boolean) => ({
    type: USER_TYPE.FOLLOW_UNFOLLOW,
    userId,
    currentSubscriptionStatus
} as const);

export const setUsers = (users: UserType[]) => ({type: USER_TYPE.SET_USERS, users} as const);

export const setCurrentPage = (currentPage: number) => ({type: USER_TYPE.SET_CURRENT_PAGE, currentPage} as const);

export const setTotalUsersCount = (totalUsersCount: number) => ({
    type: USER_TYPE.SET_TOTAL_USERS_COUNT,
    totalUsersCount
} as const);

export const setIsFetching = (isFetching: boolean) => ({type: USER_TYPE.SET_IS_FETCHING, isFetching} as const);

export const setButtonDisable = (userId: number, isFetching: boolean) => ({
    type: USER_TYPE.SET_BUTTON_DISABLE, userId, isFetching
} as const);

//////Thunk

export const requestUsers = (pageSize: number, currentPage: number): AppThunk => async (dispatch) => {
    dispatch(setIsFetching(true));
    const response = await UsersAPI.getUsers(pageSize, currentPage);
    dispatch(setUsers(response.data.items));
    dispatch(setTotalUsersCount(response.data.totalCount));
    dispatch(setIsFetching(false));
};

const followUnfollowFlow = async (
    dispatch: Dispatch,
    userId: number,
    followed: boolean,
    apiMethod: (userId: number) => Promise<any>
) => {
    dispatch(setButtonDisable(userId, true));
    const response = await apiMethod(userId);
    if (response.data.resultCode === 0) {
        dispatch(follow(userId, followed));
    }
    dispatch(setButtonDisable(userId, false));
};

export const unfollowedUser = (userId: number, followed: boolean): AppThunk => async (dispatch) => {
    await followUnfollowFlow(dispatch, userId, followed, UsersAPI.unfollow.bind(UsersAPI));
};

export const followedUser = (userId: number, followed: boolean): AppThunk => async (dispatch) => {
    await followUnfollowFlow(dispatch, userId, followed, UsersAPI.follow.bind(UsersAPI));
};

export default userReducer;