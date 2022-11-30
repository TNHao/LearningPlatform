// import * as userModel from "../user/userModel"
import { decodeToken } from "./authController";

// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;

// const GOOGLE_CALLBACK_URL = "http://localhost:5000/auth/google/callback";

// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: GOOGLE_CALLBACK_URL,
//     scope: ['profile']

// }, async (accessToken, refreshToken, profile, done) => {
//     const initUser = {
//         email: profile.emails[0].value,
//         name: profile.displayName,
//         avatarURL: profile.photos[0].value,
//         googleId: profile.id,

//     }
//     const account = await userModel.findUserByEmail(initUser.email);
//     // update token
//     if (!account) {
//         userModel.createUser({ ...initUser, isActive: true }, {
//             success: (data) => {
//                 console.log("create google account:", data);
//                 return done(null, initUser.email);
//             },
//             error: (e) => {
//                 console.log(e);
//                 return done(e, null);
//             }
//         })
//     }
//     done(null, account);
// }
// ))
// passport.serializeUser((user, done) => {
//     console.log("serializeUser :", user);
//     done(null, user);
// });

// passport.deserializeUser((user, done) => {
//     console.log("deserializeUser :", user);
//     done(null, user);
// });
export const isUserAuthenticated = async (req, res, next) => {

    if (req.headers.authorization) {
        const jwt = req.headers.authorization;
        try {
            const userInfo = await decodeToken(jwt, process.env.ACCESS_TOKEN_SECRET)
            const { id, email } = userInfo.payload;
            req.id = id;
            req.email = email;
            next();
        }
        catch (error) {
            res.status(401).send("Verify failed");
        }
    } else {
        res.status(401).send("You must login first!");
    }
};