import React from 'react';
import userPhoto from '../../IMG/1.jpg';
import styles from './Users.module.css';
import {NavLink} from 'react-router-dom';
import {UserType} from '../../api/api';

type UsersPropsType = {
    users: Array<UserType>
    onPageUpdate: (p: number) => void
    currentPage: number
    totalUsersCount: number
    pageSize: number
    followedUser: (userId: number, currentSubscriptionStatus: boolean) => void
    unfollowedUser: (userId: number, currentSubscriptionStatus: boolean) => void
    followingInProgress: Array<any>
}


export const Users: React.FC<UsersPropsType> = React.memo(({
                                                               users,
                                                               onPageUpdate,
                                                               currentPage,
                                                               totalUsersCount,
                                                               pageSize,
                                                               followingInProgress,
                                                               followedUser,
                                                               unfollowedUser
}) => {

    const pagesNumber = Math.ceil((totalUsersCount / pageSize) / 100);
    const pages = [];
    for (let i = 1; i <= pagesNumber; i++) {
        pages.push(i);
    }

    const subscription = (userId: number, followed: boolean) => {
        if (followed) {
            unfollowedUser(userId, followed);
        } else {
            followedUser(userId, followed);
        }
    };

    return (

        <div>
            <div>
                {pages.map((p, i) => {
                    return <span
                        className={currentPage === p ? styles.selectedPage : ''}
                        key={i}
                        onClick={() => onPageUpdate(p)}
                    >{p}</span>;
                })}
            </div>

            {users.map(u => <div key={u.id}>

                <div>
                    <NavLink to={'/profile/' + u.id}>
                        <img
                            className={styles.usersPhoto}
                            src={u.photos.small === null ? userPhoto : u.photos.small}
                            alt={'Ape'}
                        />
                    </NavLink>
                </div>

                <button
                    disabled={followingInProgress.some(id => id === u.id)}
                    onClick={() => subscription(u.id, u.followed)}>
                    {u.followed ? 'Unfollow' : 'Follow'}
                </button>

                <div className={styles.dataContainer}>
                    <div>{u.name}</div>
                    <div>{u.status}</div>
                    <div>{'u.location.country'}</div>
                    <div>{'u.location.city'}</div>
                </div>

            </div>)}
        </div>
    );
});
