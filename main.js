// /@here ciao ragazzi: l'esercitazione di oggi prevede di aggiungere l'autoplay allo slider che abbiamo visto ieri.
// Per chi non fosse riuscito a farlo, vi mando il codice che abbiamo fatto insieme ieri mattina, così avete un punto di partenza da cui iniziare.
// L'idea è che ogni 3 secondi le slide cambino da sole, passando in automatico a visualizzare la slide successiva.
// Nome repo: js-jq-carousel-autoplay
// -----------------------------------------------------------------------------

$(document).ready(function() {

    // IL CODICE CHE SEGUE VIENE ESGUITO INDIPENDENTEMENTE DAGLI EVENTI CLICK DELL'UTENTE - AUTOPLAY
    // \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/

    var currentSlide = 0; // indice dalla slide da visualizzare
    var firstSlide = 0; // indice della 1a slide del mio carousel
    var lastSlide = 3; // indice dell'ultima slide del mio carousel
    var interval = 2500; // intervallo temporale tra 2 visualizzazioni

    // genero un indice casuale, in modo che ad ogni reload della pagina,
    // il carousel parta da una slide probabilisticamente diversa
    // currentSlide = generaRandom(firstSlide, lastSlide);
    // display(currentSlide); // parto subito con una visualizzazione della pagina indicizzata randomicamente
    // oppure devo settare active...alla immagine/pallino con indice currentSlide

    // console.log("currentSlide", currentSlide);

    // "innesco" l'autoplay, che mi parte tra 'interval' ms
    var autoplay = setInterval(function() {

        display(currentSlide); // ad intervalli di durata 'interval', chiamo la funzione che mi aggiorna la pagina

        //calcolo l'indice per la prossima visualizzzione
        if (currentSlide == lastSlide) {
            currentSlide = firstSlide; // sono in fondo, riparto dalla prima slide
        } else {
            currentSlide++;
        }

    }, interval); // end setInterval()



    // IL CODICE CHE SEGUE E' PILOTATO DAGLI EVENTI "CLICK" (SU FRECCE E BULLETS) - USER DRIVEN
    // \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/

    // intercetto click sulle frecce
    $('.arrow').click(function() {

        // recupero l'indice della slide corrente
        // l'immagine corrente è quella che ha la classe active associata
        // in ogni istante deve essercene sempre e solo una
        var imgPosition = $('img.active').index();

        // in base a dove devo andare e a dove sono, decido quale sarà la prossima slide
        if (($(this).hasClass("next"))) { // c'è stato click su freccia in avanti

            if ($('img.active').hasClass("last")) {
                // sono in fondo al carousel, la prossima immagine da visualizzare sarà la prima
                imgPosition = 0; // indice della nuova slide da visualizzare
            } else {
                // non sono ancora all'ultima immagine del carousel, procedo con la successiva
                imgPosition++; // indice della nuova slide da visualizzare
            }
        }

        if (($(this).hasClass("prev"))) { // c'è stato click su freccia indietro

            if (($('img.active').hasClass("first"))) {
                // sono all'inizio del carousel, la prossima immagine da visualizzare sarà l'ultima (ciclo all'indietro)
                imgPosition = ($('img.last').index()); // indice della nuova slide da visualizzare
            } else {
                // non sono ancora sulla prima immagine del carousel, procedo con la precedente
                imgPosition--; // indice della nuova slide da visualizzare
            }
        }

        display(imgPosition); // passo alla funzione l'indice della nuova posizione da visualizzare

    }); // end gestione click su frecce



    // intercetto click su bullets
    $('.bullet').click(function() {

        // ricavo l'indice (posizione) dell'elemento cliccato (bullet),
        // rispetto ai suoi fratelli tutti all'interno dell'elemento parent che li contiene
        // tramite la funzione index() applicata sull'elemento $(this) cioè l'elemento sul quale
        // ho intercettato il click, passo questo indice alla funzione che gestisce le visualizzzioni
        var bulletPosition = ($(this).index());

        display(bulletPosition);

    }); // end gestione click su bullett



    function display(newPosition) {

        // Questa funzione riceve un parametro newPosition, che indica qual è la nuova
        // immagine che sarà visualizzata e quale bullett sarà evidenziato

        $('img.active').removeClass("active"); // nascondo l'immagine corrente rimuovendo la classe
        $('span.selected').removeClass("selected"); // disattivo il bullet

        // in base ad newPosition seleziono gli elementi (immagine  e bullet) da visualizzare
        var newSlide = $('#slider img').eq(newPosition);
        var newBul = $('#bullets span').eq(newPosition);

        newSlide.addClass("active"); // visualizzo la nuova immagine corrente aggiungendogli la classe active
        newBul.addClass("selected"); // evidenzio il bullet

        // SOLUZIONE CHE SFRUTTA VAR GLOBALE 'currentSlide', IMMEDIATA, CONCISA, MA NON BELLISSIMA A LIVELLO DI LOGICA IMPLEMENTATIVA
        // allineo l'autoplay all'intervento dell'utente, aggiornando la slide corrente "vista" da autoplay attraverso la var globale currentSlide
        currentSlide = newPosition;

    }

    function generaRandom(min, max) {
        // genera un numero casuale intero tra min e max
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

}); // end document ready