const newNoteBtn = document.getElementById("newNoteBtn");
const noteList = document.getElementById("noteList");


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

            noteList.appendChild(noteElement);
        });

    } catch (error) {
        console.error("Error loading notes:", error);
    }
}


// ===============================
// LOAD NOTES WHEN PAGE OPENS
// ===============================

loadNotes();