package com.progettoSpring.sistemaUtenti.repository;

import com.progettoSpring.sistemaUtenti.model.Ordine;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrdineRepository extends JpaRepository<Ordine, Long>{
	public List<Ordine>findByUtenti_Id(Long utenteId);
}
