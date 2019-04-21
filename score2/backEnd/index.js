const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
var brain = require('brain.js');

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Qwerty27',
    database: 'loansList1',
});

db.connect();

app.listen(3210, ()=> {
    console.log('Server was run. Use port 3210');
});

const config = {
    inputSize: 20,
    inputRange: 20,
    hiddenLayers: [20,20],
    outputSize: 20,
    learningRate: 0.01,
    decayRate: 0.999,
};

const net = new brain.NeuralNetwork(config);

net.train([{input: { age: 22, salary: 20000, pe: 3 }, output: { result: 0 }},
    {input: { age: 27, salary: 40000, pe: 36}, output: { result: 1 }},
    {input: { age: 25, salary: 15000, pe: 5 }, output: { result: 0 }}]);

const net2 = new brain.NeuralNetwork(config);

    net2.train([{input: { age: 22, salary: 20000, pe: 3 }, output: [0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0] },
        {input: { age: 22, salary: 20000, pe: 4}, output: [0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0] },
        {input: { age: 23, salary: 23000, pe: 5 }, output: [0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0] }]);

console.log(net2.run({ age: 21, salary: 20000, pe: 4}))

function paymentForcast(borrowerData){
    return net2.run(borrowerData);
}

function firstThreePeriodsDefault(paymentForcast){
    var result = false;
    for(var i = 0; i < 3; i++) {
        if(paymentForcast[i] > 0.7) {
            result = true
        }
    }
    return result
}

function everyPeriodCheckDefault(paymentForcast, loansList){
         var result = false; 
         var defaultPeriods = [];     
        paymentForcast.forEach( (item, i) => {
                 var countFlagPeriods = 0;
                 var acceptDefault = 0;
                 if(item > 0.7) {
                  var sql = 'SELECT COUNT(value) as total FROM riskflaglist1 WHERE periodnumber =' + i;
                  db.query(sql, (err, result)=>{
                      if(err) throw err;
                      console.log(result);
                      console.log('На данном периоде ' + result[0].total)
                      countFlagPeriods = result[0].total;

                      var sqlAcceptDefault = 'SELECT acceptDefault FROM settings WHERE id = 1';
                      db.query(sqlAcceptDefault, (err, res)=>{
                          if(err) throw err;
                          console.log('Допустимый процент дефолта по периодам ' + res[0].acceptDefault);
                          acceptDefault = res[0].acceptDefault
                          console.log('Внутри запросов' + acceptDefault + '  ' + countFlagPeriods)

                          var check = (1 + countFlagPeriods)/ acceptDefault

                          console.log('check ' + check)
        
                          if(check >= acceptDefault/100) {
                            defaultPeriods.push(i)
                            return result = true
                          }

                      })
                  }) 
                  
                
                
                 }
          })
        return { 
            result: result, 
            defaultPeriods: defaultPeriods,             
        }
}

///Эта функция срабабтывает только после того, как мы одобрили кредит 
///и добавили его в таблицу

function addRiskFlag(paymentForcast){
    paymentForcast.forEach( (item, i) => {
        if(item > 0.7) {
              console.log('Рисковый флаг добавлен в портфель на ' +  i  +' период')
        }
 })
}

function makeDecision(borrowerData){
    var result = 0;
    var forcast = paymentForcast(borrowerData);
    console.log('Прогноз дефолта')
    console.log(forcast);

    var firstThreePeriodsDefault_var = firstThreePeriodsDefault(forcast);
    
    console.log('Вероятность дефолта на первых 3-х платежах (true/false) ' + firstThreePeriodsDefault_var );

    var everyPeriodCheckDefault_var = everyPeriodCheckDefault(forcast, [0,0,0,0,0,4,4,0,0,0,0,0]);
    
    console.log('Выдаёт true если на отдельно взятом периоде превышена допустимая норма')
    console.log('Вероятность дефолта за весь период жизни кредита (true/false): ' + everyPeriodCheckDefault_var.result );
    console.log('Дефолты возможны на следующих платежах: ' + everyPeriodCheckDefault_var.defaultPeriods)
    
    if(!firstThreePeriodsDefault_var && !everyPeriodCheckDefault_var.result) result = 1;
     
    console.log('Финальный результат ' + result);
    
    return { 
        result: result, 
        defaultPeriods: everyPeriodCheckDefault_var.defaultPeriods,             
    }
}


function check(input){

const output = net.run(input);
console.log(output);

return output;
}

var des = [];
var defaultPeriods;

app.get('/net', function(req,res){

    console.log('Отработал')
 
        res.send({
            creditDecision: des[0],
            defaultPeriods: defaultPeriods,
        });
   
    });

app.post('/net', function(req, res){
    des = [];
    defaultPeriods = null;
    console.log(req.body.age); 
    
    var output = makeDecision(req.body);

    des.push(output.result);
    defaultPeriods = output.defaultPeriods;

    res.send({
		output: output,
    });

});

app.post('/add_to_loans_list', function(req, res){
     console.log('Запрос отправлен')
     console.log(req.body.defaultPeriods)

    var data = {
        age:req.body.age,
        salary:req.body.salary,
        pe: req.body.pe,
        net_decision: req.body.net_decision,
        decision: req.body.decision,
    };
    var sql = 'INSERT INTO loansList1 SET ?';
    db.query(sql, data, (err, result)=>{
    if(err) throw err;
    console.log(result);
    res.send({
        status: 'Запись добавлена',
	});
});
});

app.post('/add_to_risk_flag_list', function(req, res){
    console.log('Запрос добавления флага дефолта отправлен');
    req.body.defaultPeriods.forEach( item => {
        var data = {
            value: 1, 
            periodNumber: item,
        };
        var sql = 'INSERT INTO riskflaglist1 SET ?';
        db.query(sql, data, (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.send({
            status: 'Запись добавлена',
        });
     });
    })
});

app.get('/getDefPeriods', function(req,res){

    var defPeriods = [];


    var sqlCount = 'SELECT * FROM loansList1';
    db.query(sqlCount, (err, result)=>{
        if(err) throw err;
        
        result.forEach(function(element) {
          var forcast = paymentForcast({age: element.age, salary: element.salary, pe: element.pe});

         defPeriods.push(forcast);
          });
           
          console.log(defPeriods)
       res.send(defPeriods)
    }) 
    });

    app.get('/getSettings', function(req,res){

    
        var sqlSettings = 'SELECT acceptDefault FROM settings ';
        db.query(sqlSettings, (err, result)=>{
            if(err) throw err;
              
           console.log(result)
           res.send(result)
        }) 
        });

        app.post('/changeSettings', function(req, res){
            console.log('Запрос: изменение настроек');
            console.log(req.body.acceptDefault)
                var data = {
                    acceptDefault: req.body.acceptDefault,
                    id: 1,
                };
                db.query('UPDATE settings SET acceptDefault = ? WHERE id = ?', [data.acceptDefault, data.id], (err, result)=>{
                if(err) throw err;
                console.log(result);
                res.send({
                    status: 'Запись добавлена',
                });
             });
           
        });