var resultsAmount = "20";
var requestUrl =
  "https://api.petfinder.com/v2/animals?limit=" +
  resultsAmount +
  "&distance=10&location=";
console.log(requestUrl);
var cardContainer = document.querySelector("section-dog");

var array = [];
var savedPets = localStorage.getItem("pets");
if (savedPets === null) {
  savedPets = [];
} else {
  savedPets = JSON.parse(savedPets);
}

//Retrieves access token for api
function getToken() {
  return fetch("https://api.petfinder.com/v2/oauth2/token", {
    body: "grant_type=client_credentials&client_id=8PvP1zLa44Dbu32OINQVKFniQUi4dm8zwRrMZP79yGUe1bpR77&client_secret=WqcfGpCUu5OU455kDUmVmBYxg27SsF29ut5LtBCF",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
  })
    .then((response) => response.json())
    .then((data) => {
      return "Bearer " + data.access_token;
    });
}

fetch("https://dog.ceo/api/breeds/image/random").then((response) =>
  response.json().then((data) => {
    $("#car-1").attr("src", data.message);
  })
);
fetch("https://dog.ceo/api/breeds/image/random").then((response) =>
  response.json().then((data) => {
    $("#car-2").attr("src", data.message);
  })
);
fetch("https://dog.ceo/api/breeds/image/random").then((response) =>
  response.json().then((data) => {
    $("#car-3").attr("src", data.message);
  })
);

function init() {
  var textValue = "98290";
  requestUrl += textValue;
  var array = [];
  getToken()
    .then((response) =>
      fetch(requestUrl, {
        headers: { Authorization: response },
      })
    )
    .then((response) => response.json())
    .then(function (data) {
      for (i = 0; i < resultsAmount; i++) {
        var newPet = {
          pictureSource: "",
          name: "",
          age: "",
          sex: "",
          phone: "",
          email: "",
          animal: "",
        };
        if (data.animals[i].primary_photo_cropped === null) {
          newPet.pictureSource =
            "https://i0.wp.com/orstx.org/wp-content/uploads/2019/10/no-photo-available-icon-12.jpg?fit=300%2C245&ssl=1"; //add path to image in folder
        } else {
          var object = data.animals[i].primary_photo_cropped;
          var key = Object.keys(object)[0];
          newPet.pictureSource = object[key];
        }
        newPet.name = data.animals[i].name;
        newPet.age = data.animals[i].age;
        newPet.sex = data.animals[i].gender;
        newPet.email = data.animals[i].contact.email;
        newPet.phone = data.animals[i].contact.phone;
        newPet.animal = data.animals[i].species;
        array.push(newPet);
      }
      displayPets(array);
    });
}

init();

function displayPets(anyArray) {
  for (i = 0; i < anyArray.length; i++) {
    var cardId = "card0" + i;
    var cardBodyId = "card-body0" + i;
    var factsListId = "facts-list0" + i;
    var newCard = document.createElement("div");
    var image = document.createElement("img");
    var cardBody = document.createElement("div");
    var petName = document.createElement("h5");
    var factsList = document.createElement("ul");
    var list1 = document.createElement("li");
    var list2 = document.createElement("li");
    var list3 = document.createElement("li");
    var saveButton = document.createElement("button");
    var contactButton = document.createElement("button");

    newCard.classList.add("card");
    newCard.setAttribute("phone", anyArray[i].phone);
    newCard.id = cardId;
    image.classList.add("card-img-top");
    image.src = anyArray[i].pictureSource;
    cardBody.classList.add("card-body");
    cardBody.id = cardBodyId;
    petName.classList.add("card-title");
    factsList.classList.add("list-group");
    factsList.classList.add("list-group-flush");
    factsList.id = factsListId;
    list1.classList.add("list-group-item");
    list1.textContent = "Age: " + anyArray[i].age;
    list2.classList.add("list-group-item");
    list2.textContent = "Gender: " + anyArray[i].sex;
    list3.classList.add("list-group-item");
    list3.textContent = "Species: " + anyArray[i].animal;
    petName.textContent = "Name: " + anyArray[i].name;
    saveButton.textContent = "Favorite";
    saveButton.classList.add("btn");
    saveButton.classList.add("btn-outline-dark");
    saveButton.classList.add("saveButton");
    contactButton.classList.add("btn");
    contactButton.classList.add("btn-outline-dark");
    // saveButton.classList.add("active");
    saveButton.setAttribute("data-toggle", "button");
    saveButton.setAttribute("aria-pressed", "false");
    contactButton.textContent = "Contact";

    // contactButton.on("click", displayContact(event));

    document.getElementById("section-dog").appendChild(newCard);
    document.getElementById(cardId).appendChild(image);
    document.getElementById(cardId).appendChild(cardBody);
    document.getElementById(cardBodyId).appendChild(petName);
    document.getElementById(cardId).appendChild(factsList);
    document.getElementById(factsListId).appendChild(list3);
    document.getElementById(factsListId).appendChild(list1);
    document.getElementById(factsListId).appendChild(list2);
    document.getElementById(cardBodyId).appendChild(saveButton);
    // document.getElementById(cardBodyId).appendChild(contactButton);
    // contactButton.addEventListener("click", function (event) {
    //   console.log($(event.target).parent());
    //   var phoneInfo = document.createElement("li");
    //   phoneInfo.textContent = "Phone Number: " + anyArray[i].phone;
    //   document.getElementById(factsListId).appendChild(phoneInfo);
    // });

    saveButton.addEventListener("click", function (event) {
      var favPet = {
        picSource: "",
        name: "",
        age: "",
        gender: "",
        phone: "",
        animal: "",
      };
      //add collecting phone and email and then displaying in modal
      var phoneString = $(event.target).parent().parent().attr("phone");
      favPet.phone = phoneString;
      var speciesString = $(event.target)
        .parent()
        .parent()
        .children()
        .eq(2)
        .children()
        .eq(0)
        .text();
      favPet.animal = speciesString.replace("Species: ", "");
      var nameString = $(event.target).parent().children().eq(0).text();
      console.log($(event.target).parent().children());
      favPet.name = nameString.replace("Name: ", "");
      var age = $(event.target)
        .parent()
        .parent()
        .children()
        .eq(2)
        .children()
        .eq(1)
        .text();
      favPet.age = age.replace("Age: ", "");
      var gender = $(event.target)
        .parent()
        .parent()
        .children()
        .eq(2)
        .children()
        .eq(2)
        .text();
      favPet.gender = gender.replace("Gender: ", "");
      var picSRC = $(event.target)
        .parent()
        .parent()
        .children()
        .eq(0)
        .attr("src");
      favPet.picSource = picSRC;
      if (savedPets === null) {
        savedPets = [];
      }
      savedPets.push(favPet);
      petToStorage = JSON.stringify(savedPets);
      localStorage.setItem("pets", petToStorage);
    });
  }
}

$("#search-button").on("click", function (event) {
  requestUrl =
    "https://api.petfinder.com/v2/animals?limit=" +
    resultsAmount +
    "&distance=10&location=";
  event.preventDefault();
  console.log(requestUrl);
  $("#section-dog").empty();
  var textValue = $(event.target).siblings().eq(0).val();
  console.log($(event.target).siblings().eq(0).val());
  requestUrl += textValue;
  var array = [];
  getToken()
    .then((response) =>
      fetch(requestUrl, {
        headers: { Authorization: response },
      })
    )
    .then((response) => response.json())
    .then(function (data) {
      console.log(data);
      for (i = 0; i < resultsAmount; i++) {
        var newPet = {
          pictureSource: "",
          name: "",
          age: "",
          sex: "",
          email: "",
          phone: "",
          animal: "",
        };
        if (data.animals[i].primary_photo_cropped === null) {
          newPet.pictureSource =
            "https://i0.wp.com/orstx.org/wp-content/uploads/2019/10/no-photo-available-icon-12.jpg?fit=300%2C245&ssl=1"; //add path to image in folder
        } else {
          var object = data.animals[i].primary_photo_cropped;
          var key = Object.keys(object)[0];
          newPet.pictureSource = object[key];
        }
        newPet.email = data.animals[i].contact.email;
        newPet.phone = data.animals[i].contact.phone;
        newPet.animal = data.animals[i].species;
        newPet.name = data.animals[i].name;
        newPet.age = data.animals[i].age;
        newPet.sex = data.animals[i].gender;
        console.log(newPet.animal);
        array.push(newPet);
      }
      displayPets(array);
    });
});

$("#favorite").on("click", function () {
  var petsArray = JSON.parse(localStorage.getItem("pets"));
  for (i = 0; i < petsArray.length; i++) {
    var cardId = "card00" + i;
    var cardBodyId = "card-body00" + i;
    var factsListId = "facts-list00" + i;
    var newCard = document.createElement("div");
    var image = document.createElement("img");
    var cardBody = document.createElement("div");
    var petName = document.createElement("h5");
    var factsList = document.createElement("ul");
    var list1 = document.createElement("li");
    // var list2 = document.createElement("li");
    // var list3 = document.createElement("li");

    newCard.classList.add("card");
    newCard.id = cardId;
    image.classList.add("card-img-top");
    image.src = petsArray[i].picSource;
    cardBody.classList.add("card-body");
    cardBody.id = cardBodyId;
    petName.classList.add("card-title");
    factsList.classList.add("list-group");
    factsList.classList.add("list-group-flush");
    factsList.id = factsListId;
    // list3.textContent = "Species: " + petsArray[i].animal;
    // list3.classList.add("list-group-item");
    list1.classList.add("list-group-item");
    list1.textContent = "Shelter Phone Number: " + petsArray[i].phone;
    // list2.classList.add("list-group-item");
    // list2.textContent = "Gender: " + petsArray[i].gender;
    petName.textContent = "Name: " + petsArray[i].name;

    document.getElementById("modal-body").appendChild(newCard);
    document.getElementById(cardId).appendChild(image);
    document.getElementById(cardId).appendChild(cardBody);
    document.getElementById(cardBodyId).appendChild(petName);
    document.getElementById(cardId).appendChild(factsList);
    // document.getElementById(factsListId).appendChild(list3);
    document.getElementById(factsListId).appendChild(list1);
    // document.getElementById(factsListId).appendChild(list2);

    console.log(petName);
  }
});

//Add filters to nav bar
//Seventh step: add a "contact" button on each card. This could display a modale with the phone number, email and address for the shelter

//Eigth step: add which type of animal each one is
//Ninth step:

//Make favorite button stay highlighted after click
//separate buttons
//add contact info
