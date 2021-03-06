document.body.innerHTML = `
<div class="user-form">
<input class="add-user-name" placeholder="Enter your name" />
<input class="add-user-avatar" placeholder="Enter your pic url">
<a onclick="addUser()" class="waves-effect waves-light btn orange"><i class="material-icons left">add</i>ADD USER</a>
</div>
<section class="user-list">
</section>`;

async function getAllUsers() {
  const data = await fetch(
    "https://61921f06aeab5c0017105d5e.mockapi.io/users",
    { method: "GET"}
    ); //fetch returs us a promise
  const users = await data.json();

  const userContainer = document.querySelector(".user-list");

userContainer.innerHTML = ""; // To erase the old user

  users.forEach(user =>{
      userContainer.innerHTML += `
      <div class="user-container">
        <img class="user-avatar" src="${user.avatar}" alt=${user.name} />
        <div>
        <p class="user-name">${user.name}</p>
        <div class="action-button">
        <a onclick="toggleUser(${user.id})" class="waves-effect waves-light btn green"><i class="material-icons left">create</i>EDIT</a>
        <a onclick="deleteUser(${user.id})" class="waves-effect waves-light btn red"><i class="material-icons left">delete</i>DELETE</a>
        </div>
        <div class="edit-user-form edit-${user.id}">
        <input value="${user.name}" class="edit-${user.id}-user-name" placeholder="Enter your name" />
        <input value="${user.avatar}" class="edit-${user.id}-user-avatar" placeholder="Enter your pic url" />
        <a onclick="saveUser(${user.id})" class="waves-effect waves-light btn green"><i class="material-icons right">send</i>Save</a>
        </div>
        </div>
      </div>
      `;
  })

  console.log(users)
}
getAllUsers()

async function deleteUser(userId){
    console.log("deleting....", userId)
    const data = await fetch(
        "https://61921f06aeab5c0017105d5e.mockapi.io/users/" + userId,
        {method: "DELETE"}
        );

    getAllUsers();

}

async function addUser(){
    console.log("Adding...");
    const name = document.querySelector(".add-user-name").value;
    const avatar = document.querySelector(".add-user-avatar").value;
    console.log(name, avatar);

    // 1. Method - POST
    // 2. Data - Body -> stringfy (JSON) - //JAvascript -> JSON Data
    // 3. headers - JSON data
    const data = await fetch(
    "https://61921f06aeab5c0017105d5e.mockapi.io/users/",
    {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({name: name, avatar: avatar}),
    }
    );
    // Add User -> Refresh the user list
    getAllUsers();
}


function toggleUser(userId) {
    console.log("Editing..... User");
    const editUserForm = document.querySelector(`.edit-${userId}`);
    editUserForm.style.display = 
    editUserForm.style.display === "block" ? "none" : "block";
}

// Task - font awesome icons + styles
async function saveUser(userId) {
    // complete the save user
    // Post & Delete
    // Edit -> Refresh the user list

    console.log("saving...", userId)
    const userName = document.querySelector(`.edit-${userId}-user-name`).value;
    const userAvatar = document.querySelector(
        `.edit-${userId}-user-avatar`
    ).value;

    const data = await fetch(
        "https://61921f06aeab5c0017105d5e.mockapi.io/users/" + userId,
    {
    method: "PUT",
    headers: {"content-Type": "application/json"},
    body: JSON.stringify({name:userName, avatar: userAvatar}),
    }
    );

    //Edit - User -> Refresh the user list 
    getAllUsers();
}
// C - Create - P0ST -> DOne
// R - Read - GET -> Done
// U - Update - PUT/PATCH ->
// D - Delete - DELETE -> Done

// Delete -> deleteUser -> fetch DELETE -> Refreshing

// Delete -> Refresh the user list (old list + new list)

// delete old list then add new list

// Delete -> Refresh the user list - success

//JSON - string - REST API
// JS object - object 
