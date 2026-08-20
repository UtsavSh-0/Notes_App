const newNoteBtn = document.getElementById("newNoteBtn");
const noteList = document.getElementById("noteList");

let currentNoteId=null;
// ===============================
// CREATE NEW NOTE
// ===============================

newNoteBtn.addEventListener("click", async () => {
    try {
        const response = await fetch("/api/notes", {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                title: "Untitled Note",
                type: "text",
                content: "",
            }),
        });

        const note = await response.json();

        console.log("Created Note:", note);

        // Reload notes after creating
        loadNotes();

    } catch (error) {
        console.error("Error creating note:", error);
    }
});


// ===============================
// LOAD ALL NOTES
// ===============================

async function loadNotes() {
    try {
        const response = await fetch("/api/notes");

        if (!response.ok) {
            throw new Error("Failed to load notes");
        }

        const notes = await response.json();

        console.log("My Notes:", notes);

        // Clear old notes
        noteList.innerHTML = "";

        // No notes
        if (notes.length === 0) {
            noteList.innerHTML = `
                <p class="empty-hint">
                    No notes yet. Create one!
                </p>
            `;

            return;
        }

        // Display notes
        notes.forEach((note) => {

            const noteElement = document.createElement("div");

            noteElement.classList.add("note-item");

            noteElement.innerHTML = `
                <div class="note-item-title">
                    📝 ${note.title}
                </div>

                <div class="note-item-type">
                    ${note.type}
                </div>
            `;

            noteElement.addEventListener("click",()=>{
                openNote(note._id);
            });
            noteList.appendChild(noteElement);
        });

    } catch (error) {
        console.error("Error loading notes:", error);
    }
};

async function openNote(noteId){
    try{
        const response=await fetch(`/api/notes/${noteId}`);
        if(!response.ok){
            throw new error("Failed to load note");
        }
        const note=await response.json();
        currentNoteId=note._id;
        console.log("Opened Note:",note);
        document.getElementById("editorEmpty").style.display="none";
        document.getElementById("editorActive").style.display="block";
        document.getElementById("noteTitle").value=note.title;
        document.getElementById("noteColor").value=note.color || "#ffffff";
        document.getElementById("editorPanel").style.backgroundColor =
    note.color || "#ffffff";
    document.getElementById("noteColor").addEventListener(
    "change",
    () => {
        const color = document.getElementById("noteColor").value;

        document.getElementById("editorPanel").style.backgroundColor =
            color;

        updateCurrentNote();
    }
);
        document.getElementById("textEditor").innerHTML=note.content;
    }catch(error){
        console.log("Error Opening note: ",error);
    }
}
async function updateCurrentNote(){
    if(!currentNoteId){
        return;

    }
    const title=document.getElementById("noteTitle").value;
    const content=document.getElementById("textEditor").innerHTML;
    const color=document.getElementById("noteColor").value;

    try{
        const response=await fetch(`/api/notes/${currentNoteId}`,{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                title,
                content,
                color
            })
            });
            if(!response.ok){
                throw new Error("Failed to update note");
            }
                const updatedNote=await response.json();
                console.log("Updated Note:",updatedNote);
            }catch(error){
                console.log("Update error:",error);
            }
}
document.getElementById("textEditor").addEventListener(
    "blur",
    updateCurrentNote
);
document.getElementById("textEditor").addEventListener(
    "blur",
    updateCurrentNote
);

const deleteNoteBtn=document.getElementById("deleteNoteBtn");

deleteNoteBtn.addEventListener("click",async()=>{
    if(!currentNoteId){
        return;
    }
    const confirmed=confirm(
        "Are you sure you want to delete this note?"
    );
    if(!confirmed){
        return;
    }
    try{
        const response=await fetch(
            `/api/notes/${currentNoteId}`,{
                method:"DELETE"
            }
        );
        if(!respone.ok){
            throw new Error("Failed to delete note");
        }
        console.log("Note Deleted");

        currentNoteId=null;

        document.getElementById("editorActive").style.display="none";

        document.getElementById("editorEmpty").style.display="flex";

        loadNotes();
    }catch(error){
        console.log("Delete error:",error);
    }
});

document.getElementById("noteColor").addEventListener(
    "change",
    updateCurrentNote
);


// ===============================
// LOAD NOTES WHEN PAGE OPENS
// ===============================

loadNotes();