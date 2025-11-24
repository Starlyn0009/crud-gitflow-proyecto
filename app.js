let users = JSON.parse(localStorage.getItem("users")) || [];

const form = document.getElementById("crudForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const tableBody = document.getElementById("tableBody");
const editIndexInput = document.getElementById("editIndex");
const saveBtn = document.getElementById("saveBtn"); // Referencia al botón
const emptyMessage = document.getElementById("empty-message"); // Mensaje de vacío

// Mostrar datos
function renderTable() {
    tableBody.innerHTML = "";

    if (users.length === 0) {
        // Mostrar mensaje si no hay usuarios
        emptyMessage.style.display = 'block';
    } else {
        emptyMessage.style.display = 'none';
        users.forEach((user, index) => {
            // Usamos backticks para el template string
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
        // Crear nuevo
        users.push(user);
    } else {
        // Editar existente
        users[indexEdit] = user;
        editIndexInput.value = ""; // Limpiar el índice de edición
        saveBtn.textContent = 'Guardar Registro'; // Restaurar texto del botón
    }

    saveLocal();
    renderTable();
    form.reset();
});

function editUser(index) {
    nameInput.value = users[index].name;
    emailInput.value = users[index].email;
    editIndexInput.value = index;
    saveBtn.textContent = 'Actualizar Registro'; // Cambiar texto del botón al editar
}

function deleteUser(index) {
    // Opcional: una confirmación simple
    if (confirm(`¿Estás seguro de que quieres eliminar a ${users[index].name}?`)) {
        users.splice(index, 1);
        saveLocal();
        renderTable();
    }
}

renderTable();