package uneversalgroup.uneversal.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.*;
import uneversalgroup.uneversal.impl.controller.GroupControllerImpl;
import uneversalgroup.uneversal.payload.GroupDto;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/api/group")
public class GroupController implements GroupControllerImpl {
    @Override
    @PostMapping
    public HttpEntity<?> addGroup(@RequestBody GroupDto groupDto) {
        return null;
    }

    @Override
    public HttpEntity<?> changeActive(UUID id, boolean active) {


    }
}
