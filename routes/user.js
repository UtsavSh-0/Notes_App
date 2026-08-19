const express=require("express");

const {
    handleUserSignup,
    handleUserLogin
}=require("../controllers/user");
const Router=express.Router();
Router.post("/signup",handleUserSignup);
Router.post("/login",handleUserLogin);
module.exports=Router;