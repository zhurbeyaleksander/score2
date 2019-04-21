import React,{Component} from 'react'
import axios from 'axios'

export class Analisis extends Component{
    constructor(props) {
        super(props);
      

        this.handleApprove = this.handleApprove.bind(this);
      }


      handleApprove(event){
         
        event.preventDefault();

        axios.get('http://localhost:3210/getDefPeriods')
        .then((response) => {
          console.log(response.data);
          this.props.sendAnalisRequest(true, response.data);
        })
      }

      renderLoansAnalis = (isAnalis) => {
        const loanList = this.props.analis.loansList;
        console.log('loan list')

        const ln = loanList[0]

        const listItems = loanList.map((item, i) =>
        
        <tr>
          <th scope='col'>{i + 1}</th>
          <th scope='col'>{ Math.round(item[0] * 100)/100}</th>
          <th scope='col'>{ Math.round(item[1] * 100)/100}</th>
          <th scope='col'>{ Math.round(item[2] * 100)/100}</th>
          <th scope='col'>{ Math.round(item[3] * 100)/100}</th>
          <th scope='col'>{ Math.round(item[4] * 100)/100}</th>
          <th scope='col'>{ Math.round(item[5] * 100)/100}</th>
          <th scope='col'>{ Math.round(item[6] * 100)/100}</th>
          <th scope='col'>{ Math.round(item[7] * 100)/100}</th>
          <th scope='col'>{ Math.round(item[8] * 100)/100}</th>
          <th scope='col'>{ Math.round(item[9] * 100)/100}</th>
          <th scope='col'>{ Math.round(item[10] * 100)/100}</th>
          <th scope='col'>{ Math.round(item[11] * 100)/100}</th>
        </tr>
        
      );
       
        if(isAnalis){
            return(
      <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">Id ссуды/период</th>
          <th scope="col">1</th>
          <th scope="col">2</th>
          <th scope="col">3</th>
          <th scope="col">4</th>
          <th scope="col">5</th>
          <th scope="col">6</th>
          <th scope="col">7</th>
          <th scope="col">8</th>
          <th scope="col">9</th>
          <th scope="col">10</th>
          <th scope="col">11</th>
          <th scope="col">12</th>
        </tr>
      </thead>
      <tbody>
           
             {listItems}
          
       
      
      </tbody>
    </table>
            )
        } else{
            return(
                <form onSubmit={this.handleApprove}>
                <div class="form-group">
        <label for="exampleFormControlSelect1">Выберите портфель для анализа</label>
        <select class="form-control" id="exampleFormControlSelect1">
          <option>Кредитный портфель 1</option>
        </select>
      </div>
    
                <input type="submit" onSubmit={this.handleApprove} 
                value="Отправить" />
              
                </form>
    
              
             )
        } 
       }
    
      render() {
      
      
        return (
          <div className='block'>
         
         {this.renderLoansAnalis(this.props.analis.isRequestAnalis)}

          </div>
        );
      }
}



  

export default Analisis