import React, {ComponentType} from 'react';
import {Navigate} from 'react-router-dom';
import {AppStateType} from '../Redux/reduxStore';
import {connect} from 'react-redux';

type MapStatePropsType = {
    isAuth: boolean
}

const mapStateToPropsForRedirect = (state: AppStateType): MapStatePropsType => {
    return {
        isAuth: state.authorization.isAuth
    };
};

//used in dialogsContainer & ProfileContainer
export function withRedirectComponent<T>(Component: ComponentType<T>) {

    class WrapperContainer extends React.Component<MapStatePropsType> {
        render() {
            let {isAuth, ...restProps} = this.props;

            if (!isAuth) return <Navigate to='/login'/>;

            return (
                <Component {...restProps as T} />
            );
        }
    }
    return connect(mapStateToPropsForRedirect)(WrapperContainer);
}


export function withRedirectComponent1<T>(Component: ComponentType<T>) {

    const RedirectComponent = (props: MapStatePropsType) => {
        let {isAuth, ...restProps} = props;

        if (!isAuth) return <Navigate to='/login'/>;
        return (
            <Component {...restProps as T}/>
        );
    };
    return (
        connect(mapStateToPropsForRedirect)(RedirectComponent)
    );
}
