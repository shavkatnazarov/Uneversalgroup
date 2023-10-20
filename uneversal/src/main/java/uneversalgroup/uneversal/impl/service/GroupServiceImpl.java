package uneversalgroup.uneversal.impl.service;

import uneversalgroup.uneversal.payload.ApiResponse;
import uneversalgroup.uneversal.payload.GroupDto;

import java.util.List;
import java.util.UUID;

public interface GroupServiceImpl {
    List<GroupDto> getGroup();

    ApiResponse<?> addGroup(GroupDto groupDto);

    ApiResponse<?> changeActive(UUID id, boolean active);
    ApiResponse<?>deleteGroup(UUID id);
}
