import style from './Introduse.module.css';

export const Introduce = () => {
    return (
        <>
            <div className={style.intro}>
                <img src="https://935650.smushcdn.com/2437829/wp-content/uploads/2022/01/Bored-Ape-Yacht-Club_Ape_wide.jpg?lossy=1&strip=1&webp=1" alt="ape"/>
                <span>followers +100</span>
                <div className={style.name}>NAME SURNAME</div>
            </div>
        </>
    );
};

