let myProduct = {
    "colors": [
        "Green",
        "Red",
        "Orange"
    ],
    "_id": "055743915a544fde83cfdfc904935ee7",
    "name": "Kanap Calycé",
    "price": 3199,
    "imageUrl": "http://localhost:3000/images/kanap03.jpeg",
    "description": "Pellentesque fermentum arcu venenatis ex sagittis accumsan. Vivamus lacinia fermentum tortor.Mauris imperdiet tellus ante.",
    "altTxt": "Photo d'un canapé d'angle, vert, trois places"
};

let priceElement = document.getElementById('price');
priceElement.innerText = myProduct['price'];

let titleElement = document.getElementById('title');
titleElement.innerText = myProduct['name'];

let descriptionElement = document.getElementById('description');
descriptionElement.innerText = myProduct['description'];

let imageContainerElement = document.querySelector("section.item article .item__img");
console.log(imageContainerElement);
let imageElement = document.createElement("img");
imageElement.src = myProduct['imageUrl'];
imageElement.alt = myProduct['altTxt'];
console.log(imageElement);
imageContainerElement.appendChild(imageElement);