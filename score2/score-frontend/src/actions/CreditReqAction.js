export function sendCreditReq(isRequest, creditDecision, defaultPeriods) {
    return{
        type: 'SEND_REQUEST',
        payload: isRequest,
        payload2: creditDecision,
        payload3: defaultPeriods,
    }
}

export function changeCreditReqParams(age, salary, pe){
    return{
        type: 'CHANGE_PARAMS',
        payload: age,
        payload2: salary,
        payload3: pe,
    }
}

export function changeCreditDecision(decision){
    return{
        type: 'CHANGE_DECISION',
        payload: decision,
    }
}