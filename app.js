let users = JSON.parse(localStorage.getItem("users")) || [];

const form = document.getElementById("crudForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const tableBody = document.getElementById("tableBody");
const editIndexInput = document.getElementById("editIndex");
const saveBtn = document.getElementById("saveBtn");
const emptyMessage = document.getElementById("empty-message"); 

function renderTable() {
    tableBody.innerHTML = "";

    if (users.length === 0) {
        
        emptyMessage.style.display = 'block';
    } else {
        emptyMessage.style.display = 'none';
        users.forEach((user, index) => {
           
            tableBody.innerHTML += `
                <tr>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>
                        <button class="action-btn edit" onclick="editUser(${index})">Editar</button>
                        <button class="action-btn delete" onclick="deleteUser(${index})">Eliminar</button>
                    </td>
                </tr>
            `;
        });
    }
}

function saveLocal() {
    localStorage.setItem("users", JSON.stringify(users));
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const user = {
        name: nameInput.value,
        email: emailInput.value
    };

    const indexEdit = editIndexInput.value;

    if (indexEdit === "") {
        
        users.push(user);
    } else {
        
        users[indexEdit] = user;
        editIndexInput.value = ""; 
        saveBtn.textContent = 'Guardar Registro';
    }

    saveLocal();
    renderTable();
    form.reset();
});

function editUser(index) {
    nameInput.value = users[index].name;
    emailInput.value = users[index].email;
    editIndexInput.value = index;
    saveBtn.textContent = 'Actualizar Registro'; 
}

function deleteUser(index) {
    
    if (confirm(`¿Estás seguro de que quieres eliminar a ${users[index].name}?`)) {
        users.splice(index, 1);
        saveLocal();
        renderTable();
    }
}

renderTable();