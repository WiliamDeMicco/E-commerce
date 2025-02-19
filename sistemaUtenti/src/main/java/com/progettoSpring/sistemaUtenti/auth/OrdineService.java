package com.progettoSpring.sistemaUtenti.auth;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.progettoSpring.sistemaUtenti.model.Ordine;
import com.progettoSpring.sistemaUtenti.model.OrdineDettagli;
import com.progettoSpring.sistemaUtenti.model.Utente;
import com.progettoSpring.sistemaUtenti.repository.OrdineRepository;
import com.progettoSpring.sistemaUtenti.repository.UtenteRepository;

@Service
public class OrdineService {
	
	@Autowired
	private OrdineRepository ordineRepository;
	
	@Autowired
	private UtenteRepository utenteRepository;
	
	public Ordine creaOrdine(Long utenteId, List<OrdineDettagli> dettagli) {
		Utente utente = utenteRepository.findById(utenteId)
				.orElseThrow(() -> new RuntimeException("Utente non registrato o non trovato"));
		
		Ordine ordine = new Ordine();
		ordine.setUtenti(utente);
		ordine.setData_ordine(LocalDate.now());
		ordine.setDettagli(dettagli);
		
		return ordineRepository.save(ordine);
	}
	
	public List<Ordine> getOrdiniPerUtente(Long utenteId){
		return ordineRepository.findByUtenti_Id(utenteId);
	}

}
