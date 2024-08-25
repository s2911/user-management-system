var users = [
  { id: 1, name: "Sahil", address: "Mzp", mobile: "09171234567", email: "sahil@example.com", age: 21 },
  { id: 2, name: "Shobhit", address: "Gkp", mobile: "09234567890", email: "shobhit@example.com", age: 21 },
  { id: 3, name: "Darsh", address: "Bkb", mobile: "09334567890", email: "darsh@example.com", age: 21 }
];

$(document).ready(function() {
  
  users.forEach(user => appendToUsrTable(user));

  
  $("form#addUser").submit(function(e) {
    e.preventDefault();
    
    var user = {
      name: $('input[name="name"]').val().trim(),
      address: $('input[name="address"]').val().trim(),
      mobile: $('input[name="mobile"]').val().trim(),
      email: $('input[name="email"]').val().trim(),
      age: $('input[name="age"]').val().trim()
    };

    if (Object.values(user).every(value => value !== "")) {
      user.id = users.length > 0 ? users[users.length - 1].id + 1 : 1;
      addUser(user);
      $(this).trigger("reset");
    } else {
      alert("All fields must have a valid value.");
    }
  });

  
  window.editUser = function(id) {
    var user = users.find(u => u.id === id);
    if (user) {
      $(".modal-body").html(`
        <form id="updateUser" action="">
          <div class="form-group">
            <label for="name">Name</label>
            <input class="form-control" type="text" name="name" value="${user.name}"/>
          </div>
          <div class="form-group">
            <label for="address">Address</label>
            <input class="form-control" type="text" name="address" value="${user.address}"/>
          </div>
          <div class="form-group">
            <label for="mobile">Mobile Number</label>
            <input class="form-control" type="tel" name="mobile" value="${user.mobile}"/>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input class="form-control" type="email" name="email" value="${user.email}"/>
          </div>
          <div class="form-group">
            <label for="age">Age</label>
            <input class="form-control" type="number" name="age" value="${user.age}" min="10" max="100"/>
          </div>
      `);
      $(".modal-footer").html(`
        <button type="button" class="btn btn-primary" onclick="updateUser(${id})">Save changes</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </form>
      `);
      $('#myModal').modal('show');
    }
  }

  
  window.updateUser = function(id) {
    var formData = $('#updateUser').serializeArray();
    var updatedUser = {};
    formData.forEach(function(field) {
      updatedUser[field.name] = field.value;
    });
    updatedUser.id = id;
    
    var index = users.findIndex(user => user.id === id);
    if (index > -1) {
      users[index] = updatedUser;
      updateUsrTable();
      $('#myModal').modal('hide');
    }
  }

  
  function addUser(user) {
    users.push(user);
    appendToUsrTable(user);
  }

  
  function appendToUsrTable(user) {
    $('#userTable tbody').append(`
      <tr>
        <td>${user.name}</td>
        <td>${user.address}</td>
        <td>${user.mobile}</td>
        <td>${user.email}</td>
        <td>${user.age}</td>
        <td>
          <button class="btn btn-warning" onclick="editUser(${user.id})">Edit</button>
          <button class="btn btn-danger" onclick="deleteUser(${user.id})">Delete</button>
        </td>
      </tr>
    `);
  }

  
  function updateUsrTable() {
    $('#userTable tbody').empty();
    users.forEach(user => {
      appendToUsrTable(user);
    });
  }

  
  window.deleteUser = function(id) {
    var index = users.findIndex(user => user.id === id);
    if (index > -1) {
      users.splice(index, 1);
      updateUsrTable();
    }
  }
});
