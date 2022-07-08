import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import React from 'react';
import {UserProfileType} from '../../api/api';
import {MyPostsContainer} from './MyPosts/MyPostsContainer';

export type PropsType = {
    profile: UserProfileType
    status: string
    updateStatus: (status: string) => void
}

export const Profile: React.FC<PropsType> = ({
                                                 profile,
                                                 status,
                                                 updateStatus,
                                                 ...restProps
                                             }) => {
    return (
        <div>
            <ProfileInfo
                profile={profile}
                status={status}
                updateStatus={updateStatus}
            />
            <MyPostsContainer/>
        </div>
    );
};

