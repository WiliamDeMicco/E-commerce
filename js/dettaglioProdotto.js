function getQueryParam(param) {
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
}

const productId = getQueryParam('id');


fetch('https://fakestoreapi.com/products/' + productId)
  .then(response => response.json())
  .then(product => {
    const container = document.getElementById('dettaglio');     // punto l'elemento dove voglio inserire quello che segue
    container.innerHTML = `
            <div class="row">
                <div class="img col-3 mr-1"> 
                    <img src="${product.image}" class="card-img-top" alt="${product.title}">
                </div>
                <div class="col-7 ml-2">
                    <h5 class="card-title">${product.title}</h5>
                    <br>
                    <h1 class="card-text">€ ${product.price}</h1>
                    <br>
                    <p>
                        Descrizione prodotto
                    </p>
                    <div>
                        <div class="card card-body">
                        ${product.description}
                        </div>
                    </div>
                    <br><br>
                    <a href="carrello.html" class="btn">Aggiungi al carrello</a><br>
                    <a href="abbigliamento.html" class="btn btn-primary bottoneDettaglio mb-4">← Torna alla pagina prodotti</a>
                </div>
            </div>`;
  })
  .catch(error => console.error('Errore nel recupero del prodotto:', error));
/*
    const container = document.getElementById('articolo');
    container.innerHTML=`
    <li>{product.description}</li>
    `
    const riepilogo = document.getElementById('lista_prezzi');
    container.innerHTML=`
    <li>{product.price}</li>
    `

    const riepilogo = document.getElementById('lista_riepilogo');
    riepilogo.innerHTML=`
    <li>x1 {product.title} = {product.price}</li>
    `
*/


const carosello = document.getElementById('carosello');

fetch('https://fakestoreapi.com/products?limit=3')
    .then(response => response.json())
    .then(products => {
        const productsCards = products.map(product => {
         
            return `
        <div class="card m-2 consigliati d-flex flex-column justify-content-between">
        <div>
        <img src="${product.image}" alt="${product.title}">
        </div>
        <div class="card-body d-flex  flex-column justify-content-between">
          <h5 class="card-title">${product.title}</h5>
          <a href="dettaglioProdotto.html?id=${product.id}" class="btn btn-primary discover_more">Scopri di più</a>
        </div>
      </div>
    `;
        }).join('');
        carosello.innerHTML = productsCards;
    })
    .catch(error => console.error('Errore nel recupero dei prodotti:', error));