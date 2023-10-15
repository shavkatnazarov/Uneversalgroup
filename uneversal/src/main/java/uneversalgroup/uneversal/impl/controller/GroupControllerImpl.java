package uneversalgroup.uneversal.impl.controller;

import org.springframework.http.HttpEntity;
import uneversalgroup.uneversal.payload.GroupDto;

public interface GroupControllerImpl {
    HttpEntity<?>addGroup(GroupDto groupDto);
}
