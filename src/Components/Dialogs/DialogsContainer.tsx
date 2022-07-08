import {AddNewMessageAC, InitialStateType} from '../../Redux/dialogsReducer';
import {Dialogs} from './Dialogs';
import {connect} from 'react-redux';
import {compose, Dispatch} from 'redux';
import {AppStateType} from '../../Redux/reduxStore';
import React from 'react';
import {withRedirectComponent1} from '../../hocRedirectContainer/WithRedirectComponent';

type mapStatePropsType = {
    dialogsPage: InitialStateType
}
type mapDispatchPropsType = {
    addMessage: (text: string) => void
}
export type DialogsContainerPropsType = mapStatePropsType & mapDispatchPropsType

class DialogsContainer extends React.Component<DialogsContainerPropsType> {
    render() {
        return (
            <Dialogs
                dialogsPage={this.props.dialogsPage}
                addMessage={this.props.addMessage}
            />
        );
    }
}

const mapStateToProps = (state: AppStateType): mapStatePropsType => {
    return {
        dialogsPage: state.dialogsPage,
    };
};

const mapDispatchToProps = (dispatch: Dispatch): mapDispatchPropsType => {
    return {
        addMessage: (text) => dispatch(AddNewMessageAC(text)),
    };
};

export default compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withRedirectComponent1
)(DialogsContainer);
