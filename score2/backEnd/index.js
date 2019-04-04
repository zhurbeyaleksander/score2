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
    database: 'dojo',
});

db.connect();

app.listen(3210, ()=> {
    console.log('Server was run. Use port 3210');
});

const net = new brain.NeuralNetwork();

net.train([{input: { age: 22, salary: 20000, pe: 3 }, output: { result: 0 }},
    {input: { age: 27, salary: 40000, pe: 36}, output: { result: 1 }},
    {input: { age: 25, salary: 15000, pe: 5 }, output: { result: 0 }}]);



function check(input){

const output = net.run(input);
console.log(output);

return output;
}



app.get('/net', function(req, res){
    console.log('Это работает!')
});

app.post('/net', function(req, res){
    console.log(req.body.age); 
    
    var output = check(req.body);

    res.send({
		output: output,
	});
});