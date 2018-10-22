package hu.elte.alkfejl.alkfejl18.repositories;

import hu.elte.alkfejl.alkfejl18.entities.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {
	
}


