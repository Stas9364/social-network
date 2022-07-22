import React from 'react';
import styles from './User.module.css';
import {NavLink} from 'react-router-dom';
import userPhoto from '../../../IMG/1.jpg';
import {UserType} from '../../../api/api';

type UserPropsType = {
    user: UserType
    followingInProgress: Array<any>
    subscription: (userId: number, followed: boolean) => void
}

export const User: React.FC<UserPropsType> = React.memo(({user, followingInProgress, subscription}) => {
    return (
        <div>

            <div>
                <NavLink to={'/profile/' + user.id}>
                    <img
                        className={styles.usersPhoto}
                        src={user.photos.small === null ? userPhoto : user.photos.small}
                        alt={'Ape'}
                    />
                </NavLink>
            </div>

            <button
                disabled={followingInProgress.some(id => id === user.id)}
                onClick={() => subscription(user.id, user.followed)}>
                {user.followed ? 'Unfollow' : 'Follow'}
            </button>

            <div className={styles.dataContainer}>
                <div>{user.name}</div>
                <div>{user.status}</div>
                <div>{'u.location.country'}</div>
                <div>{'u.location.city'}</div>
            </div>

        </div>
    );
});