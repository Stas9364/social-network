import style from './MyPosts.module.css';
import {Post} from './Post/Post';
import React from 'react';
import {addMyPosts, InitialStateType} from '../../../Redux/profileReducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from '../../../Redux/reduxStore';
import {AddTextForm} from '../../commons/AddTextForm/AddTextForm';


export const MyPosts = () => {

    const dispatch = useDispatch();
    const profilePage = useSelector<AppStateType, InitialStateType>(state => state.profilePage);

    const posts =
        profilePage.myPosts.map((p) => (
            <Post
                key={p.id}
                id={p.id}
                message={p.message}
                likes={p.likesCount}
            />
        ));

    const onAddPost = (text: string) => dispatch(addMyPosts(text));

    return (
        <div className={style.posts}>

            <h3>My posts</h3>

            <div className={style.textAndButton}>
                <AddTextForm
                    onClick={onAddPost}
                    btnStyle={style.btn}
                    btnName={'Send'}
                />
            </div>

            {posts}

        </div>
    );
};


