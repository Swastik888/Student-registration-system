// Get elements...
const form = document.getElementById("studentForm");
const table = document.getElementById("studentTable");

let students = JSON.parse(localStorage.getItem("students")) || [];
let editIndex = -1;

// Load...
function loadData() {
    table.innerHTML = "";

    students.forEach((student, index) => {
        const row = `
            <tr class="border-b hover:bg-gray-100">
                <td class="p-2">${student.name}</td>
                <td class="p-2">${student.id}</td>
                <td class="p-2">${student.email}</td>
                <td class="p-2">${student.contact}</td>
                <td class="p-2 space-x-2">
                    <button onclick="editStudent(${index})"
                        class="bg-yellow-400 px-3 py-1 rounded">Edit</button>
                    <button onclick="deleteStudent(${index})"
                        class="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                </td>
            </tr>
        `;
        table.innerHTML += row;
    });
}

//check.....
function validate(name, id, email, contact) {

    const nameRegex = /^[A-Za-z ]+$/;
    const numberRegex = /^[0-9]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !id || !email || !contact) {
        alert("All fields are required!");
        return false;
    }

    if (!nameRegex.test(name)) {
        alert("Name should contain only letters!");
        return false;
    }

    if (!numberRegex.test(id)) {
        alert("Student ID must be numeric!");
        return false;
    }

    if (!emailRegex.test(email)) {
        alert("Enter valid email!");
        return false;
    }

    if (!numberRegex.test(contact) || contact.length < 10) {
        alert("Contact must be at least 10 digits!");
        return false;
    }

    return true;
}

// do tasks...
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const id = document.getElementById("studentId").value.trim();
    const email = document.getElementById("email").value.trim();
    const contact = document.getElementById("contact").value.trim();

    
    if (!validate(name, id, email, contact)) return;

    const studentData = { name, id, email, contact };

    if (editIndex === -1) {
        students.push(studentData);
    } else {
        students[editIndex] = studentData;
        editIndex = -1;
    }

    //Save storage
    localStorage.setItem("students", JSON.stringify(students));

    loadData();
    form.reset();
});


function editStudent(index) {
    const student = students[index];

    document.getElementById("name").value = student.name;
    document.getElementById("studentId").value = student.id;
    document.getElementById("email").value = student.email;
    document.getElementById("contact").value = student.contact;

    editIndex = index;
}

function deleteStudent(index) {
    if (confirm("Are you sure to delete this record?")) {
        students.splice(index, 1);
        localStorage.setItem("students", JSON.stringify(students));
        loadData();
    }
}

loadData();