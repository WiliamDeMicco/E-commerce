/*document.addEventListener("DOMContentLoaded", async function () {
    const carrelloContainer = document.getElementById("prodottiAdd");
    const totalElement = document.querySelector(".riepilogo p strong");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Funzione per recuperare i dettagli dei prodotti da FakeStore API
    async function fetchProducts(cartItems) {
        let products = [];

        for (let item of cartItems) {
            try {
                let response = await fetch(`https://fakestoreapi.com/products/${item.id}`);
                let product = await response.json();
                products.push({ ...product, quantity: item.quantity });
            } catch (error) {
                console.error(`Errore nel recupero del prodotto con ID ${item.id}:`, error);
            }
        }
        return products;
    }

    // Funzione per aggiornare il carrello in pagina
    async function renderCarrello() {
        carrelloContainer.innerHTML = "";
        let totalPrice = 0;

        if (cart.length === 0) {
            carrelloContainer.innerHTML = `<p>Il carrello è vuoto.</p>`;
            totalElement.textContent = "€0.00";
            return;
        }

        let products = await fetchProducts(cart);

        products.forEach(product => {
            let itemTotalPrice = (product.price * product.quantity).toFixed(2);
            totalPrice += parseFloat(itemTotalPrice);

            carrelloContainer.innerHTML += `
                <div class="row text-center align-items-center prodotto" data-id="${product.id}">
                    <div class="col">
                        <img src="${product.image}" alt="${product.title}" width="50">
                        <p>${product.title}</p>
                    </div>
                    <div class="col">
                        <button class="btn btn-sm minus">-</button>
                        <span class="num">${product.quantity}</span>
                        <button class="btn btn-sm plus">+</button>
                        <button class="btn btn-danger btn-sm rimuovi">Rimuovi</button>
                    </div>
                    <div class="col">
                        <p class="price">€${itemTotalPrice}</p>
                    </div>
                </div>
                <hr>
            `;
        });

        totalElement.textContent = `€${totalPrice.toFixed(2)}`;
    }

    // Funzione per aggiornare la quantità e il prezzo
    function updateQuantity(id, action) {
        let productIndex = cart.findIndex(item => item.id == id);
        if (productIndex === -1) return;

        if (action === "increase" && cart[productIndex].quantity < 10) {
            cart[productIndex].quantity++;
        } else if (action === "decrease" && cart[productIndex].quantity > 1) {
            cart[productIndex].quantity--;
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        renderCarrello();
    }

    // Funzione per rimuovere un prodotto
    function removeProduct(id) {
        cart = cart.filter(item => item.id != id);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCarrello();
    }

    // Event listener per incremento, decremento e rimozione
    carrelloContainer.addEventListener("click", function (event) {
        let row = event.target.closest(".prodotto");
        if (!row) return;

        let id = row.dataset.id;

        if (event.target.classList.contains("plus")) {
            updateQuantity(id, "increase");
        } else if (event.target.classList.contains("minus")) {
            updateQuantity(id, "decrease");
        } else if (event.target.classList.contains("rimuovi")) {
            removeProduct(id);
        }
    });

    renderCarrello();
});*/
//aggiorna quantità 
// document.addEventListener("DOMContentLoaded", function () {
//     const plus = document.querySelector(".plus"),
//         minus = document.querySelector(".minus"),
//         num = document.querySelector(".num");
//     price = document.getElementById("price");
//     total = document.querySelector(".riepilogo p strong");
//     remove = document.querySelector(".rimuovi");
//     cart = document.querySelector(".carrello .row.text-center.align-items-center");




//     let qta = 1;
//     let unitPrice = parseFloat(price.innerText.replace("€", "").replace(",", "."));


//     plus.addEventListener("click", () => {

//         if (qta < 10) {
//             qta++;

//             num.innerText = qta;
//             updateTotPrice();
//             console.log(qta);
//         }
//     });

//     minus.addEventListener("click", () => {
//         if (qta > 1) {
//             qta--;

//             num.innerText = qta;
//             updateTotPrice();
//             console.log(qta);
//         }
//     });

//     function updateTotPrice() {
//         let newTot = (qta * unitPrice).toFixed(2).replace(".", ",");
//         price.innerText = `€${newTot}`;
//         total.innerText = `€${newTot}`;
//     }

//     remove.addEventListener("click", function () {
//         cart.remove();
//         total.textContent = "€0.00";
//     });

// });

document.addEventListener("DOMContentLoaded", function () {
    const carrelloContainer = document.getElementById("prodottiAdd");
    const totalElement = document.querySelector(".riepilogo p strong");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function renderCarrello() {

        let totalPrice = 0;

        if (cart.length === 0) {
            carrelloContainer.innerHTML += `<p>Il carrello è vuoto.</p>`;
            totalElement.textContent = "€0.00";
            return;
        }

        cart.forEach(product => {
            totalPrice += product.price * product.quantity;

            carrelloContainer.innerHTML += `
                <div class="col">
                                <ul id="articolo" class="list-unstyled">
                                    <li>${product.title}</li>
                                </ul>
                            </div>
                            <div class="col">
                                <div class="wrapper">
                                    <span class="minus">-</span>
                                    <span class="num">1</span>
                                    <span class="plus">+</span>
                                </div>
                                <button class="btn btn rimuovi btn-sm mt-0">Rimuovi</button>
                            </div>
                            <div class="col">
                                <ul class="list-unstyled" id="lista_prezzi">
                                    <li id="price">${product.price}</li>
                                </ul>
                            </div>
            `;
        });

        totalElement.textContent = `€${totalPrice.toFixed(2)}`;
    }

    // Funzione per aggiornare la quantità
    function updateQuantity(id, action) {
        console.log(cart);
        let product = cart.findIndex(item => item.id == id);
        if (!product) return;

        if (action === "increase" && product.quantity < 10) {
            product.quantity++;
        } else if (action === "decrease" && product.quantity > 1) {
            product.quantity--;
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        renderCarrello();
    }

    // Funzione per rimuovere un prodotto
    function removeProduct(id) {
        cart = cart.filter(item => item.id != id);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCarrello();
    }

    // Event listener per incremento, decremento e rimozione
    carrelloContainer.addEventListener("click", function (event) {
        let row = event.target.closest(".row");
        if (!row) return;

        let id = row.dataset.id;

        if (event.target.classList.contains("plus")) {
            updateQuantity(id, "increase");
        } else if (event.target.classList.contains("minus")) {
            updateQuantity(id, "decrease");
        } else if (event.target.classList.contains("rimuovi")) {
            removeProduct(id);
        }
    });

    renderCarrello();

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




