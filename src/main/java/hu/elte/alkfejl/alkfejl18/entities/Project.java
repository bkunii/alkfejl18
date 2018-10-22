package hu.elte.alkfejl.alkfejl18.entities;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class Project implements Serializable{
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
	
	@JoinColumn
	@NotNull
	@ManyToOne
	private User leader;
	
	@Column
	@NotNull
	@ElementCollection
	@ManyToMany
	private List<User> members;
	
	@Column
	@JsonIgnore
	@ElementCollection
	@OneToMany(mappedBy = "project")
	private List<Task> tasks;
	
	@Column
	@Temporal(TemporalType.TIMESTAMP)
	private Date deadline;
	
	@Column
	@NotNull
	private String name;
}
