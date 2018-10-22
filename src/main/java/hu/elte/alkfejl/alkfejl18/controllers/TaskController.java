package hu.elte.alkfejl.alkfejl18.controllers;

import hu.elte.alkfejl.alkfejl18.entities.User;
import hu.elte.alkfejl.alkfejl18.entities.Task;
import hu.elte.alkfejl.alkfejl18.repositories.UserRepository;
import hu.elte.alkfejl.alkfejl18.repositories.TaskRepository;
import java.util.List;
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

@RestController
@RequestMapping("/task")
public class TaskController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TaskRepository taskRepository;
    
    @GetMapping("")
    public ResponseEntity<Iterable<Task>> getAll() {
        return ResponseEntity.ok(taskRepository.findAll());
    }
    
    @PostMapping("")
    public ResponseEntity<Task> post(@RequestBody Task task) {
        task.setId(null);
        return ResponseEntity.ok(taskRepository.save(task));
    }
        
    @GetMapping("/{id}")
    public ResponseEntity<Task> get(@PathVariable Integer id) {
        Optional<Task> oTask = taskRepository.findById(id);
        if (!oTask.isPresent()) {
            return ResponseEntity.notFound().build();   
        }
        
        return ResponseEntity.ok(oTask.get());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable Integer id) {
        Optional<Task> oTask = taskRepository.findById(id);
        if (!oTask.isPresent()) {
            return ResponseEntity.notFound().build();   
        }
            
        taskRepository.delete(oTask.get());
        return ResponseEntity.ok().build();
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Task> put(@PathVariable Integer id,
                                           @RequestBody Task task) {
        Optional<Task> oTask = taskRepository.findById(id);
        if (!oTask.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        
        task.setId(id);
        return ResponseEntity.ok(taskRepository.save(task));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Iterable<Task>> getTasks(@PathVariable Integer id) {
        Optional<Task> oTask = taskRepository.findById(id);
        if (!oTask.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        
        return ResponseEntity.ok(oTask.get().getTasks());
    }
    
    @PutMapping("/edit/{id}")
    public ResponseEntity<Iterable<Task>> putTags(@PathVariable Integer id, @RequestBody List<Task> task) {
        Optional<Task> oTask = taskRepository.findById(id);
        if (!oTask.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        
        for (Task task: task) {
            Optional<Task> oTask  = taskRepository.findById(task.getId());
            if (!oTask.isPresent()) {
                continue;
            }
            
            oTask.get().getTask().add(oTask.get());
            taskRepository.save(oTask.get());
        }
        
        return ResponseEntity.ok(oTask.get().getTags());
    }
}
