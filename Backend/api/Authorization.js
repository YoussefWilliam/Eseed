var jwt = require('jsonwebtoken');
var config = require('./config/config');
var database = require('./config/db-connection');
//Header Format
// authorization: Token <access_token>
//user authorization
module.exports.Verify_User = function (req, res, next) {

    console.log(req.headers['authorization']);
    var tokenHeader = req.headers['authorization'];
    if (typeof tokenHeader !== 'undefined') {
        var tokenheadersplited = tokenHeader.split(' ');
        var token = tokenheadersplited[1];
        var decoded = jwt.verify(token, config.secret, (err, authData) => {
            if (err) {
                return res.status(401).json({
                    err: null,
                    msg: 'there is no token like that',
                    data: null
                });
            } else {
                console.log(authData.username);
                var query = 'SELECT * FROM users WHERE username = ?';
                database.query(query, [authData.username], function (err, results, fields) {
                    if (err) return next(err);
                    if (results.length == 1) {
                        next();
                    } else {
                        return res.status(401).json({
                            err: null,
                            msg: 'You Are Not a user',
                            data: null
                        });
                    }
                });
            }

        });
    } else {
        return res.status(401).json({
            err: null,
            msg: 'The Request dont have a header authorization',
            data: null
        });
    }

};


//[App Owner][Cinema Owner][Booking Usher][Branch Manager]
module.exports.Verify = function (data) {
    return function(req, res, next) {
    var allowed = data.split('');
    console.log(req.headers);
    var tokenHeader = req.headers['authorization'];
    if (typeof tokenHeader !== 'undefined') {
        var tokenheadersplited = tokenHeader.split(' ');
        var token = tokenheadersplited[1];
        var decoded = jwt.verify(token, config.secret, (err, authData) => {
            if (err) {
                return res.status(401).json({
                    err: null,
                    msg: 'there is no token like that',
                    data: null
                });
            } else {
                console.log(authData.username);
                var query = 'SELECT * FROM admins WHERE username = ?';
                database.query(query, [authData.username], function (err, results, fields) {
                    var can=false;
                if (results.length == 1) {
                    console.log(results[0].type);
                    if (allowed[0]==("1")&&results[0].type==("App Owner")){//that the allowed may be App Owner
                       can = true;          
                    }
                    else if (allowed[1]==("1")&&results[0].type==("Cinema Owner")){//that the allowed may be Cinema Owner
                        can = true;    
                    }
                    else if (allowed[2]==("1")&&results[0].type==("Booking Usher")){//that the allowed may be Booking Usher
                        can = true;    
                    }
                    else if (allowed[3]==("1")&&results[0].type==("Branch Manager")){//that the allowed may be Branch Manager
                        can = true;    
                    }
                    if (can){
                        console.log("You can Access");
                        next();
                    }
                    else{
                        return res.status(401).json({
                            err: null,
                            msg: "You can't Access that function",
                            data: null
                        }); 
                    }
                }else{
                    return res.status(401).json({
                        err: null,
                        msg: 'You are not an admin',
                        data: null
                    });
                }
                });
            }  });
    }else{
        return res.status(401).json({
            err: null,
            msg: "The header don't have authorization variable",
            data: null
        });
    } }
}
