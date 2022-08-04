import React from 'react';
import {UserType} from '../../api/api';
import {Paginator} from './Paginator';
import {User} from './User/User';

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

    const subscription = (userId: number, followed: boolean) => {
        if (followed) {
            unfollowedUser(userId, followed);
        } else {
            followedUser(userId, followed);
        }
    };

    return (

        <div>

            <Paginator
                users={users}
                onPageUpdate={onPageUpdate}
                currentPage={currentPage}
                totalItemsCount={totalUsersCount}
                pageSize={pageSize}
                portionSize={10}
            />

            {users.map(u =>
                <User
                    user={u}
                    followingInProgress={followingInProgress}
                    subscription={subscription}
                    key={u.id}
                />
            )}

        </div>
    );
});

