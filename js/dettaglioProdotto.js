function getQueryParam(param) {
    const params = new URLSearchParams(window.location.search);
    return params.get(param);
}

const productId = getQueryParam('id');

fetch('https://fakestoreapi.com/products/' + productId)
    .then(response => response.json())
    .then(product => {
        const container = document.getElementById('dettaglio');
        container.innerHTML = `
        <div class="card>
                        <div class="img"> 
                        <img src="${product.image}" class="card-img-top" alt="${product.title}">
                    </div>
                <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text">€ ${product.description}</p>
                    <p class="card-text">€ ${product.price}</p>
                    <a href="index.html" class="btn btn-primary">← Torna alla Home</a>
                </div>
                </div>
          `;
    })
    .catch(error => console.error('Errore nel recupero del prodotto:', error));