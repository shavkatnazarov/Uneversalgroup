package uneversalgroup.uneversal.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import uneversalgroup.uneversal.entity.*;
import uneversalgroup.uneversal.entity.enums.DayTypeName;
import uneversalgroup.uneversal.exception.ResourceNotFoundException;
import uneversalgroup.uneversal.impl.service.GroupServiceImpl;
import uneversalgroup.uneversal.payload.ApiResponse;
import uneversalgroup.uneversal.payload.GroupDto;
import uneversalgroup.uneversal.payload.SelectDto;
import uneversalgroup.uneversal.payload.SelectUserDto;
import uneversalgroup.uneversal.repository.*;

import java.lang.module.ResolutionException;
import java.util.*;

@Service
@RequiredArgsConstructor
public class GroupService implements GroupServiceImpl {
    private final GroupRepository groupRepository;
    private final CourseRepository courseRepository;
    private final AuthRepository authRepository;
    private final WeekDaysRepository weekDaysRepository;
    private final PupilAttendanceMonthRepository pupilAttendanceMonthRepository;


    @Override
    public List<GroupDto> getGroup() {
        List<Group> all = groupRepository.findAll();
        List<GroupDto> groupDtoList = new ArrayList<>();
        for (Group group : all) {
            GroupDto groupDto = GroupDto.builder().id(group.getId()).name(group.getName()).start_date(group.getStart_date()).end_date(group.getEnd_date()).teacher(group.getTeacher()).active(group.isActive()).build();
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

            List<Week_day> weekDays = new ArrayList<>();
            if (groupDto.getDayType().equals("TOQ")) {
                Week_day MONDAY = weekDaysRepository.findById(1).orElseThrow(() -> new ResourceNotFoundException(404, "weekDay", "id", 1));
                Week_day WEDNESDAY = weekDaysRepository.findById(3).orElseThrow(() -> new ResourceNotFoundException(404, "weekDay", "id", 1));
                Week_day FRIDAY = weekDaysRepository.findById(5).orElseThrow(() -> new ResourceNotFoundException(404, "weekDay", "id", 1));
                weekDays.add(MONDAY);
                weekDays.add(WEDNESDAY);
                weekDays.add(FRIDAY);
                if (!exist) {
                    Group build = Group.builder().name(groupDto.getName()).course(course).teacher(teacher).dayType(groupDto.getDay()).weekDays(weekDays).start_date(groupDto.getStart_date()).end_date(groupDto.getEnd_date()).active(true).build();
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

                if (!exist) {
                    Group group = Group.builder().name(groupDto.getName()).course(course).teacher(teacher).weekDays(weekDays).start_date(groupDto.getStart_date()).end_date(groupDto.getEnd_date()).active(true).build();
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

                if (!exist) {
                    Group group1 = Group.builder().name(groupDto.getName()).course(course).teacher(teacher).weekDays(weekDays).start_date(groupDto.getStart_date()).end_date(groupDto.getEnd_date()).active(true).build();
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

    @Override
    public ApiResponse<?> deleteGroup(UUID id) {
        try {
            Group group = groupRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(404, "getGroup", "groupId", id));
            groupRepository.delete(group);
            return new ApiResponse<>("group uchirildi", true);
        } catch (Exception e) {
            return new ApiResponse<>("xatolik", false);
        }
    }

    public ApiResponse<?> addPupilInGroup(UUID groupId, Set<SelectUserDto> selectUserDtos) {
        try {
            Group group = groupRepository.findById(groupId).orElseThrow(() -> new org.springframework.data.rest.webmvc.ResourceNotFoundException("group"));
            for (SelectUserDto selectUserDto : selectUserDtos) {
                User pupil = authRepository.findById(selectUserDto.getValue()).orElseThrow(() -> new ResolutionException("getPupilId"));
                Date startDate = group.getStart_date();
                Date endDate = group.getEnd_date();
                int startMonth = startDate.getMonth() + 1;
                int endMonth = endDate.getMonth() + 1;
                List<PupilAttendanceMonth> pupilAttendanceMonths = new ArrayList<>();
                int startYear = startDate.getYear() + 1900;
                int endYear = endDate.getYear() + 1900;
                int tr = 0;
                if (startYear != endYear) {
                    tr++;
                }
                if (tr > 0) {
                    for (int i = startMonth; i <= 12; i++) {
                        PupilAttendanceMonth save = pupilAttendanceMonthRepository.save(PupilAttendanceMonth.builder().nowMonth(i).monthSum((group.getCourse().getPrice())).isPay(false).build());
                        pupilAttendanceMonths.add(save);
                    }
                    for (int i = 1; i <= endMonth; i++) {
                        PupilAttendanceMonth save = pupilAttendanceMonthRepository.save(PupilAttendanceMonth.builder().nowMonth(i).monthSum((group.getCourse().getPrice())).isPay(false).build());
                        pupilAttendanceMonths.add(save);
                    }
                } else {
                    for (int i = startMonth; i <= endMonth; i++) {
                        PupilAttendanceMonth save = pupilAttendanceMonthRepository.save(PupilAttendanceMonth.builder().nowMonth(i).monthSum((group.getCourse().getPrice())).isPay(false).build());
                        pupilAttendanceMonths.add(save);
                    }
                }
                pupil.setPupilAttendanceMonths(pupilAttendanceMonths);
                authRepository.save(pupil);
                group.getPupil().add(pupil);
            }
            groupRepository.save(group);
            return new ApiResponse<>("groupga uquvchi saqlandi", true);
        } catch (Exception e) {

            return new ApiResponse<>("xatolik" + e, false);
        }
    }
//    public List<GroupDto> getPupilGroup() {
//
//        List<Group> all = groupRepository.findAll();
//        List<GroupDto> groupDtoList = new ArrayList<>();
//        for (Group group : all) {
//            GroupDto groupDto = GroupDto.builder()
//                    .id(group.getId())
//                    .name(group.getName())
//                    .pupil((User) group.getPupil())
//
//                    .build();
//            groupDtoList.add(groupDto);
//        }
//        return groupDtoList;
//    }
}
//}
