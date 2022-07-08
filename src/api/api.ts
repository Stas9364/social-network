import axios from 'axios';

export type UserType = {
    name: string
    id: number
    photos: {
        small: string
        large: string
    },
    status: string
    followed: boolean
}
type GetUsersType = {
    items: Array<UserType>
    totalCount: number
    error: string
}
type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}
type AuthorizationType = {
    resultCode: number
    messages: string[]
    data: {
        id: number
        email: string
        login: string
    }
}
type GetCaptchaResponseType = {
    url: string
}
export type UserProfileType = {
    aboutMe: string,
    contacts: {
        github: string
        vk: string
        facebook: string
        instagram: string
        twitter: string
        website: string
        youtube: string
        mainLink: string
    },
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    photos: {
        small: string,
        large: string
    }
    userId: number
}

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '20b2cf04-7cf4-4d25-8e54-5f388ae38747'
    }
});

export const UsersAPI = {
    getUsers(pageSize: number, currentPage: number) {
        return instance.get<GetUsersType>(`users?count=${pageSize}&page=${currentPage}`);
    },
    follow(userId: number) {
        return instance.post<ResponseType>(`follow/${userId}`);
    },
    unfollow(userId: number) {
        return instance.delete<ResponseType>(`follow/${userId}`);
    }
};

export const AuthAPI = {
    authorization() {
        return instance.get<AuthorizationType>('auth/me');
    },
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post<ResponseType<{userId: number}>>('/auth/login',
            {email, password, rememberMe});
    },
    logout() {
        return instance.delete<ResponseType>('/auth/login');
    },
    getCaptcha() {
        return instance.get<GetCaptchaResponseType>('/security/get-captcha-url');
    },
    sendCaptcha(email: string, password: string, rememberMe: boolean, captcha: string) {
        return instance.post('https://social-network.samuraijs.com/Auth/Auth/TryLogin',
            {
                'Login': email,
                'Password': password,
                'rememberMe': rememberMe,
                'captcha': captcha,
                'cID': 'ffd0b611-5d47-4be8-aa8c-b21e7de27df9'
            });
    }
};

export const ProfileAPI = {
    getProfile(userId: number) {
        return instance.get<UserProfileType>(`profile/${userId}`);
    },
    getStatus(userId: number) {
        return instance.get<string>(`/profile/status/${userId}`);
    },
    updateStatus(value: string) {
        return instance.put<ResponseType>('/profile/status', {status: value});
    }
};