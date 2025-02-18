/*
 * Implementare la logica di registrazione utente.

L'utente si registrerà inserendo nome, cognome, partita iva (nullable), 
email, password (fare tutte le validazioni del caso e verificare che l'email non sia già presente.

Dopo aver fatto la registrazione, l'utente potrà effettuare login inserendo email e password,
se i dati inseriti corrispondono a quanto presente nel database, l'utente potrà accedere a due pagine:

il mio profilo, dove l'utente potrà modificare i dati di nome, cognome e partita iva;
i miei ordini, dove l'utente potrà visualizzare una tabella con i dati degli ordini
Creare quindi le entità per gestire:

utenti
ordini
ordini_dettagli.
L'utente registrato, può creare un ordine dal frontend (il pagamento NON va gestito),
quando l'utente completa un ordine questo sarà registrato nel database.

L'utente non registrato, non potrà completare l'ordine.
 */
package com.progettoSpring.sistemaUtenti;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SistemaUtentiApplication {

	public static void main(String[] args) {
		SpringApplication.run(SistemaUtentiApplication.class, args);
	}

}
