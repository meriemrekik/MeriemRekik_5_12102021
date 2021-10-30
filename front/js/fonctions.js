let getParamFromUrl = (param) => {
    //permet de récupérer l'url de la page
    let url = new URL(document.location.href);
    //permet de recuperer les paramétres présent dans url
    let search_params = new URLSearchParams(url.search);
    // si on a un paramétre id dans url
    if (search_params.has(param)) {
        //on récupére paramétre et on retourne la valeure associé
        let value = search_params.get(param);
        return value;
    }
    //si on pas de paramétre id il retourne null
    return null;
}


let savePanier = (panier) => {
    localStorage.setItem("panier", JSON.stringify(panier));
}

let getPanier = () => {
    if (localStorage.getItem("panier")) {
        return JSON.parse(localStorage.getItem("panier"));
    }
    return [];
}

// on crée cette class avec pleins de fonctions pour tester les valeurs dans notre formulaire
class VerifFormulaire {

    static accent = "àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ";

    static contientUniquementDesLettresEspaces(inputtxt) {
        let letters = "^[A-Za-z" + this.accent + " ](-*[A-Za-z" + this.accent + " ]*)+$";
        let lettersRegexp = new RegExp(letters);
        if (inputtxt.match(lettersRegexp)) {
            return true;
        }
        else {
            return false;
        }
    }


    static contientUniquementDesLettresEspacesChiffres(input) {
        let letters_numbers = new RegExp("^[a-zA-Z0-9" + this.accent + " \s]+$");
        if (input.match(letters_numbers)) {
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





