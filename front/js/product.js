const urlApi = "http://localhost:3000/api";

//recupérer l'id du canapé ^résent dans url de la page
let getIdFromUrl = () => {
    //permet de récupérer l'url de la page
    let url = new URL(document.location.href);
    //permet de recuperer les paramétres présent dans url
    let search_params = new URLSearchParams(url.search);
    // si on a un paramétre id dans url
    if (search_params.has('id')) {
        //on récupére paramétre id et le retourne
        let id = search_params.get('id');
        console.log(id);
        return id;
    }
    //si on pas de paramétre id il retourne null
    return null;
}

const id = getIdFromUrl();

//on récupére les donnés du canapé à partir de l'id
let getCanape = (idCanape) => {
    fetch(urlApi + "/products/" + idCanape)
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

//ajout au panier
let buttonAdd = document.getElementById("addToCart");
let quantityElement = document.getElementById("quantity");
let colorsElement = document.getElementById("colors");

let panier = [];
if (localStorage.getItem("panier")) {
    panier = JSON.parse(localStorage.getItem("panier"));
}


let addPanier = () => {
    let find = panier.findIndex(
        c => c.id == id && c.colors == colorsElement.value);
    if (find >= 0) {
        panier[find].quantity += parseInt(quantityElement.value);
    }
    else {
        //on ajoute le produit
        panier.push(
            {
                "id": id,
                "quantity": parseInt(quantityElement.value),
                "colors": colorsElement.value
            }

        );
    }

    console.log(panier);
    localStorage.setItem("panier", JSON.stringify(panier));

}
buttonAdd.addEventListener('click', function () {          // On écoute l'événement click
    if (quantityElement.value == 0) {
        alert("Vous devez modifier la quantité");
    }
    else if (colorsElement.value == "") {
        alert("Vous devez choisir une color")

    }
    else {
        addPanier();
    }


});