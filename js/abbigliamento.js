// fetch iniziale per mostrare, a pagina aperta, tutti i prodotti
fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(products => {
        const productsCards = products.map(product => {
            return `
        <div class="card">
            <div class="img"> 
                <img src="${product.image}" class="card-img-top" alt="${product.title}">
            </div>
            <div class="card-body">
                <h5 class="card-title">${product.title}</h5>
                <p class="card-text">€ ${product.price}</p>
                <a href="dettaglioProdotto.html?id=${product.id}" class="btn btn-primary">Dettagli</a>
            </div>
        </div>
    `;
        }).join('');
        container.innerHTML = productsCards;
    })
    .catch(error => console.error('Errore nel recupero dei prodotti:', error));

// costanti che puntano due elementi (select element con categorie e div con i risultati - card)
const selectCategoria = document.getElementById('selectCategoria');
const container = document.getElementById('risultati');

/*
funzione displayAll()
selezionata una categoria, si attiverà un evento che trasmetterà il valore numerico dell'opzione
alla funzione, che tramite il primo if stabilirà l'endpoint sul quale operare il fetch
*/
function displayAll() {
    if (selectCategoria.value == 1) {
        url = 'https://fakestoreapi.com/products';
    } else if (selectCategoria.value == 2) {
        url = 'https://fakestoreapi.com/products/category/men\'s%20clothing';
    } else if (selectCategoria.value == 3) {
        url = 'https://fakestoreapi.com/products/category/women\'s%20clothing';
    } else {
        url = 'https://fakestoreapi.com/products/category/jewelery';
    }

    fetch(url)
        .then(response => response.json())
        .then(products => {
            const productsCards = products.map(product => {
                return `
        <div class="card">
            <div class="img"> 
                <img src="${product.image}" class="card-img-top" alt="${product.title}">
            </div>
            <div class="card-body">
                <h5 class="card-title">${product.title}</h5>
                <p class="card-text">€ ${product.price}</p>
                <a href="dettaglioProdotto.html?id=${product.id}" class="btn btn-primary">Dettagli</a>
            </div>
        </div>
    `;
            }).join('');
            container.innerHTML = productsCards;
        })
        .catch(error => console.error('Errore nel recupero dei prodotti:', error));
}
// eventListener del tag select
selectCategoria.addEventListener('change', displayAll);

// selettore del range button
const prezzo = document.getElementById('rangePrezzo');

/* funzione relativa al range button
In base al valore selezionato stabiliremo un range (min e max) che determinerà quale card
mostrare (prezzo)
*/
function mostraPerPrezzo() {
    var minrange = 0;
    var maxrange = 0;
    const valore = document.getElementById('valore');
    if (prezzo.value == 0) {
        minrange = 0;
        maxrange = 100;
        valore.innerHTML = '€ 0-100';
    } else if (prezzo.value == 1) {
        minrange = 101;
        maxrange = 500;
        valore.innerHTML = '€ 101-500';
    } else if (prezzo.value == 2) {
        minrange = 501;
        maxrange = 1000000;
        valore.innerHTML = '€ 501+';
    }

    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(products => {
            const productsCards = products.map(product => {
                if (minrange <= product.price && maxrange > product.price) {
                    return `
                    <div class="card">
                        <div class="img"> 
                        <img src="${product.image}" class="card-img-top" alt="${product.title}">
                    </div>
                <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text">€ ${product.price}</p>
                    <a href="dettaglioProdotto.html?id=${product.id}" class="btn btn-primary">Dettagli</a>
                </div>
                </div>`;
                }
            }).join('');
            container.innerHTML = productsCards;
        })
        .catch(error => console.error('Errore nel recupero dei prodotti:', error));
}

//eventListener relativo alla funzione precedente
prezzo.addEventListener('change', mostraPerPrezzo);

// selettore e eventListener del bottone che resetta i filtri
const reset = document.getElementById('resetFilter');
reset.addEventListener('click', () => {
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(products => {
            const productsCards = products.map(product => {
                return `
        <div class="card">
            <div class="img"> 
                <img src="${product.image}" class="card-img-top" alt="${product.title}">
            </div>
            <div class="card-body">
                <h5 class="card-title">${product.title}</h5>
                <p class="card-text">€ ${product.price}</p>
                <a href="dettaglioProdotto.html?id=${product.id}" class="btn btn-primary">Dettagli</a>
            </div>
        </div>
    `;
            }).join('');
            container.innerHTML = productsCards;
        })
        .catch(error => console.error('Errore nel recupero dei prodotti:', error));
});
