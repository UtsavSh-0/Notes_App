const express=require("express");

const {
    handleUserSignup,
    handleUserLogin,
    handleUserLogout
}=require("../controllers/user");
const Router=express.Router();
Router.post("/signup",handleUserSignup);
Router.post("/login",handleUserLogin);
Router.get("/logout",handleUserLogout);
module.exports=Router;