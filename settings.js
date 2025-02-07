document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".settings");
    const button = document.querySelector(".btn.bg-warning");
    const cardNome = document.querySelector(".cnome");
    const cardCognome = document.querySelector(".ccognome");
    button.addEventListener("click", function (event) {
        event.preventDefault();
        const nome = form.elements["fname"].value;
        const cognome = form.elements["lastname"].value;
        cardNome.textContent = nome || "Nome";
        cardCognome.textContent = cognome || "Cognome";
    });
});

