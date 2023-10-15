package uneversalgroup.uneversal.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;
import uneversalgroup.uneversal.entity.User;
import uneversalgroup.uneversal.payload.LoginDto;
import uneversalgroup.uneversal.repository.AuthRepository;
import uneversalgroup.uneversal.service.AuthService;

import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    private final AuthRepository authRepository;
    private final AuthenticationManager authenticationManager;
    @PostMapping("/login")
    public HttpEntity<?> login(@RequestBody LoginDto request) {
        return authService.login(request, authenticationManager);
    }

    @GetMapping("/{id}")
    public HttpEntity<?> getOneUser(@PathVariable UUID id) {
        User user = authRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("getUser"));
        return ResponseEntity.ok(user);
    }

//    @PostMapping("/register")
//    public HttpEntity<?> register(@RequestBody RegisterDto registerDto) {
//        return authService.register(registerDto, authenticationManager );
//    }
}
