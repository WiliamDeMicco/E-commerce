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

