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
    e.preventDefault();
    if (panier.length == 0) { // si le panier contient au moins 1 produit
        alert("Votre panier est vide, veuillez y placer au moins un produit et remplir le formulaire.");
        return false;
    }
    // on empeche le formulaire d'être envoyé
    data.contact.firstName = document.getElementById('firstName').value.trim();
    data.contact.lastName = document.getElementById('lastName').value.trim();
    data.contact.address = document.getElementById('address').value.trim();
    data.contact.city = document.getElementById('city').value.trim();
    data.contact.email = document.getElementById('email').value.trim();

    data.products = [];
    // On parcours le panier
    for (let p of panier) {
        // pour chaque element dans le panier on rajoute l'id selon la quantité
        for (let i = 0; i < p.quantity; i++) {
            data.products.push(p.id);
        }
    }

    const formEstValide = verifInfos();
    if (formEstValide == false) { // Si le formulaire est pas parfaitement rempli
        return false; // on arrete
    }

    createOrder(data); // on crée le bon de commandes

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
        // on vide le panier
        panier = [];
        // on sauvegarde le panier vide
        savePanier(panier);
        // on va sur la page confirmation en passant l'id de la commande dans l'url
        document.location.href = "./confirmation.html?orderId=" + data.orderId;
    });
}



let initForm = () => {

    // on recupère les elements de notre panier
    panier = getPanier();
    // on gére la création de notre commande 
    bouttonCommander = document.getElementById('order');
    // on récpère le formulaire html
    form = document.querySelector(".cart__order__form");
    // lorsque le formulaire est soumi on utilise la fonction getInfos
    form.setAttribute('onsubmit', "return getInfos(event)");
    if (panier.length == 0) {
        desactiverFormulaire();
    }
}

initForm();
