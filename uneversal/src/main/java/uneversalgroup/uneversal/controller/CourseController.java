package uneversalgroup.uneversal.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uneversalgroup.uneversal.impl.controller.CourseControllerImpl;
import uneversalgroup.uneversal.payload.ApiResponse;
import uneversalgroup.uneversal.payload.CourseDto;
import uneversalgroup.uneversal.service.CourseService;

import java.util.List;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/api/course")
public class CourseController implements CourseControllerImpl {
    private final CourseService courseService;

    @Override
    @GetMapping("/{id}")
    public HttpEntity<?> getCourse() {
        List<CourseDto> course = courseService.getCourse();
        return ResponseEntity.ok(course);
    }

    @Override
    @PostMapping
    public HttpEntity<?> addCourse(@RequestBody CourseDto courseDto) {
        ApiResponse<?> apiResponse = courseService.addCourse(courseDto);
        return ResponseEntity.status(apiResponse.isSuccess() ? 200 : 409).body(apiResponse);
    }

    @Override
    @PutMapping("/{id}")
    public HttpEntity<?> editeCourse(@PathVariable Integer id, @RequestBody CourseDto courseDto) {
        ApiResponse<?> apiResponse = courseService.editeCourse(id, courseDto);
        return ResponseEntity.status(apiResponse.isSuccess() ? 200 : 409).body(apiResponse);
    }

    @Override
    public HttpEntity<?> deleteCourse(Integer id) {
        ApiResponse<?> apiResponse = courseService.deleteCourse(id);
       return ResponseEntity.status(apiResponse.isSuccess()?200:409).body(apiResponse);
    }
}
