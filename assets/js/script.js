var requestUrl = "https://api.petfinder.com/v2/animals";

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

//With new access token, pulls data from api and outputs to the console
getToken().then((response) =>
  fetch(requestUrl, {
    headers: { Authorization: response },
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
);

//TODO: Write function to take zipcode input from search bar and pull most recent pets from that zipcode
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
