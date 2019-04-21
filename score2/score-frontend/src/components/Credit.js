import React,{Component} from 'react'
import axios from 'axios'

export class Credit extends Component{
    constructor(props) {
        super(props);
        this.state = {
          age: 0,
          salary: 0,
          pe: 0,
          creditDecision: 0,
        };
    
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReject = this.handleReject.bind(this);
        this.handleApprove = this.handleApprove.bind(this);
      }

      
    
      handleInputChange(event) {
        event.preventDefault();
        console.log(+event.target.name)
        
        switch(event.target.name){
          case 'age': this.props.chengeCreditParams(+event.target.value, 
            this.props.credReq.salary, this.props.credReq.pe)
            break
          case 'salary': this.props.chengeCreditParams(this.props.credReq.age, 
            +event.target.value, this.props.credReq.pe)
           break
           case 'pe': this.props.chengeCreditParams(this.props.credReq.age, 
            this.props.credReq.salary, +event.target.value)
           break
           default: console.log('Ничего не поменялось.')
        }
      }
    
      handleSubmit(event) {
        event.preventDefault();

        var url = 'http://localhost:3210/net';
   
        axios.post(url, {
          age: this.props.credReq.age,
          salary: this.props.credReq.salary,
          pe: this.props.credReq.pe,
        })
        .then(function (response) {
          console.log('---')
          console.log(response.data.output);
        })
        .catch(function (error) {
          console.log(error);
        });

        axios.get('http://localhost:3210/net')
        .then((response) => {
          console.log('+++')
          console.log(response);
          this.props.sendCreditReq(true, response.data.creditDecision, response.data.defaultPeriods)
        })

      }

      handleReject()
      {
        this.props.sendCreditReq(false, 0, [])
        this.props.chengeCreditParams(0,0,0)
      }

      handleApprove(event){
         
        event.preventDefault();

        var url = 'http://localhost:3210/add_to_loans_list';
        var urlAddFlag = 'http://localhost:3210/add_to_risk_flag_list'
   
        axios.post(url, {
          age: this.props.credReq.age,
          salary: this.props.credReq.salary,
          pe: this.props.credReq.pe,
          net_decision: this.props.credReq.creditDecision,
          decision: 1,
          defaultPeriods: this.props.credReq.defaultPeriods,
        })
        .then(function (response) {
          console.log(response);
        
        })
        .catch(function (error) {
          console.log(error);
        });

        axios.post(urlAddFlag, {
          defaultPeriods: this.props.credReq.defaultPeriods,
        })
        .then(function (response) {
          console.log(response);
        
        })
        .catch(function (error) {
          console.log(error);
        });
        
      }


      renderAnswerBlock = (isRequest) => {
        if(isRequest){
          return <div>Вероятность успешного погашения кредита |
             {this.props.credReq.creditDecision} <br/>
             <button onClick={this.handleApprove}>Одобрить</button> | <button onClick={this.handleReject}>Отклонить</button>
              </div>
        } else{
          return <div>Запрос не отправлен</div>
        }
      }
    
      render() {
        const {isRequest} = this.props.credReq
      
        return (
          <div className='block creditForm'>
         <form onSubmit={this.handleSubmit}>
         <label>
             Имя
              <input
                name="name"
                 />
            </label>
            <label>
             Фамилия
              <input
                name="LastName"
                 />
            </label>
            <label>
             Отчество
              <input
                name="middleName"
                 />
            </label>
            <label>
             Возраст
              <input
                name="age"
                type="number"
                value={this.props.credReq.age}
                onChange={this.handleInputChange} />
            </label>
            <label>
              Зарплата
              <input
                name="salary"
                type="number"
                value={this.props.credReq.salary}
                onChange={this.handleInputChange} />
            </label>
            <label>
        Опыт работы
              <input
                name="pe"
                type="number"
                value={this.props.credReq.pe}
                onChange={this.handleInputChange} />
            </label>
            <label>
             Место работы
              <input
                name="job"
                 />
            </label>
            <label>
             Семейное положение
              <input
                name="familyStatus"
                 />
            </label>
            <label>
             Количество иждевенцев
              <input
                name="witherson"
                 />
            </label>
           
            <input type="submit" onSubmit={this.handleSubmit} value="Отправить" />
          
          </form>
    
      
        {this.renderAnswerBlock(isRequest)}
          </div>
        );
      }
}



  

export default Credit