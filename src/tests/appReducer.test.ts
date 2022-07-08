import {appReducer, initializedSuccess, initState} from '../Redux/appReducer';

test('is state initialized', ()=>{
    const endState = (appReducer(initState, initializedSuccess()));

    expect(endState.initialized).toBe(true);
});