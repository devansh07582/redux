const redux = require('redux');

const createStore = redux.createStore
const combineReducers = redux.combineReducers

// const initialState = {// this is store
//     numOfCakes:16,
//     numOfIceCreame: 10
// }


const CAKE_ORDER = 'CAKE_ORDER'
const CAKE_RESTOCK = 'CAKE_RESTOCK'
const ICECREAM_OREDR = 'ICECREAM_OREDR'
const RESTOKE_ICECREME  = 'RESTOKE_ICECREME'


const initialCakeState = {
    numOfCakes:10
}


const initialIcecreamState = {
    numofIcecream:10
}



// this order cake function is called action creator 

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

function restock_icecreme(){
    return{
        type:RESTOKE_ICECREME,
        qty:1
    }
}

function OrderIceCream(){
    return{
        type:ICECREAM_OREDR,
        qty:1

    }
}


const cakeReducer = (state = initialCakeState,action)=>{
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
            return state
    }
}

const iceCreameReducer = (state= initialIcecreamState, action)=>{
    switch(action.type){
        
        case ICECREAM_OREDR:
            return{
                ...state,
                numofIcecream: state.numofIcecream-1
            } 
        case RESTOKE_ICECREME:
            return {
                ...state,
                numofIcecream: state.numofIcecream + action.qty
            }
            

        default:
            return state
    }
}

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreameReducer
})

const store = createStore(rootReducer)

console.log("initial state", store.getState())

store.dispatch(orderCake())
store.dispatch(orderCake())
store.dispatch(orderCake())
store.dispatch(orderCake())
store.dispatch(orderCake())
store.dispatch(orderCake())
store.dispatch(orderCake())
store.dispatch({
    type:CAKE_ORDER,
    qty:1
})
store.dispatch(restockCake(10))
store.dispatch(OrderIceCream())
store.dispatch(OrderIceCream())
store.dispatch(OrderIceCream())



console.log("update state: ", store.getState())

