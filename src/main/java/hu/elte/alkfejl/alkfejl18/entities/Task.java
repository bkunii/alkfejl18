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
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
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
    private Integer id;
	
	@Column
	@NotNull
	@ElementCollection
	@ManyToMany(mappedBy = "requiredBy")
	private List<Skill> requiredSkils; 
	
	@JoinColumn
	@NotNull
	@ManyToOne
	private User assignee;
	
	@Column
	@NotNull
	@ElementCollection
	private List<Task> prerequisites; 
	
	@Column
	@NotNull
	private Boolean complete;
	
	@JoinColumn(unique=true)
	@NotNull
	@ManyToOne
	private Project project; 
}
