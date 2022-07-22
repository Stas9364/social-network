import React from 'react';
import styles from './Users.module.css';
import {UserType} from '../../api/api';

type PaginatorPropsType = {
    users: Array<UserType>
    onPageUpdate: (p: number) => void
    currentPage: number
    totalUsersCount: number
    pageSize: number
}


export const Paginator: React.FC<PaginatorPropsType> = React.memo(({
                                                                       onPageUpdate,
                                                                       currentPage,
                                                                       totalUsersCount,
                                                                       pageSize,
                                                                   }) => {
    const pagesNumber = Math.ceil((totalUsersCount / pageSize) / 100);
    const pages = [];
    for (let i = 1; i <= pagesNumber; i++) {
        pages.push(i);
    }
    return (
        <div>
            {pages.map((p, i) => {
                return <span
                    className={currentPage === p ? styles.selectedPage : ''}
                    key={i}
                    onClick={() => onPageUpdate(p)}
                >{p}</span>;
            })}
        </div>
    );
});
