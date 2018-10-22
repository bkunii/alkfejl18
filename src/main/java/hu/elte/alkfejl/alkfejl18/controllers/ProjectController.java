package hu.elte.alkfejl.alkfejl18.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/project")
public class SkillController {
    @Autowired
    private UserRepository projectRepository;
    
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
    public ResponseEntity delete(@PathVariable Integer id) {
        Optional<Project> project = projectRepository.findById(id);
        if (!project.isPresent()) {
            return ResponseEntity.notFound().build();   
        }
            
        projectRepository.delete(project.get());
        return ResponseEntity.ok().build();
    }
     
    @PutMapping("/edit/{id}")
    public ResponseEntity<Project> put(@PathVariable Integer id, @RequestBody Project user) {
        Optional<Project> project = projectRepository.findById(id);
        if (!project.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        
        project.setId(id);
        return ResponseEntity.ok(projectRepository.save(project));
    }
}
