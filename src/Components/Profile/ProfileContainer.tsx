import React from 'react';
import {Profile} from './Profile';
import {connect,} from 'react-redux';
import {AppStateType} from '../../Redux/reduxStore';
import {downloadPhoto, getStatus, getUserDescription, updateStatus} from '../../Redux/profileReducer';
import {useParams} from 'react-router-dom';
import {UserProfileType} from '../../api/api';
import {withRedirectComponent} from '../../hocRedirectContainer/WithRedirectComponent';
import {compose} from 'redux';

type ProfileContainerPropsType = MapStatePropsType & MapDispatchPropsType;
type PathParamsType = {
    params: { userId: string }
}

function withRouter(Component: any) {
    function ComponentWithRouterProp(props: ProfileContainerPropsType) {
        let params = useParams();
        return (
            <Component
                {...props}
                params={params}
            />
        );
    }

    return ComponentWithRouterProp;
}


class ProfileContainer extends React.Component<ProfileContainerPropsType & PathParamsType> {

    refreshProfile() {
        let userId: number | null = Number(this.props.params.userId);

        if (!userId) {
            userId = this.props.id;
        }

        if (typeof userId === 'number') {
            this.props.getUserDescription(userId);
            this.props.getStatus(userId);
        }
    }

    componentDidMount() {
        this.refreshProfile();
    };

    componentDidUpdate(prevProps: Readonly<ProfileContainerPropsType & PathParamsType>, prevState: Readonly<{}>) {
        if (this.props.params.userId !== prevProps.params.userId) {
            this.refreshProfile();
        }
    };

    render() {

        return (
            <div>
                <Profile
                    {...this.props}
                    isOwner={!this.props.params.userId}
                    profile={this.props.profile}
                    status={this.props.status}
                    updateStatus={this.props.updateStatus}
                    downloadPhoto={this.props.downloadPhoto}
                />
            </div>
        );
    }
}


type MapStatePropsType = {
    profile: UserProfileType
    status: string
    id: number | null
};
type MapDispatchPropsType = {
    getUserDescription: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
    downloadPhoto: (photos: File) => void
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        id: state.authorization.id
    };
};

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserDescription, getStatus, updateStatus, downloadPhoto}),
    withRouter,
    // withRedirectComponent
)(ProfileContainer);



