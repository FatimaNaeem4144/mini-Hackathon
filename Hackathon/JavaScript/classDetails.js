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
    document.querySelector("#classTimings").value = "";
    document.querySelector("#teacherName").value = "";
    document.querySelector("#sectionName").value = "";
    document.querySelector("#courseName").value = "";
    document.querySelector("#batchNumber").value = "";
}


//Add Data
document.querySelector("#student-form").addEventListener("submit", (e) => {
    e.preventDefault();

    //get form values
    const classTimings = document.querySelector("#classTimings").value;
    const teacherName = document.querySelector("#teacherName").value;
    const sectionName = document.querySelector("#sectionName").value;
    const courseName = document.querySelector("#courseName").value;
    const batchNumber = document.querySelector("#batchNumber").value;



    //validate
    if(classTimings == "" || teacherName == "" || sectionName == "" || courseName == "" || batchNumber == ""){
        showAlert("Please fill in all fields","danger");
    }
    else{
        if(selectedRow==null){
            const list = document.querySelector("#student-list");
            const row = document.createElement("tr")

            row.innerHTML = `
            <td>${classTimings}</td>
            <td>${teacherName}</td>
            <td>${sectionName}</td>
            <td>${courseName}</td>
            <td>${batchNumber}</td>
            <td>
            <a href="" class="btn btn-warning btn-sm edit">Edit</a>
            <a href="" class="btn btn-danger btn-sm delete">Delete</a>
            </td>
            `;
            list.appendChild(row);
            selectedRow = null;
            showAlert("Class Added","success");
        }
        else{
            selectedRow.children[0].textContent = classTimings;
            selectedRow.children[1].textContent = teacherName;
            selectedRow.children[2].textContent = sectionName;
            selectedRow.children[3].textContent = courseName;
            selectedRow.children[4].textContent = batchNumber;
            selectedRow = null;
            showAlert("Class Info Edited","info")
    }
    clearFields();
}});

//Edit Data
document.querySelector("#student-list").addEventListener("click", (e) => {
    const target = e.target;
    if (target.classList.contains("edit")) {
        selectedRow = target.parentElement.parentElement;
        document.querySelector("#classTimings").value = selectedRow.children[0].textContent;
        document.querySelector("#teacherName").value = selectedRow.children[1].textContent;
        document.querySelector("#sectionName").value = selectedRow.children[2].textContent;
        document.querySelector("#courseName").value = selectedRow.children[3].textContent;
        document.querySelector("#batchNumber").value = selectedRow.children[4].textContent;

    } 
    //deleting data
    else if (target.classList.contains("delete")) {
        const rowToDelete = target.parentElement.parentElement;
        rowToDelete.remove();
        showAlert("Class Data Deleted", "danger");
    }

    e.preventDefault();
});


