import style from './ProfileInfo.module.css';
import {Preloader} from '../../commons/Preloader/Preloader';
import {PropsType} from '../Profile';
import React from 'react';
import ProfileStatus from './ProfileStatus/ProfileStatus';
import {ProfileStatusHook} from './ProfileStatus/ProfileStatusHook';

export const ProfileInfo: React.FC<PropsType> = ({profile,status,updateStatus}) => {
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

    return (
        <>
            <div className={style.content}>
                <img
                    src='https://co14.nevseoboi.com.ua/189/18819/1417188244-6075204-www.nevseoboi.com.ua.jpg'
                    alt='main'
                />

                {/*<ProfileStatus*/}
                {/*    status={status}*/}
                {/*    updateStatus={updateStatus}*/}
                {/*/>*/}
                <ProfileStatusHook
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

