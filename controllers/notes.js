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
    async function getNotesById(req,res){
        try{
            const note=await Note.findOne({
                _id:req.params.id,
                user:req.user._id
            });
            if(!note){
                return res.status(404).json({
                    error:"Note not found"
                });
            }
            return res.json(note);
        }catch(error){
            console.log("GET NOTE ERROR:",error);
            return res.status(500).json({
                error:"Failed to get note"
            });
        }
    }
    async function updateNote(req,res){
        try{
            const {title,content,font,color}=req.body;
            const note=await Note.findOneAndUpdate(
                {
                    _id:req.params.id,
                    user:req.user._id
                },
                {
                    title,
                    content,
                    font,
                    color
                },
                {
                    new:true,
                    runValidators:true
                }
            );
            if(!note){
                return res.status(404).json({
                    error:"Note not found"
                });
            }
            return res.json(note);
        }catch(error){
            console.log("UPDATE NOTE ERROR:",error);
            return res.status(500).json({
                error:"Failed to update note"
            });
        }
    }

    async function deleteNote(req,res){
        try{
            const note=await Note.findOneAndDelete({
                _id:req.params.id,
                user:req.user._id
            });
            if(!note){
                return res.status(404).json({
                    error:"Note note found"
                });
            }
            return res.json({
                message:"Note deleted successfully"
            });
        }catch(error){
            console.log("Delete note error: ",error);
            return res.status(500).json({
                error:"Failed to delete note"
            });
        }
    }
module.exports={
    createNote,
    getNotes,
    getNotesById,
    updateNote,
    deleteNote,
};