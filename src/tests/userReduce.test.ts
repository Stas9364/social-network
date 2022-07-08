import userReducer, {follow, InitialStateType, setUsers} from '../Redux/userReducer';

const initialState: InitialStateType = {
    users: [
    {
        id: 1,
        photos: {
            small: 'qwerty',
            large: 'zxcv'
        },
        followed: false,
        name: 'Ivan Petrov',
        // location: {country: 'USA', city: 'Uta'},
        status: 'I am awesome!'
    },
    {
        id: 2,
        photos: {
            small: 'qwer',
            large: 'poiu'
        },
        followed: true,
        name: 'Ivan Ivanov',
        // location: {country: 'Ukraine', city: 'Lvov'},
        status: 'I am awesome!'
    }],
    pageSize: 5,
    totalUsersCount: 19,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
};

test('should be unfollowed', () => {
    const endState = userReducer(initialState, follow(2, initialState.users[1].followed));

    expect(endState.users[1].followed).toBe(false);
});

test('should set new users array to initial state', ()=>{
    const newUser = [{
        id: 3,
        photos: {
            small: 'sdfgh',
            large: 'rtyui'
        },
        followed: false,
        name: 'Bob Power',
        // location: {country: 'Australia', city: 'Canberra'},
        status: 'Best day!'
    }];

    const endState = userReducer(initialState, setUsers(newUser));

    expect(endState.users.length).toBe(1);
    expect(endState.users[0].name).toBe('Bob Power');
});