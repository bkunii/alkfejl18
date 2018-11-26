package hu.elte.alkfejl.alkfejl18.controllers;


import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Optional;

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
import hu.elte.alkfejl.alkfejl18.entities.*;
import hu.elte.alkfejl.alkfejl18.repositories.*;


@RestController
@RequestMapping("/tasks")
public class TaskController {
    @Autowired
    private UserRepository userRepository;
	@Autowired
	private TaskRepository taskRepository;
	@Autowired
	private ProjectRepository projectRepository;
	
	@GetMapping("")
	public ResponseEntity<Iterable<Task>> getAll(){
		return ResponseEntity.ok(taskRepository.findAll());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Task> getTask(@PathVariable Integer id){
		Optional<Task> oTask = taskRepository.findById(id);
		if(!oTask.isPresent()) {
			return ResponseEntity.notFound().build();
		}
		
		return ResponseEntity.ok(oTask.get());
	}
	
	@PostMapping("/create/{projId}")
	public ResponseEntity<Task> createTask(@PathVariable Integer projId,@RequestBody Task task){
		Optional<Project> oProject = projectRepository.findById(projId);
		if(!oProject.isPresent()) {
			return ResponseEntity.notFound().build();
		}
		task.setId(null);
		task.setAssignees(new ArrayList<User>());
		task.setProject(oProject.get());
		task.setComplete(false);
		oProject.get().getTasks().add(task);
		projectRepository.save(oProject.get());
		return ResponseEntity.ok(taskRepository.save(task));
	}
	
	@DeleteMapping("/{id}/delete")
	public ResponseEntity deleteTask(@PathVariable Integer id){
		Optional<Task> oTask = taskRepository.findById(id);
		if(!oTask.isPresent()) {
			return ResponseEntity.notFound().build();
		}
		Task task = oTask.get();
		if(task.getRequiredBy().size()>0) {
			return ResponseEntity.badRequest().build();
		}
		for(User u : task.getAssignees()) {
			u.getAssignedTasks().remove(task);
			userRepository.save(u);
		}
		task.getProject().getTasks().remove(task);
		projectRepository.save(task.getProject());
		taskRepository.delete(task);
		return ResponseEntity.ok().build();
	}
	
	@PutMapping("/{id}/assign")
	public ResponseEntity<Task> assignTask(@RequestBody User user,@PathVariable Integer id){
		Optional<Task> oTask = taskRepository.findById(id);
		Optional<User> oUser = userRepository.findById(user.getId());
		if (!oUser.isPresent() || !oTask.isPresent()) {
            return ResponseEntity.notFound().build();
        }
		Task task = oTask.get();
		if(task.getComplete() || user.getAssignedTasks().contains(task) ||
				!user.getSkills().containsAll(task.getRequiredSkils())) {
			return ResponseEntity.badRequest().build();
		}
		user.getAssignedTasks().add(task);
		task.getAssignees().add(user);
		userRepository.save(user);
		return ResponseEntity.ok(taskRepository.save(task));
	}
	
	@PutMapping("/{id}/unassign")
	public ResponseEntity<Task> unassignTask(@RequestBody User user,@PathVariable Integer id){
		Optional<Task> oTask = taskRepository.findById(id);
		Optional<User> oUser = userRepository.findById(user.getId());
		if (!oUser.isPresent() || !oTask.isPresent()) {
            return ResponseEntity.notFound().build();
        }
		Task task = oTask.get();
		if(task.getComplete() || !user.getAssignedTasks().contains(task)) {
			return ResponseEntity.badRequest().build();
		}
		user.getAssignedTasks().remove(task);
		task.getAssignees().remove(user);
		userRepository.save(user);
		return ResponseEntity.ok(taskRepository.save(task));
	}
	
	@PutMapping("/{id}/complete")
    public ResponseEntity<Task> completeTask(@RequestBody User user, @PathVariable Integer id){
    	 Optional<User> oUser = userRepository.findById(user.getId());
    	 Optional<Task> oTask = taskRepository.findById(id);
         if (!oUser.isPresent() || !oTask.isPresent()) {
             return ResponseEntity.notFound().build();
         }
         if(oTask.get().getStartTime() == null) {
        	 return ResponseEntity.badRequest().build();
         }
         for(User u : oTask.get().getAssignees()){
        	 u.getAssignedTasks().remove(oTask.get());
        	 userRepository.save(u);
         }
         oTask.get().setCompletedBy(user.getUsername());
         oTask.get().setComplete(true);
         oTask.get().setCompletionTime(LocalDateTime.now());
         
         return ResponseEntity.ok(taskRepository.save(oTask.get()));
    }
    
    @PostMapping("/{id}/start")
    public ResponseEntity<Task> startTask(@PathVariable Integer id){
    	 Optional<Task> oTask = taskRepository.findById(id);
         if (!oTask.isPresent()) {
             return ResponseEntity.notFound().build();
         }
         Task task = oTask.get();
         Boolean prerequisiteCheck = true;
         for(Task t :task.getPrerequisites()) {
        	 prerequisiteCheck = prerequisiteCheck && t.getComplete();
         }
         if(!prerequisiteCheck) {
        	 return ResponseEntity.badRequest().build();
         }
         task.setStartTime(LocalDateTime.now());
         return ResponseEntity.ok(taskRepository.save(task));

    }
}
