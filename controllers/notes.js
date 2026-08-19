const Note=require("../models/notes");

async function createNote(req,res){
    try{
        const {title,type,content}=req.body;
        const note=await Note.create({
            title:title || "Untitled Note",
            type: type || "text",
            content: content || "",
            user: req.user._id,
        });
        return res.status(201).json(note);
    }catch(error){
        console.log("CREATE NOTE ERROR:",error);
        return res.status(500).json({
            error:"Failed to create Note",
        });
    }
    }

    async function getNotes(req,res){
        try{
            const notes=await Note.find({
                user:req.user._id
            }).sort({
                updatedAt:-1
            });
            return res.json(notes);
        }catch(error){
            console.log("GET NOTES ERROR: ",error);
            return res.status(500).json({
                error:"Failed to Get Notes"
            });
        }
    }
module.exports={
    createNote,
    getNotes,
};