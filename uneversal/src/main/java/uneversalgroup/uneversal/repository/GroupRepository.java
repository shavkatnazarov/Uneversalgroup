package uneversalgroup.uneversal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import uneversalgroup.uneversal.entity.Group;

import java.util.List;
import java.util.UUID;

public interface GroupRepository extends JpaRepository<Group, UUID> {
    boolean existsGroupByNameEqualsIgnoreCase(String name);

    @Query(value = "select * from guruhlar where teacher_id=?1", nativeQuery = true )
     List<Group> getGroupByTeacherId(UUID id);

}
