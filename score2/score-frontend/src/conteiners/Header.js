import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export class Header extends Component {

    render(){
        return(
            <div>
               <Link to='/'>Главная</Link>  <Link to='/credit/'>Подать заявку</Link> 
            </div>
        )
    }
}

export default Header