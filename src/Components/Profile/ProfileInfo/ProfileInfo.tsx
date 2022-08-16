import style from './ProfileInfo.module.css';
import {Preloader} from '../../commons/Preloader/Preloader';
import {PropsType} from '../Profile';
import React, {ChangeEvent} from 'react';
import {ProfileStatus} from './ProfileStatus/ProfileStatus';
import userPhoto from '../../../IMG/1.jpg';

export const ProfileInfo: React.FC<PropsType> = ({
                                                     profile,
                                                     status,
                                                     updateStatus,
                                                     isOwner,
                                                     downloadPhoto
}) => {
    if (!profile) {
        return <Preloader/>;
    }

    const contacts: any = profile.contacts;
    let res = [];
    for (let sn in contacts) {
        if (!contacts[sn]) {
            continue;
        }
        res.push(sn +': '+ contacts[sn]);
    }

    const onDownloadAvatar = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files !== null) {
            downloadPhoto(e.target.files[0]);
        }
    };

    return (
        <>
            <div className={style.content}>
                <img
                    src={profile.photos && profile.photos.small ? profile?.photos.large : userPhoto}
                    alt='main'
                />
                {isOwner && <input type='file' onChange={onDownloadAvatar}/>}

                <ProfileStatus
                    status={status}
                    updateStatus={updateStatus}
                />

                <div className={style.photoDescription}>
                    <div>About me: {profile.aboutMe}</div>
                    <div>Full Name: {profile.fullName}</div>
                    <ul>
                        {res.map((el, ind) => <li key={ind} style={{color: 'red'}}>{el}</li>)}
                    </ul>

                </div>
            </div>
        </>
    );
};

