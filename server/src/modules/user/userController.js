import res from "express/lib/response";
import { findUserById } from "./userModel";

const { decodeToken } = require("../auth/authController");
const { updateUserInfo } = require("./userModel");

export const activeAccount = async () => {
    // if (!token) {
    //     res.redirect("/login").status(401).send("Không tồn tại AccessToken");
    // }
    // try {
    //     const { id } = decodeToken(token, process.env.ACCESS_TOKEN_SECRET).payload;
    //     const userInfo = await findUserById(id);
    //     if (userInfo.isActive === false) {
    //         await updateUserInfo({ _id: id, isActive: true }, {
    //             success: (user) => {
    //                 console.log(user);
    //                 res.status(200).send({ msg: "active account thanh cong" });
    //             },
    //             error: (err) => {
    //                 console.log(err);
    //                 res.status(400).send({ msg: "active account that bai" });
    //             }
    //         })
    //     }
    //     else {
    //         res.status(300).send({ msg: "account da duoc active" });
    //     }
    // }
    // catch (e) {
    //     res.status(400).send("invalid data");
    // }
}

