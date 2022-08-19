var resultsAmount = "20";
var requestUrl =
  "https://api.petfinder.com/v2/animals?limit=" +
  resultsAmount +
  "&distance=10&location=";
console.log(requestUrl);
var cardContainer = document.querySelector("section-dog");

var array = [];

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
    console.log(data.message);
    $("#car-1.").setAttribute("src", data.message);
  })
);
fetch("https://dog.ceo/api/breeds/image/random").then((response) =>
  response.json().then((data) => {
    console.log(data.message);
    $("#car-2.").setAttribute("src", data.message);
  })
);
fetch("https://dog.ceo/api/breeds/image/random").then((response) =>
  response.json().then((data) => {
    console.log(data.message);
    $("#car-3.").setAttribute("src", data.message);
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
      //MAKE SURE YOU ITERATE THE SAME NUMBER OF TIMES AS THE NUMBER OF PETS PULLED FROM API (REMEMBER ERIK)
      console.log(data);
      for (i = 0; i < resultsAmount; i++) {
        var newPet = {
          pictureSource: "",
          name: "",
          age: "",
          sex: "",
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
        array.push(newPet);
        console.log(array);
      }
      displayPets(array);
    });
}

init();

function displayPets(anyArray) {
  //create element
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
    console.log(newCard);
    console.log(anyArray);
    console.log(anyArray[i]);
    console.log(anyArray[i].name);
    newCard.classList.add("card");
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
    petName.textContent = "Name: " + anyArray[i].name;

    document.getElementById("section-dog").appendChild(newCard);
    document.getElementById(cardId).appendChild(image);
    document.getElementById(cardId).appendChild(cardBody);
    document.getElementById(cardBodyId).appendChild(petName);
    document.getElementById(cardId).appendChild(factsList);
    document.getElementById(factsListId).appendChild(list1);
    document.getElementById(factsListId).appendChild(list2);
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
      for (i = 0; i < resultsAmount; i++) {
        var newPet = {
          pictureSource: "",
          name: "",
          age: "",
          sex: "",
        };
        console.log(data.animals[i]);
        console.log(data.animals[i].primary_photo_cropped);
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
        array.push(newPet);
      }
      displayPets(array);
    });
});

var pet1 = {
  age: "Young",
  sex: "male",
  image_src: "#",
  animal: "cat",
};
var pet2 = {
  age: "Young",
  sex: "female",
  image_src: "#",
  animal: "cat",
};
var pet3 = {
  age: "Old",
  sex: "female",
  image_src: "#",
  animal: "dog",
};

var petsExampleArray = [pet1, pet2, pet3];
