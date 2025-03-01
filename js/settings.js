// Funzione per effettuare il logout
function settings(newUser) {
    // Recupera il token dal localStorage
    const token = localStorage.getItem("authToken");        // DA PRENDERE PER L'AGGIORNAMENTO
    if (!token) {
        console.error("Nessun token trovato nel localStorage");
        return;
    }

    fetch('http://localhost:8080/api/users/' + token, {                // CAMBIARE ENDPOINT ('http://localhost:8080/api/users/'+token)
        method: 'PUT',                                        // method: 'PUT'
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(newUser)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Modifica fallita');             // modifica fallita
            }
            return response.json();
        })
        .then(data => {
            console.log('Modifica effettuata:', data);            // modifica effettuata
            // Rimuove il token dal localStorage
            // Nasconde il pulsante Logout e mostra il form di login
            /*document.getElementById("logoutButton").style.display = "none";
            document.getElementById("loginForm").style.display = "block";*/
        })
        .catch(error => {
            console.error('Errore durante il logout:', error);
            printOutput({ error: error.message });
        });
}
document.getElementById('settings').addEventListener('submit', function (event) {             // da prendere integralmente
    event.preventDefault();
    const newUser = {                       // const aggiornamento
        name: document.getElementById('fName').value,
        email: document.getElementById('typeEmailX').value,
        cognome: document.getElementById('lName').value,
        partitaIva: document.getElementById('pIva').value,
        password: document.getElementById('creapw').value
    };
    settings(newUser);                       // update(aggiornamento)
});


/*
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".settings");
    const button = document.querySelector(".btn.bg-warning");
    const cardNome = document.querySelector(".cNome");
    const cardCognome = document.querySelector(".cCognome");
    button.addEventListener("click", function (event) {
        event.preventDefault();
        const nome = form.elements["fname"].value;
        const cognome = form.elements["lastname"].value;
        cardNome.textContent = nome || "Nome";
        cardCognome.textContent = cognome || "Cognome";
    });
})*/// Funzione per effettuare il logout
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