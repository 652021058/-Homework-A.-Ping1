'use strict';
const express=require('express'); //call library express
const udRoute=express.Router();
const connection=require('../db');

udRoute.put('/users/:uid',function(req,res,next){
    connection.execute("UPDATE Users_table SET name=?,lastname=?,tel=?,email=?, updated_on=? WHERE id=?;",
        [req.body.name, req.body.lastname, req.body.tel, req.body.email, Date.now(),req.params.uid]).then(()=>{
            console.log('ok');
        }).catch((err)=>{
            console.log(err);
        });
        res.status(200).send("Update Successfully.");

});

udRoute.delete('/users/:uid',function(req,res,next){
    connection.execute("DELETE FROM Users_table WHERE id=?;",
        [req.params.uid]).then(()=>{
            console.log('ok');
        }).catch((err)=>{
            console.log(err);
        });
        res.end();

});
udRoute.use('/',function(req,res,next){
    res.sendStatus(404);

})


module.exports = udRoute;