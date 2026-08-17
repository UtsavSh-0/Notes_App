const express=require('express');
const {handleUserSignup,handleUserLogin}=require("../controllers/user");
const Router=express.Router();
Router.post('/',handleUserSignup);
Router.post('/login',handleUserSignup);
module.exports=Router;