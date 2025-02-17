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
