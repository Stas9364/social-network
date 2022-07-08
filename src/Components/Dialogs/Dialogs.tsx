import style from './Dialogs.module.css';
import {DialogItem} from './DialogItem/DialogItem';
import React, {useCallback} from 'react';
import {Message} from './Message/Message';
import {InitialStateType,} from '../../Redux/dialogsReducer';
import {AddTextForm} from '../commons/AddTextForm/AddTextForm';

type DialogPropsType = {
    dialogsPage: InitialStateType,
    addMessage: (text: string) => void
}

export const Dialogs = React.memo((props: DialogPropsType) => {

    const dialogsItem =
        props.dialogsPage.dialogsData.map((elem) => <DialogItem key={elem.id} name={elem.name} path={elem.path}/>);

    const messages =
        props.dialogsPage.messages.map((elem) => <Message key={elem.id} message={elem.message}/>);

    const onAddMessage = useCallback((text: string) => props.addMessage(text), [props]);

    return (
        <div className={style.dialogs}>

            <div className={style.dialogsItem}>
                {dialogsItem}
            </div>

            <div className={style.messages}>
                {messages}

                <div className={style.textarea}>
                    <AddTextForm
                        onClick={onAddMessage}
                        btnName={'Send'}
                        btnStyle={style.addMessage}
                    />
                </div>

            </div>
        </div>
    );
});
