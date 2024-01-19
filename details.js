const indirizzoCard = new URLSearchParams(location.search);
const idCard = indirizzoCard.get("idCard");

const apiURL = "https://striveschool-api.herokuapp.com/api/product/";

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
      throw new Error("errore!!!");
    }
  })
  .then((data) => {
    console.log(data);
    document.getElementById("name").innerText = data.name;
    document.getElementById("brand").innerText = data.brand;
    document.getElementById("description").innerText = data.description;
    const newImm = document.getElementById("img");
    const newUrlImm = data.imageUrl;
    newImm.src = newUrlImm;
    document.getElementById("price").innerText = data.price + "$";
    // -------- TASTO CANCELLA
    document.getElementById("cancella").addEventListener("click", function () {
      fetch(apiURL + "/" + idCard, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhMmYxMjE4N2U1YzAwMTgxNGM1ZjIiLCJpYXQiOjE3MDU2NTE5ODYsImV4cCI6MTcwNjg2MTU4Nn0.5nsdx8ruJKVfg_panRTUCarI0x0nQmX4fQBfYRhvtrE",
        },
      })
        .then((response) => {
          if (response.ok) {
            alert("Annuncio cancellato. Ci dispiace :'(");
            location.assign("./home.html");
          } else {
            alert("c'è qualche problema con la cancellazione");
            throw new Error("errore in fase di cancellazione");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
    // --------TASTO MODIFICA
    document
      .getElementById("modifica")
      .setAttribute("href", "./sell.html?idCard=" + data._id);
  })
  .catch((err) => {
    console.log(err);
  });
