
import { createUser, findUserByEmail } from "../user/userModel";

const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const sign = promisify(jwt.sign).bind(jwt);
const verify = promisify(jwt.verify).bind(jwt);
const bcrypt = require('bcrypt');
const randToken = require('rand-token');
const cookie = require('cookies');

const saltRounds = 10;
export const createAccount = async (req, res) => {

    const { name, email, password } = req.body;

    const user = await findUserByEmail(email, null)
    if (user) {
        res.status(409).send('Tên tài khoản đã tồn tại.');
        return;
    }
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    const newUser = {
        name,
        email,
        password: hashedPassword,
        isActive: false
    }
    console.log(newUser);
    createUser(newUser, {
        success: (user) => {
            console.log(user);
            res.status(200).json({ success: true, data: user })
        },
        error: (e) => {
            console.log(e);
            res
                .status(500)
                .json({ success: false, message: "Create account fail!" });
        }
    })
};

export const generateToken = async (payload, secretSignature, tokenLife) => {
    try {
        return await sign(
            {
                payload,
            },
            secretSignature,
            {
                algorithm: 'HS256',
                expiresIn: tokenLife * 60,
            },
        );
    } catch (error) {
        console.log(`Error in generate access token:  + ${error}`);
        return null;
    }
};
export const decodeToken = async (token, secretKey) => {
    try {
        return await verify(token, secretKey, {
            ignoreExpiration: false,
        });
    } catch (error) {
        console.log(`Error in decode access token: ${error}`);
        return null;
    }
};
export const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    console.log(user);
    if (!user) {
        return res.status(401).send('Email không tồn tại.');
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
        return res.status(403).send('Mật khẩu không chính xác.');
    }

    const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

    const dataForAccessToken = {
        email: user.email,
        id: user._id
    };
    const accessToken = await generateToken(
        dataForAccessToken,
        accessTokenSecret,
        accessTokenLife,
    );
    if (!accessToken) {
        return res
            .status(402)
            .send('Đăng nhập không thành công, vui lòng thử lại.');
    }

    // let refreshToken = randToken.generate(jwtVariable.refreshTokenSize);
    // if (!user.refreshToken) {

    //     await userModel.updateRefreshToken(user.username, refreshToken);
    // } else {

    //     refreshToken = user.refreshToken;
    // }
    return res.status(200).send({
        msg: 'Đăng nhập thành công.',
        data: {
            user: {
                id: user._id,
                email: user.email,
                name: user.name
            },
            accessToken
        }
    });
}
export const logout = async (req, res) => {

}