package uneversalgroup.uneversal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uneversalgroup.uneversal.entity.Group;

import java.util.List;
import java.util.UUID;

public interface GroupRepository extends JpaRepository<Group, UUID> {
    boolean existsGroupByNameEqualsIgnoreCase(String name);

     List<Group> findGroupByTeacherId(UUID id);

}
