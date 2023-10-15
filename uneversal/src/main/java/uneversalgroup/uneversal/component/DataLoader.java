package uneversalgroup.uneversal.component;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.password.PasswordEncoder;
import uneversalgroup.uneversal.entity.Role;
import uneversalgroup.uneversal.entity.User;
import uneversalgroup.uneversal.entity.enums.RoleName;
import uneversalgroup.uneversal.repository.AuthRepository;
import uneversalgroup.uneversal.repository.RoleRepository;


import java.util.Collections;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class DataLoader implements CommandLineRunner {
    @Value("${spring.jpa.hibernate.ddl-auto}")
    private String init;
    private final AuthRepository authRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (init.equals("create-drop") || init.equals("create")) {
            for (RoleName value : RoleName.values()) {
                roleRepository.save(new Role(value));
            }
            authRepository.save(
                    new User(
                                "Sayfullo", "To'xtayev", "123456789", passwordEncoder.encode("123456"), Collections.singleton(roleRepository.findById(2).orElseThrow(() -> new ResourceNotFoundException("getRole")))
                    )

            );
            authRepository.save(
                    new User(
                            "Admin", "Admin", "123456799", passwordEncoder.encode("123456"), Collections.singleton(roleRepository.findById(1).orElseThrow(() -> new ResourceNotFoundException("getRole")))
                    )

            );

        }
    }
}
