export const initialOptionsReducer = {
    options: 'testOptions'
}

export const optionsReducer = (state, action) => {
    switch (action.type) {
        case 'ONE':
            return state
        default:
            return state
    }
}