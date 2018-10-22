package hu.elte.alkfejl.alkfejl18.controllers;

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
@RequestMapping("/project")
public class ProjectController {
    @Autowired
    private ProjectRepository projectRepository;
    
    @GetMapping("")
    public ResponseEntity<Iterable<Project>> getAll() {
        Iterable<Project> projects = projectRepository.findAll();
        return ResponseEntity.ok(projects);
    }
     
    @PostMapping("/new")
    public ResponseEntity<Project> post(@RequestBody Project project) {
        project.setId(null);
        return ResponseEntity.ok(projectRepository.save(project));
    }
        
    @GetMapping("/{id}")
    public ResponseEntity<Project> get(@PathVariable Integer id) {
        Optional<Project> project = projectRepository.findById(id);
        if (!project.isPresent()) {
            return ResponseEntity.notFound().build();   
        }
        
        return ResponseEntity.ok(project.get());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Project> delete(@PathVariable Integer id) {
        Optional<Project> project = projectRepository.findById(id);
        if (!project.isPresent()) {
            return ResponseEntity.notFound().build();   
        }
            
        projectRepository.delete(project.get());
        return ResponseEntity.ok().build();
    }
     
    @PutMapping("/edit/{id}")
    public ResponseEntity<Project> put(@PathVariable Integer id, @RequestBody Project project) {
        Optional<Project> oProject = projectRepository.findById(id);
        if (!oProject.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        
        project.setId(id);
        return ResponseEntity.ok(projectRepository.save(project));
    }
}
