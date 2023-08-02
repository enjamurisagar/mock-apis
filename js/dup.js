const api = "https://64c8ce55a1fe0128fbd64016.mockapi.io/api/users/";

const tableBody = document.getElementById("tbody") 

function fetchUsers(){
   fetch(api)
   .then(res => res.json())
   .then((data) => {
    tableBody.innerHTML = "";
    data.forEach(user => {
        loadUsers(user)
    });
   }).catch(err => console.log(err.message))
}

function loadUsers(user){
    const row = document.createElement("tr");
    row.innerHTML = `
    <td id="name">${user.name}</td>
    <td id="age">${user.age}</td>
    <td id="state">${user.state}</td>

    <td>
        <button id="edit" user-id=${user.id}>Edit</button>
        <button id="delete" user-id=${user.id}>Delete</button>
    </td>
    `;
    
    const editBtn = row.querySelector("#edit")
    const deleteBtn = row.querySelector("#delete")
    
    
    editBtn.addEventListener("click", () => editUser(user))
    deleteBtn.addEventListener('click',() => deleteUser(user))
    tableBody.appendChild(row);
    console.log(row);
}


//hide add user

const addUserDiv = document.getElementById("add-user-div")

function toggleAddUser() {
  addUserDiv.classList.remove("hide-add-user");
  addUserDiv.classList.add("show-add-user");
}

function closeAddUser() {
  addUserDiv.classList.remove("show-add-user");
  addUserDiv.classList.add("hide-add-user");
}


// ADD USER

// function addUser(){
//     const name = document.getElementById("new-name").value
//     const age = document.getElementById("new-age").value
//     const state = document.getElementById("new-state").value

//     const newUser = {
//         name, age, state
//     };

//     console.log(newUser)

//     var xhttp = new XMLHttpRequest();
//    xhttp.onreadystatechange = function () {
//      if (this.readyState === 4 && this.status === 200) {
//        console.log(this.responseText);
//        // console.log("wfws")
//      }
//    };
//    xhttp.open(
//      "POST",
//      api,
//      true
//    );
//    xhttp.setRequestHeader("Content-Type", "application/json");
//    xhttp.send(
//      JSON.stringify({
//        name: name,
//        age: age,
//        state: state,
//      })
//    );
// }

const form = document.getElementById("add-user-form");


form.addEventListener("submit", function (e) {
  e.preventDefault();
  fetchUsers();

  const name = document.getElementById("new-name")
  const age = document.getElementById("new-age")
  const state = document.getElementById("new-state")

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
          console.log(this.responseText);
          // console.log("wfws")
        }
    };
    xhttp.open(
        "POST",
        "https://64c8ce55a1fe0128fbd64016.mockapi.io/api/users/",
        true
        );
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(
          JSON.stringify({
            name: name.value,
            age: age.value,
            state: state.value,
          })
        );
            fetchUsers()
            closeAddUser();
 
  name.value = "";
  age.value = null;
  state.value = null;
});




function deleteUser(user) {
  if (confirm("Are you sure you want to delete this user?")) {
    fetch(`${api}/${user.id}`, {
      method: "DELETE",
    })
      .then(() => {
        fetchUsers();
        console.log("deleted =>"+user)
      })
      .catch((error) => console.error("Error deleting user:", error));
  }
}


function editUser(user){

    const row = document.querySelector(`[user-id="${user.id}"]`).parentNode.parentNode;
    // console.log(row)
     const nameCell = row.querySelector("td:nth-child(1)");
     const ageCell = row.querySelector("td:nth-child(2)");
     const stateCell = row.querySelector("td:nth-child(3)");


     nameCell.dataset.originalValue = nameCell.textContent;
     ageCell.dataset.originalValue = ageCell.textContent;
     stateCell.dataset.originalValue = stateCell.textContent;

     nameCell.innerHTML = `<input type="text" id="updateName" value="${user.name}">`;
     ageCell.innerHTML = `<input type="number" id="updateAge" value="${user.age}">`;
     stateCell.innerHTML = `<input type="text" id="updateState" value="${user.state}">`;

     const inputs = row.querySelectorAll("input");
     inputs.forEach((input) => {
       input.addEventListener("keyup", (e) => {
         if (e.key === "Enter") {
           saveChanges(user, row);
        console.log(row)
         }
       });
     });
}

function saveChanges(user, tr) {
  const name = tr.querySelector("#updateName").value;
  const age = tr.querySelector("#updateAge").value;
  const state = tr.querySelector("#updateState").value;

  const updatedUser = {
    name,
    age,
    state,
  };

  fetch(`${api}/${user.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedUser),
  })
    .then(() => {
      fetchUsers();
    })
    .catch((error) => console.error("Error updating user:", error));
console.log(tr)

    // const name = document.
}

fetchUsers();