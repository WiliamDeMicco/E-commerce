//PASSARE DA LOGIN A REGISTRAZIONE

document.addEventListener("DOMContentLoaded", function () {
    const registrati = document.getElementById("registrati");  //selezione
    const loginForm = document.querySelector(".loginform");
    const registrazioneForm = document.querySelector(".registrazioneform");

    //nascondo il form di registrazione
    registrazioneForm.style.display = "none";

    registrati.addEventListener("click", function (event) {
        event.preventDefault(); // Impedisce il comportamento di default 

        //faccio uno switch tra login e registrazione, nascondendo login e "sbloccando" il form di registrazione
        loginForm.style.display = "none";
        registrazioneForm.style.display = "block";
    });
});

//CONTROLLO SULLA PASSWORD

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".registrazioneform");
    const submitButton = document.querySelector(".btn-outline-black");

    submitButton.addEventListener("click", function (event) {
        const password = document.getElementById("creapw").value;
        const confirmPassword = document.getElementById("confermapw").value;


        if (password !== confermapw) {
            event.preventDefault(); // Impedisce l'invio del form
            alert("Le password non coincidono. Riprova.");

            // Evidenzia in rosso i campi password
            document.getElementById("creapw").style.border = "2px solid red";
            document.getElementById("confermapw").style.border = "2px solid red";
        } else {
            // Rimuove il bordo rosso se le password coincidono
            document.getElementById("creapw").style.border = "";
            document.getElementById("confermapw").style.border = "";
        }
    });
});

//rendi visibile o non visibile la password

// Funzione per aggiungere l'header Authorization alle richieste protette
function getAuthHeaders() {
    const token = localStorage.getItem("authToken");
    return token ? { 'Authorization': 'Bearer ' + token } : {};
  }

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
            throw new Error('Non autorizzato o errore durante l\'aggiunta dell\'utente');
        }
        return response.json();
    })
    .then(data => {
        console.log('Risposta addUser:', data);
    })
    .catch(error => {
        console.error('Errore nell\'aggiunta dell\'utente:', error);
    });
  }

  document.getElementById('aggiungiUtente').addEventListener('submit', function(event) {
    event.preventDefault();
    const newUser = {
      name: document.getElementById('fName').value,
      email: document.getElementById('typeEmailX').value,
      cognome: document.getElementById('lName').value,
      pIva: document.getElementById('pIva').value,
      password: document.getElementById('creapw').value
    };
    addUser(newUser);
  });