const newProductCards = (productArray) => {
  productArray.forEach((element) => {
    const newDivCol = document.createElement("div");
    newDivCol.classList.add("col");
    newDivCol.innerHTML = `
        <div class="card h-100 mt-5 border-0 ">
  <img src="${element.imageUrl}" class="card-img-top" alt="...">
  <div class="card-body d-flex flex-column justify-content-between ">
  <div>
  <h5 class="card-title">${element.name}</h5>
  <h3>${element.brand}</h3>
  <p class="card-text overflow-auto ">${element.description}</p>
  </div>
  <div class='d-flex flex-column'>
  <a href="#" class="btn btn-success mb-2">${element.price} $</a>
  <a href="./details.html?idCard=${element._id}" class="btn btn-info"><i class="bi bi-search pe-2"></i>Scopri di più</a>
  </div>
  </div>
</div>
        `;
    const rowProducts = document.getElementById("space-product");
    rowProducts.appendChild(newDivCol);
  });
};

const prodottiApi = () => {
  const apiURL = "https://striveschool-api.herokuapp.com/api/product/";
  fetch(apiURL, {
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
      newProductCards(data);
    })
    .catch();
};
prodottiApi();
