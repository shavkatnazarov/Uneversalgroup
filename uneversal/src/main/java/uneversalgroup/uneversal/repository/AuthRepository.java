package uneversalgroup.uneversal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import uneversalgroup.uneversal.entity.Role;
import uneversalgroup.uneversal.entity.User;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@CrossOrigin
public interface AuthRepository extends JpaRepository<User, UUID> {
    Optional<User> findUserByPhoneNumber(String phoneNumber);
    boolean existsUsersByPhoneNumber(String phoneNumber);

}
