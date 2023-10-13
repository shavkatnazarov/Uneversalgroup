package uneversalgroup.uneversal.impl.service;

import uneversalgroup.uneversal.payload.ApiResponse;
import uneversalgroup.uneversal.payload.CourseDto;

import java.util.List;

public interface CourseServiceImpl {
     List<CourseDto>getCourse();
     ApiResponse<?> addCourse(CourseDto courseDto);
     ApiResponse<?> editeCourse(Integer id,CourseDto courseDto);
     ApiResponse<?>deleteCourse(Integer id);
}
