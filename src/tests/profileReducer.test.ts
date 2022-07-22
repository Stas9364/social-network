import {
    addMyPosts, initialState, profileReducer, updateLikesCounter
} from '../Redux/profileReducer';


test('should add post to state', ()=>{
    const endState = profileReducer(initialState, addMyPosts('new post'));

    expect(endState.myPosts.length).toBe(6);
});

test('should increase the likes counter by one', ()=>{
    const endState = profileReducer(initialState, updateLikesCounter('5'));

    expect(endState.myPosts[2].likesCount).toBe(8);
});