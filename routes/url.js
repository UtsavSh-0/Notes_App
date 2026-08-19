const express=require("express");
const router=express.Router();

const{
createNote,
getNotes,
}=require("../controllers/notes");

const {
    restrictToLoggedinUserOnly,
}=require("../middlewares/auth");


router.post("/",
    restrictToLoggedinUserOnly,
    createNote
);

router.get(
  "/",restrictToLoggedinUserOnly,
  getNotes  
);

module.exports=router;