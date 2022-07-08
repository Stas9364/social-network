import style from './Nav.module.css';
import {NavLink} from 'react-router-dom';
import {Introduce} from '../Introduce/Introduce';

export const Nav = () => {
    return (
        <>
            <Introduce/>
            <nav className={style.nav}>

                <div className={style.item}>
                    <NavLink to='/profile'
                             className={navData => navData.isActive ? style.active : style.item}>
                        Profile
                    </NavLink>
                </div>

                <div className={style.item}>
                    <NavLink to='/dialogs'
                             className={navData => navData.isActive ? style.active : style.item}>
                        Messages
                    </NavLink>
                </div>

                <div className={style.item}>
                    <NavLink to='/news'
                             className={navData => navData.isActive ? style.active : style.item}>
                        News
                    </NavLink>
                </div>

                <div className={style.item}>
                    <NavLink to='/music'
                             className={navData => navData.isActive ? style.active : style.item}>
                        Music
                    </NavLink>
                </div>

                <div className={style.clear}></div>

                <div className={style.item}>
                    <NavLink to='/users'
                             className={navData => navData.isActive ? style.active : style.item}>
                        Find Users
                    </NavLink>
                </div>

                <div className={style.clear}></div>
                <div className={style.item}>

                    <NavLink to='/settings'
                             className={navData => navData.isActive ? style.active : style.item}>
                        Settings
                    </NavLink>
                </div>
            </nav>
        </>
    );
};

