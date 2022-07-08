import dialogsReducer, {
    AddNewMessageAC,
    initialState
} from '../Redux/dialogsReducer';



test('add new message', ()=>{
    const endState = dialogsReducer(initialState, AddNewMessageAC('new text'));

    expect(endState.messages.length).toBe(7);
});



