
//recuperer tt les donnée du canapé depuis l'api
//mport urlApi from "./config.js";
const urlApi = "http://localhost:3000/api";
let getAllCapane = () => {
    fetch(urlApi + "/products/")
        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function (allCanapes) {
            displayAllCanape(allCanapes);
        })
        .catch(function (err) {
            // Une erreur est survenue
        });

}
getAllCapane();


//afficher les canape dans ma page 
let displayAllCanape = (allCanapes) => {

    //recuperer l'element html section avec id "items"
    let itemsContainerElement = document.getElementById('items');
    console.log(itemsContainerElement);
    for (let canape of allCanapes) {
        console.log(canape);
        //je crée ma balise a 
        let canapeElement = document.createElement("a");
        //je mes le lien vers la page product avec id 
        canapeElement.href = "./product.html?id=" + canape._id;
        //je rajoute ma balise a a ma section id="items"
        itemsContainerElement.appendChild(canapeElement);

        //je crée ma balise article 
        let articleElement = document.createElement("article");
        canapeElement.appendChild(articleElement);

        let imageElement = document.createElement("img");
        imageElement.src = canape.imageUrl;
        imageElement.alt = canape.altTxt;
        articleElement.appendChild(imageElement);

        let titreElement = document.createElement("h3");
        titreElement.innerText = canape.name;
        titreElement.className = 'productName';
        articleElement.appendChild(titreElement);

        let paragrapheElement = document.createElement("p");
        paragrapheElement.className = 'productDescription';
        paragrapheElement.innerText = canape.description;
        articleElement.appendChild(paragrapheElement);






    }
}



//boucler sur les donners de tableau du canapé et pour chaque itération 





