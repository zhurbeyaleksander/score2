export function sendAnalisRequest(isRequestAnalis, loansList){
    return{
        type: 'SEND_REQUEST_ANALIS',
        payload: isRequestAnalis,
        payload2: loansList, 
    }
}