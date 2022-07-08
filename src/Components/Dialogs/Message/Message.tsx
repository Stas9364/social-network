import style from './../Dialogs.module.css';
import React from 'react';

type MessagePropsType = {message: string}

export const Message: React.FC<MessagePropsType> = React.memo ( ({message}) => {
    return (
        <>
            <div className={style.message}>
                {message}
            </div>
        </>
    );
});

