/*
 *  ORDINI
	id ordine, id utente, data

 */
package com.progettoSpring.sistemaUtenti.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class Ordine {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@NotNull(message="Campo DATA obbligatorio")
	private LocalDate data_ordine;
	
	@ManyToOne
	@JsonManagedReference
	@JoinColumn(name="utente_id")
	private Utente utenti;
	
	@OneToMany(mappedBy="ordine")
	private List<OrdineDettagli> dettagli;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Utente getUtenti() {
		return utenti;
	}

	public void setUtenti(Utente utenti) {
		this.utenti = utenti;
	}

	public LocalDate getData_ordine() {
		return data_ordine;
	}

	public void setData_ordine(LocalDate data_ordine) {
		this.data_ordine = data_ordine;
	}

	public List<OrdineDettagli> getDettagli() {
		return dettagli;
	}

	public void setDettagli(List<OrdineDettagli> dettagli) {
		this.dettagli = dettagli;
	}
	
}
