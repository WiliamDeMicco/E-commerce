package com.progettoSpring.sistemaUtenti.repository;

import com.progettoSpring.sistemaUtenti.model.Utente;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UtenteRepository extends JpaRepository<Utente, Long>{
	Optional<Utente> findByToken(String token);
	Optional<Utente> findByEmail(String email);
}	
