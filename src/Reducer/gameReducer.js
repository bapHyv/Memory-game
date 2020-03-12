export const initialGameState = {
    numberOfClicks: 0
}

export const gameReducer = (state, action) => {
    switch (action.type) {
        case 'SET_NUMBER_CLICKS':
            return {
                ...state,
                numberOfClicks: state.numberOfClicks + 1
            }
        case 'RESET_NUMBER_CLICKS':
            return {
                ...state,
                numberOfClicks: 0
            }
        default:
            return state
    }
}