package uneversalgroup.uneversal.impl.controller;

import org.springframework.http.HttpEntity;
import uneversalgroup.uneversal.payload.GroupDto;

import java.util.UUID;

public interface GroupControllerImpl {
    HttpEntity<?>addGroup(GroupDto groupDto);
    HttpEntity<?>changeActive(UUID id,boolean active);
}
