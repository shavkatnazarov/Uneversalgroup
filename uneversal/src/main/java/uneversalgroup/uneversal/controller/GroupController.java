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
import uneversalgroup.uneversal.payload.SelectUserDto;
import uneversalgroup.uneversal.repository.GroupRepository;
import uneversalgroup.uneversal.service.GroupService;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/api/group")
public class GroupController implements GroupControllerImpl {
    private final GroupService groupService;
    private final GroupRepository groupRepository;

    @Override
    @GetMapping
    public HttpEntity<?> getGroup() {
        List<GroupDto> group = groupService.getGroup();
        return ResponseEntity.ok(group);
    }

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

    @Override
    @DeleteMapping("/{id}")
    public HttpEntity<?> deleteGroup(@PathVariable UUID id) {
        ApiResponse<?> apiResponse = groupService.deleteGroup(id);
        return ResponseEntity.status(apiResponse.isSuccess() ? 200 : 409).body(apiResponse);
    }

    //    @Override
//    @GetMapping("/sort-course-by/{id}")
//    public HttpEntity<?> GroupAndCourse(@PathVariable Integer id) {
//        List<Group> groups = groupRepository.GroupAndCourse(id);
//        return ResponseEntity.ok(groups);
//    }

    @PostMapping("/add/pupil")
    public HttpEntity<?> addPupilInGroup(@RequestParam UUID groupId, @RequestBody Set<SelectUserDto> userDtos) {
        ApiResponse<?> apiResponse = groupService.addPupilInGroup(groupId, userDtos);
        return ResponseEntity.status(apiResponse.isSuccess() ? 200 : 409).body(apiResponse);
    }

    @GetMapping("/pupil/{id}")
    public HttpEntity<?> getProductByCategory(@PathVariable UUID id) {
        List<Group> byPupilId = groupRepository.findByPupilId(id);
        return ResponseEntity.ok(byPupilId);
    }
}

