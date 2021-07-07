var connection = require('../../database/db_connection');
const sendmail = require('../service/customer_mail')
const responce = require('../common_functions/responses')
const status_code = require('../constants/constants')
const execute_query = require('./db_query').execute_query
const bcryptjs = require('bcryptjs')
const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'

module.exports.login = function (req, res,error) {

  var sql_query = 'SELECT * FROM customer WHERE customer_email = ?'
  var values = [req.body.customer_email]
  var results = execute_query(sql_query, values)

  // var customer_email = req.body.customer_email;
  //var customer_password = req.body.customer_password;
  
  // connection.query('SELECT * FROM customer WHERE customer_email = ?', [customer_email], function (error, results, fields) {
    if  (results.error) {
      return responce.sendResponse(res,'There are some error with query',status_code.STATUS_CODES.UNAUTHORIZED)
    } 
    else {
      if (results.length > 0) {
        if (customer_password == results[0].customer_password) {
          return responce.sendResponse(res,'successfully login',status_code.STATUS_CODES.SUCCESS)
        } 
        else {
          return responce.sendResponse(res,"Email or password does not match",status_code.STATUS_CODES.BAD_REQUEST)
        }
      }
      else 
      {
        return responce.sendResponse(res,"Email does not exits",status_code.STATUS_CODES.NOT_FOUND)
      }
    }
  //});
}
module.exports.register = function (req, res) {
  var today = new Date();
  var sql_query = 'INSERT INTO customer values(?,?,?,?,?,?)'
  var values = [req.body.customer_name,req.body.customer_email,req.body.customer_password,req.body.customer_phone, today, today]
  var results = execute_query(sql_query, values)
  // var customer = {
  //   "customer_name": req.body.customer_name,
  //   "customer_email": req.body.customer_email,
  //   "customer_password": req.body.customer_password,
  //   "customer_phone": req.body.customer_phone,
  //   "created_at": today,
  //   "updated_at": today
  // }
  // connection.query('INSERT INTO customer SET ?', customer, function (error, results, fields) {
    if (results.error) {
      return responce.sendResponse(res,'There are some error with query',status_code.STATUS_CODES.UNAUTHORIZED)
    } 
    else {
      console.log("Email send on your Mail :)")
      sendmail.ab2()
      return responce.sendResponse(res,'User registered sucessfully',status_code.STATUS_CODES.SUCCESS) 
    }
 // });
}

module.exports.logout = function (req, res) {
  return responce.sendResponse(res,'successfully logout',status_code.STATUS_CODES.SUCCESS) 
  // res.json({
  //   status: true,
  //   message: 'successfully logout'
  // })
}