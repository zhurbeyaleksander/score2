import {combineReducers } from 'redux'
import { creditRequestReducer } from './creditRequest'
import { analisisReducer } from './analisis'
import { settingsReducer } from './settings'

    export const rootReducer = combineReducers({
         credReq: creditRequestReducer,
         analis: analisisReducer,
         settings: settingsReducer,
    }) 
    
    