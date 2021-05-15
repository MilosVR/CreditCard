export const LOAD_CARDS = "LOAD_CARDS"
export const ADD_CARD = "ADD_CARD"
export const EDIT_CARD = "EDIT_CARD"

export const loadCards = (cards) => {
    return {
        type: LOAD_CARDS,
        payload: cards
    }
}

export const addCard = (card) => {
    return {
        type: ADD_CARD,
        payload: card
    }
}


export const editCard = (id) => {
    return {
        type: EDIT_CARD,
        payload: id
    }
}