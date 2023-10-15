package uneversalgroup.uneversal.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import uneversalgroup.uneversal.impl.service.GroupServiceImpl;
import uneversalgroup.uneversal.payload.ApiResponse;
import uneversalgroup.uneversal.payload.GroupDto;

@Service
@RequiredArgsConstructor
public class GroupService implements GroupServiceImpl {
    @Override
    public ApiResponse<?> addGroup(GroupDto groupDto) {
        return null;
    }
}
