//PASSARE DA LOGIN A REGISTRAZIONE E VICEVERSA

document.addEventListener("DOMContentLoaded", function () {
    const registrati = document.getElementById("registrati");
    const accedi = document.getElementById("accedi");
    const loginForm = document.querySelector(".loginform");
    const registrazioneForm = document.querySelector(".registrazioneform");

    //Nascondi il form di registrazione all'inizio
    registrazioneForm.style.display = "none";

    //Gestione passaggio da login a registrazione
    registrati.addEventListener("click", function (event) {
        event.preventDefault();
        loginForm.style.display = "none";
        registrazioneForm.style.display = "block";
    });

    //Gestione passaggio da registrazione a login
    accedi.addEventListener("click", function (event) {
        event.preventDefault();
        registrazioneForm.style.display = "none";
        loginForm.style.display = "block";
    });
});

//CONTROLLO PASSWORD REGISTRAZIONE
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".registrazioneform");
    const submitButton = document.querySelector(".btn-outline-black");

    submitButton.addEventListener("click", function (event) {
        const password = document.getElementById("creapw").value;
        const confirmPassword = document.getElementById("confermapw").value;

        if (password !== confirmPassword) {
            event.preventDefault();
            alert("Le password non coincidono. Riprova.");
            document.getElementById("creapw").style.border = "2px solid red";
            document.getElementById("confermapw").style.border = "2px solid red";
        } else {
            document.getElementById("creapw").style.border = "";
            document.getElementById("confermapw").style.border = "";
        }
    });
});

//RENDI VISIBILE TEMPORANEAMENTE LA PASSWORD
document.querySelectorAll('input[type="password"]').forEach((passwordField) => {
    passwordField.addEventListener('input', function () {
        this.type = 'text';

        clearTimeout(this.hideTimer);
        this.hideTimer = setTimeout(() => {
            this.type = 'password';
        }, 100.5); // 1 secondo
    });
});

//FUNZIONE PER OTTENERE HEADERS AUTORIZZAZIONE
function getAuthHeaders() {
    const token = localStorage.getItem("authToken");
    return token ? { "Authorization": "Bearer " + token } : {};
}

//REGISTRAZIONE UTENTE
function addUser(newUser) {
    fetch('http://localhost:8080/api/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders()
        },
        body: JSON.stringify(newUser)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Errore durante la registrazione');
            }
            return response.json();
        })
        .then(data => {
            console.log('Utente registrato:', data);
            alert("Registrazione completata! Ora puoi accedere.");
            document.querySelector(".registrazioneform").style.display = "none";
            document.querySelector(".loginform").style.display = "block";
        })
        .catch(error => {
            console.error('Errore:', error);
        });
}

//GESTIONE INVIO FORM REGISTRAZIONE
document.getElementById('aggiungiUtente').addEventListener('submit', function (event) {
    event.preventDefault();
    const newUser = {
        name: document.getElementById('fName').value,
        email: document.getElementById('typeEmailX').value,
        cognome: document.getElementById('lName').value,
        partitaIva: document.getElementById('pIva').value,
        password: document.getElementById('creapw').value
    };
    addUser(newUser);
});

//LOGIN UTENTE
function login(email, password) {
    fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: email, password: password })

    })
        .then(response => {
            if (!response.ok) {
                console.log("ciao");
                throw new Error("Login fallito. Controlla le credenziali.");
            }
            return response.json();
        })
        .then(data => {
            console.log("Login effettuato:", data);

            if (data.token) {
                localStorage.setItem("authToken", data.token);
                document.getElementById("logoutButton").style.display = "block";
                document.querySelector(".loginform").style.display = "none";
                alert("Accesso effettuato con successo!");

                window.location.replace("index.html"); //reindirizzamento 
            }
        })
        .catch(error => {
            console.error("Errore nel login:", error);
            alert(error.message);
        });
}

//GESTIONE INVIO FORM LOGIN
document.getElementById("accesso").addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    login(email, password);
});

