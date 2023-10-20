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
import uneversalgroup.uneversal.payload.SelectUserDto;
import uneversalgroup.uneversal.repository.AuthRepository;
import uneversalgroup.uneversal.repository.CourseRepository;
import uneversalgroup.uneversal.repository.GroupRepository;
import uneversalgroup.uneversal.repository.WeekDaysRepository;

import java.lang.module.ResolutionException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GroupService implements GroupServiceImpl {
    private final GroupRepository groupRepository;
    private final CourseRepository courseRepository;
    private final AuthRepository authRepository;
    private final WeekDaysRepository weekDaysRepository;


    @Override
    public List<GroupDto> getGroup() {
        List<Group> all = groupRepository.findAll();
        List<GroupDto> groupDtoList = new ArrayList<>();
        for (Group group : all) {
            GroupDto groupDto = GroupDto.builder()
                    .id(group.getId())
                    .name(group.getName())
                    .start_date(group.getStart_date())
                    .end_date(group.getEnd_date())
                    .teacher(group.getTeacher())
                    .active(group.isActive())
                    .build();
            groupDtoList.add(groupDto);
        }
        return groupDtoList;
    }

    @Override
    public ApiResponse<?> addGroup(GroupDto groupDto) {
        try {
            boolean exist = groupRepository.existsGroupByNameEqualsIgnoreCase(groupDto.getName());
            Course course = courseRepository.findById(groupDto.getCourseId()).orElseThrow(() -> new ResolutionException("getCourseId"));
            User teacher = authRepository.findById(groupDto.getTeacherId()).orElseThrow(() -> new ResolutionException("getTeacherId"));
            List<User>pupil=new ArrayList<>();
            for (SelectUserDto selectUserDto : groupDto.getSelectUserDto()) {
                pupil.add(authRepository.findById(selectUserDto.getValue()).orElseThrow(()->new ResourceNotFoundException(404,"getUser","getUser",groupDto)));
            }
            List<Week_day> weekDays = new ArrayList<>();
            if (groupDto.getDayType().equals("TOQ")) {
                Week_day MONDAY = weekDaysRepository.findById(1).orElseThrow(() -> new ResourceNotFoundException(404, "weekDay", "id", 1));
                Week_day WEDNESDAY = weekDaysRepository.findById(3).orElseThrow(() -> new ResourceNotFoundException(404, "weekDay", "id", 1));
                Week_day FRIDAY = weekDaysRepository.findById(5).orElseThrow(() -> new ResourceNotFoundException(404, "weekDay", "id", 1));
                weekDays.add(MONDAY);
                weekDays.add(WEDNESDAY);
                weekDays.add(FRIDAY);
                if (!exist) {
                    Group build = Group.builder()
                            .name(groupDto.getName())
                            .course(course)
                            .pupil(pupil)
                            .teacher(teacher)
                            .dayType(groupDto.getDay())
                            .weekDays(weekDays)
                            .start_date(groupDto.getStart_date())
                            .end_date(groupDto.getEnd_date())
                            .active(true)
                            .build();
                    groupRepository.save(build);
                    return new ApiResponse<>("group saqlandi", true);
                }
            } else if (groupDto.getDayType().equals("JUFT")) {
                Week_day TUESDAY = weekDaysRepository.findById(2).orElseThrow(() -> new ResourceNotFoundException(404, "weekDay", "id", 1));
                Week_day THURSDAY = weekDaysRepository.findById(4).orElseThrow(() -> new ResourceNotFoundException(404, "weekDay", "id", 1));
                Week_day SUNDAY = weekDaysRepository.findById(6).orElseThrow(() -> new ResourceNotFoundException(404, "weekDay", "id", 1));
                weekDays.add(TUESDAY);
                weekDays.add(THURSDAY);
                weekDays.add(SUNDAY);
                List<User>pupil1=new ArrayList<>();
                for (SelectUserDto selectUserDto : groupDto.getSelectUserDto()) {
                    pupil1.add(authRepository.findById(selectUserDto.getValue()).orElseThrow(()->new ResourceNotFoundException(404,"getUser","getUser",groupDto)));
                }
                if (!exist) {
                    Group group = Group.builder()
                            .name(groupDto.getName())
                            .course(course)
                            .teacher(teacher)
                            .weekDays(weekDays)
                            .pupil(pupil1)
                            .start_date(groupDto.getStart_date())
                            .end_date(groupDto.getEnd_date())
                            .active(true)
                            .build();
                    groupRepository.save(group);
                    return new ApiResponse<>("group saqlandi", true);
                }
            } else if (groupDto.getDayType().equals("BOOTCAMP")) {
                Week_day MONDAY = weekDaysRepository.findById(1).orElseThrow(() -> new ResourceNotFoundException(404, "weekDay", "id", 1));
                Week_day TUESDAY = weekDaysRepository.findById(2).orElseThrow(() -> new ResourceNotFoundException(404, "weekDay", "id", 1));
                Week_day WEDNESDAY = weekDaysRepository.findById(3).orElseThrow(() -> new ResourceNotFoundException(404, "weekDay", "id", 1));
                Week_day THURSDAY = weekDaysRepository.findById(4).orElseThrow(() -> new ResourceNotFoundException(404, "weekDay", "id", 1));
                Week_day FRIDAY = weekDaysRepository.findById(5).orElseThrow(() -> new ResourceNotFoundException(404, "weekDay", "id", 1));
                Week_day SUNDAY = weekDaysRepository.findById(6).orElseThrow(() -> new ResourceNotFoundException(404, "weekDay", "id", 1));
                weekDays.add(TUESDAY);
                weekDays.add(THURSDAY);
                weekDays.add(SUNDAY);
                weekDays.add(MONDAY);
                weekDays.add(WEDNESDAY);
                weekDays.add(FRIDAY);
                List<User>pupil2=new ArrayList<>();
                for (SelectUserDto selectUserDto : groupDto.getSelectUserDto()) {
                    pupil2.add(authRepository.findById(selectUserDto.getValue()).orElseThrow(()->new ResourceNotFoundException(404,"getUser","getUser",groupDto)));
                }
                if (!exist) {
                    Group group1 = Group.builder()
                            .name(groupDto.getName())
                            .course(course)
                            .teacher(teacher)
                            .pupil(pupil2)
                            .weekDays(weekDays)
                            .start_date(groupDto.getStart_date())
                            .end_date(groupDto.getEnd_date())
                            .active(true)
                            .build();
                    groupRepository.save(group1);
                    return new ApiResponse<>("group saqlandi", true);
                }
            }

            return null;
        } catch (Exception e) {
            return new ApiResponse<>("xatolik", false);
        }
    }

    @Override
    public ApiResponse<?> changeActive(UUID id, boolean active) {
        try {
            Group group = groupRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(404, "getGroupId", "groupId", id));
            group.setActive(active);
            groupRepository.save(group);
            return new ApiResponse<>("Arxivlandi", true);
        } catch (Exception e) {
            return new ApiResponse<>("activda xatolik", false);
        }
    }


}
