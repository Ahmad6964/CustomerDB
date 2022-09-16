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

mysqlConnection.connect((err)=>{
    if(!err)
    console.log('DB connection succeeded.');
    else
    console.log('DB connection is failed \n Error : ' + JSON.stringify(err, undefined, 2));
});



// Get All Customers

app.get('/customers',(req, res)=>{
    mysqlConnection.query('SELECT * FROM customerdb',(err, rows, fields)=>{
        if(!err)
        {res.send(rows);
            console.log('succeed')}    
            else
            console.log(err);
        })
    })



// Get A Customer

app.get('/customers/:id',(req, res)=>{
    mysqlConnection.query('SELECT * FROM customerdb WHERE id = ?',[req.params.id],(err, rows, fields)=>{
        if(!err)
        {res.send(rows);
            console.log('Succeed')}    
            else
            console.log(err);
        });
    });



// Delete A Customer

app.delete('/customers/:id',(req, res)=>{
    mysqlConnection.query('DELETE FROM customerdb WHERE id = ?',[req.params.id],(err, rows, fields)=>{
        if(!err)
        {res.send('Deleted successfully.');
            console.log('Succeed')}    
            else
            console.log(err);
        });
    });



// Insert A Customer

app.post('/customers',(req, res)=>{
    const data= {Name:'Ali', Email: 'ali@gmail.com', Address:'Abs'}
    mysqlConnection.query('INSERT INTO customerdb SET?',data,(err, rows, fields)=>{
        if(!err)
        {
            console.log('succeed')    
            res.send(rows);
        }
            else
            console.log(err);
        });
    });



// Update A Customer

app.put('/customers/:id',(req, res)=>{
    const data= [req.body.name,req.body.email,req.body.address,req.params.id]
    mysqlConnection.query('UPDATE customerdb SET name =?,email =?,address =? where id = ?',data,(err, rows, fields)=>{
        if(!err)
        {
            console.log('oay')    
            res.send(rows);
        }
            else
            console.log(err);
        });
    });
    
    app.listen(3000,console.log('Express server is running at port no: 3000'));


