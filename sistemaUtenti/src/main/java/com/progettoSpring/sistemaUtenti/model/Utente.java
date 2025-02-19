/*
 *  UTENTI
	dati utente
	nome,
	cognome,
	partita iva (nullable),
	email,
	password
	(fare tutte le validazioni del caso e verificare che l'email non sia già
	presente)
 *
 */
package com.progettoSpring.sistemaUtenti.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
public class Utente {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotBlank(message = "Campo NOME obbligatorio")
	private String name;
	
	@NotBlank(message = "Campo COGNOME obbligatorio")
	private String cognome;
	
	@Column(nullable = false)
    private String role;
	
	@Column(name="partita_iva")
	private String partitaIva;
	
	@Column(nullable=false, unique=true)
	@Email(message="Inserire una email valida!")
	private String email;
	
	@NotBlank
	@Size(min=6, message="Campo PASSWORD obbligatorio")
	private String password;
	
	@OneToMany(mappedBy="utenti")
	@JsonBackReference
	private List<Ordine> ordini;
	
	private String token;
	
	public Utente() {}
	
	public Utente(Long id, String name, String cognome, String role, String email, String password, String partitaIva) {
		this.id = id;
		this.name = name;
		this.cognome = cognome;
		this.role = role;
		this.email = email;
		this.partitaIva=partitaIva;
		this.password = password;
	}
	

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCognome() {
		return cognome;
	}

	public void setCognome(String cognome) {
		this.cognome = cognome;
	}

	
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public List<Ordine> getOrdini() {
		return ordini;
	}

	public void setOrdini(List<Ordine> ordini) {
		this.ordini = ordini;
	}
	
	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getPartitaIva() {
		return partitaIva;
	}

	public void setPartitaIva(String partitaIva) {
		this.partitaIva = partitaIva;
	}
	
	
}
