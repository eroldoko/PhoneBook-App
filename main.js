let search = document.querySelector('#search')
search.focus()

let tbody = document.querySelector('tbody');
let editTbody = document.querySelector('#edit-tbody');

let contactBtn = document.querySelector('#contactBtn');
let addBtn = document.querySelector('#addBtn');
let editBtn = document.querySelector('#editBtn');
let addContact = document.querySelector('#addContact');

let contactView = document.querySelector('#contact-view');
let addView = document.querySelector('#add-view');
let editView = document.querySelector('#edit-view');
let editContactView = document.querySelector('#edit-contact-view')

let fName = document.querySelector('#fName');
let lName = document.querySelector('#lName');
let number = document.querySelector('#number');
let eMail = document.querySelector('#eMail');

let editfName = document.querySelector('#editfName');
let editlName = document.querySelector('#editlName');
let editNumber = document.querySelector('#editNumber');
let editeMail = document.querySelector('#editeMail');
let editContactBtn = document.querySelector('#edit-contact-btn');

//EventListeners
contactBtn.addEventListener('click', createTable);
addBtn.addEventListener('click', displayForm);
addContact.addEventListener('click', saveContact);
editBtn.addEventListener('click', showEditTable);

/*
  loading existing contacts database, 
  or creating an example database at first run.
*/
if (localStorage.db) {
  var db = JSON.parse(localStorage.db)

  if (db.length != 0 || db.length == 0) {
    createTable();
  }
} else {
  db = [{
    name1: "Alex",
    name2: "Foster",
    tel: "00994302",
    mail: "example@example.com"
  },
  {
    name1: "Abraham",
    name2: "Petrovic",
    tel: "00994303",
    mail: "example@example.com"

  },
  {
    name1: "Alan",
    name2: "Jones",
    tel: "00994308",
    mail: "example@example.com"
  },
  {
    name1: "Boris",
    name2: "Brejcha",
    tel: "00994304",
    mail: "example@example.com"

  },
  {
    name1: "Bryan",
    name2: "Johnson",
    tel: "00994300",
    mail: "example@example.com"
  },
  {
    name1: "Bogdan",
    name2: "Peterson",
    tel: "00994309",
    mail: "example@example.com"
  }
  ];
  localStorage.db = JSON.stringify(db);
  createTable();
}

//filtering contacts in alphabetical order
function compare(a, b) {
  if (a.name1 < b.name1) {
    return -1;
  }
  if (a.name1 > b.name1) {
    return 1;
  }
  return 0;
}
//event listener for search field
search.addEventListener('keyup', function (e) {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    searchInput()
  }
  if (contactView.style.display == "block" && e.keyCode == 8) {
    if (search.value == "") {
      search.placeholder = "Search By First Name"
      createTable()
    }
  } else if (editView.style.display == "block" && e.keyCode == 8) {
    if (search.value == "") {
      search.placeholder = "Search By First Name"
      showEditTable()
    }
  }
})
//Checking if numbers are entered in number field
function validate() {
  if (isNaN(number.value)) {
    number.value = ""
    number.placeholder = "Enter Only Numbers Here"
  }
}
number.addEventListener('keyup', validate)

//generating contacts view
function createTable() {
  number.value = ""
  search.value = ""
  search.focus()
  contactView.style.display = "block";
  addView.style.display = "none";
  editView.style.display = "none";
  editContactView.style.display = "none";

  db.sort(compare);
  displayDb()
}
//eventListener for changing and saving contact
window.addEventListener('keydown', function (e) {
  if (e.keyCode == 13) {
    if (editContactView.style.display == "block") {
      changeContact()
    } else if (addView.style.display == "block") {
      saveContact()
    }
  }
});
//form for adding new contact
function displayForm() {
  search.value = "";
  number.placeholder = "Telephone Number"
  contactView.style.display = "none";
  addView.style.display = "block";
  fName.focus()
  editView.style.display = "none";
  editContactView.style.display = "none";
}
//saving contact
function saveContact() {
  if (number.value == "") {
    number.placeholder = "You Didn't Entered Any Number"
  } else if (number.value != "") {
    let firstName = fName.value
    let lastName = lName.value;
    let telNumber = number.value;
    let email = eMail.value;

    let newContact = {
      name1: firstName.charAt(0).toUpperCase() + firstName.slice(1),
      name2: lastName.charAt(0).toUpperCase() + lastName.slice(1),
      tel: telNumber,
      mail: email
    }
    db.push(newContact);
    localStorage.db = JSON.stringify(db);
    console.log(db);
    fName.value = "";
    lName.value = "";
    number.value = "";
    eMail.value = "";

    createTable();
  }
}
//edit contacts view
function showEditTable() {
  search.value = "";
  contactView.style.display = "none";
  addView.style.display = "none";
  editView.style.display = "block";
  editContactView.style.display = "none";
  search.focus()
  displayEditDb()

  let deleteBtns = document.querySelectorAll('.delete');
  let editBtns = document.querySelectorAll('.edit');
  for (var i = 0; i < deleteBtns.length; i++) {
    deleteBtns[i].addEventListener('click', deleteContact);
    editBtns[i].addEventListener('click', showEditForm);
  }
}
//deleting non filtered contacts
function deleteContact() {
  let index = this.id;
  db.splice(index, 1);
  showEditTable()
  localStorage.db = JSON.stringify(db);
}
//deleting specific filtered contact
function deleteContactSpec() {
  let index = this.id;
  for (var i = 0; i < db.length; i++) {
    if (dbNameMatch[index].tel == db[i].tel) {
      db.splice(i, 1);
      dbNameMatch.splice(index, 1);
      showEditTable()
      localStorage.db = JSON.stringify(db);
    }
  }
}
//deleting first letter-filtered contacts
function deleteContact1() {
  let index = this.id;
  for (var i = 0; i < db.length; i++) {
    if (dbFirstLetter[index].tel == db[i].tel) {
      db.splice(i, 1);
      dbFirstLetter.splice(index, 1);
      dbEditLetter1()
      localStorage.db = JSON.stringify(db);
    }
  }
}
//deleting second letter-filtered contacts
function deleteContact2() {
  let index = this.id;
  for (var i = 0; i < db.length; i++) {
    if (dbSecondLetter[index].tel == db[i].tel) {
      db.splice(i, 1);
      dbSecondLetter.splice(index, 1);
      dbEditLetter2()
      localStorage.db = JSON.stringify(db);
    }
  }
}
//deleting third letter-filtered contacts
function deleteContact3() {
  let index = this.id;
  for (var i = 0; i < db.length; i++) {
    if (dbThirdLetter[index].tel == db[i].tel) {
      db.splice(i, 1);
      dbThirdLetter.splice(index, 1);
      dbEditLetter3()
      localStorage.db = JSON.stringify(db);
    }
  }
}
//edit form for chosen contact
function showEditForm() {
  showEditContactView()

  editfName.value = db[this.id].name1;
  editlName.value = db[this.id].name2;
  editNumber.value = db[this.id].tel;
  editeMail.value = db[this.id].mail;
  keyEdit = this.id
}
//edit form for specific filtered contact
function showEditFormSpec() {
  showEditContactView()
  let index = this.id;
  for (var i = 0; i < db.length; i++) {
    if (dbNameMatch[index].tel == db[i].tel) {
      editfName.value = db[i].name1;
      editlName.value = db[i].name2;
      editNumber.value = db[i].tel;
      editeMail.value = db[i].mail;
      keyEdit = i
    }
  }
}
//edit form for chosen filtered contact on first letter
function showEditForm1() {
  showEditContactView()
  let index = this.id;
  for (var i = 0; i < db.length; i++) {
    if (dbFirstLetter[index].tel == db[i].tel) {
      editfName.value = db[i].name1;
      editlName.value = db[i].name2;
      editNumber.value = db[i].tel;
      editeMail.value = db[i].mail;
      keyEdit = i
    }
  }
}
//edit form for chosen filtered contact on second letter
function showEditForm2() {
  showEditContactView()
  let index = this.id;
  for (var i = 0; i < db.length; i++) {
    if (dbSecondLetter[index].tel == db[i].tel) {
      editfName.value = db[i].name1;
      editlName.value = db[i].name2;
      editNumber.value = db[i].tel;
      editeMail.value = db[i].mail;
      keyEdit = i
    }
  }
}
//edit form for chosen filtered contact on third letter
function showEditForm3() {
  showEditContactView()
  let index = this.id;
  for (var i = 0; i < db.length; i++) {
    if (dbThirdLetter[index].tel == db[i].tel) {
      editfName.value = db[i].name1;
      editlName.value = db[i].name2;
      editNumber.value = db[i].tel;
      editeMail.value = db[i].mail;
      keyEdit = i
    }
  }
}
editContactBtn.addEventListener('click', changeContact);

function changeContact() {
  let editName1 = editfName.value;
  let editName2 = editlName.value;
  let editTel = editNumber.value;
  let editMail = editeMail.value;

  db[keyEdit].name1 = editName1;
  db[keyEdit].name2 = editName2;
  db[keyEdit].tel = editTel;
  db[keyEdit].mail = editMail;
  localStorage.db = JSON.stringify(db);
  createTable();
}

//logic for filtering contacts upon typing the first three letters at a time
function searchInput() {
    //let filter = search.value.toUpperCase();
  dbFirstLetter = db.filter((el) => {
    //return el.name2.toUpperCase().indexOf(filter) > -1
    return el.name1.toUpperCase().charAt(0) == search.value.toUpperCase().charAt(0)
  })
  dbNameMatch = dbFirstLetter.filter((el) => {
    return el.name1.toUpperCase() == search.value.toUpperCase()
  })

  dbSecondLetter = dbFirstLetter.filter((el) => {
    return el.name1.toUpperCase().charAt(1) == search.value.toUpperCase().charAt(1)
  })

  dbThirdLetter = dbSecondLetter.filter((el) => {
    return el.name1.toUpperCase().charAt(2) == search.value.toUpperCase().charAt(2)
  })
  dbNoMatch = db.filter((el) => {
    return el.name1.toUpperCase().charAt(0) !== search.value.toUpperCase().charAt(0)
  })

  if (contactView.style.display == "block" && dbNameMatch.length > 0) {
    dbMatch()
  } else if (contactView.style.display == "block" && dbThirdLetter.length > 0) {
    dbLetter3()
  } else if (contactView.style.display == "block" && dbSecondLetter.length > 0) {
    dbLetter2()
  } else if (contactView.style.display == "block" && dbFirstLetter.length > 0) {
    dbLetter1()
  } else if (contactView.style.display == "block" && dbNoMatch.length > 0) {
    let text = "";
    search.value = ""
    search.placeholder = "No Match Found - Press Backspace"

    dbNoMatch.length = 0
    console.log(dbNoMatch);
    tbody.innerHTML = text;
  } else if (editView.style.display == "block" && dbNameMatch.length > 0) {
    contactView.style.display = "none"
    dbEditMatch()
  } else if (editView.style.display == "block" && dbThirdLetter.length > 0) {
    contactView.style.display = "none"
    dbEditLetter3()
  } else if (editView.style.display == "block" && dbSecondLetter.length > 0) {
    contactView.style.display = "none"
    dbEditLetter2()
  } else if (editView.style.display == "block" && dbFirstLetter.length > 0) {
    contactView.style.display = "none"
    dbEditLetter1()
  } else if (editView.style.display == "block" && dbNoMatch.length > 0) {
    let text = "";
    search.value = ""
    search.placeholder = "No Match Found - Press Backspace"

    dbNoMatch.length = 0
    console.log(dbNoMatch);
    editTbody.innerHTML = text;
  }
}
//displaying contacts table view
function displayDb() {
  let text = "";
  for (var i = 0; i < db.length; i++) {
    text += '<tr>';
    text += '<td>' + db[i].name1 + '</td>';
    text += '<td>' + db[i].name2 + '</td>';
    text += '<td>' + db[i].tel + '</td>';
    text += '<td>' + db[i].mail + '</td>';
    text += '</tr>';
  }
  tbody.innerHTML = text;
}
//displaying edit/delete contacts table view
function displayEditDb() {
  let text = "";
  for (var i = 0; i < db.length; i++) {
    text += '<tr>';
    text += `<td>  ${db[i].name1}  </td>`;
    text += '<td>' + db[i].name2 + '</td>';
    text += '<td id ="numberTd">' + db[i].tel + '</td>';
    text += '<td id ="mailTd">' + db[i].mail + '</td>';
    text += '<td><button id = "' + i + '" class="btn btn-danger delete">Delete</button></td>';
    text += '<td><button id = "' + i + '" class="btn btn-warning edit" data-num="' + i + '">&nbsp; Edit &nbsp;</button></td>';
    text += '</tr>';
  }
  editTbody.innerHTML = text;
}
/*
   displaying filtered contacts table view, 
   based on first three letters
*/
function dbLetter1() {
  let text = "";
  for (var i = 0; i < dbFirstLetter.length; i++) {
    text += '<tr>';
    text += '<td>' + dbFirstLetter[i].name1 + '</td>';
    text += '<td>' + dbFirstLetter[i].name2 + '</td>';
    text += '<td>' + dbFirstLetter[i].tel + '</td>';
    text += '<td>' + dbFirstLetter[i].mail + '</td>';

    text += '</tr>';
  }
  tbody.innerHTML = text;
}
function dbLetter2() {
  let text = "";
  for (var i = 0; i < dbSecondLetter.length; i++) {
    text += '<tr>';
    text += '<td>' + dbSecondLetter[i].name1 + '</td>';
    text += '<td>' + dbSecondLetter[i].name2 + '</td>';
    text += '<td>' + dbSecondLetter[i].tel + '</td>';
    text += '<td>' + dbSecondLetter[i].mail + '</td>';

    text += '</tr>';
  }
  tbody.innerHTML = text;
}
function dbLetter3() {
  let text = "";
  for (var i = 0; i < dbThirdLetter.length; i++) {
    text += '<tr>';
    text += '<td>' + dbThirdLetter[i].name1 + '</td>';
    text += '<td>' + dbThirdLetter[i].name2 + '</td>';
    text += '<td>' + dbThirdLetter[i].tel + '</td>';
    text += '<td>' + dbThirdLetter[i].mail + '</td>';

    text += '</tr>';
  }
  tbody.innerHTML = text;
}
//displaying contact view with filtered specific contact's
function dbMatch() {
  let text = "";
  for (var i = 0; i < dbNameMatch.length; i++) {
    text += '<tr>';
    text += '<td>' + dbNameMatch[i].name1 + '</td>';
    text += '<td>' + dbNameMatch[i].name2 + '</td>';
    text += '<td>' + dbNameMatch[i].tel + '</td>';
    text += '<td>' + dbNameMatch[i].mail + '</td>';

    text += '</tr>';
  }
  tbody.innerHTML = text;
}
//displaying edit/delete contact view with filtered specific contact's
function dbEditMatch() {
  let text = "";
  for (var i = 0; i < dbNameMatch.length; i++) {
    text += '<tr>';
    text += `<td>  ${dbNameMatch[i].name1}  </td>`;
    text += '<td>' + dbNameMatch[i].name2 + '</td>';
    text += '<td id ="numberTd">' + dbNameMatch[i].tel + '</td>';
    text += '<td id ="mailTd">' + dbNameMatch[i].mail + '</td>';
    text += '<td><button id = "' + i + '" class="btn btn-danger delete">Delete</button></td>';
    text += '<td><button id = "' + i + '" class="btn btn-warning edit" data-num="' + i + '">&nbsp; Edit &nbsp;</button></td>';
    text += '</tr>';
  }
  editTbody.innerHTML = text;
  let deleteBtns = document.querySelectorAll('.delete');
  let editBtns = document.querySelectorAll('.edit');
  for (var j = 0; j < deleteBtns.length; j++) {
    deleteBtns[j].addEventListener('click', deleteContactSpec);
    editBtns[j].addEventListener('click', showEditFormSpec);
  }
}
/*
   displaying filtered edit/delete contacts table view,
   based on first three letters
*/
function dbEditLetter1() {
  let text = "";
  for (var i = 0; i < dbFirstLetter.length; i++) {
    text += '<tr>';
    text += `<td>  ${dbFirstLetter[i].name1}  </td>`;
    text += '<td>' + dbFirstLetter[i].name2 + '</td>';
    text += '<td id ="numberTd">' + dbFirstLetter[i].tel + '</td>';
    text += '<td id ="mailTd">' + dbFirstLetter[i].mail + '</td>';
    text += '<td><button id = "' + i + '" class="btn btn-danger delete">Delete</button></td>';
    text += '<td><button id = "' + i + '" class="btn btn-warning edit" data-num="' + i + '">&nbsp; Edit &nbsp;</button></td>';
    text += '</tr>';
  }
  editTbody.innerHTML = text;
  let deleteBtns = document.querySelectorAll('.delete');
  let editBtns = document.querySelectorAll('.edit');
  for (var j = 0; j < deleteBtns.length; j++) {
    deleteBtns[j].addEventListener('click', deleteContact1);
    editBtns[j].addEventListener('click', showEditForm1);
  }
}
function dbEditLetter2() {
  let text = "";
  for (var i = 0; i < dbSecondLetter.length; i++) {
    text += '<tr>';
    text += `<td>  ${dbSecondLetter[i].name1}  </td>`;
    text += '<td>' + dbSecondLetter[i].name2 + '</td>';
    text += '<td id ="numberTd">' + dbSecondLetter[i].tel + '</td>';
    text += '<td id ="mailTd">' + dbSecondLetter[i].mail + '</td>';
    text += '<td><button id = "' + i + '" class="btn btn-danger delete">Delete</button></td>';
    text += '<td><button id = "' + i + '" class="btn btn-warning edit" data-num="' + i + '">&nbsp; Edit &nbsp;</button></td>';
    text += '</tr>';
  }
  editTbody.innerHTML = text;
  let deleteBtns = document.querySelectorAll('.delete');
  let editBtns = document.querySelectorAll('.edit');
  for (var j = 0; j < deleteBtns.length; j++) {
    deleteBtns[j].addEventListener('click', deleteContact2);
    editBtns[j].addEventListener('click', showEditForm2);
  }
}
function dbEditLetter3() {
  let text = "";
  for (var i = 0; i < dbThirdLetter.length; i++) {
    text += '<tr>';
    text += `<td>  ${dbThirdLetter[i].name1}  </td>`;
    text += '<td>' + dbThirdLetter[i].name2 + '</td>';
    text += '<td id ="numberTd">' + dbThirdLetter[i].tel + '</td>';
    text += '<td id ="mailTd">' + dbThirdLetter[i].mail + '</td>';
    text += '<td><button id = "' + i + '" class="btn btn-danger delete">Delete</button></td>';
    text += '<td><button id = "' + i + '" class="btn btn-warning edit" data-num="' + i + '">&nbsp; Edit &nbsp;</button></td>';
    text += '</tr>';
  }
  editTbody.innerHTML = text;
  let deleteBtns = document.querySelectorAll('.delete');
  let editBtns = document.querySelectorAll('.edit');
  for (var j = 0; j < deleteBtns.length; j++) {
    deleteBtns[j].addEventListener('click', deleteContact3);
    editBtns[j].addEventListener('click', showEditForm3);
  }
}

function showEditContactView() {
  search.value = "";
  contactView.style.display = "none";
  addView.style.display = "none";
  editView.style.display = "none";
  editContactView.style.display = "block";
}
