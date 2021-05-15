import { ADD_CARD, LOAD_CARDS } from "../actions/action"

const initialState = {
    loading: true,
    cards:[]
}

const cardsReducer = (state=initialState, action) => {
    switch (action.type) {
        case LOAD_CARDS:
            const data = JSON.parse(localStorage.getItem('data')) ? JSON.parse(localStorage.getItem('data')) : []
            return {
                ...state,
                cards: [...data],
                loading:false
            }
        case ADD_CARD:
            return {
                ...state,
                loading:false,
                cards: [...action.payload],
            }
        default:
            return state
    }
}
export default cardsReducer