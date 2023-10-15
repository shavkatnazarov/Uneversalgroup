package uneversalgroup.uneversal.impl.service;

import uneversalgroup.uneversal.payload.ApiResponse;
import uneversalgroup.uneversal.payload.GroupDto;

public interface GroupServiceImpl {
    ApiResponse<?>addGroup(GroupDto groupDto);
}
