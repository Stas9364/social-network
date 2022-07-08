import {
    addMyPosts, InitialStateType, updateLikesCounter,
} from '../../../Redux/profileReducer';
import {MyPosts} from './MyPosts';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {AppStateType} from '../../../Redux/reduxStore';

type mapStatePropsType = {
    profilePage: InitialStateType,
}

type mapDispatchProps = {
    addPost: (text: string) => void
    changeLikesCounter: (id: string ) => void
}

const mapStateToProps = (state: AppStateType): mapStatePropsType => {
    return {
        profilePage: state.profilePage,
    };
};

const mapDispatchToProps = (dispatch: Dispatch): mapDispatchProps => {
    return {
        addPost: (text: string) => dispatch(addMyPosts(text)),
        changeLikesCounter: (id: string ) => dispatch(updateLikesCounter(id))
    };
};

export const MyPostsContainer = connect (mapStateToProps, mapDispatchToProps) (MyPosts);