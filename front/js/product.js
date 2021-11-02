let id = "";
let buttonAdd = null;
let quantityElement = null;
let colorsElement = null;
let panier = [];



//on récupére les donnés du canapé à partir de l'id
let getCanape = (idCanape) => {
    fetch(URL_API + "/products/" + idCanape)
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

    let quantityElement = document.getElementById('quantity');
    quantityElement.value = 1;

}


let addPanier = () => {
    // on recherche la position dans le panier du produit si'il existe déja avec la meme couleur
    let find = panier.findIndex(
        c => c.id == id && c.colors == colorsElement.value);

    //si il existe déja 
    if (find >= 0) {
        //alors on met a jour la quantité
        panier[find].quantity += parseInt(quantityElement.value);
    }
    else {
        // sinon on ajoute le produit dans cette couleur
        panier.push(
            {
                "id": id,
                "quantity": parseInt(quantityElement.value),
                "colors": colorsElement.value
            }

        );
    }

    // on sauvegarde dans le localStorage
    savePanier(panier);
    document.location.href = "./cart.html";
}


let init = () => {

    //partie 1 pn affiche le canape
    id = getParamFromUrl('id');
    getCanape(id);

    //partie 2 on gére la gestion du panier
    //ajout au panier
    buttonAdd = document.getElementById("addToCart");
    quantityElement = document.getElementById("quantity");
    colorsElement = document.getElementById("colors");

    panier = getPanier();

    // On écoute l'événement click
    buttonAdd.addEventListener('click', function () {
        if (colorsElement.value == "") {
            alert("Vous devez choisir une couleur");
        } else {
            addPanier();
        }
    });
}

init();