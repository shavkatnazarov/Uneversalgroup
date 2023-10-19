package uneversalgroup.uneversal.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uneversalgroup.uneversal.entity.Role;
import uneversalgroup.uneversal.entity.User;
import uneversalgroup.uneversal.payload.ResStatistics;
import uneversalgroup.uneversal.repository.AuthRepository;
import uneversalgroup.uneversal.repository.CourseRepository;
import uneversalgroup.uneversal.repository.GroupRepository;
import uneversalgroup.uneversal.repository.RoleRepository;


@RestController
@RequestMapping("/api/statistics")
@RequiredArgsConstructor
public class StatisticsController {
    private final AuthRepository authRepository;
    private final CourseRepository courseRepository;
    private final GroupRepository groupRepository;
    private final RoleRepository roleRepository;

    @GetMapping
    public HttpEntity<?> getStatistics() {
        Role role = roleRepository.findById(1).orElseThrow(() -> new ResourceNotFoundException("role"));
        Role role1 = roleRepository.findById(1).orElseThrow(() -> new ResourceNotFoundException("role"));
        int teacher = 0;
        int pupil = 0;
        for (User user : authRepository.findAll()) {
            for (Role userRole : user.getRoles()) {
                if (userRole.equals(role1)) {
                    teacher = teacher + 1;
                } else if (userRole.equals(role)) {
                    pupil = pupil + 1;
                }
            }
        }

        ResStatistics build = ResStatistics.builder()
                .courseSize(courseRepository.findAll().size())
                .groupSize(groupRepository.findAll().size())
                .pupilSize(pupil)
                .teacherSize(teacher)
                .build();
        return ResponseEntity.ok(build);
    }
}
