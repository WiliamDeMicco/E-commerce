package com.progettoSpring.sistemaUtenti.controller;

import com.progettoSpring.sistemaUtenti.auth.*;
import com.progettoSpring.sistemaUtenti.model.Ordine;
import com.progettoSpring.sistemaUtenti.model.Utente;
import com.progettoSpring.sistemaUtenti.repository.OrdineRepository;
import com.progettoSpring.sistemaUtenti.repository.UtenteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = {})
public class UtenteController {
	
	@Autowired
	private UtenteRepository utenteRepository;
	
	@Autowired
	private OrdineRepository ordineRepository;
	
	@Autowired
	private TokenService tokenService;
	
	@PostMapping("/register")
	public Object addUtente(@RequestBody Utente nuovoUtente, HttpServletRequest request, HttpServletResponse response) {
		nuovoUtente.setRole("user");
		System.out.println(nuovoUtente.getPartitaIva());
		utenteRepository.save(nuovoUtente);
		return Collections.singletonMap("message", "Utente aggiunto con successo!");
	}
	
	private Utente getAuthenticatedUser(HttpServletRequest request) {
		String authHeader = request.getHeader("Authorization");
		if (authHeader != null && !authHeader.isEmpty()) {
			String token;
			if (authHeader.startsWith("Bearer ")) {
				token = authHeader.substring(7);
			} else {
				token = authHeader;
			}
			
			return tokenService.getAuthUser(token);
		}
		return null;
	}
	
	/*@GetMapping("/all_ordini/{id}")
	public Object getAllOrdersById(@PathVariable Long id, HttpServletRequest request, HttpServletResponse response) {
		Utente authUtente = getAuthenticatedUser(request);
		if(authUtente == null) {
			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
			return Collections.singletonMap("message", "Non autorizzato");
		}
		Optional<Utente> utenteOpt = utenteRepository.findById(id);
		
		if(!utenteOpt.isPresent()) {
			response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            return Collections.singletonMap("message", "Utente non trovato");
        }
        
		Long id_Utente = utenteOpt.get().getId();
        
        Optional<Ordine> ordiniOpt = ordineRepository.findByUtente(id_Utente);
        
        return ordiniOpt.get();
	}*/

}
