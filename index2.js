const redux = require('redux');
const createStore = redux.createStore
const combineReducers = redux.combineReducers

const CAKE_ORDER = 'CAKE_ORDER'
const CAKE_RESTOCK = 'CAKE_RESTOCK'
const ICECREAM_OREDR = 'ICECREAM_OREDR'
const RESTOKE_ICECREME  = 'RESTOKE_ICECREME'

// initial state of all the variables 

const initialCakeState = {
    numOfCakes:10
}
const initialIcecreamState = {
    numofIcecream:10
}


// all the action on the variables 

// creating action creator 
function orderCake(){
    return {                  // this object is called action 
         type: CAKE_ORDER,
         qty: 1,
     }
}

function restockCake(qty){
    return {
        type:CAKE_RESTOCK,
        qty:qty
    }
}

function restock_icecreme(qty){
    return{
        type:RESTOKE_ICECREME,
        qty:qty
    }
}

function OrderIceCream(){
    return{
        type:ICECREAM_OREDR,
    }
}

const cakeReducer = (state = initialCakeState,action) =>{
    switch(action.type){
        case CAKE_ORDER:
            return {
                ...state,
                numOfCakes : state.numOfCakes-1
            }
        case CAKE_RESTOCK:
            return{
                ...state,
                numOfCakes : state.numOfCakes + action.qty
            }
        default:

            state
}
}



const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreameReducer
})

const store = createStore(rootReducer)