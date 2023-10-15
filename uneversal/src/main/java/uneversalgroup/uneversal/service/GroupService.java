package uneversalgroup.uneversal.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import uneversalgroup.uneversal.impl.service.GroupServiceImpl;
import uneversalgroup.uneversal.payload.ApiResponse;
import uneversalgroup.uneversal.payload.GroupDto;
import uneversalgroup.uneversal.repository.AuthRepository;
import uneversalgroup.uneversal.repository.CourseRepository;
import uneversalgroup.uneversal.repository.GroupRepository;
import uneversalgroup.uneversal.repository.WeekDayRepository;

@Service
@RequiredArgsConstructor
public class GroupService implements GroupServiceImpl {
    private final GroupRepository groupRepository;
    private final CourseRepository courseRepository;
    private final WeekDayRepository weekDayRepository;
    private final AuthRepository authRepository;
    @Override
    public ApiResponse<?> addGroup(GroupDto groupDto) {
        return null;
    }
}
