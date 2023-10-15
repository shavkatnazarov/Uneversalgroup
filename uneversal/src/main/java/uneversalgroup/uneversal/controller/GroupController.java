package uneversalgroup.uneversal.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uneversalgroup.uneversal.impl.controller.GroupControllerImpl;
import uneversalgroup.uneversal.payload.GroupDto;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/api/group")
public class GroupController implements GroupControllerImpl {
    @Override
    public HttpEntity<?> addGroup(GroupDto groupDto) {
        return null;
    }
}
