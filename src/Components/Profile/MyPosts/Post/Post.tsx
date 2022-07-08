import style from './Post.module.css';
import React from 'react';
import {useDispatch} from 'react-redux';
import {updateLikesCounter} from '../../../../Redux/profileReducer';

type PostPropsType = {
    id: string
    message: string,
    likes: number,
}


export const Post: React.FC<PostPropsType> = ({
                                                  id,
                                                  message,
                                                  likes,
}) => {

    const dispatch = useDispatch();

    const onClickLikesCounterHandler = () => dispatch(updateLikesCounter(id));

    return (
        <div>
            <div className={style.item}>
                <img
                    src='https://shapka-youtube.ru/wp-content/uploads/2021/02/prikolnaya-avatarka-dlya-patsanov.jpg' alt='main'/>
                {message}
            </div>
            <span
                className={style.likesCounter}
                onClick={onClickLikesCounterHandler}
            > likes </span>
            <span
                key={id}
                className={style.count}
            >{likes}</span>
        </div>
    );
};

