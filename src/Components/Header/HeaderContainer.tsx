import {Header} from './Header';
import React from 'react';
import {connect} from 'react-redux';
import { InitStateType, logout} from '../../Redux/authReducer';
import {AppStateType} from '../../Redux/reduxStore';

export type HeaderContainerPropsType = MapStatePropsType & MapDispatchPropsType;
type MapStatePropsType = {
    data: InitStateType
}
type MapDispatchPropsType = {
    logout: () => void
}


class HeaderContainer extends React.Component<HeaderContainerPropsType> {

    render() {
        return (
            <Header {...this.props.data} logout={this.props.logout}/>
        );
    };
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        data: state.authorization
    };
};

export default connect(mapStateToProps, {logout})(HeaderContainer);
