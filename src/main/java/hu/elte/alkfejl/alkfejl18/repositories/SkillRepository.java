package hu.elte.alkfejl.alkfejl18.repositories;

import hu.elte.alkfejl.alkfejl18.entities.Skill;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SkillRepository extends CrudRepository<Skill, Integer> {
	
}

