package uneversalgroup.uneversal.impl.controller;

import org.springframework.http.HttpEntity;
import uneversalgroup.uneversal.payload.CourseDto;

public interface CourseControllerImpl {
     HttpEntity<?>getOneCourse(Integer id);
     HttpEntity<?>getCourse();
     HttpEntity<?>addCourse(CourseDto courseDto);
     HttpEntity<?>editeCourse(Integer id,CourseDto courseDto);
     HttpEntity<?>deleteCourse(Integer id);
}
