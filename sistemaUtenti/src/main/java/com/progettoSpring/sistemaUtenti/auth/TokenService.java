package com.progettoSpring.sistemaUtenti.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.progettoSpring.sistemaUtenti.model.Utente;
import com.progettoSpring.sistemaUtenti.repository.UtenteRepository;
import java.util.Optional;
import java.util.UUID;

@Service
public class TokenService {
	
	@Autowired
	private UtenteRepository utenteRepository;
	
	public String generateToken(String email, String role) {
		String token = UUID.randomUUID().toString();
		
		System.out.println("Token generato: "+token);
		
		Optional<Utente> utente = utenteRepository.findByEmail(email);
		
		Utente u = utente.get();
		u.setToken(token);
		
		utenteRepository.save(u);
		
		return token;
	}
	
	public Utente getAuthUser(String token) {
		Optional<Utente> utente = utenteRepository.findByToken(token);
		Utente u = utente.get();
		return u;
	}
	
	public void removeToken(String token) {
		Optional<Utente> utente = utenteRepository.findByToken(token);
		Utente u = utente.get();
		u.setToken(token);
		utenteRepository.save(u);
	}
}
