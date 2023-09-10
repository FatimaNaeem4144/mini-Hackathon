const studentData = {
    "12345": {
        "name": "John Doe",
        "rollNumber": "12345",
        "course": "Math",
        "section": "A",
        "batch": "2023"
    },
    "54321": {
        "name": "Jane Smith",
        "rollNumber": "54321",
        "course": "Science",
        "section": "B",
        "batch": "2023"
    },
    // Add more student data here
};
// Store attendance data
const attendanceData = {};

// Function to mark attendance
function markAttendance() {
    const rollNumber = document.getElementById("rollNumberInput").value;
    const selectedClass = document.getElementById("classSelect").value;
    const attendanceStatus = document.getElementById("attendanceStatus").value;
    
    // Check if the student exists and is in the selected class
    if (studentData[rollNumber] && selectedClass === studentData[rollNumber].course) {
        // Mark attendance
        attendanceData[rollNumber] = {
            status: attendanceStatus,
            timestamp: new Date().getTime(),
        };
        displayStudentData(rollNumber);
    }
}

// Function to display student data on the ID card
function displayStudentData(rollNumber) {
    const student = studentData[rollNumber];
    const idCardContainer = document.getElementById("idCardContainer");

    const idCard = `
        <div class="id-card">
            <h3>${student.name}</h3>
            <p>Roll Number: ${student.rollNumber}</p>
            <p>Course: ${student.course}</p>
            <p>Section: ${student.section}</p>
            <p>Batch: ${student.batch}</p>
            <p>Attendance Status: ${attendanceData[rollNumber].status}</p>
            <p>Timestamp: ${new Date(attendanceData[rollNumber].timestamp).toLocaleString()}</p>
        </div>
    `;

    idCardContainer.innerHTML = idCard;
}
