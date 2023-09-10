let selectedRow = null;

//showing alerts
function showAlert(message, className){
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container1");
    const main = document.querySelector(".main");
    container.insertBefore(div, main);

    setTimeout(()=> document.querySelector(".alert").remove(),3000);
}

//Clear All Fields 
function clearFields() {
    document.querySelector("#fullName").value = "";
    document.querySelector("#fatherName").value = "";
    document.querySelector("#rollNumber").value = "";
    document.querySelector("#contactNumber").value = "";
    document.querySelector("#cnicNumber").value = "";
}


//Add Data
document.querySelector("#student-form").addEventListener("submit", (e) => {
    e.preventDefault();

    //get form values
    const fullName = document.querySelector("#fullName").value;
    const fatherName = document.querySelector("#fatherName").value;
    const rollNumber = document.querySelector("#rollNumber").value;
    const contactNumber = document.querySelector("#contactNumber").value;
    const cnicNumber = document.querySelector("#cnicNumber").value;



    //validate
    if(fullName == "" || fatherName == "" || rollNumber == "" || contactNumber == "" || cnicNumber == ""){
        showAlert("Please fill in all fields","danger");
    }
    else{
        if(selectedRow==null){
            const list = document.querySelector("#student-list");
            const row = document.createElement("tr")

            row.innerHTML = `
            <td>${fullName}</td>
            <td>${fatherName}</td>
            <td>${rollNumber}</td>
            <td>${contactNumber}</td>
            <td>${cnicNumber}</td>
            <td>
            <a href="" class="btn btn-warning btn-sm edit">Edit</a>
            <a href="" class="btn btn-danger btn-sm delete">Delete</a>
            </td>
            `;
            list.appendChild(row);
            selectedRow = null;
            showAlert("Student Added","success");
        }
        else{
            selectedRow.children[0].textContent = fullName;
            selectedRow.children[1].textContent = fatherName;
            selectedRow.children[2].textContent = rollNumber;
            selectedRow.children[3].textContent = contactNumber;
            selectedRow.children[4].textContent = cnicNumber;
            selectedRow = null;
            showAlert("Student Info Edited","info")
    }
    clearFields();
}});

//Edit Data
document.querySelector("#student-list").addEventListener("click", (e) => {
    const target = e.target;
    if (target.classList.contains("edit")) {
        selectedRow = target.parentElement.parentElement;
        document.querySelector("#fullName").value = selectedRow.children[0].textContent;
        document.querySelector("#fatherName").value = selectedRow.children[1].textContent;
        document.querySelector("#rollNumber").value = selectedRow.children[2].textContent;
        document.querySelector("#contactNumber").value = selectedRow.children[3].textContent;
        document.querySelector("#cnicNumber").value = selectedRow.children[4].textContent;

    } 
    //deleting data
    else if (target.classList.contains("delete")) {
        const rowToDelete = target.parentElement.parentElement;
        rowToDelete.remove();
        showAlert("Student Data Deleted", "danger");
    }

    e.preventDefault();
});