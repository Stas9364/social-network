import {connect} from 'react-redux';
import {AppStateType} from '../../Redux/reduxStore';
import {
    followedUser, requestUsers, setCurrentPage, unfollowedUser,
} from '../../Redux/userReducer';
import React from 'react';
import {Users} from './Users';
import {Preloader} from '../commons/Preloader/Preloader';
import {UserType} from '../../api/api';
import {compose} from 'redux';
import {
    getCurrentPage, getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from './usersSelectors/usersSelectors';

type MapStatePropsType = {
    users: UserType[]
    pageSize: number,
    totalCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<any>
}
type MapDispatchPropsType = {
    followedUser: (userId: number, followed: boolean) => void
    unfollowedUser: (userId: number, followed: boolean) => void
    setCurrentPage: (currentPage: number) => void
    getUsers: (pageSize: number, currentPage: number) => void
}
export type UsersPropsType = MapStatePropsType & MapDispatchPropsType;


class UsersContainer extends React.Component<UsersPropsType> {

    componentDidMount() {
            this.props.getUsers(this.props.pageSize, this.props.currentPage);
    };

    onPageUpdate = (p: number) => {
        this.props.getUsers(this.props.pageSize, p);
        this.props.setCurrentPage(p);
    };

    render() {
        return (
            <>
                {this.props.isFetching
                    ? <Preloader/>
                    : <Users
                        users={this.props.users}
                        onPageUpdate={this.onPageUpdate}
                        currentPage={this.props.currentPage}
                        totalUsersCount={this.props.totalCount}
                        pageSize={this.props.pageSize}
                        followedUser={this.props.followedUser}
                        unfollowedUser={this.props.unfollowedUser}
                        followingInProgress={this.props.followingInProgress}
                    />
                }
            </>
        );
    };
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    };
};

export default compose<React.ComponentType>(
    connect(mapStateToProps,
        {
            followedUser, unfollowedUser, setCurrentPage, getUsers: requestUsers
        }),
    // withRedirectComponent
)(UsersContainer);


