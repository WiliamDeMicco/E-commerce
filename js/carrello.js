

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

// Funzione per effettuare il logout
function logout() {
    // Recupera il token dal localStorage
    const token = localStorage.getItem("authToken");
    if (!token) {
        console.error("Nessun token trovato nel localStorage");
        return;
    }

    fetch('http://localhost:8080/api/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Logout fallito');
            }
            return response.json();
        })
        .then(data => {
            console.log('Logout effettuato:', data);
            // Rimuove il token dal localStorage
            localStorage.removeItem("authToken");
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

//LOGOUT UTENTE

// Gestione del pulsante di logout
document.getElementById('logoutButton').addEventListener('click', function () {
    logout();
});

function getAuthHeaders() {
    const token = localStorage.getItem("authToken");
    return token ? { 'Authorization': 'Bearer ' + token } : {};
}