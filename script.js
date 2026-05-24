const API = "http://localhost/gym_management/";

// =====================
// ADD MEMBER
// =====================
function addMember() {
    let data = {
        ApplicationID: document.getElementById("ApplicationID").value,
        TrainorID: document.getElementById("TrainorID").value,
        FirstName: document.getElementById("FirstName").value,
        LastName: document.getElementById("LastName").value,
        Age: document.getElementById("Age").value,
        PlanID: document.getElementById("PlanID").value,
        Phone: document.getElementById("Phone").value,
        Status: document.getElementById("Status").value
    };

    fetch(API + "add_member.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(res => res.text())
    .then(res => {
        alert(res);
        loadMembers();
    })
    .catch(err => console.error(err));
}

// =====================
// EDIT MEMBER
// =====================
function editMember(id, first, last, age, phone) {
    document.getElementById("FirstName").value = first;
    document.getElementById("LastName").value = last;
    document.getElementById("Age").value = age;
    document.getElementById("Phone").value = phone;

    window.currentEditId = id;
}

// =====================
// UPDATE MEMBER
// =====================
function updateMember() {

    if (!window.currentEditId) {
        alert("Please click Edit first.");
        return;
    }

    let data = {
        MemberID: window.currentEditId,
        ApplicationID: document.getElementById("ApplicationID").value,
        TrainorID: document.getElementById("TrainorID").value,
        FirstName: document.getElementById("FirstName").value,
        LastName: document.getElementById("LastName").value,
        Age: document.getElementById("Age").value,
        PlanID: document.getElementById("PlanID").value,
        Phone: document.getElementById("Phone").value,
        Status: document.getElementById("Status").value
    };

    fetch(API + "update_members.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(res => res.text())
    .then(res => {
        alert(res);
        loadMembers();
    })
    .catch(err => console.error(err));
}

// =====================
// LOAD MEMBERS
// =====================
function loadMembers() {

    fetch(API + "get_members.php")
    .then(res => res.json())
    .then(data => {

        let rows = "";

        data.forEach(m => {

            rows += `
            <tr>
                <td>${m.MemberID}</td>
                <td>${m.FirstName}</td>
                <td>${m.LastName}</td>
                <td>${m.Age}</td>
                <td>${m.Phone}</td>
                <td>
                    <button onclick="deleteMember(${m.MemberID})">Delete</button>
                    <button onclick="editMember(${m.MemberID}, '${m.FirstName}', '${m.LastName}', ${m.Age}, '${m.Phone}')">Edit</button>
                </td>
            </tr>`;
        });

        document.getElementById("tableData").innerHTML = rows;
    })
    .catch(err => console.error(err));
}

// =====================
// SEARCH MEMBER
// =====================
function searchMember() {

    let keyword = document.getElementById("search").value.toLowerCase();

    fetch(API + "get_members.php")
    .then(res => res.json())
    .then(data => {

        let filtered = data.filter(m =>
            m.FirstName.toLowerCase().includes(keyword) ||
            m.LastName.toLowerCase().includes(keyword)
        );

        let rows = "";

        filtered.forEach(m => {

            rows += `
            <tr>
                <td>${m.MemberID}</td>
                <td>${m.FirstName}</td>
                <td>${m.LastName}</td>
                <td>${m.Age}</td>
                <td>${m.Phone}</td>
                <td>
                    <button onclick="deleteMember(${m.MemberID})">Delete</button>
                    <button onclick="editMember(${m.MemberID}, '${m.FirstName}', '${m.LastName}', ${m.Age}, '${m.Phone}')">Edit</button>
                </td>
            </tr>`;
        });

        document.getElementById("tableData").innerHTML = rows;
    })
    .catch(err => console.error(err));
}

// =====================
// DELETE MEMBER
// =====================
function deleteMember(id) {

    if (!confirm("Delete this member?")) return;

    fetch(API + "delete_member.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            MemberID: id
        })
    })
    .then(res => res.text())
    .then(res => {
        alert(res);
        loadMembers();
    })
    .catch(err => console.error(err));
}

// =====================
// INITIAL LOAD
// =====================
loadMembers();