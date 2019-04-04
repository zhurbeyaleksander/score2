import React,{Component} from 'react'
import axios from 'axios'

export class Credit extends Component{
    constructor(props) {
        super(props);
        this.state = {
          age: 0,
          salary: 0,
          pe: 0,
        };
    
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: +value
        });
      }
    
      handleSubmit(event) {
        event.preventDefault();
        
        var url = 'http://localhost:3210/net';
        axios.post(url, {
          age: this.state.age,
          salary: this.state.salary,
          pe: this.state.pe,
        })
        .then(function (response) {
          console.log(response.data.output.result);
        })
        .catch(function (error) {
          console.log(error);
        });
    
        
     
      }
    
    
    
      render() {
        return (
          
          <div>
    
       
         <form onSubmit={this.handleSubmit}>
            <label>
             Возраст
              <input
                name="age"
                type="number"
                value={this.state.age}
                onChange={this.handleInputChange} />
            </label>
            <label>
              Зарплата
              <input
                name="salary"
                type="number"
                value={this.state.salary}
                onChange={this.handleInputChange} />
            </label>
            <label>
        Опыт
              <input
                name="pe"
                type="number"
                value={this.state.pe}
                onChange={this.handleInputChange} />
            </label>
            <input type="submit" value="Отправить" />
          </form>
    
        
          </div>
        );
      }
}

export default Credit