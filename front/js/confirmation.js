
let init = () => {
    const orderId = getParamFromUrl('orderId');
    let orderIdElment = document.getElementById('orderId');
    orderIdElment.innerText = orderId;
}

init();
