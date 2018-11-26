package hu.elte.alkfejl.alkfejl18.entities;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(unique = true)
    @NotNull
    private String username;
    
    @Column
    @NotNull
    private String password;
    
    @Column
    private String name;
    
    @Column
    @JsonIgnore
    @ElementCollection
    @OneToMany(mappedBy= "leader")
    private List<Project> ownedProjects; //where user is leader
    
    @Column
    @JsonIgnore
    @ElementCollection
    @ManyToMany(mappedBy= "members")
    private List<Project> projects; //where user is member
    
    @Column
    @JsonIgnore
    @ElementCollection
    @ManyToMany(mappedBy = "owners")
    private List<Skill> skills;
    
    @Column
    @JsonIgnore
    @ElementCollection
    @ManyToMany(mappedBy = "assignee")
    private List<Task> assignedTasks;
    
  
}