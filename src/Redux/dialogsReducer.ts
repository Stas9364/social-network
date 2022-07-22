import {nanoid} from 'nanoid';

let id = () => nanoid(5);

export type DialogsActionType = ReturnType<typeof AddNewMessageAC>;
export type InitialStateType = typeof initialState;
export type DialogsType = {
    path: string
    id: number
    name: string
}
export type MessagesType = {
    id: string
    message: string
}

export enum DIALOGS_TYPE {
    ADD_NEW_MESSAGE= 'ADD-NEW-MESSAGE'
}

export const initialState = {
    dialogsData: [
        {path: '1', id: 1, name: 'Alex'},
        {path: '2', id: 2, name: 'John'},
        {path: '3', id: 3, name: 'Max'},
        {path: '4', id: 4, name: 'Anna'},
        {path: '5', id: 5, name: 'Green'},
        {path: '6', id: 6, name: 'Georg'},
    ] as Array<DialogsType>,
    messages: [
        {id: id(), message: 'What\'s up?!'},
        {id: id(), message: 'Hey'},
        {id: id(), message: 'I am done it!!'},
        {id: id(), message: 'I go there'},
        {id: id(), message: 'Hi'},
        {id: id(), message: 'Props is working'},
    ] as Array<MessagesType>,
};

const dialogsReducer = (state: InitialStateType = initialState, action: DialogsActionType): InitialStateType => {
    switch (action.type) {
        case DIALOGS_TYPE.ADD_NEW_MESSAGE:
            return {...state, messages: [...state.messages, {id: id(), message: action.text}]};
        default:
            return state;
    }
};

export const AddNewMessageAC = (text: string) => ({type: DIALOGS_TYPE.ADD_NEW_MESSAGE, text} as const);

export default dialogsReducer;