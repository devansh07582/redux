const redux = require('redux');
const createStore = redux.createStore 
const combineReducers = redux.combineReducers


const applyMiddleware = redux.applyMiddleware

const reduxLogger = require('redux-logger')

const logger = reduxLogger.createLogger()

const BUY_CAKE = 'BUY_CAKE'
const RESTOCK_CAKE = "RESTOCK_CAKE"

const BUY_ICECREAM = "BUY_ICECREAM"
const RESTOCK_ICECREAM = "RESTOCK_ICECREAM"




const initialCakeState = {
    numOfCakes:10
}
const initialIcecreamState = {
    numofIcecream:10
}

function orderCake(){ // action creator 
    return {
    type:BUY_CAKE,  
    }
}

function restock(qty){ // action creator 
    return {
    type:RESTOCK_CAKE,
    qty:qty  
    }
}

function OrderIceCream(){ 
    return {
        type: BUY_ICECREAM
    }
}

function RestockIceCream(qty){ 
    return {
        type: RESTOCK_ICECREAM,
        qty:qty
    }
}



const cakereducer = (state = initialCakeState,action)=>{ // reducer which take previous state and action change the intital state

    switch(action.type){

        case BUY_CAKE:
            return {
                ...state,
                numOfCakes:state.numOfCakes-1
            }
        break;

        case RESTOCK_CAKE:
            return {
                ...state,
                numOfCakes:state.numOfCakes + action.qty
            }
        break

        default:
          return state
    }
}

const iceCreameReducer = (state = initialIcecreamState,action) =>{
    switch(action.type){
        case BUY_ICECREAM:
            return {
                ...state,
                numofIcecream :state.numofIcecream -1
            }
        break
        case RESTOCK_ICECREAM:
            return {
                ...state,
                numofIcecream :state.numofIcecream + action.qty
            }
        break
        default:
           return state
}
}

const rootReducer = combineReducers(
   {
    cake: cakereducer,
    icecream : iceCreameReducer
   })

const store = createStore(rootReducer, applyMiddleware(logger))

// we have methods of store as well like  

// getState() ==> getState allows access to the state 

//dispatch(action) == > allow state to change or update the state 

// subscribe(listener ) == > registers listeners 


console.log("initial state of the app", store.getState());


store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(restock(5));

store.dispatch(OrderIceCream())
store.dispatch(OrderIceCream())
store.dispatch(OrderIceCream())
store.dispatch(RestockIceCream(5))



console.log("state of the app is ", store.getState());

store.subscribe(()=>{
    console.log("state is changed ", getState());
})


console.log("updated state ", store.getState())



// redux logger 

// provides  athrid party extension point between dispatching an action and the moment it reaches the reducer 

// use this middle ware to for logging, crash report , performing asynchronus task 



// our action can be synchronous  ex :: buy cake restock cake , buy icecrema etc....
// our action can be asychronous  ex  :: api calls , reading from the files 



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


