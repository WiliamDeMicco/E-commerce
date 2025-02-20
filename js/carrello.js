document.addEventListener("DOMContentLoaded", function () {
    const carrelloContainer = document.getElementById("prodottiAdd");
    const lista_riepilogo = document.getElementById("lista_riepilogo");
    const totalElement = document.querySelector(".riepilogo p strong");


    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    //renderCarrello costruisce la tabella a partire dai prodotti nel local storage
    function renderCarrello() {

        carrelloContainer.innerHTML = null;            //inizializzo carrelloContainer ogni volta che aggiorno la quantità (chiamando renderCarrello)

        if (cart.length === 0) {
            carrelloContainer.innerHTML += `<p>Il carrello è vuoto.</p>`;
            totalElement.textContent = "€0.00";
            return;
        }
        console.log(cart);
        cart.forEach((product, i) => {                               //espressione lambda: () => {}  (testa) =>operatore {corpo} (passare una funzione in input ad un'altra funzione)

            carrelloContainer.innerHTML += `
                <li id="${i}" class="articolo row">
                    <div class="col">${product.product.title}</div>
                    <div class="col">
                        <div class="wrapper">
                            <span class="minus">-</span>
                            <span class="num">${product.quantity}</span>
                            <span class="plus">+</span>
                        </div>
                        <button class="btn btn rimuovi btn-sm mt-0">Rimuovi</button>
                    </div>
                    <div class="col">€${product.product.price * product.quantity}</div>                
                </li>
            `;
        });
    }

    renderCarrello();



    //RIEPILOGO CARRELLO
    function renderRiepilogo() {

        let totalPrice = 0;
        lista_riepilogo.innerHTML = null;            //inizializzo carrelloContainer ogni volta che aggiorno la quantità (chiamando renderCarrello)

        cart.forEach((product, i) => {                               //espressione lambda: () => {}  (testa) =>operatore {corpo} (passare una funzione in input ad un'altra funzione)
            totalPrice += product.product.price * product.quantity;

            lista_riepilogo.innerHTML += `
                <li id="${i}" class="row">
                    <div class="col">${product.product.title}</div>
                    <div class="col">x${product.quantity}</div>                
                </li>
            `;
        });

        totalElement.textContent = `€${totalPrice.toFixed(2)}`;
    }

    renderRiepilogo();





    // Funzione per aggiornare la quantità
    function updateQuantity(id, action) {
        console.log(cart);
        let product = cart[id];
        if (!product) return;

        if (action === "increase" && product.quantity < 10) {
            product.quantity++;
        } else if (action === "decrease" && product.quantity > 1) {
            product.quantity--;
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        renderCarrello();
        renderRiepilogo();
    }

    // Funzione per rimuovere un prodotto
    function removeProduct(id) {
        cart.splice(id, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCarrello();
        renderRiepilogo();
    }

    // Event listener per incremento, decremento e rimozione
    carrelloContainer.addEventListener("click", function (event) {
        let row = event.target.closest(".articolo");
        if (!row) return;

        let id = row.id;

        if (event.target.classList.contains("plus")) {
            updateQuantity(id, "increase");
        } else if (event.target.classList.contains("minus")) {
            updateQuantity(id, "decrease");
        } else if (event.target.classList.contains("rimuovi")) {
            removeProduct(id);
        }
    });

    const plus = document.querySelector(".plus");
    const minus = document.querySelector(".minus");
    const num = document.querySelector(".num");
    const total = document.querySelector(".riepilogo p strong");
    const remove = document.querySelector(".rimuovi");

    let qta = 1;


    plus.addEventListener("click", () => {

        if (qta < 10) {
            qta++;

            num.innerText = qta;
        }
    });

    minus.addEventListener("click", () => {
        if (qta > 1) {
            qta--;

            num.innerText = qta;
        }
    });

    remove.addEventListener("click", function () {
        cart.remove();
        total.textContent = "€0.00";
    });

});

//LOGOUT UTENTE

function logout() {
    // Recupera il token dal localStorage
    const token = localStorage.getItem("authToken");        // DA PRENDERE PER L'AGGIORNAMENTO
    if (!token) {
        console.error("Nessun token trovato nel localStorage");
        return;
    }

    fetch('http://localhost:8080/api/logout', {                // CAMBIARE ENDPOINT ('http://localhost:8080/api/users/'+token)
        method: 'POST',                                        // method: 'PUT'
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Logout fallito');             // modifica fallita
            }
            return response.json();
        })
        .then(data => {
            console.log('Logout effettuato:', data);            // modifica effettuata
            // Rimuove il token dal localStorage
            localStorage.removeItem("authToken");              // queste ultime due righe non servono
            // Nasconde il pulsante Logout e mostra il form di login
            /*document.getElementById("logoutButton").style.display = "none";
            document.getElementById("loginForm").style.display = "block";*/
            window.location.replace("login.html"); //reindirizzamento
        })
        .catch(error => {
            console.error('Errore durante il logout:', error);
            printOutput({ error: error.message });
        });
}


// Gestione del pulsante di logout
document.getElementById('logoutButton').addEventListener('click', function () {
    logout();
});

function getAuthHeaders() {
    const token = localStorage.getItem("authToken");
    return token ? { 'Authorization': 'Bearer ' + token } : {};
}


// Gestione del pulsante di logout
document.getElementById('logoutButton').addEventListener('click', function () {
    logout();
});

function getAuthHeaders() {
    const token = localStorage.getItem("authToken");
    return token ? { 'Authorization': 'Bearer ' + token } : {};
}



