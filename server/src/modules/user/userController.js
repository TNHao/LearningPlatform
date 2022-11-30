import res from "express/lib/response";
import { findUserById } from "./userModel";

const { decodeToken } = require("../auth/authController");
const { updateUserInfo } = require("./userModel");

export const getUserInfo = async (req, res) => {
    const user = await findUserById(req.id);
    if (!user) {
        return res.status(401).send({ msg: "User không tồn tại" });
    }
    const { email, name, avatarURL, isActive } = user
    return res.status(200).send({ msg: "get user info success", user: { email, name, avatarURL, isActive } });
}
export const activeAccount = async (req, res) => {
    try {
        const { id } = req;
        const userInfo = await findUserById(id);
        if (userInfo.isActive === false) {
            await updateUserInfo({ _id: id, isActive: true }, {
                success: (user) => {
                    console.log(user);
                    res.status(200).send({ msg: "active account thanh cong" });
                },
                error: (err) => {
                    console.log(err);
                    res.status(400).send({ msg: "active account that bai" });
                }
            })
        }
        else {
            res.status(300).send({ msg: "account da duoc active" });
        }
    }
    catch (e) {
        res.status(400).send("invalid data");
    }
}

