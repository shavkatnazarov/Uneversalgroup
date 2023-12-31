package uneversalgroup.uneversal.impl.controller;

import org.springframework.http.HttpEntity;
import uneversalgroup.uneversal.payload.GroupDto;

import java.util.UUID;

public interface GroupControllerImpl {
    HttpEntity<?>getGroup();
    HttpEntity<?>addGroup(GroupDto groupDto);
    HttpEntity<?>changeActive(UUID id,boolean active);
    HttpEntity<?> getOneGroup(UUID id);
    HttpEntity<?>deleteGroup(UUID id);
}
