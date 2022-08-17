var requestUrl = "https://api.petfinder.com/v2/animals";

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
      console.log(data);
      console.log("Bearer: " + data.access_token);
      return "Bearer " + data.access_token;
    });
}

getToken().then((response) =>
  fetch(requestUrl, {
    headers: { Authorization: response },
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
);

//TODO: search function (lines 30 - 60)

//TODO: load pictures, name, male/female, age (lines 60 - 80)
