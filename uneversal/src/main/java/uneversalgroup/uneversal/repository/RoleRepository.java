package uneversalgroup.uneversal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import uneversalgroup.uneversal.entity.Role;


@CrossOrigin
public interface RoleRepository extends JpaRepository<Role, Integer> {

}
