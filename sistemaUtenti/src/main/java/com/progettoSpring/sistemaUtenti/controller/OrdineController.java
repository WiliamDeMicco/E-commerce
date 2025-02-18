package com.progettoSpring.sistemaUtenti.controller;

import com.progettoSpring.sistemaUtenti.auth.*;
import com.progettoSpring.sistemaUtenti.model.Utente;
import com.progettoSpring.sistemaUtenti.model.Ordine;
import com.progettoSpring.sistemaUtenti.repository.OrdineRepository;
import com.progettoSpring.sistemaUtenti.repository.UtenteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
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
	
	
		
}


