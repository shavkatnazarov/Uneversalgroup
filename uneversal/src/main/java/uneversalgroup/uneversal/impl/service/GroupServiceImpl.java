package uneversalgroup.uneversal.impl.service;

import uneversalgroup.uneversal.payload.ApiResponse;
import uneversalgroup.uneversal.payload.GroupDto;

import java.util.UUID;

public interface GroupServiceImpl {
    ApiResponse<?>addGroup(GroupDto groupDto);
ApiResponse<?>changeActive(UUID id,boolean active);
}
