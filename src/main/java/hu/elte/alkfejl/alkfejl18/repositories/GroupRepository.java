package hu.elte.alkfejl.alkfejl18.repositories;

import hu.elte.alkfejl.alkfejl18.entities.Group;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupRepository extends CrudRepository<Group, Integer> {

}

