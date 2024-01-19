const nameInput = document.getElementById("name");
const brandInput = document.getElementById("brand");
const descriptionInput = document.getElementById("description");
const imgInput = document.getElementById("img");
const priceInput = document.getElementById("price");

const resetButton = document.getElementById("reset");

const form = document.getElementById("form");

const apiURL = "https://striveschool-api.herokuapp.com/api/product/";

const indirizzoCard = new URLSearchParams(location.search);
const idCard = indirizzoCard.get("idCard");

// SEZIONE MODIFICA
if (idCard) {
  document.getElementById("titlo-form").innerText = "Modifica l'annuncio";
  fetch(apiURL + "/" + idCard, {
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhMmYxMjE4N2U1YzAwMTgxNGM1ZjIiLCJpYXQiOjE3MDU2NTE5ODYsImV4cCI6MTcwNjg2MTU4Nn0.5nsdx8ruJKVfg_panRTUCarI0x0nQmX4fQBfYRhvtrE",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Impossibile trovare elemento: riprova");
      }
    })
    .then((onep) => {
      (nameInput.value = onep.name),
        (brandInput.value = onep.brand),
        (descriptionInput.value = onep.description),
        (imgInput.value = onep.imageUrl),
        (priceInput.value = onep.price);
    })
    .catch((err) => {
      console.log(err);
    });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const newProduct = {
    name: nameInput.value,
    brand: brandInput.value,
    description: descriptionInput.value,
    imageUrl: imgInput.value,
    price: priceInput.value,
  };
  // SEZIONE METHOD
  let UrlInUso;
  let metodoDaUsare;
  if (idCard) {
    metodoDaUsare = "PUT";
    UrlInUso = apiURL + "/" + idCard;
  } else {
    metodoDaUsare = "POST";
    UrlInUso = apiURL;
  }
  // -----------------------
  fetch(UrlInUso, {
    method: metodoDaUsare,
    body: JSON.stringify(newProduct),
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhMmYxMjE4N2U1YzAwMTgxNGM1ZjIiLCJpYXQiOjE3MDU2NTE5ODYsImV4cCI6MTcwNjg2MTU4Nn0.5nsdx8ruJKVfg_panRTUCarI0x0nQmX4fQBfYRhvtrE",
    },
  })
    .then((response) => {
      if (response.ok) {
        alert("Annunicio creato con successo!");
        nameInput.value = "";
        brandInput.value = "";
        descriptionInput.value = "";
        imgInput.value = "";
        priceInput.value = "";
        return response.json();
      } else {
        alert("errore");
      }
    })
    .catch((err) => {
      console.log("errore", err);
    });
});

resetButton.addEventListener("click", function () {
  nameInput.value = "";
  brandInput.value = "";
  descriptionInput.value = "";
  imgInput.value = "";
  priceInput.value = "";
});
