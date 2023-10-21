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
import uneversalgroup.uneversal.entity.Week_day;
import uneversalgroup.uneversal.entity.enums.RoleName;
import uneversalgroup.uneversal.entity.enums.WeekDaysName;
import uneversalgroup.uneversal.repository.AuthRepository;
import uneversalgroup.uneversal.repository.RoleRepository;
import uneversalgroup.uneversal.repository.WeekDaysRepository;


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
    private final WeekDaysRepository weekDaysRepository;
    @Override
    public void run(String... args) throws Exception {
        if (init.equals("create-drop") || init.equals("create")) {
            for (RoleName value : RoleName.values()) {
                roleRepository.save(new Role(value));
            }
            authRepository.save(
                    new User(
                            "Shavkat", "Admin", "123456789", passwordEncoder.encode("123456789"), Collections.singleton(roleRepository.findById(1).orElseThrow(() -> new ResourceNotFoundException("getRole"))), true
                    )

            );
            for (WeekDaysName value : WeekDaysName.values()) {
                weekDaysRepository.save(new Week_day(value));
            }
        }
    }
}
