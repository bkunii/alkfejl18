package hu.elte.alkfejl.alkfejl18.controllers;

import java.util.ArrayList;
import java.util.Optional;
import hu.elte.alkfejl.alkfejl18.entities.*;
import hu.elte.alkfejl.alkfejl18.repositories.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private SkillRepository skillRepository;
    
    @GetMapping("")
    public ResponseEntity<Iterable<User>> getAll() {
        Iterable<User> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }
     
    @PostMapping("/new")
    public ResponseEntity<User> createUser(@RequestBody MessageWrapper user) {
        if(!user.isUser()) {
        	return ResponseEntity.badRequest().build();
        }
        User newUser = new User(null,user.getUserName(),user.getPassword(),user.getName(),new ArrayList<Project>(),new ArrayList<Project>(),
        		new ArrayList<Skill>(),new ArrayList<Task>());
        return ResponseEntity.ok(userRepository.save(newUser));
    }
        
    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Integer id) {
        Optional<User> oUser = userRepository.findById(id);
        if (!oUser.isPresent()) {
            return ResponseEntity.notFound().build();   
        }
        
        return ResponseEntity.ok(oUser.get());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity deleteUser(@PathVariable Integer id) {
        Optional<User> oUser = userRepository.findById(id);
        if (!oUser.isPresent()) {
            return ResponseEntity.notFound().build();   
        }
        if(oUser.get().getOwnedProjects().size() > 0 || oUser.get().getProjects().size() > 0 ||
        		oUser.get().getAssignedTasks().size() > 0) {
        	return ResponseEntity.badRequest().build();
        }
        userRepository.delete(oUser.get());
        return ResponseEntity.ok().build();
    }
    
    @PutMapping("/{id}/edit")
    public ResponseEntity<User> editUser(@PathVariable Integer id,@RequestBody User user){
    	if(user.getAssignedTasks() != null || user.getSkills() != null ||
    				user.getOwnedProjects() != null || user.getProjects() != null) {
    		return ResponseEntity.badRequest().build();
    	}
    	Optional<User> oUser = userRepository.findById(id);
        if (!oUser.isPresent()) {
            return ResponseEntity.notFound().build();   
        }
        
        user.setId(id);
        return ResponseEntity.ok(userRepository.save(user));
    }
    
    @GetMapping("/{id}/skills")
    public ResponseEntity<Iterable<Skill>> getSkillList(@PathVariable Integer id){
    	 Optional<User> oUser = userRepository.findById(id);
         if (!oUser.isPresent()) {
             return ResponseEntity.notFound().build();
         }

         return ResponseEntity.ok(oUser.get().getSkills());
    }
    
    @PutMapping("/{id}/skills/add")
    public ResponseEntity<User> addSkill(@PathVariable Integer id, @RequestBody Skill skill) {
        Optional<User> oUser = userRepository.findById(id);
        Optional<Skill> oSkill = skillRepository.findByName(skill.getName());
        if (!oUser.isPresent() || !oSkill.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        if(oUser.get().getSkills().contains(oSkill.get())) {
        	return ResponseEntity.ok(oUser.get());
        }
        oUser.get().getSkills().add(skill);
        skill.getOwners().add(oUser.get());
        skillRepository.save(skill);
        return ResponseEntity.ok(userRepository.save(oUser.get()));
    }
    
    @PutMapping("/{id}/skills/remove")
    public ResponseEntity<User> removeSkill(@PathVariable Integer id, @RequestBody Skill skill) {
        Optional<User> oUser = userRepository.findById(id);
        Optional<Skill> oSkill = skillRepository.findByName(skill.getName());
        if (!oUser.isPresent() || !oSkill.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        if(!oUser.get().getSkills().contains(oSkill.get())) {
        	return ResponseEntity.ok(oUser.get());
        }
        oUser.get().getSkills().remove(skill);
        skill.getOwners().remove(oUser.get());
        skillRepository.save(skill);
        return ResponseEntity.ok(userRepository.save(oUser.get()));
    }
    
    @GetMapping("/{id}/ownedProjects")
    public ResponseEntity<Iterable<Project>> getOwnedProjectList(@PathVariable Integer id){
    	 Optional<User> oUser = userRepository.findById(id);
         if (!oUser.isPresent()) {
             return ResponseEntity.notFound().build();
         }

         return ResponseEntity.ok(oUser.get().getOwnedProjects());
    }
    
    @GetMapping("/{id}/projects")
    public ResponseEntity<Iterable<Project>> getProjectList(@PathVariable Integer id){
    	 Optional<User> oUser = userRepository.findById(id);
         if (!oUser.isPresent()) {
             return ResponseEntity.notFound().build();
         }

         return ResponseEntity.ok(oUser.get().getProjects());
    }
    
    @GetMapping("/{id}/assignedTasks")
    public ResponseEntity<Iterable<Task>> getTaskList(@PathVariable Integer id){
    	 Optional<User> oUser = userRepository.findById(id);
         if (!oUser.isPresent()) {
             return ResponseEntity.notFound().build();
         }

         return ResponseEntity.ok(oUser.get().getAssignedTasks());
    }
    
    
    
}
