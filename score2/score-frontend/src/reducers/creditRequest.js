const initialState = {
    isRequest: false,
    age: 0,
    salary: 0,
    pe: 0,
    creditDecision: 0,
    defaultPeriods: [],
}

export function creditRequestReducer(state = initialState, action){
    switch(action.type){
       case 'SEND_REQUEST':
       return{...state, isRequest: action.payload, creditDecision: action.payload2, defaultPeriods: action.payload3,
    }
        case 'CHANGE_PARAMS':
        return{ ...state, age: action.payload, salary: action.payload2,
        pe: action.payload3
        }
        case 'CHANGE_DECISION':
        return{ ...state, creditDecision: action.payload}
        default: 
       return state
    }
}