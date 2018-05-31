var JwtStrategy = require('passport-jwt').Strategy;
var ExtraactJwt = require('passport-jwt').ExtractJwt;
var User = require('../models/User');
var config = require('../config/Config');

module.exports = function(passport) {
    let opts = {};
    opts.jwtFromRequest = ExtraactJwt.fromAuthHeader();
    opts.sercretOrKey = config.SECRET;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        
        User.getUserById(jwt_payload._id, (err, user) => {
            if(err){
                return done(err, false);
            }

            if(user){
                return done(null, user);
            } else {
                return done(null, flase)
            }
        });
    }));
}