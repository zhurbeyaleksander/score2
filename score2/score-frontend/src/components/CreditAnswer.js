import React, { Component } from 'react'
import axios from 'axios'

export class CreditAnswer extends Component{

    componentDidMount(){
        
        var url = 'http://localhost:3210/net';
        axios.post(url, {
          age: 22,
          salary: 20000,
          pe: 36
        })
        .then(function (response) {
          console.log(response.data.output.result);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    componentDidUpdate(){
        console.log('2')
    }

    render(){
     const {isRequest} = this.props.credReq
     console.log(isRequest)

     if(isRequest){
        return(
            <div>
                Запрос был отправлен
            </div>
        )
     } else{
       return(
         <div>
           Запрос не был отправлен
         </div>
       )
     }
    }
}


export default CreditAnswer