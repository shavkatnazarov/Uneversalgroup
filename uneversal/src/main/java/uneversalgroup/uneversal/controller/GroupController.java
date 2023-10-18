package uneversalgroup.uneversal.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uneversalgroup.uneversal.entity.Group;
import uneversalgroup.uneversal.exception.ResourceNotFoundException;
import uneversalgroup.uneversal.impl.controller.GroupControllerImpl;
import uneversalgroup.uneversal.payload.ApiResponse;
import uneversalgroup.uneversal.payload.GroupDto;
import uneversalgroup.uneversal.repository.GroupRepository;
import uneversalgroup.uneversal.service.GroupService;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/api/group")
public class GroupController implements GroupControllerImpl {
    private final GroupService groupService;
    private final GroupRepository groupRepository;

    @Override
    @PostMapping("/add")
    public HttpEntity<?> addGroup(@RequestBody GroupDto groupDto) {
        ApiResponse<?> apiResponse = groupService.addGroup(groupDto);
        return ResponseEntity.status(apiResponse.isSuccess() ? 200 : 409).body(apiResponse);
    }

    @Override
    @PutMapping("/active/{id}")
    public HttpEntity<?> changeActive(@PathVariable UUID id, @RequestParam(name = "active") boolean active) {
        ApiResponse<?> apiResponse = groupService.changeActive(id, active);
        return ResponseEntity.status(apiResponse.isSuccess() ? 200 : 409).body(apiResponse);
    }

    @Override
    @GetMapping("/{id}")
    public HttpEntity<?> getOneGroup(@PathVariable UUID id) {
        Group group = groupRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(404, "getGroupId", "groupId", id));
        return ResponseEntity.ok(group);
    }
}
