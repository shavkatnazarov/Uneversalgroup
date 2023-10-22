package uneversalgroup.uneversal.service;


import lombok.RequiredArgsConstructor;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import uneversalgroup.uneversal.entity.*;
import uneversalgroup.uneversal.payload.*;
import uneversalgroup.uneversal.repository.AuthRepository;
import uneversalgroup.uneversal.repository.GroupRepository;
import uneversalgroup.uneversal.repository.PupilAttendanceMonthRepository;
import uneversalgroup.uneversal.repository.RoleRepository;
import uneversalgroup.uneversal.security.JwtTokenProvider;

import java.util.*;

@Service
@RequiredArgsConstructor
public class AuthService implements UserDetailsService {
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthRepository authRepository;
    private final RoleRepository roleRepository;
    private final GroupRepository groupRepository;
    private final PupilAttendanceMonthRepository pupilAttendanceMonthRepository;

//    @Autowired
//    public PasswordEncoder pas(){
//        return new BCryptPasswordEncoder();
//    }

    @Override
    public UserDetails loadUserByUsername(String phoneNumber) throws UsernameNotFoundException {
        return authRepository.findUserByPhoneNumber(phoneNumber).orElseThrow(() -> new UsernameNotFoundException("getUser"));
    }

    public UserDetails getUserById(UUID id) {
        return authRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("getUser"));
    }

    public ApiResponse<?> addPupil(AuthDto authDto, UUID userId) {
        try {
            User user = authRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("user"));
            Role role1 = roleRepository.findById(1).orElseThrow(() -> new ResourceNotFoundException("role"));
            Role pupil = roleRepository.findById(3).orElseThrow(() -> new ResourceNotFoundException("role"));
            for (Role role : user.getRoles()) {
                if (role.equals(role1)) {
                    User build = User.builder().firstName(authDto.getFirstName()).lastName(authDto.getLastName()).phoneNumber(authDto.getPhoneNumber()).roles(Collections.singleton(pupil)).password(authDto.getPassword()).pay(false).build();
                    authRepository.save(build);
                    return new ApiResponse<>("saqlandi", true);
                }
            }
            return new ApiResponse<>("Bu ishni faqat admin qiladi", true);
        } catch (Exception e) {
            return new ApiResponse<>("Xatolik", false);
        }
    }

    public List<AuthDto> getPuple() {
        try {
            List<User> all = authRepository.findAll();
            Role role1 = roleRepository.findById(3).orElseThrow(() -> new ResourceNotFoundException("getRole"));
            List<AuthDto> pupil = new ArrayList<>();
            for (User user : all) {
                for (Role role : user.getRoles()) {
                    if (role == role1) {
                        AuthDto build = AuthDto.builder().id(user.getId()).firstName(user.getFirstName()).lastName(user.getLastName()).phoneNumber(user.getPhoneNumber()).password(user.getPassword()).pay(user.isPay()).build();
                        pupil.add(build);
                    }
                }
            }

            return pupil;
        } catch (Exception e) {
            return null;
        }
    }

    public ApiResponse<?> addTeacher(UUID id, AuthDto authDto) {
        try {
            User user = authRepository.findById(id).orElseThrow(() -> new uneversalgroup.uneversal.exception.ResourceNotFoundException(404, "getUser", "user", id));
            Role adminRole = roleRepository.findById(1).orElseThrow(() -> new uneversalgroup.uneversal.exception.ResourceNotFoundException(404, "getRole", "id", id));
            Role teacherRole = roleRepository.findById(2).orElseThrow(() -> new uneversalgroup.uneversal.exception.ResourceNotFoundException(404, "getRole", "id", id));
            for (Role role : user.getRoles()) {
                if (role.equals(adminRole)) {
                    User build = User.builder().firstName(authDto.getFirstName()).lastName(authDto.getLastName()).phoneNumber(authDto.getPhoneNumber()).password(authDto.getPassword()).roles(Collections.singleton(teacherRole)).build();
                    authRepository.save(build);
                    return new ApiResponse<>("O'qtuvchi qoshildi", true);
                }
                return new ApiResponse<>("Faqat admin qusha oladi", false);
            }
            return new ApiResponse<>("xatolik", false);

        } catch (Exception e) {
            return new ApiResponse<>("Xatolik", false);
        }
    }

    public List<AuthDto> getTeacher() {
        try {
            List<User> all = authRepository.findAll();
            Role role1 = roleRepository.findById(2).orElseThrow(() -> new ResourceNotFoundException("getRole"));
            List<AuthDto> teacher = new ArrayList<>();
            for (User user : all) {
                for (Role role : user.getRoles()) {
                    if (role == role1) {
                        AuthDto build = AuthDto.builder().id(user.getId()).firstName(user.getFirstName()).lastName(user.getLastName()).phoneNumber(user.getPhoneNumber()).password(user.getPassword()).build();
                        teacher.add(build);
                    }
                }
            }
            return teacher;
        } catch (Exception e) {
            return null;
        }
    }

    public ApiResponse<?> changePay(UUID id, boolean pay) {
        try {
            User getUser = authRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("getUser"));
            Date date = new Date();
            for (PupilAttendanceMonth pupilAttendanceMonth : getUser.getPupilAttendanceMonths()) {
                if (pupilAttendanceMonth.getNowMonth() == (date.getMonth() + 1)) {
                    pupilAttendanceMonth.setPay(!pupilAttendanceMonth.isPay());
                    pupilAttendanceMonthRepository.save(pupilAttendanceMonth);
                }
            }
            authRepository.save(getUser);
            return new ApiResponse<>("Tulangan ruyxatiga qushildi", true);
        } catch (Exception e) {
            return new ApiResponse<>("xatolik", false);
        }
    }

    public List<Group> getTeacherGroup(UUID teacherId) {
        return groupRepository.getGroupByTeacherId(teacherId);
    }

    public HttpEntity<?> login(LoginDto request, AuthenticationManager authenticationManager) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getPhoneNumber(), request.getPassword()));
        User user = authRepository.findUserByPhoneNumber(request.getPhoneNumber()).orElseThrow(() -> new ResourceNotFoundException("getUser"));
        ResToken resToken = new ResToken(generateToken(request.getPhoneNumber()));
        System.out.println(ResponseEntity.ok(getMal(user, resToken)));
        return ResponseEntity.ok(getMal(user, resToken));
    }

    private String generateToken(String phoneNumber) {
        User user = authRepository.findUserByPhoneNumber(phoneNumber).orElseThrow(() -> new UsernameNotFoundException("getUser"));
        return jwtTokenProvider.generateToken(user.getId());
    }


    public GetData getMal(User user, ResToken resToken) {
        return new GetData(user, resToken);
    }

}
