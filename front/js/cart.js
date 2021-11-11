
let panier = [];
let sectionElement = null;
//un tableau qui contiendra toute les informations de chaque canapé présent dans panier
let listeInfosCanape = [];
let totalePricePanier = 0;
let totaleQuantitePanier = 0;
// Infos à envoyer pour créer un bon de commande

let afficheCanapeDansPanier = (infosCanape, indexPanier) => {
    let articleElement = document.createElement("article");
    articleElement.className = "cart__item";
    articleElement.setAttribute("data-id", infosCanape._id + "-" + panier[indexPanier].colors);
    sectionElement.appendChild(articleElement);

    // création de l'image dans l'element 
    let imageContainerElement = document.createElement("div");
    imageContainerElement.className = "cart__item__img";
    articleElement.appendChild(imageContainerElement);
    let imageElement = document.createElement("img");
    imageElement.src = infosCanape.imageUrl;
    imageElement.alt = infosCanape.altTxt;
    imageContainerElement.appendChild(imageElement);

    //on crée la div qui contient toute les information du produit
    let carteContentElement = document.createElement("div");
    carteContentElement.className = "cart__item__content";
    articleElement.appendChild(carteContentElement);

    // Je crée la div qui va contenir le titre et le prix
    let titlePriceContainerElement = document.createElement("div");
    titlePriceContainerElement.className = "cart__item__content__titlePrice";
    carteContentElement.appendChild(titlePriceContainerElement);

    //j'affiche le nom de mon produit
    let titleElement = document.createElement("h2");
    titleElement.innerText = infosCanape.name + " " + panier[indexPanier].colors;
    titlePriceContainerElement.appendChild(titleElement);

    //j'affiche le prix
    let priceElement = document.createElement("p");
    priceElement.innerText = infosCanape.price.toFixed(2) + " €";
    titlePriceContainerElement.appendChild(priceElement);

    // je crée le conteneur des options de ce produit 
    let settingsElement = document.createElement("div");
    settingsElement.className = "cart__item__content__settings";
    carteContentElement.appendChild(settingsElement);
    // j'affiche le bloc quantité
    let quantityContainerElement = document.createElement("div");
    quantityContainerElement.className = "cart__item__content__settings__quantity";
    settingsElement.appendChild(quantityContainerElement);
    let labelQuantityElement = document.createElement("p");
    labelQuantityElement.innerText = "Qté :";
    settingsElement.appendChild(labelQuantityElement);
    let inputElement = document.createElement("input");
    inputElement.type = "number";
    inputElement.name = "itemQuantity"
    inputElement.className = "itemQuantity";
    inputElement.min = 1;
    inputElement.max = 100;
    inputElement.value = panier[indexPanier].quantity;

    // au changement de la valeur dans l'input on change la valeur dans panier
    inputElement.addEventListener("change", () => {
        const indexToChange = [...sectionElement.children].indexOf(articleElement);
        panier[indexToChange].quantity = parseInt(inputElement.value);
        calculeMonPanier();
        savePanier();
    });
    settingsElement.appendChild(inputElement);

    //comment je suprime la produit dans panier
    let deleteContainerElement = document.createElement("div");
    deleteContainerElement.className = "cart__item__content__settings__delete";
    settingsElement.appendChild(deleteContainerElement);
    let deleteElementQuantity = document.createElement("p");
    deleteElementQuantity.className = "deleteItem";
    deleteElementQuantity.innerText = "Supprimer";
    deleteContainerElement.appendChild(deleteElementQuantity);

    deleteElementQuantity.addEventListener("click", () => {
        const indexToDelete = [...sectionElement.children].indexOf(articleElement);
        articleElement.remove();

        panier.splice(indexToDelete, 1);
        listeInfosCanape.splice(indexToDelete, 1);
        savePanier(panier);
        calculeMonPanier();
    });
}

// Fonction permettant de récupere les infos d'un canapé par son id
let getCanape = (idCanape) => {
    return fetch(URL_API + "/products/" + idCanape)
        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
        }).then(function (canape) {
            return canape;
        })
        .catch(function (err) {
            // Une erreur est survenue
        });
    // return infoCanape;
}


let afficherTotalePanier = (price, quantity) => {
    let totalPriceElement = document.getElementById("totalPrice");
    totalPriceElement.innerText = price.toFixed(2);
    let totalQuantityElement = document.getElementById("totalQuantity");
    totalQuantityElement.innerText = quantity;
}

let afficherToutMonPanier = async () => {
    listeInfosCanape = [];
    for (let i = 0; i < panier.length; i++) {
        let infoCanape = null;
        await getCanape(panier[i].id).then((res) => infoCanape = res);
        listeInfosCanape.push(infoCanape);
        afficheCanapeDansPanier(infoCanape, i);
    }
    calculeMonPanier();
}

let calculeMonPanier = () => {
    totalePricePanier = 0;
    totaleQuantitePanier = 0;
    for (let i = 0; i < panier.length; i++) {
        totalePricePanier += listeInfosCanape[i].price * panier[i].quantity;// totalPrix = prix du canape * la quantité
        totaleQuantitePanier += panier[i].quantity;// totalQuantite = totalQuantite + quantité du canapé
    }
    afficherTotalePanier(totalePricePanier, totaleQuantitePanier);
    if (panier.length == 0) {
        desactiverFormulaire();
    }
}

let init = () => {

    // on affiche les elements de notre panier
    panier = getPanier();
    sectionElement = document.getElementById("cart__items");
    afficherToutMonPanier();
}

init();
