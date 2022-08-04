import React, {useState} from 'react';
import styles from './Users.module.css';
import {UserType} from '../../api/api';

type PaginatorPropsType = {
    users: Array<UserType>
    onPageUpdate: (p: number) => void
    currentPage: number
    totalItemsCount: number
    pageSize: number
    portionSize: number
}


export const Paginator: React.FC<PaginatorPropsType> = React.memo(({
                                                                       onPageUpdate,
                                                                       currentPage,
                                                                       totalItemsCount,
                                                                       pageSize,
                                                                       portionSize
                                                                   }) => {

    const totalPagesCount = Math.ceil((totalItemsCount / pageSize));

    const pages = [];

    for (let i = 1; i <= totalPagesCount; i++) {
        pages.push(i);
    }

    const portion = Math.ceil(totalPagesCount / portionSize);
    const [portionNumber, setPortionNumber] = useState(Math.floor(currentPage/10) + 1);
    const firstEl = (portionNumber - 1) * portionSize + 1;
    const lastEl = portionNumber * portionSize;

    return (
        <div>
            {portionNumber > 1 &&
                <button onClick={() => setPortionNumber(portionNumber - 1)}>PREV</button>
            }

            {pages
                .filter(p => p >= firstEl && p <= lastEl)
                .map((p, i) => {
                return <span
                    className={`${currentPage === p ? styles.selectedPage : ''} ${styles.paginator}`}
                    key={i}
                    onClick={() => onPageUpdate(p)}
                >{p}</span>;
            })}

            {portion > portionNumber &&
                <button onClick={() => setPortionNumber(portionNumber + 1)}>NEXT</button>
            }
            <span> Total pages: {pages.length - 1}</span>
        </div>
    );
});
