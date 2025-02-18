package com.progettoSpring.sistemaUtenti.repository;

import com.progettoSpring.sistemaUtenti.model.OrdineDettagli;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrdineDettagliRepository extends JpaRepository<OrdineDettagli, Long>{

}
