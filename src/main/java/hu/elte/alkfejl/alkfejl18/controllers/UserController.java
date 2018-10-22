package hu.elte.alkfejl.alkfejl18.controllers;

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
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserRepository userRepository;
    
    @GetMapping("")
    public ResponseEntity<Iterable<User>> getAll() {
        Iterable<User> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }
     
    @PostMapping("/new")
    public ResponseEntity<User> post(@RequestBody User user) {
        Optional<User> oUser = userRepository.findByUsername(user.getUsername());
        if (oUser.isPresent()) {
            return ResponseEntity.badRequest().build();
        }
        user.setId(null);
        return ResponseEntity.ok(userRepository.save(user));
    }
        
    @GetMapping("/{id}")
    public ResponseEntity<User> get(@PathVariable Integer id) {
        Optional<User> oUser = userRepository.findById(id);
        if (!oUser.isPresent()) {
            return ResponseEntity.notFound().build();   
        }
        
        return ResponseEntity.ok(oUser.get());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable Integer id) {
        Optional<User> oUser = userRepository.findById(id);
        if (!oUser.isPresent()) {
            return ResponseEntity.notFound().build();   
        }
            
        userRepository.delete(oUser.get());
        return ResponseEntity.ok().build();
    }
     
    @PutMapping("/edit/{id}")
    public ResponseEntity<User> put(@PathVariable Integer id, @RequestBody User user) {
        Optional<User> oUser = userRepository.findById(id);
        if (!oUser.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        
        user.setId(id);
        return ResponseEntity.ok(userRepository.save(user));
    }
}
