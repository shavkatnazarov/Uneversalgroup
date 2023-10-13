package uneversalgroup.uneversal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uneversalgroup.uneversal.entity.Course;

public interface CourseRepository extends JpaRepository<Course, Integer> {
    boolean existsCoursesByNameEqualsIgnoreCase(String name);
}
