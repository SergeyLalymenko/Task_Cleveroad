import { SET_STICKERS } from '../actions/stickers'

const initialState = {
    list: [],
}

export default function reducer(state = initialState, {type, payload}){
    switch(type){
        case SET_STICKERS: return {...state, list: payload}

        default: return state
    }
}