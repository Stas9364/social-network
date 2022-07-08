import {UsersAPI, UserType} from '../api/api';
import {AppThunk} from './reduxStore';

export enum ACTIONS_TYPE {
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
        case ACTIONS_TYPE.FOLLOW_UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => u.id === action.userId ? {
                    ...u,
                    followed: !action.currentSubscriptionStatus
                } : u)
            };
        case ACTIONS_TYPE.SET_USERS:
            return {
                ...state,
                users: [...action.users]
            };
        case ACTIONS_TYPE.SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            };
        case ACTIONS_TYPE.SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            };
        case ACTIONS_TYPE.SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            };
        case ACTIONS_TYPE.SET_BUTTON_DISABLE:
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
    type: ACTIONS_TYPE.FOLLOW_UNFOLLOW,
    userId,
    currentSubscriptionStatus
} as const);

export const setUsers = (users: UserType[]) => ({type: ACTIONS_TYPE.SET_USERS, users} as const);

export const setCurrentPage = (currentPage: number) => ({type: ACTIONS_TYPE.SET_CURRENT_PAGE, currentPage} as const);

export const setTotalUsersCount = (totalUsersCount: number) => ({
    type: ACTIONS_TYPE.SET_TOTAL_USERS_COUNT,
    totalUsersCount
} as const);

export const setIsFetching = (isFetching: boolean) => ({type: ACTIONS_TYPE.SET_IS_FETCHING, isFetching} as const);

export const setButtonDisable = (userId: number, isFetching: boolean) => ({
    type: ACTIONS_TYPE.SET_BUTTON_DISABLE, userId, isFetching
} as const);

//////Thunk

export const getUsers = (pageSize: number, currentPage: number): AppThunk => (dispatch) => {

    dispatch(setIsFetching(true));
    UsersAPI.getUsers(pageSize, currentPage)
        .then((response) => {
            dispatch(setUsers(response.data.items));
            dispatch(setTotalUsersCount(response.data.totalCount));
            dispatch(setIsFetching(false));
        });
};

export const unfollowedUser = (userId: number, followed: boolean): AppThunk => (dispatch) => {
    dispatch(setButtonDisable(userId, true));
    UsersAPI.unfollow(userId)
        .then((response) => {
            if (response.data.resultCode === 0) {
                dispatch(follow(userId, followed));
            }
            dispatch(setButtonDisable(userId, false));
        });
};

export const followedUser = (userId: number, followed: boolean): AppThunk => (dispatch) => {
    dispatch(setButtonDisable(userId, true));
    UsersAPI.follow(userId)
        .then((response) => {
            if (response.data.resultCode === 0) {
                dispatch(follow(userId, followed));
            }
            dispatch(setButtonDisable(userId, false));
        });
};

export default userReducer;