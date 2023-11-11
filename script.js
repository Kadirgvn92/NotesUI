

const saveButton = document.querySelector('#btnSave');
const deleteButton = document.querySelector('#btnDelete');
const titleInput = document.querySelector('#title');
const descriptionInput = document.querySelector('#description');
const notesContainer = document.querySelector('#note_container');

function clearForm() {
    titleInput.value = '';
    descriptionInput.value = '';
    deleteButton.classList.add('visually-hidden');
}

function displayNotesInForm(note) {
    titleInput.value = note.title;
    descriptionInput.value = note.description;
    deleteButton.classList.remove('visually-hidden');
    deleteButton.setAttribute('data-id', note.id);
    saveButton.setAttribute('data-id', note.id);
}

function getNoteByID(id) {
    fetch(`https://localhost:7270/api/notes/${id}`)
        .then(data => data.json())
        .then(response => displayNotesInForm(response));
}

function populateForm(id) {
    getNoteByID(id);

}


function addNote(title, description) {
    const body = {
        title: title,
        description: description,
        isVisible: true
    };



    fetch('https://localhost:7270/api/notes', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            "content-type": "application/json"
            }
        })
        .then(data => data.json())
        .then(response => {
            clearForm();
            getAllNotes();
        });
}


function displayNotes(notes) {

    let allNotes = '';

    notes.forEach(note => {
        const noteElement = `

            <div id="note" data-id="${note.id}" class="d-flex">
                <div class="card d-flex justify-content-evenly m-2 m-2 text-center bg-warning" style="width: 18rem; height: 10vh;">
                    <div class="card-body">
                        <h5 class="card-title">${note.title}</h5>
                        <p class="card-text">${note.description}</p>
                    </div>
                </div>
            </div>
            `;


        allNotes += noteElement;

    });

    notesContainer.innerHTML = allNotes;

    document.querySelectorAll('#note').forEach(note => {
        note.addEventListener('click', function(e) {
            
            populateForm(note.dataset.id);

        });
    });
}

function getAllNotes() {
    fetch('https://localhost:7270/api/notes')
        .then(data => data.json())
        .then(response => displayNotes(response));
}

getAllNotes();

function updateNote(id, title, description) {
    const body = {
        title: title,
        description: description,
        isVisible: true
    };



    fetch(`https://localhost:7270/api/notes/${id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            "content-type": "application/json"
            }
        })
        .then(data => data.json())
        .then(response => {
            clearForm();
            getAllNotes();
        });
} 

saveButton.addEventListener('click', function () {

    const id = saveButton.dataset.id;

    if(id) {
        updateNote(id, titleInput.value, descriptionInput.value);
    } else {
        addNote(titleInput.value, descriptionInput.value);
    }

})


function deleteNote(id) {
    fetch(`https://localhost:7270/api/notes/${id}`, {
        method: 'DELETE',
        headers: {
            "content-type": "application/json"
            }
        })
        .then(response => {
            clearForm();
            getAllNotes();
        });
}

deleteButton.addEventListener('click', function() {
    const id = deleteButton.dataset.id;
    deleteNote(id);
})