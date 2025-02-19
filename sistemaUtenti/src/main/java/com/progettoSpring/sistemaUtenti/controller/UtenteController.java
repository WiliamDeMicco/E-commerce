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
	
	Utente getAuthenticatedUser(HttpServletRequest request) {
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
	@GetMapping("/name")
	public List<String> getUtenteName(){
		return utenteRepository.findAll().stream()
				.map(Utente::getName)
				.collect(Collectors.toList());
	}
	@GetMapping("/{id}")
	public Object getUtenteDetails(@PathVariable Long id, HttpServletRequest request, HttpServletResponse response) {
		Utente authUser = getAuthenticatedUser(request);
		if(authUser==null) {
			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
			return Collections.singletonMap("message", "non autorizzato");
		}
		Optional<Utente> userOpt = utenteRepository.findById(id);
		if(!userOpt.isPresent()) {
			response.setStatus(HttpServletResponse.SC_NOT_FOUND);
			return Collections.singletonMap("message", "Utente non trovato");
		}
		return userOpt.get();
	}
	@GetMapping("/email")
	public Object getUtenteEmail(HttpServletRequest request, HttpServletResponse response) {
		Utente authUtente = getAuthenticatedUser(request);
		if(authUtente == null) {
			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
			return Collections.singletonMap("message", "Non autorizzato");
			
		}
		return utenteRepository.findAll().stream()
				.map(Utente::getEmail)
				.collect(Collectors.toList());
	}
	@GetMapping("/cognome")
	public Object getUtenteCognome(HttpServletRequest request, HttpServletResponse response) {
		Utente authUtente = getAuthenticatedUser(request);
		if(authUtente == null) {
			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
			return Collections.singletonMap("message", "Non autorizzato");
			
		}
		return utenteRepository.findAll().stream()
				.map(Utente::getCognome)
				.collect(Collectors.toList());
	}
	@GetMapping("/password")
	public Object getUtentePassword(HttpServletRequest request, HttpServletResponse response) {
		Utente authUtente = getAuthenticatedUser(request);
		if(authUtente == null) {
			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
			return Collections.singletonMap("message", "Non autorizzato");
			
		}
		return utenteRepository.findAll().stream()
				.map(Utente::getPassword)
				.collect(Collectors.toList());
	}
	@GetMapping("/partita_iva")
	public Object getUtentePartita_Iva(HttpServletRequest request, HttpServletResponse response) {
		Utente authUtente = getAuthenticatedUser(request);
		if(authUtente == null) {
			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
			return Collections.singletonMap("message", "Non autorizzato");
			
		}
		return utenteRepository.findAll().stream()
				.map(Utente::getPassword)
				.collect(Collectors.toList());
	}

	/*
	 * RICHIESTA PUT
	 */
	@PutMapping("/{token}")
	public Object updateId(@PathVariable String token, @RequestBody Utente updatedUser, HttpServletRequest request, HttpServletResponse response) {
	    Utente authUser = getAuthenticatedUser(request);
	    if (authUser == null) {
	        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
	        return Collections.singletonMap("message", "Non autorizzato");
	    }
		Optional<Utente> utente = utenteRepository.findByToken(token);
	    if (!utente.isPresent()) {
	        response.setStatus(HttpServletResponse.SC_NOT_FOUND);
	        return Collections.singletonMap("message", "Utente non trovato");
	    }
	    Utente existingUser = utente.get();
	    if (updatedUser.getName() != null) existingUser.setName(updatedUser.getName());
	    if (updatedUser.getCognome() != null) existingUser.setCognome(updatedUser.getCognome());
	    if (updatedUser.getEmail() != null) existingUser.setEmail(updatedUser.getEmail());
	    if (updatedUser.getPassword() != null) existingUser.setPassword(updatedUser.getPassword());
	    if (updatedUser.getPartitaIva() != null) existingUser.setPartitaIva(updatedUser.getPartitaIva());

	    utenteRepository.save(existingUser);

	    return Collections.singletonMap("message", "Utente aggiornato con successo!");
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
