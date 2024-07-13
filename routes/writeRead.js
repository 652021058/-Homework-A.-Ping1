'use strict';
const express=require('express'); //call library express
const crypto=require('crypto'); //call library crypto
const wrRoute=express.Router();
const connection=require('../db');


wrRoute.post('/users', function(req, res, next) {
    let mypass = crypto.createHash('md5').update(req.body.password).digest("hex");
    connection.execute(`INSERT INTO Users_table 
        (name, lastname, tel, email, username, password, created_on, updated_on) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
        [req.body.name, req.body.lastname, req.body.tel, req.body.email, req.body.username, mypass, Date.now(), Date.now()]).then(() => {
            console.log('ok');
            res.status(201).send("Insert Successfully");
        }).catch((err) => {
            console.log(err);
            res.end();
        });
});


wrRoute.get('/users',function(req,res,next){
  connection.execute('SELECT * FROM Users_table;')
    .then((result)=>{
        var rawData = result[0];
        // res.send(JSON.stringify(rawData));
        res.send(rawData);
    }).catch((err)=>{
        console.log(err);
        res.end();
    })

});

wrRoute.post('/check',function(req,res,next){
   let mypass = crypto.createHash('md5').update(req.body.password).digest("hex");
    connection.execute('SELECT * FROM Users_table WHERE username=? AND password=?;',
        [req.body.username,mypass]).then((result)=>{
            var data =result[0];
            if(data.length ===0){
                res.sendStatus(400);
            }else{
                res.sendStatus(200);
            }

        }).catch((err)=>{
            console.log(err);
            res.sendStatus(404);
        })

});


wrRoute.use('/',function(req,res,next){
    res.sendStatus(404);
})

module.exports = wrRoute;