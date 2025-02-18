package com.progettoSpring.sistemaUtenti.controller;

import com.progettoSpring.sistemaUtenti.auth.*;
import com.progettoSpring.sistemaUtenti.model.Utente;
import com.progettoSpring.sistemaUtenti.repository.UtenteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {})
public class AuthController {
	
	@Autowired
	private TokenService tokenService;
	
	@Autowired
	private UtenteRepository utenteRepository;
	
	@PostMapping("/login")
	public Map<String, String> login(@RequestBody Map<String, String> body, HttpServletResponse response) {
		
		String email = body.get("email");
		String password = body.get("password");
		
		Map<String, String> result = new HashMap<>();
		
		if (email == null || password == null) {
			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
			result.put("message", "Credenziali non valide. Riprovare");
			return result;
		}
		
		Optional<Utente> optionalUser = utenteRepository.findByEmail(email);
		
		if(!optionalUser.isPresent() || !optionalUser.get().getPassword().equals(password)) {
			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
			result.put("message", "Credenziali non valide");
			return result;
		}
		
		Utente utente = optionalUser.get();
		String role = utente.getRole();
		
		String token = tokenService.generateToken(email, role);
		
		result.put("message", "Login effettuato con successo");
		result.put("role", role);
		result.put("token", token);
		return result;
	}
	
	@PostMapping("/logout")
	public Map<String, String> logout(@RequestHeader("Authorization") String authHeader) {
		String token = null;
		
		if (authHeader != null && authHeader.startsWith("Bearer ")) {
			token = authHeader.substring(7);
		} else {
			token = authHeader;
		}
		
		tokenService.removeToken(token);
		
		Map<String, String> result = new HashMap<>();
		result.put("message", "Logout effettuato con successo");
		return result;
	}
}
