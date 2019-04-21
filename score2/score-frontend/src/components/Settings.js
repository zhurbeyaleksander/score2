import React, {Component} from 'react'
import axios from 'axios'

export class Settings extends Component{
  constructor(props){
    super(props);
    this.state = {
      acceptDefault: 0,
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handelSubmit = this.handelSubmit.bind(this);
  }

  componentDidMount(){
    axios.get('http://localhost:3210/getSettings')
    .then((response) => {
      console.log('Получили настройки')
      console.log(response.data[0].acceptDefault);

      this.setState({ acceptDefault: response.data[0].acceptDefault })
    })
  }

  handleInputChange(event) {
    event.preventDefault();
    console.log(event.target.value)

    this.setState({ acceptDefault: +event.target.value})
  }

  handelSubmit(event){
    event.preventDefault();
    var url = 'http://localhost:3210/changeSettings';

    axios.post(url, {
      acceptDefault: this.state.acceptDefault,
    })
    .then(function (response) {
      console.log(response);
    
    })
    .catch(function (error) {
      console.log(error);
    });

  }

    render(){
        return(
            <div className='block'>
            Настройки
            <form onSubmit={this.handelSubmit}>
            <label>
             Допустимый порог вероятности дефолта на периоде (не более чем в %)
              <input
                name="acceptDefault"
                type="number"
                value={this.state.acceptDefault}
                onChange={this.handleInputChange}
                 />
            </label>
            
           
            <input type="submit" onSubmit={this.handelSubmit} value="Сохранить" />
          
          </form>
            </div>
        )
    }
}

export default Settings