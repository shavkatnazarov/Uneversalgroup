package uneversalgroup.uneversal.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import uneversalgroup.uneversal.service.AttachmentService;

import java.util.UUID;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/api/attachment")
public class AttachmentController {

    private final AttachmentService attachmentService;

    @PostMapping("/upload")
    @ResponseBody
    public UUID uploadFile(MultipartHttpServletRequest request) {
        return attachmentService.upload(request);
    }

    @GetMapping("/download")
    public HttpEntity<?> getFile(@RequestParam(name = "id", required = false) UUID id) {
        return attachmentService.getFileJon(id);
    }
}
