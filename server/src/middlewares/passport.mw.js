import { findUserByEmail } from "../modules/user/userModel";

const passport = require('passport');
const LocalStrategy = require('passport-local');

const bcrypt = require('bcrypt');


passport.use(new LocalStrategy(
    (username, password, done) => {
        findUserByEmail({ username }, {
            success: (user) => {
                console.log("passed");
                if (!user) { return done(null, false); }
                if (!bcrypt.compareSync(password, user.password)) return done(null, false);
                return done(null, user);
            },
            error: (e) => {
                console.log(e);
                done(e)
            }
        })
    }
));