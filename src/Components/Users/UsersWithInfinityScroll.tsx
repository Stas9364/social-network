import React, {useEffect, useState} from 'react';
import {UsersAPI, UserType} from '../../api/api';
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


export const UsersWithInfinityScroll: React.FC<UsersPropsType> = React.memo(({
                                                               followingInProgress,
                                                               followedUser,
                                                               unfollowedUser
}) => {

    const [users, setUsers] = useState<Array<UserType>>([]);
    const [currentPage1, setCurrentPage] = useState(1);
    const [fetching, setFetching] = useState(true);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        if (fetching) {
            UsersAPI.getUsers(5, currentPage1)
                .then(resp => {
                    setUsers([...users, ...resp.data.items]);
                    setCurrentPage(prevState => prevState + 1);
                    setTotalCount(resp.data.totalCount);
                })
                .finally( () => {
                    setFetching(false);
                });
        }
    }, [fetching]);

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler);

        return function () {
            document.removeEventListener('scroll', scrollHandler);
        };
    }, [totalCount]);

    const scrollHandler = (e: any) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100
            && users.length < totalCount
        ) {
            setFetching(true);
        }
    };


    const subscription = (userId: number, followed: boolean) => {
        if (followed) {
            unfollowedUser(userId, followed);
        } else {
            followedUser(userId, followed);
        }
    };

    return (

        <div>


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

