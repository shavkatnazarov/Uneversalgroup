package uneversalgroup.uneversal.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import uneversalgroup.uneversal.entity.User;
import uneversalgroup.uneversal.payload.*;
import uneversalgroup.uneversal.repository.AuthRepository;
import uneversalgroup.uneversal.security.JwtTokenProvider;
import uneversalgroup.uneversal.service.AuthService;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final
    AuthService authService;
    private final
    AuthenticationManager authenticationManager;
    private final
    AuthRepository authRepository;
    private final
    JwtTokenProvider jwtTokenProvider;

    @PostMapping("/findUser")
    public HttpEntity<?> findUser(@RequestBody LoginDto loginDto) {
        boolean b = authRepository.existsUsersByPhoneNumber(loginDto.getPhoneNumber());
        if (b) {
            return ResponseEntity.ok(new ApiResponse("login", true));
        } else {
            return ResponseEntity.ok(new ApiResponse("register", true));
        }
    }

    @PostMapping("/login")
    public HttpEntity<?> login(@RequestBody LoginDto request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getPhoneNumber(), request.getPassword())
        );
        User user = authRepository.findUserByPhoneNumber(request.getPhoneNumber()).orElseThrow(() -> new ResourceNotFoundException("getUser"));
        ResToken resToken = new ResToken(generateToken(request.getPhoneNumber()));
        System.out.println(ResponseEntity.ok(getMal(user, resToken)));
        return ResponseEntity.ok(getMal(user, resToken));
    }

    @GetMapping
    public HttpEntity<?> getUser() {
        List<User> all = authRepository.findAll();
        return ResponseEntity.ok(all);
    }

    @PostMapping("/register")
    public HttpEntity<?> register(@RequestBody AuthDto dto) {
        ApiResponse register = authService.register(dto);
        return ResponseEntity.status(register.isSuccess() ? 200 : 409).body(register);
    }

    private String generateToken(String phoneNumber) {
        User user = authRepository.findUserByPhoneNumber(phoneNumber).orElseThrow(() -> new UsernameNotFoundException("getUser"));
        return jwtTokenProvider.generateToken(user.getId());
    }

    public GetData getMal(User user, ResToken resToken) {
        return new GetData(user, resToken);
    }
}
