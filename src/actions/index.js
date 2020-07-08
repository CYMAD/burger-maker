import {ADD_INGREDIENT, REMOVE_INGREDIENT} from './types';

export const addIngredient = (type) => dispatch => {
    dispatch({ type: ADD_INGREDIENT, payload: type })
}

export const removeIngredient = (type) => dispatch => {
    dispatch({ type: REMOVE_INGREDIENT, payload: type})
}