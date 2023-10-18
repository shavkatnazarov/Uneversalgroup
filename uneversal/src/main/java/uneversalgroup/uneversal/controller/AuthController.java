package uneversalgroup.uneversal.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import uneversalgroup.uneversal.entity.Course;
import uneversalgroup.uneversal.entity.Group;
import uneversalgroup.uneversal.entity.User;
import uneversalgroup.uneversal.payload.*;
import uneversalgroup.uneversal.repository.AuthRepository;
import uneversalgroup.uneversal.repository.GroupRepository;
import uneversalgroup.uneversal.security.JwtTokenProvider;
import uneversalgroup.uneversal.service.AuthService;

import java.lang.module.ResolutionException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    private final AuthRepository authRepository;
    private final GroupRepository groupRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider ;

    @PostMapping("/login")
    public HttpEntity<?> login(@RequestBody LoginDto request) {
        return authService.login(request, authenticationManager);
    }

    @GetMapping("/{id}")
    public HttpEntity<?> getOneUser(@PathVariable UUID id) {
        User user = authRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("getUser"));
        return ResponseEntity.ok(user);
    }
    @PostMapping("/pupil/{id}")
    public HttpEntity<?> addPupil(@PathVariable UUID id,@RequestParam UUID groupId, @RequestBody AuthDto authDto) {
        ApiResponse<?> apiResponse = authService.addPupil(authDto, groupId, id);
        return ResponseEntity.status(apiResponse.isSuccess() ? 200 : 400).body(apiResponse);
    }
    @PostMapping("/teacher{id}")
    public HttpEntity<?> addTeachers(@PathVariable UUID id,@RequestBody AuthDto authDto){
        ApiResponse<?> apiResponse = authService.addTeacher(id, authDto);
        return ResponseEntity.status(apiResponse.isSuccess()?200:409).body(apiResponse);
    }

    @GetMapping("/teacher")
    public HttpEntity<?> getTeacher() {
        List<AuthDto> teacher = authService.getTeacher();
        return ResponseEntity.ok(teacher);
    }
    @GetMapping("teacher/{id}")
    public HttpEntity<?> getOneTeacher(@PathVariable UUID id,@RequestParam UUID teacherId) {
        List<Group> teacherGroup = authService.getTeacherGroup(teacherId, id);
        return ResponseEntity.ok(teacherGroup);
    }
    private String generateToken(String phoneNumber) {
        User user = authRepository.findUserByPhoneNumber(phoneNumber).orElseThrow(() -> new UsernameNotFoundException("getUser"));
        return jwtTokenProvider.generateToken(user.getId());
    }

    public GetData getMal(User user, ResToken resToken) {
        return new GetData(user, resToken);
    }
}
