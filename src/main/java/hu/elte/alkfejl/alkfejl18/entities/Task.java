package hu.elte.alkfejl.alkfejl18.entities;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class Task implements Serializable{
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@ManyToOne
    private Integer id;
	
	@Column
	@NotNull
	@ElementCollection
	private List<Integer> requiredSkils; // ids
	
	@Column
	@NotNull
	private Integer assignee; //id
	
	@Column
	@NotNull
	@ElementCollection
	private List<Integer> prerequisites; //ids
	
	@Column
	@NotNull
	private Boolean complete;
	
	@Column(unique=true)
	@NotNull
	private Integer Project; //id
}
