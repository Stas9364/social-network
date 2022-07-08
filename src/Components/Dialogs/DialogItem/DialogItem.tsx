import style from './../Dialogs.module.css';
import {NavLink} from 'react-router-dom';
import React from 'react';

type DialogItemProps = {
    name: string,
    path: string
}

export const DialogItem: React.FC<DialogItemProps> = React.memo (({name, path}) => {

    return (
        <div className={style.dialog}>
            <NavLink to={'/dialogs/' + path}>{name}</NavLink>
        </div>
    );
});

