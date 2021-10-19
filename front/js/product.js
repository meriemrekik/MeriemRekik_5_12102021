const urlApi = "http://localhost:3000/api";


let getIdFromUrl = () => {
    let url = new URL(document.location.href);
    let search_params = new URLSearchParams(url.search);
    if (search_params.has('id')) {
        let id = search_params.get('id');
        console.log(id);
        return id;
    }
    return null;
}

const id = getIdFromUrl();

let getCanape = (idCanape) => {
    fetch(urlApi + "/products/" + id)
        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function (canape) {
            afficheCanape(canape);
        })
        .catch(function (err) {
            // Une erreur est survenue
        });

}

getCanape(id);

let afficheCanape = (myProduct) => {

    let priceElement = document.getElementById('price');
    priceElement.innerText = myProduct['price'];

    let titleElement = document.getElementById('title');
    titleElement.innerText = myProduct['name'];

    let descriptionElement = document.getElementById('description');
    descriptionElement.innerText = myProduct['description'];


    let imageContainerElement = document.querySelector("section.item article .item__img");
    let imageElement = document.createElement("img");
    imageElement.src = myProduct['imageUrl'];
    imageElement.alt = myProduct['altTxt'];
    imageContainerElement.appendChild(imageElement);


    let selectElement = document.getElementById("colors");
    for (let color of myProduct['colors']) {
        let optionElement = document.createElement("option");
        optionElement.value = color.toLowerCase();
        optionElement.innerText = color;
        selectElement.appendChild(optionElement);
    }

}

