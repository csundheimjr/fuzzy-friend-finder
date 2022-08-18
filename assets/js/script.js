var requestUrl =
  "https://api.petfinder.com/v2/animals?limit=6&distance=10&location=";
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

/* <div id="card1" class="card" style="width: 18rem">
          <img src="..." class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div> */
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
    // var pic = document.createElement("image");
    // var nameEl = document.createElement("h4");
    // var ageEl = document.createElement("h5");
    // var genderEl = document.createElement("h5");
    // //alter or add text
    console.log(anyArray);
    console.log(anyArray[i]);
    console.log(anyArray[i].name);
    // nameEl.textContent = anyArray[0].name;
    // ageEl.textContent = anyArray[0].age;
    // genderEl.textContent = anyArray[0].sex;
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
    list1.textContent = anyArray[i].age;
    list2.classList.add("list-group-item");
    list2.textContent = anyArray[i].sex;
    petName.textContent = "Captain Carrot";
    petName.textContent = anyArray[i].name;

    // .addClass("card")
    // .css("width", "18rem")
    // .css("border", "2px solid black");
    //append
    document.getElementById("section-dog").appendChild(newCard);
    document.getElementById(cardId).appendChild(image);
    document.getElementById(cardId).appendChild(cardBody);
    document.getElementById(cardBodyId).appendChild(petName);
    document.getElementById(cardId).appendChild(factsList);
    document.getElementById(factsListId).appendChild(list1);
    document.getElementById(factsListId).appendChild(list2);
  }
}

//On click, input from search is added on to the end of the request url and then data is fetched from the api
//Api provides 5 pets with tons of data in console
//TODO: take data and turn into an array object for each pet
//TODO: turn array into dynamically created cards on

$("#search-button").on("click", function (event) {
  event.preventDefault();
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
      //MAKE SURE YOU ITERATE THE SAME NUMBER OF TIMES AS THE NUMBER OF PETS PULLED FROM API (REMEMBER ERIK)
      for (i = 0; i < 6; i++) {
        var newPet = {
          pictureSource: "",
          name: "",
          age: "",
          sex: "",
        };
        console.log(data.animals[i]);
        console.log(data.animals[i].primary_photo_cropped);
        if (data.animals[i].primary_photo_cropped === null) {
          newPet.pictureSource = "#"; //add path to image in folder
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

//After creating an array of objects in this function, call the function below

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
//TODO: Write function to turn API data into cards on html using the example array above for now
//create elements
//add text/images to elements
//append elements
