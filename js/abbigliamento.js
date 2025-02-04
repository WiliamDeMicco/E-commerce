const flagUomo = document.getElementById('flexCheckDefault1');
const flagDonna = document.getElementById('flexCheckDefault2');
const flagElec = document.getElementById('flexCheckDefault3');
const flagJewels = document.getElementById('flexCheckDefault4');

const container = document.getElementById('risultati');

function displaySectionUomo() {
    if (flagUomo.checked) {
        fetch('https://fakestoreapi.com/products/category/men\'s%20clothing')
            .then(response => response.json())
            .then(prodUomo => {
                const productsUomo = prodUomo.map(product => {
                    return `
                        <div class="card">
                            <div class="img"> 
                                <img src="${product.image}" class="card-img-top" alt="${product.title}">
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">${product.title}</h5>
                                <p class="card-text">€ ${product.price}</p>
                                <a href="#" class="btn btn-primary">Dettagli</a>
                            </div>
                        </div>
                    `;
                }).join('');
                container.innerHTML = productsUomo;
            })
            .catch(error => console.error('Errore nel recupero dei prodotti:', error));
    }
}

flagUomo.addEventListener('change', displaySectionUomo);

function displaySectionDonna() {
    if (flagUomo.checked) {
        fetch('https://fakestoreapi.com/products/category/women\'s%20clothing')
            .then(response => response.json())
            .then(prodUomo => {
                const productsUomo = prodUomo.map(product => {
                    return `
                        <div class="card">
                            <div class="img"> 
                                <img src="${product.image}" class="card-img-top" alt="${product.title}">
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">${product.title}</h5>
                                <p class="card-text">€ ${product.price}</p>
                                <a href="#" class="btn btn-primary">Dettagli</a>
                            </div>
                        </div>
                    `;
                }).join('');
                container.innerHTML = productsUomo;
            })
            .catch(error => console.error('Errore nel recupero dei prodotti:', error));
    }
}

flagDonna.addEventListener('change', displaySectionDonna);


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
                        <a href="#" class="btn btn-primary">Dettagli</a>
                    </div>
                </div>
            `;
        }).join('');
        container.innerHTML = productsCards;
    })
    .catch(error => console.error('Errore nel recupero dei prodotti:', error));

