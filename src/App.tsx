import {Route, Routes} from 'react-router-dom';
import './App.css';
import {Music} from './Components/Music/Music';
import {Nav} from './Components/Nav/Nav';
import {News} from './Components/News/News';
import {Settings} from './Components/Settings/Settings';
import UsersContainer from './Components/Users/UsersContainer';
import ProfileContainer from './Components/Profile/ProfileContainer';
import HeaderContainer from './Components/Header/HeaderContainer';
import DialogsContainer from './Components/Dialogs/DialogsContainer';
import Login from './Components/Login/Login';
import React from 'react';
import {connect} from 'react-redux';
import {AppStateType} from './Redux/reduxStore';
import {initializeApp} from './Redux/appReducer';
import {Preloader} from './Components/commons/Preloader/Preloader';

type MapDispatchPropsType = { initializeApp: () => void }
type MapStatePropsType = { initialized: boolean }

export type AppType = MapDispatchPropsType & MapStatePropsType;

class App extends React.Component<AppType> {

    componentDidMount() {
        this.props.initializeApp();
    };

    render() {

        if (!this.props.initialized) { return <Preloader/>; }

        return ( <div className='container'>
                <HeaderContainer/>
                <Nav/>
                <div className='app-content'>
                    <Routes>
                        <Route path='/profile' element={<ProfileContainer/>}>
                            <Route path='/profile/:userId' element={<ProfileContainer/>}/>
                        </Route>
                        <Route path='/dialogs/*' element={<DialogsContainer/>}/>
                        <Route path='/users/*' element={<UsersContainer/>}/>
                        <Route path='/news/*' element={<News/>}/>
                        <Route path='/music/*' element={<Music/>}/>
                        <Route path='/settings/*' element={<Settings/>}/>
                        <Route path='/' element={<Login/>}>
                            <Route path='/login' element={<Login/>}/>
                        </Route>
                    </Routes>
                </div>
            </div> );
    }
}

export const MapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        initialized: state.initialized.initialized
    };
};

export default connect(MapStateToProps, {initializeApp})(App);
