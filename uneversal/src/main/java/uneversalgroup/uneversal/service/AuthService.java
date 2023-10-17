package uneversalgroup.uneversal.service;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import uneversalgroup.uneversal.entity.Role;
import uneversalgroup.uneversal.entity.User;
import uneversalgroup.uneversal.payload.*;
import uneversalgroup.uneversal.repository.AuthRepository;
import uneversalgroup.uneversal.repository.RoleRepository;
import uneversalgroup.uneversal.security.JwtTokenProvider;

import java.util.Collections;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService implements UserDetailsService {
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthRepository authRepository;
    private final RoleRepository roleRepository;

    @Autowired
    public PasswordEncoder pass(){
        return new BCryptPasswordEncoder();
    }

    @Override
    public UserDetails loadUserByUsername(String phoneNumber) throws UsernameNotFoundException {
        return authRepository.findUserByPhoneNumber(phoneNumber).orElseThrow(() -> new UsernameNotFoundException("getUser"));
    }

    public UserDetails getUserById(UUID id) {
        return authRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("getUser"));
    }
    public ApiResponse<?> addTeacher(UUID userId, AuthDto authDto){
        try {
            User user = authRepository.findById(userId).orElseThrow(() -> new uneversalgroup.uneversal.exception.ResourceNotFoundException(404, "getUser", "user", userId));
            Role adminRole = roleRepository.findById(1).orElseThrow(() -> new uneversalgroup.uneversal.exception.ResourceNotFoundException(404, "getRole", "id", userId));
            Role teacherRole = roleRepository.findById(2).orElseThrow(() -> new uneversalgroup.uneversal.exception.ResourceNotFoundException(404, "getRole", "id", userId));
            for (Role role : user.getRoles()) {
                if (role.equals(adminRole)){
                    User build = User.builder()
                            .firstName(authDto.getFirstName())
                            .lastName(authDto.getLastName())
                            .phoneNumber(authDto.getPhoneNumber())
                            .password(authDto.getPassword())
                            .roles(Collections.singleton(teacherRole))
                            .build();
                    authRepository.save(build);
                    return new ApiResponse<>("O'qtuvchi qoshildi",true);
                }
                return new ApiResponse<>("Faqat admin qusha oladi",false);
            }
            return new ApiResponse<>("xatolik",false);

        }catch (Exception e){
            return new ApiResponse<>("Xatolik",false);
        }
    }

    public HttpEntity<?> login(LoginDto request, AuthenticationManager authenticationManager) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getPhoneNumber(), request.getPassword())
        );
        User user = authRepository.findUserByPhoneNumber(request.getPhoneNumber()).orElseThrow(() -> new ResourceNotFoundException("getUser"));
        ResToken resToken = new ResToken(generateToken(request.getPhoneNumber()));
        System.out.println(ResponseEntity.ok(getMal(user, resToken)));
        return ResponseEntity.ok(getMal(user, resToken));
    }

//    public HttpEntity<?> register(RegisterDto registerDto, AuthenticationManager authenticationManager) {
//        if (!registerDto.getPassword().equals(registerDto.getPrePassword())) {
//            return ResponseEntity.ok(new ApiResponse<>("Parol va tasdiqlash paroli teng bo'lishi shart", false));
//        }
//        if (registerDto.getPhoneNumber().length() != 9) {
//            return ResponseEntity.ok(new ApiResponse<>("telefon raqamda xatolik", false));
//        }
//        try {
//            long number = Long.parseLong(registerDto.getPhoneNumber());
//            int name = (int) (Math.random() * 1000000);
//            int surname = (int) (Math.random() * 1000000);
//            User user = User.builder()
//                    .name(String.valueOf(name))
//                    .surname(String.valueOf(surname))
//                    .phoneNumber(registerDto.getPhoneNumber())
//                    .password(pass().encode(registerDto.getPassword()))
//                    .roles(Collections.singleton(roleRepository.findById(4).orElseThrow(() -> new ResourceNotFoundException("getRole"))))
//                    .buyProducts(null)
//                    .accountNonLocked(true)
//                    .accountNonExpired(true)
//                    .credentialsNonExpired(true)
//                    .enabled(true)
//                    .build();
//            User save = authRepository.save(user);
//            LoginDto loginDto = LoginDto.builder()
//                    .phoneNumber(save.getPhoneNumber())
//                    .password(registerDto.getPassword())
//                    .build();
//            return login(loginDto, authenticationManager);
//        } catch (NumberFormatException e) {
//            return ResponseEntity.ok(new ApiResponse<>("Telefon raqam faqat raqamdan iborat bo'lishi kerak", false));
//        }
//    }

    private String generateToken(String phoneNumber) {
        User user = authRepository.findUserByPhoneNumber(phoneNumber).orElseThrow(() -> new UsernameNotFoundException("getUser"));
        return jwtTokenProvider.generateToken(user.getId());
    }


    public GetData getMal(User user, ResToken resToken) {
        return new GetData(user, resToken);
    }

}
