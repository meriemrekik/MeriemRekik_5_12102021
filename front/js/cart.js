
let panier = [];
let sectionElement = null;
//un tableau qui contiendra toute les informations de chaque canapé présent dans panier
let listeInfosCanape = [];
let totalePricePanier = 0;
let totaleQuantitePanier = 0;
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
let bouttonCommander = null;
let form = null;


let ajouteCanapeDansPanier = (infosCanape, indexPanier) => {
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
        console.log(indexToDelete);
        /* let aSupprimer = deleteElementQuantity.closest('article');
        aSupprimer.remove();*/
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
        ajouteCanapeDansPanier(infoCanape, i);
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


// Fonction qui vérifie si les infos du formulaire sont bonnes
let verifInfos = () => {
    let emailErrorMsg = document.getElementById('emailErrorMsg');
    if (!VerifFormulaire.validateEmail(data.contact.email)) {
        emailErrorMsg.innerText = "Votre email n'est pas valide !";
        return false;
    } else {
        emailErrorMsg.innerText = "";
    }

    let firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
    if (!VerifFormulaire.contientUniquementDesLettresEspaces(data.contact.firstName)) {
        firstNameErrorMsg.innerText = "Ce champ ne peut contenir que des lettres";
        return false;
    } else {
        firstNameErrorMsg.innerText = "";
    }

    let lastNameErrorMsg = document.getElementById('lastNameErrorMsg');
    if (!VerifFormulaire.contientUniquementDesLettresEspaces(data.contact.lastName)) {
        lastNameErrorMsg.innerText = "Ce champ ne peut contenir que des lettres";
        return false;
    } else {
        lastNameErrorMsg.innerText = "";
    }

    let addressErrorMsg = document.getElementById('addressErrorMsg');
    if (!VerifFormulaire.contientUniquementDesLettresEspacesChiffres(data.contact.address)) {
        addressErrorMsg.innerText = "Ce champ ne peut contenir que des lettres et des chiffres";
        return false;
    } else {
        addressErrorMsg.innerText = "";
    }

    let cityErrorMsg = document.getElementById('cityErrorMsg');
    if (!VerifFormulaire.contientUniquementDesLettresEspaces(data.contact.city)) {
        cityErrorMsg.innerText = "Ce champ ne peut contenir que des lettres";
        return false;
    } else {
        cityErrorMsg.innerText = "";
    }

    return true;
}

// Fonction qui permet de récupérer les infos venant du formulaire
let getInfos = function (e) {
    // on empeche le formulaire d'être envoyé
    e.preventDefault();
    data.contact.firstName = document.getElementById('firstName').value.trim();
    data.contact.lastName = document.getElementById('lastName').value.trim();
    data.contact.address = document.getElementById('address').value.trim();
    data.contact.city = document.getElementById('city').value.trim();
    data.contact.email = document.getElementById('email').value.trim();

    // On parcours le panier
    for (let p of panier) {
        // pour chaque element dans le panier on rajoute l'id selon la quantité
        for (let i = 0; i < p.quantity; i++) {
            data.products.push(p.id);
        }
    }

    const formEstValide = verifInfos();

    if (formEstValide && panier.length > 0) {
        createOrder(data);
    }
    else {
        alert("Votre panier est vide. ");
    }
}



function createOrder(data) {
    fetch(URL_API + '/products/order', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        panier = [];
        savePanier(panier);
        document.location.href = "./confirmation.html?orderId=" + data.orderId;
    });
}

let init = () => {

    //partie 1 on affiche les elements de notre panier
    panier = getPanier();
    sectionElement = document.getElementById("cart__items");

    afficherToutMonPanier();

    //partie 2 on gére la création de notre commande 
    bouttonCommander = document.getElementById('order');
    // on récpère le formulaire du html
    form = document.querySelector(".cart__order__form");
    // lorsque le formulaire est soumi on utilise la fonction getInfos
    form.setAttribute('onsubmit', "return getInfos(event)");
}

init();
