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
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
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
public class Project implements Serializable{
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
	
	@Column
	@NotNull
	//@ManyToOne
	private Group group;
	
	@Column
	@NotNull
	@ElementCollection(targetClass=Task.class)
	@OneToMany(mappedBy = "id")
	private List<Task> tasks;
	
	@Column
	@Temporal(TemporalType.TIMESTAMP)
	private Date deadline;
	
	@Column
	@NotNull
	private String name;
}
