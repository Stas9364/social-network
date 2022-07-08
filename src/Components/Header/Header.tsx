import style from './Header.module.css';
import img from '../../IMG/3.jpeg';
import React from 'react';
import {InitStateType} from '../../Redux/authReducer';

type HeaderPropsType = InitStateType & {
    logout: () => void
}

export const Header: React.FC<HeaderPropsType> =  ({
                                                       login,
                                                       isAuth,
                                                       logout
}) => {
    return (
        <header className={style.header}>
            <img src={img} alt='ape'></img>
            <div className={style.loginTitle}>


                {isAuth
                    ? <div>{login} <button onClick={logout} className={style.myButton}>LogOut</button></div>
                    : <span className={style.login}>Welcome to our network!</span>
                }
            </div>
        </header>
    );
};

