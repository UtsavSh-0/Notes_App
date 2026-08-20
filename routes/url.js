const express=require("express");
const router=express.Router();

const{
createNote,
getNotes,
getNotesById,
updateNote,
deleteNote
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


router.get(
    "/:id",
    restrictToLoggedinUserOnly,
    getNotesById
);

router.patch(
    "/:id",
    restrictToLoggedinUserOnly,
    updateNote
);

router.delete(
    "/:id",
    restrictToLoggedinUserOnly,
    deleteNote
);
module.exports=router;