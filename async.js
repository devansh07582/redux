// in order to make async call we can distribute the state in following key pair

// state = {
//     loading : true,
//     data : [],
//     error: ''
// }


// actions 

// FETCH_USERS_REQUEST == fetch list of user from the api 
// FETCH_USERS_SUCCESS == fetched succesfully 
// FETCH_USERS_FAILURE == Fetched error


// Reducers 

// case FETCH_USERS_REQUEST:
//     return {
//         loading : true
//     }
// case FETCH_USERS_SUCCESS:
//     return {
//         loading : false,
//         users : data (from api)
//     } 
// case FETCH_USERS_FAILURE:
//    return {
//         loading : false,
//         error : error(from api )
//     } 

const redux = require('redux');
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware
const thunkMiddleware = require('redux-thunk').default
const axios = require('axios')

const initialState= {
    loading : false,
    users:[],
    error:''
}

const FETCH_USERS_REQUEST ='FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS ='FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILURE ='FETCH_USERS_FAILURE'

const fetchUsersRequest =()=>{
    return {
        type: FETCH_USERS_REQUEST
    }
}

const fetchUsersSuccess =(users)=>{
    return {
        type: FETCH_USERS_SUCCESS,
        payload : users
    }
}

const fetchUsersError =(error)=>{
    return {
        type: FETCH_USERS_FAILURE,
        payload :error
    }
}




const reducer = (state = initialState , action)=>{
    console.log(action.type)
    switch(action.type){
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case FETCH_USERS_SUCCESS:
            return {
                loading: false,
                users:action.payload,
                error : ''
            }
        case FETCH_USERS_FAILURE:
            return {
                loading: false,
                users: [],
                error: action.payload
            }
        default:
            return state
    }
}


const fetchUsers = () =>{
    return function(dispatch) {

        dispatch(fetchUsersRequest)

        axios.get('https://jsonplaceholder.typicode.com/users')
        .then((res)=>{
            const users = res.data
            dispatch(fetchUsersSuccess(users))
        }).catch((err)=>{
            const erorr = err.message
            dispatch(fetchUsersError(erorr))
        })
    }
}

const store = createStore(reducer,applyMiddleware(thunkMiddleware))

store.subscribe(()=>{
    console.log(store.getState())
})

store.dispatch(fetchUsers())
// console.log("initial state", store.getState())

// console.log("updated state", store.getState())

// subscribe in Redux refers to the method used to subscribe to store updates in a Redux-powered application. It is a method of the Redux store object and takes a callback function as an argument, which will be called whenever the store's state is updated. The function receives the current state as an argument and allows you to update your application's UI or perform any other necessary actions in response to changes in the store's state.