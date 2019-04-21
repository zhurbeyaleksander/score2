const initialState = {
    isRequestAnalis: false,
    loansList: [],
}

export function analisisReducer(state = initialState, action){
    switch(action.type){
    case 'SEND_REQUEST_ANALIS':
    return{...state, isRequestAnalis: action.payload, loansList: action.payload2}
        default:
        return state
    }
}