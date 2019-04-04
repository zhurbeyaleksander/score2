import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {Header} from '../conteiners/Header';
import {Credit} from '../components/Credit'

class App extends Component {

  
  render() {
    return (
      <Router>
      <div>

        <Header />
     
        <Route path="/" exact component={Index} />
        <Route path="/credit/" component={Credit} />
      </div>
      </Router>
    );
  }
}

function Index(){
  return <div>Главная</div>
}

export default App;
