import {ADD_INGREDIENT,
        REMOVE_INGREDIENT} from '../actions/types'


const INITIAL_STATE = {
    ingredients : {
        lettuce: 0,
        tomato: 0,
        pickle: 0,
        onion: 0,
        meat: 0,
    },
    prices: {
        lettuce: 0.5,
        meat: 2.5,
        onion: 0.5,
        pickle: 0.6,
        tomato: 0.45
    },
    totalPrice: 2.5
};

export default function(state = INITIAL_STATE, action) {
    switch (action.type){
        case ADD_INGREDIENT:
            return { ...state, 
                ingredients: {
                    ...state.ingredients,
                    [action.payload]: state.ingredients[action.payload] + 1
                },
                totalPrice: state.totalPrice + state.prices[action.payload]
            };
        case REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.payload]: state.ingredients[action.payload] - 1
                },
                totalPrice: state.totalPrice - state.prices[action.payload]
            }
        default: 
            return state;
    }
}