/*
 * 	ORDINI DETTAGLI
	id ordine { id prodotti acquistati, quantità, costo}
 */
package com.progettoSpring.sistemaUtenti.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name="ordini_dettagli")
public class OrdineDettagli {
	
	// primary key
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	// altre proprietà
	@Positive(message="Il prezzo deve avere un valore positivo")
	private Double prezzo;
	
	@Positive(message="La quantità di un ordine deve essere positiva")
	private int quantita;
	
	// foreign key: relazione Many-to-one con Ordine
	@ManyToOne
	@JoinColumn(name="ordine_id")
	private Ordine ordine;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Double getPrezzo() {
		return prezzo;
	}

	public void setPrezzo(Double prezzo) {
		this.prezzo = prezzo;
	}

	public int getQuantita() {
		return quantita;
	}

	public void setQuantita(int quantita) {
		this.quantita = quantita;
	}

	public Ordine getOrdine() {
		return ordine;
	}

	public void setOrdine(Ordine ordine) {
		this.ordine = ordine;
	}
	
}
