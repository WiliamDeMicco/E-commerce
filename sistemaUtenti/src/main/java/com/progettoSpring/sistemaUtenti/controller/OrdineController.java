package com.progettoSpring.sistemaUtenti.controller;

import com.progettoSpring.sistemaUtenti.auth.*;
import com.progettoSpring.sistemaUtenti.model.Utente;
import com.progettoSpring.sistemaUtenti.model.Ordine;
import com.progettoSpring.sistemaUtenti.repository.OrdineRepository;
import com.progettoSpring.sistemaUtenti.repository.UtenteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = {})
public class OrdineController {
	
	@Autowired
	private UtenteRepository utenteRepository;
	
	@Autowired
	private OrdineRepository ordineRepository;
	
	@Autowired
	private TokenService tokenService;
	//come scrivere il metodo in repository per prendere l'utenteid 
	//creo metodo getmap per ottenere gli ordini di un utente
    @GetMapping("/mieiordini/{utente_id}")
    public List<Ordine> getOrdiniUtente(@PathVariable Long utente_id){
        //Recuper lid utente per proseguire con la creazione dei metodi per gli oridni
    	Optional<Utente> optionalUtente = utenteRepository.findById(utente_id);
        System.out.println("utente_id dalla sessione" + utente_id);
    	if (!optionalUtente.isPresent()) {
            throw new RuntimeException("Utente non trovato"); 
        }
      
        // ne recuper anche gli ordini associati all'utente recpuretap precedentemente
        return ordineRepository.findByUtenti_Id(utente_id);
        }
    


  /*  @PostMapping("/crea")
    public ResponseEntity<Object> creaOrdine(@RequestBody Ordine nuovoOrdine) {
        // Verifica se la data dell'ordine è presente
        if (nuovoOrdine.getData_ordine() == null) {
            return new ResponseEntity<>(Collections.singletonMap("message", "Campo data_ordine è obbligatorio"), HttpStatus.BAD_REQUEST);
        }

        // Imposta l'utente a null (se non richiesto)
        nuovoOrdine.setUtenti(null);

        // Salva l'ordine nel database
        ordineRepository.save(nuovoOrdine);

        // Risposta di successo
        return new ResponseEntity<>(Collections.singletonMap("message", "Ordine creato con successo"), HttpStatus.CREATED);
    }*/
    @PostMapping("/crea")
    public Object creaOrdine(@RequestBody Ordine nuovoOrdine, HttpServletRequest request) {
        // Recupero l'ID dell'utente dalla sessione
        Long utenteId = (Long) request.getSession().getAttribute("utenteId");

        // Se l'utente non è autenticato, ritorno un messaggio di errore
        if (utenteId == null) {
            return Collections.singletonMap("message", "Utente non autenticato");
        }

        // Verifico se l'utente esiste nel database
        Optional<Utente> optionalUtente = utenteRepository.findById(utenteId);
        if (!optionalUtente.isPresent()) {
            return Collections.singletonMap("message", "Utente non trovato");
        }

        // Recupero l'utente
        Utente utente = optionalUtente.get();

        // Associo l'utente all'ordine
        nuovoOrdine.setUtenti(utente);

        // Se la data dell'ordine non è presente, imposta la data di oggi
        if (nuovoOrdine.getData_ordine() == null) {
            nuovoOrdine.setData_ordine(LocalDate.now()); // Imposta la data odierna
        }

        // Salvo l'ordine nel database
        ordineRepository.save(nuovoOrdine);

        // Rispondo con un messaggio di successo
        return Collections.singletonMap("message", "Ordine creato con successo");
    }

}
		



