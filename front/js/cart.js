const urlApi = "http://localhost:3000/api";

let panier = [];

if (localStorage.getItem("panier")) {
    panier = JSON.parse(localStorage.getItem("panier"));
}
console.table(panier);


let sectionElement = document.getElementById("cart__items");

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
    inputElement.addEventListener("change", () => {
        panier[indexPanier].quantity = parseInt(inputElement.value);
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
        let aSupprimer = document.querySelector('article[data-id="' + infosCanape._id + '-' + panier[indexPanier].colors + '"]');
        console.log(aSupprimer);
        aSupprimer.remove();
        panier.splice(indexPanier, 1);
        listeInfosCanape.splice(indexPanier, 1);
        savePanier();
        calculeMonPanier();
    });
}

// Fonction permettant de récupere les infos d'un canapé par son id
let getCanape = (idCanape) => {
    return fetch(urlApi + "/products/" + idCanape)
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


let listeInfosCanape = [];
let totalePricePanier = 0;
let totaleQuantitePanier = 0;

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
        console.log(infoCanape);
        listeInfosCanape.push(infoCanape);
        afficheCanapeDansPanier(infoCanape, i);
    }
    calculeMonPanier();
}

let calculeMonPanier = () => {
    totalePricePanier = 0;
    totaleQuantitePanier = 0;
    for (let i = 0; i < panier.length; i++) {
        totalePricePanier += listeInfosCanape[i].price * panier[i].quantity;
        totaleQuantitePanier += panier[i].quantity;
    }
    afficherTotalePanier(totalePricePanier, totaleQuantitePanier);
}


afficherToutMonPanier();

let savePanier = () => {
    localStorage.setItem("panier", JSON.stringify(panier));
}



// Infos à envoyer pour créer un bon de commande
let data = {
    contact: {
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        email: "",
    },
    products: []
}

const bouttonCommander = document.getElementById('order');

// Fonction qui vérifie si les infos du formulaire sont bonnes
let verifInfos = () => {
    let emailErrorMsg = document.getElementById('emailErrorMsg');
    if (!VerifFormulaire.validateEmail(data.contact.email)) {

    } else {

    }

    let firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
    if (!VerifFormulaire.contientUniquementDesLettres(data.contact.firstName)) {

    }
}

// Fonction qui permet de récupérer les infos venant du formulaire
let getInfos = function (e) {
    // on empeche le formulaire d'être envoyé
    e.preventDefault();
    data.contact.firstName = document.getElementById('firstName').value;
    data.contact.lastName = document.getElementById('lastName').value;
    data.contact.address = document.getElementById('address').value;
    data.contact.city = document.getElementById('city').value;
    data.contact.email = document.getElementById('email').value;
    // On parcours le panier
    for (let p of panier) {
        // pour chaque element dans le panier on rajoute l'id selon la quantité
        for (let i = 0; i < p.quantity; i++) {
            data.products.push(p.id);
        }
    }
    console.log(data);
}

// on récpère le formulaire du html
let form = document.querySelector(".cart__order__form");
// lorsque le formulaire est soumi on utilise la fonction getInfos
form.setAttribute('onsubmit', "return getInfos(event)");

// on crée cette class avec pleins de fonctions pour tester les valeurs dans notre formulaire
class VerifFormulaire {
    static contientUniquementDesLettres(inputtxt) {
        var letters = /^[A-Za-z]+$/;
        if (inputtxt.value.match(letters)) {
            return true;
        }
        else {
            return false;
        }
    }

    static validateEmail(mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return true;
        }
        return false;
    }
}