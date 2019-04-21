import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {Header} from '../conteiners/Header';
import {Credit} from '../components/Credit'
import {Analisis} from '../components/Analisis'
import {Settings} from '../components/Settings'
import { connect } from 'react-redux'
import {sendCreditReq} from '../actions/CreditReqAction'
import { changeCreditReqParams } from '../actions/CreditReqAction'
import { changeCreditDecision } from '../actions/CreditReqAction'
import { sendAnalisRequest } from '../actions/AnalisAction'
import { chengeSettings } from '../actions/SettingsAction'

class App extends Component {

  
  render() {
    const { credReq, sendCreditReq, chengeCreditParams,
    changeCreditDecision, analis, sendAnalisRequest, 
    settings, chengeSettings } = this.props
    return (
      <Router>
      <div>

        <Header />
     <div className='container contentWrap'>
        <Route path="/" exact component={Index} />
        <Route path="/credit/" 
        component={() => <Credit credReq={credReq} 
        sendCreditReq={sendCreditReq} chengeCreditParams={chengeCreditParams}
        changeCreditDecision={changeCreditDecision} />} />
         <Route path="/analisis/" 
        component={() => <Analisis credReq={credReq} 
        sendCreditReq={sendCreditReq} chengeCreditParams={chengeCreditParams}
        changeCreditDecision={changeCreditDecision} analis={analis} sendAnalisRequest={sendAnalisRequest} />} />
          <Route path="/settings/" 
        component={() => <Settings settings={settings} chengeSettings={chengeSettings} />} />
        </div>
      </div>
      </Router>
    );
  }
}

const mapStateToProps = store => {
  console.log('store')
  console.log(store) 
  return {
      credReq: store.credReq,
      analis: store.analis,
      settings: store.settings,
  }
  }

  const mapDispatchToProps = dispatch =>{
    return{
      sendCreditReq: (isRequest, creditDecision, defaultPeriods) => 
      dispatch(sendCreditReq(isRequest, creditDecision, defaultPeriods)),

      chengeCreditParams: (age, salary, pe) => 
      dispatch(changeCreditReqParams(age, salary, pe)),

      changeCreditDecision: (dicision) =>
      dispatch(changeCreditDecision(dicision)),

      sendAnalisRequest: (isRequestAnalis, loansList) => 
      dispatch(sendAnalisRequest(isRequestAnalis, loansList)),

      chengeSettings: (acceptDefault) =>
      dispatch(chengeSettings(acceptDefault)),
    }
  }
 
  export default connect(
    mapStateToProps,
    mapDispatchToProps
    )(App)
  

function Index(){
  return <div className='block'>Главная</div>
}


