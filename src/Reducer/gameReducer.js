export const initialGameState = {
    game: 'testGame'
}

export const gameReducer = (state, action) => {
    switch (action.type) {
        case 'ONE':
            return state
        default:
            return state
    }
}