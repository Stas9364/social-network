import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import React from 'react';
import {UserProfileType} from '../../api/api';
import {MyPostsContainer} from './MyPosts/MyPostsContainer';

export type PropsType = {
    profile: UserProfileType
    status: string
    updateStatus: (status: string) => void
    downloadPhoto: (photos: File) => void
    isOwner: boolean
}

export const Profile: React.FC<PropsType> = ({
                                                 profile,
                                                 status,
                                                 updateStatus,
                                                 isOwner,
                                                 downloadPhoto,
                                                 ...restProps
                                             }) => {
    return (
        <div>
            <ProfileInfo
                isOwner={isOwner}
                profile={profile}
                status={status}
                updateStatus={updateStatus}
                downloadPhoto={downloadPhoto}
            />
            <MyPostsContainer/>
        </div>
    );
};

