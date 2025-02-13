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
            var itemsMainDiv = $('.MultiCarousel');
            var itemsDiv = $('.MultiCarousel-inner');
            
        
            // Gestione del click sui bottoni
            $('.leftLst, .rightLst').click(function () {
                var isLeftButton = $(this).hasClass("leftLst");
                if (isLeftButton) {
                    click(0, this);
                } else {
                    click(1, this);
                }
            });
        
            // Funzione per ridimensionare il carosello
            function ResCarouselSize() {
                var incno = 0;
                var dataItems = "data-items";
                var itemClass = '.item';
                var itemsSplit = [];
                var sampwidth = $(itemsMainDiv).width();
                var bodyWidth = $('body').width();
                
                $(itemsDiv).each(function () {
                    var itemNumbers = $(this).find(itemClass).length;
                    var btnParentSb = $(this).parent().attr(dataItems);
                    itemsSplit = btnParentSb.split(',');
        
                    // Impostazione del numero di items visibili in base alla larghezza della finestra
                    if (bodyWidth >= 1200) {
                        incno = itemsSplit[3];
                    } else if (bodyWidth >= 992) {
                        incno = itemsSplit[2];
                    } else if (bodyWidth >= 768) {
                        incno = itemsSplit[1];
                    } else {
                        incno = itemsSplit[0];
                    }
        
                    itemWidth = sampwidth / incno;
                    $(this).css({ 'transform': 'translateX(0px)', 'width': itemWidth * itemNumbers });
                    $(this).find(itemClass).each(function () {
                        $(this).outerWidth(itemWidth);
                    });
                });
            }
        
            // Funzione per muovere gli items
            function ResCarousel(e, el, s) {
                var leftBtn = '.leftLst';
                var rightBtn = '.rightLst';
                var translateXval = '';
                var divStyle = $(el + ' ' + itemsDiv).css('transform');
                var values = divStyle.match(/-?[\d\.]+/g);
                var xds = Math.abs(values[4]);
        
                if (e == 0) {
                    translateXval = parseInt(xds) - parseInt(itemWidth * s);
                    $(el + ' ' + rightBtn).removeClass("over");
        
                    if (translateXval <= itemWidth / 2) {
                        translateXval = 0;
                        $(el + ' ' + leftBtn).addClass("over");
                    }
                } else if (e == 1) {
                    var itemsCondition = $(el).find(itemsDiv).width() - $(el).width();
                    translateXval = parseInt(xds) + parseInt(itemWidth * s);
                    $(el + ' ' + leftBtn).removeClass("over");
        
                    if (translateXval >= itemsCondition - itemWidth / 2) {
                        translateXval = itemsCondition;
                        $(el + ' ' + rightBtn).addClass("over");
                    }
                }
        
                $(el + ' ' + itemsDiv).css('transform', 'translateX(' + -translateXval + 'px)');
            }
        
            // Funzione per iniziare a scorrere gli items
            function click(ell, ee) {
                var Parent = "#" + $(ee).parent().attr("id");
                var slide = $(Parent).attr("data-slide");
                ResCarousel(ell, Parent, slide);
            }
        
            // Inizializzare la dimensione del carosello alla pagina
            ResCarouselSize();
        
            // Event listener per il resize della finestra
            $(window).resize(function () {
                ResCarouselSize();
            });
        });