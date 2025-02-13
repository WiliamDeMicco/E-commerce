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
                    <a href="abbigliamento.html" class="btn btn-primary bottoneDettaglio">← Torna alla pagina prodotti</a>
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
        $(document).ready(function () {
            var itemWidth = 0;
            var totalItems = $('.MultiCarousel-inner .item').length;
            var visibleItems = 3; // Numero di elementi visibili per volta
            var currentIndex = 0; // Indice dell'elemento visibile attualmente
        
            // Impostazione della larghezza degli items
            function setItemWidth() {
                var containerWidth = $('.MultiCarousel').width();
                itemWidth = containerWidth / visibleItems;
                $('.MultiCarousel-inner .item').width(itemWidth);
                $('.MultiCarousel-inner').width(itemWidth * totalItems);
            }
        
            // Funzione per spostare il carosello a sinistra
            function moveLeft() {
                if (currentIndex > 0) {
                    currentIndex--;
                    $('.MultiCarousel-inner').css('transform', 'translateX(' + (-itemWidth * currentIndex) + 'px)');
                }
            }
        
            // Funzione per spostare il carosello a destra
            function moveRight() {
                if (currentIndex < totalItems - visibleItems) {
                    currentIndex++;
                    $('.MultiCarousel-inner').css('transform', 'translateX(' + (-itemWidth * currentIndex) + 'px)');
                }
            }
        
            // Event listener per i bottoni
            $('.leftLst').click(function () {
                moveLeft();
            });
        
            $('.rightLst').click(function () {
                moveRight();
            });
        
            // Inizializzazione
            setItemWidth();
        
            // Ricalcolare la larghezza quando la finestra cambia dimensione
            $(window).resize(function () {
                setItemWidth();
            });
        });
        