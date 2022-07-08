import {authReducer, authUserData, initialState} from '../Redux/authReducer';


test('check a state after response', ()=>{
    const endState = authReducer(initialState, authUserData(99, 'MY_EMALE@.com', 'BLABLA-LOGIN', true));

    expect(endState.id).toBe(99);
    expect(endState.email).toBe('MY_EMALE@.com');
    expect(endState.login).toBe('BLABLA-LOGIN');

});
