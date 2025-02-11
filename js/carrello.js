

//aggiorna quantità 
document.addEventListener("DOMContentLoaded", function () {
    const plus = document.querySelector(".plus"),
        minus = document.querySelector(".minus"),
        num = document.querySelector(".num");
    price = document.getElementById("price");
    total = document.querySelector(".riepilogo p strong");
    remove = document.querySelector(".rimuovi");
    cart = document.querySelector(".carrello .row.text-center.align-items-center");




    let qta = 1;
    let unitPrice = parseFloat(price.innerText.replace("€", "").replace(",", "."));


    plus.addEventListener("click", () => {

        if (qta < 10) {
            qta++;

            num.innerText = qta;
            updateTotPrice();
            console.log(qta);
        }
    });

    minus.addEventListener("click", () => {
        if (qta > 1) {
            qta--;

            num.innerText = qta;
            updateTotPrice();
            console.log(qta);
        }
    });

    function updateTotPrice() {
        let newTot = (qta * unitPrice).toFixed(2).replace(".", ",");
        price.innerText = `€${newTot}`;
        total.innerText = `€${newTot}`;
    }

    remove.addEventListener("click", function () {
        cart.remove();
        total.textContent = "€0.00";
    });

});
