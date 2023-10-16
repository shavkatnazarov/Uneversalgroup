package uneversalgroup.uneversal.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import uneversalgroup.uneversal.entity.Role;
import uneversalgroup.uneversal.entity.User;
import uneversalgroup.uneversal.payload.ApiResponse;
import uneversalgroup.uneversal.payload.AuthDto;
import uneversalgroup.uneversal.payload.LoginDto;
import uneversalgroup.uneversal.repository.AuthRepository;
import uneversalgroup.uneversal.repository.RoleRepository;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService implements UserDetailsService {
    private final AuthRepository authRepository;
    private final RoleRepository roleRepository;

    @Autowired
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    public ApiResponse teacher(AuthDto authDto){
        try{
            Role getRole = roleRepository.findById(2).orElseThrow(() -> new ResourceNotFoundException("getRole"));
               User teacher = User.builder().roles(Collections.singleton(getRole)).lastName(authDto.getSurName()).password(authDto.getPhoneNumber()).phoneNumber(authDto.getPhoneNumber()).firstName(authDto.getName()).build();
               authRepository.save(teacher);
                return new ApiResponse("Saqlandi", true);
        }catch (Exception e){
            return new ApiResponse<>("uqituvchi saqlashda xatolik sababi"+e,false);
        }
    }
    public ApiResponse register(AuthDto dto) {
        try {
            boolean b = authRepository.existsUsersByPhoneNumber(dto.getPhoneNumber());
            Role getRole = roleRepository.findById(3).orElseThrow(() -> new ResourceNotFoundException("getRole"));
            if (!b) {
                User build = User.builder().roles(Collections.singleton(getRole)).lastName(dto.getSurName()).password(dto.getPhoneNumber()).phoneNumber(dto.getPhoneNumber()).firstName(dto.getName()).build();
                authRepository.save(build);
                return new ApiResponse("Saqlandi", true);
            }
            return new ApiResponse("Bunday User Avvaldan mavjud", false);
        } catch (Exception e) {
            return new ApiResponse("xatolik", false);
        }
    }


    public List<LoginDto> getTeacher() {
        Role role1 = roleRepository.findById(3).orElseThrow(() -> new ResourceNotFoundException("get User"));
        List<User> all = authRepository.findAll();
        List<LoginDto> registerDtoList = new ArrayList<>();
        for (User user : all) {
            for (Role role : user.getRoles()) {
                if (role.equals(role1)){
                    registerDtoList.add(
                            LoginDto.builder()
                                    .phoneNumber(user.getPhoneNumber())
                                    .password(user.getPassword())
                                    .build()
                    );
                }
            }
        }
        return registerDtoList;
    }

    @Override
    public UserDetails loadUserByUsername(String phoneNumber) throws UsernameNotFoundException {
        return authRepository.findUserByPhoneNumber(phoneNumber).orElseThrow(() -> new UsernameNotFoundException("getUser"));
    }

    public UserDetails getUserById(UUID id) {
        return authRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("getUser"));
    }


}
