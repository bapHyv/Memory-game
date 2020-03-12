export const initialOptionsReducer = {
    difficulty: null,
    theme: null,
    time: null
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