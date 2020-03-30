export const initialOptionsReducer = {
    difficulty: 24,
    theme: 'simpson',
    time: 120
}

export const optionsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DIFFICULTY':
            return {
                ...state,
                difficulty: action.payload
            }
        case 'SET_THEME':
            return {
                ...state,
                theme: action.payload
            }
        case 'SET_TIME':
            return {
                ...state,
                time: action.payload
            }
        default:
            return state
    }
}