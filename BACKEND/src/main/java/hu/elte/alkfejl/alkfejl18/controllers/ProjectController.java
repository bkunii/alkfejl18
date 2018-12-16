package hu.elte.alkfejl.alkfejl18.controllers;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import hu.elte.alkfejl.alkfejl18.entities.*;
import hu.elte.alkfejl.alkfejl18.repositories.*;

@CrossOrigin
@RestController
@RequestMapping("/projects")
public class ProjectController {
    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TaskRepository taskRepository;
    
    @GetMapping("")
    public ResponseEntity<Iterable<Project>> getAll() {
        Iterable<Project> projects = projectRepository.findAll();
        return ResponseEntity.ok(projects);
    }
     
    @PostMapping("/new")
    public ResponseEntity<Project> createProject(@RequestBody MessageWrapper project) {
    	if(!project.isProject()) {
    		return ResponseEntity.badRequest().build();
    	}
        Optional<User> oLeader = userRepository.findById(project.getLeaderId());
    	if (!oLeader.isPresent()) {
    		return ResponseEntity.badRequest().build();
    	}
    	Project newProject = new Project(null,oLeader.get(),new ArrayList<User>(),new ArrayList<Task>(), null,project.getName());
    	newProject.getMembers().add(oLeader.get());
    	oLeader.get().getOwnedProjects().add(newProject);
    	userRepository.save(oLeader.get());
        return ResponseEntity.ok(projectRepository.save(newProject));
    }
        
    @GetMapping("/{id}")
    public ResponseEntity<Project> getProject(@PathVariable Integer id) {
        Optional<Project> project = projectRepository.findById(id);
        if (!project.isPresent()) {
            return ResponseEntity.notFound().build();   
        }
        
        return ResponseEntity.ok(project.get());
    }
    
    @DeleteMapping("/{id}")//TODO : only by admin or leader
    public ResponseEntity<Project> deleteProject(@PathVariable Integer id) {
        Optional<Project> oProject = projectRepository.findById(id);
        if (!oProject.isPresent()) {
            return ResponseEntity.notFound().build();   
        }
        Project project = oProject.get();
        for(Task t : project.getTasks()) {
        	for(User u : t.getAssignees()) {
        		u.getAssignedTasks().remove(t);
        	}
        	taskRepository.delete(t);
        }
        for(User u : project.getMembers()) {
        	u.getProjects().remove(project);
        	userRepository.delete(u);
        }
        Optional<User> leader = userRepository.findById(project.getLeader().getId());
        leader.get().getOwnedProjects().remove(project);
        userRepository.save(leader.get());
        projectRepository.delete(project);
        return ResponseEntity.ok().build();
    }
     
    @PutMapping("/edit/{id}")
    public ResponseEntity<Project> editProject(@PathVariable Integer id, @RequestBody Project project) {
    	if(project.getLeader() != null || project.getMembers() != null || project.getTasks() != null) {
    		return ResponseEntity.badRequest().build();
    	}
        Optional<Project> oProject = projectRepository.findById(id);
        if (!oProject.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        
        project.setId(id);
        return ResponseEntity.ok(projectRepository.save(project));
    }
    
    @GetMapping("/{id}/members")
    public ResponseEntity<Iterable<User>> getMembers(@PathVariable Integer id){
    	  Optional<Project> project = projectRepository.findById(id);
          if (!project.isPresent()) {
              return ResponseEntity.notFound().build();   
          }
          return ResponseEntity.ok(project.get().getMembers());
    }
    
    @PostMapping("/{id}/addMember")
    public ResponseEntity<Iterable<User>> addMember(@PathVariable Integer id,@RequestBody User member){
    	Optional<Project> oProject = projectRepository.findById(id);
    	Optional<User> oMember = userRepository.findById(member.getId());
    	if(!oProject.isPresent() || !oMember.isPresent()) {
    		return ResponseEntity.notFound().build();
    	}
    	Project project = oProject.get();
    	if(project.getMembers().contains(oMember.get())) {
    		return ResponseEntity.badRequest().build();
    	}
    	oMember.get().getProjects().add(project);
    	project.getMembers().add(oMember.get());
    	userRepository.save(oMember.get());
    	projectRepository.save(project);
    	return ResponseEntity.ok(project.getMembers());
    }
    
    @PostMapping("/{id}/removeMember/{userId}")
    public ResponseEntity<Iterable<User>> removeMember(@PathVariable Integer id, @PathVariable Integer userId, @RequestBody User member){
    	Optional<Project> oProject = projectRepository.findById(id);
    	Optional<User> oMember = userRepository.findById(userId);
    	if(!oProject.isPresent() || !oMember.isPresent() || !oProject.get().getMembers().contains(oMember.get())) {
    		return ResponseEntity.notFound().build();
    	}
    	
    	return ResponseEntity.ok().build();
    }
}
