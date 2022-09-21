const mysql = require('mysql');
const express = require('express');

var app = express();
const bodyparser = require('body-parser')

app.use(bodyparser.json());



var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'customer',
});
const a = (err) =>{
    if(!err)
    console.log('DB connection succeeded.');
    else
    console.log('DB connection is failed \n Error : ' + JSON.stringify(err, undefined, 2));
}
mysqlConnection.connect(a);



// Get All Customers

function myfun(req, res){
    mysqlConnection.query('SELECT * FROM customerdb',(err, rows, fields)=>{
        if(!err)
        {res.send(rows);
            console.log('succeed')}    
            else
            console.log(err);
        })
    }

app.get('/customers',myfun);



// Get A Customer

function A (req, res){
    mysqlConnection.query('SELECT * FROM customerdb WHERE id = ?',[req.params.id],(err, rows, fields)=>{
        if(!err)
        {res.send(rows);
            console.log('Succeed')}    
            else
            console.log(err);
        });
    }

app.get('/customers/:id',A);



// Delete A Customer

function B(req, res){
    mysqlConnection.query('DELETE FROM customerdb WHERE id = ?',[req.params.id],(err, rows, fields)=>{
        if(!err)
        {res.send('Deleted successfully.');
            console.log('Succeed')}    
            else
            console.log(err);
        });
    }

app.delete('/customers/:id',B);



// Insert A Customer

function C (req, res){
    console.log(req.body)
    // const data= {Name:req.body.Name,Email: req.body.Email, Address:req.body.Address}
    const data= {Name:"ahmad",Email:"ahamd@sas.com", Address:"ahsasa"}
    mysqlConnection.query('INSERT INTO customerdb SET?',data,(err, rows, fields)=>{
        if(!err)
        {
            console.log('succeed')    
            res.send(rows);
        }
            else
            console.log(err,"errerrrrrrrrrr");
        });
    }


app.post('/customers',C);



// Update A Customer

function D (req, res){
    const data={Name:req.body.Name,Email: req.body.Email, Address:req.body.Address,id:req.params.id}
    mysqlConnection.query('UPDATE customerdb SET name =?,email =?,address =? where id = ?',data,(err, rows, fields)=>{
        if(!err)
        {
            console.log('oay',rows)    
            res.send(rows);
        }
            else
            console.log(err);
        });
    }

app.put('/customers/:id',D);
    
    app.listen(3000,console.log('Express server is running at port no: 3000'));


