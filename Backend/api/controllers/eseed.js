var database = require('../config/db-connection');
var config = require('../config/config');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var randomstring = require("randomstring");
const mailer = require("../config/nodemailer");

// Authentication log in
module.exports.login = function (req, res, next) {
    var name = req.body.name;
    var password = req.body.password;
    if (!name) {
      return res.status(422).json({
        err: null,
        msg: 'Username is required.',
        data: null
      });
    }
    if (!password) {
      return res.status(422).json({
        err: null,
        msg: 'Password is required.',
        data: null
      });
    }
    var query = 'SELECT * FROM user WHERE name = ?';
    database.query(query, [name], function (err, results, fields) {
      if (err) return next(err);
  
      if (results.length > 0) {
        var user = {
          name: results[0].name,
          email: results[0].email,
          
        }
        console.log(results[0].active);
        bcrypt.compare(password, results[0].password, function (err, isMatch) {
          if (isMatch) {
            if (results[0].active) {
              var token = jwt.sign(user, config.secret, {
                expiresIn: '10h'
              });
  
              console.log("testing");
              res.status(200).json({
                err: null,
                msg: "Logged in successfully",
                token: 'JWT' + token,
                data: token,
                success: true,
                name: token.name
              });
            } else {
              res.status(200).json({
                err: null,
                msg: "please Verify the account",
                success: false
              });
            }
          } else {
            res.status(200).json({
              err: null,
              msg: "Wrong Password",
              success: false
            });
          }
        });
      } else {
        res.status(200).json({
          err: null,
          msg: "Wrong User Name",
          success: false
        });
      }
    });
  }


 module.exports.getEmployees = function(req,res,next){
 database.query('SELECT * from employee', 
function(error,results,fields){
    if(error) return next(error);
    if(results.length ==0){
        return res.send("No Employees found!");
    }
    else{
        return res.send(results);
    }
});
}

module.exports.EditEmployee=function(req,res,next){

    var
        name = req.body['name'],
        mobile = req.body['mobile'],
        hire = req.body['hire'],
        email = req.body['email'];

        database.query('Select * FROM employee where employee.name = ?', [req.params.name],function(err,results){
           
             var sqlQuery = 'UPDATE employee SET name= ?,mobile = ?,hire = ?,email = ?   WHERE  employee.name = ?';
             database.query(sqlQuery,[name,mobile,hire,email,req.params.name],
             function(error,results){
                 if(error){
                     return next(error);
                 }
                 return res.status(200).json({
                     err: null,
                     msg: 'Employee info updated',
                     data:results
                 });
             });
    }); 
}

module.exports.DeleteEmployee = function(req, res, next){

    database.query('DELETE FROM employee WHERE AND employee.name = ?', [req.params.name], function (error, results, fields) {
      if(error) return next(error);
      res.status(200).json({
        err : null,   
        msg : "Employee Deleted",
        data : results
      });
    });
  }
  module.exports.attendance= function(req,res,next){
      var 
      day = req.body['day'],
      workhr = req.body['workhr'],
      status = req.body['status'];
      database.query('Insert into attendance (day,workhr,status,employee) values (?,?,?,?)',[day,workhr,status,req.params.employee],function(error,results){
          if(error){
              return next(error);
          }
           res.status(200).json({
              err: null,
              msg: 'attendance updated',
              data:result
          });
      });
  } 


  module.exports.addEmployee = function(req,res,next){
    
    var 
    name = req.body['name'],
    mobile = req.body['mobile'],
    hire = req.body['hire'],
    email = req.body['email'];
   var sqlQuery = 'INSERT INTO employee (name,mobile,hire,email)  VALUES (?,?,?,?)';

        database.query(sqlQuery,[name,mobile,hire,email],
        function (error, results) {
            if (error) {
                return next(error);
            }
            return res.status(200).json({
                err: null,
                msg: 'The Employee is inserted in the DataBase!.',
                data: results
            });
        });
}

