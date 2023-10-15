package uneversalgroup.uneversal.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import uneversalgroup.uneversal.entity.Course;
import uneversalgroup.uneversal.entity.Group;
import uneversalgroup.uneversal.entity.User;
import uneversalgroup.uneversal.entity.Week_day;
import uneversalgroup.uneversal.exception.ResourceNotFoundException;
import uneversalgroup.uneversal.impl.service.GroupServiceImpl;
import uneversalgroup.uneversal.payload.ApiResponse;
import uneversalgroup.uneversal.payload.GroupDto;
import uneversalgroup.uneversal.payload.SelectDto;
import uneversalgroup.uneversal.repository.AuthRepository;
import uneversalgroup.uneversal.repository.CourseRepository;
import uneversalgroup.uneversal.repository.GroupRepository;
import uneversalgroup.uneversal.repository.WeekDaysRepository;

import java.lang.module.ResolutionException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GroupService implements GroupServiceImpl {
    private final GroupRepository groupRepository;
    private final CourseRepository courseRepository;
    private final AuthRepository authRepository;
    private final WeekDaysRepository weekDaysRepository;


    @Override
    public ApiResponse<?> addGroup(GroupDto groupDto) {
        try {
            boolean exist = groupRepository.existsGroupByNameEqualsIgnoreCase(groupDto.getName());
            Course course = courseRepository.findById(groupDto.getCourseId()).orElseThrow(() -> new ResolutionException("getCourseId"));
            User teacher = authRepository.findById(groupDto.getTeacherId()).orElseThrow(() -> new ResolutionException("getTeacherId"));
            List<Week_day> weekDays = new ArrayList<>();
            if (groupDto.getDayType().getDayTypeName().name().equals("TOQ")) {
                Week_day Monday = weekDaysRepository.findById(1).orElseThrow(() -> new ResourceNotFoundException(404, "weekDay", "id", 1));
                Week_day WEDNESDAY = weekDaysRepository.findById(3).orElseThrow(() -> new ResourceNotFoundException(404, "weekDay", "id", 1));
                Week_day Friday = weekDaysRepository.findById(5).orElseThrow(() -> new ResourceNotFoundException(404, "weekDay", "id", 1));
                weekDays.add(Monday);
                weekDays.add(WEDNESDAY);
                weekDays.add(Friday);
                if (!exist){
                    Group build = Group.builder()
                            .name(groupDto.getName())
                            .course(course)
                            .teacher(teacher)
                            .dayType(groupDto.getDayType())
                            .weekDays(weekDays)
                            .start_date(groupDto.getStart_date())
                            .end_date(groupDto.getEnd_date())
                            .active(true)
                            .build();
                    groupRepository.save(build);
                    return new ApiResponse<>("group saqlandi",true);
                }

            } else if (groupDto.getDayType().getDayTypeName().name().equals("JUFT")) {
                Week_day TUESDAY = weekDaysRepository.findById(2).orElseThrow(() -> new ResourceNotFoundException(404, "weekDay", "id", 1));
                Week_day THURSDAY = weekDaysRepository.findById(4).orElseThrow(() -> new ResourceNotFoundException(404, "weekDay", "id", 1));
                Week_day SUNDAY = weekDaysRepository.findById(6).orElseThrow(() -> new ResourceNotFoundException(404, "weekDay", "id", 1));
                weekDays.add(TUESDAY);
                weekDays.add(THURSDAY);
                weekDays.add(SUNDAY);
                if (!exist){
                    Group group = Group.builder()
                            .name(groupDto.getName())
                            .course(course)
                            .teacher(teacher)
                            .dayType(groupDto.getDayType())
                            .weekDays(weekDays)
                            .start_date(groupDto.getStart_date())
                            .end_date(groupDto.getEnd_date())
                            .active(true)
                            .build();
                    groupRepository.save(group);
                    return new ApiResponse<>("group saqlandi",true);
                }
            } else {
                for (SelectDto weekDay : groupDto.getWeekDays()) {
                    Week_day getWeekDays = weekDaysRepository.findById(weekDay.getValue()).orElseThrow(() -> new org.springframework.data.rest.webmvc.ResourceNotFoundException("getWeekDays"));
                    weekDays.add(getWeekDays);
                }
                if (!exist){
                    Group group1 = Group.builder()
                            .name(groupDto.getName())
                            .course(course)
                            .teacher(teacher)
                            .dayType(groupDto.getDayType())
                            .weekDays(weekDays)
                            .start_date(groupDto.getStart_date())
                            .end_date(groupDto.getEnd_date())
                            .active(true)
                            .build();
                    groupRepository.save(group1);
                    return new ApiResponse<>("group saqlandi",true);
                }
            }
            return null;
        } catch (Exception e) {
            return new ApiResponse<>("xatolik", false);
        }
    }
}