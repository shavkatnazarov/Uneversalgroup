package uneversalgroup.uneversal.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import uneversalgroup.uneversal.entity.Course;
import uneversalgroup.uneversal.impl.service.CourseServiceImpl;
import uneversalgroup.uneversal.payload.ApiResponse;
import uneversalgroup.uneversal.payload.CourseDto;
import uneversalgroup.uneversal.repository.CourseRepository;

import java.lang.module.ResolutionException;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseService implements CourseServiceImpl {
    private final CourseRepository courseRepository;

    @Override
    public List<CourseDto> getCourse() {
        List<Course> all = courseRepository.findAll();
        List<CourseDto> courseDtos = new ArrayList<>();
        for (Course course : all) {
            CourseDto build = CourseDto.builder()
                    .id(course.getId())
                    .name(course.getName())
                    .price(course.getPrice())
                    .expireDate(course.getExpireDate())
                    .description(course.getDescription())
                    .photoId(course.getPhotoId())
                    .build();
            courseDtos.add(build);
        }
        return courseDtos;
    }

    @Override
    public ApiResponse<?> addCourse(CourseDto courseDto) {
        try {
            boolean exist = courseRepository.existsCoursesByNameEqualsIgnoreCase(courseDto.getName());
            if (!exist) {
                Course course = Course.builder()
                        .price(courseDto.getPrice())
                        .expireDate(courseDto.getExpireDate())
                        .description(courseDto.getDescription())
                        .photoId(courseDto.getPhotoId())
                        .build();
                course.setName(courseDto.getName());
                courseRepository.save(course);
                return new ApiResponse<>("course saqlandi", true);
            }
            return new ApiResponse<>("course mavjud", false);
        } catch (Exception e) {
            return new ApiResponse<>("Course saqlashda hatolik", false);
        }
    }

    @Override
    public ApiResponse<?> editeCourse(Integer id, CourseDto courseDto) {
        try {
            Course course = courseRepository.findById(id).orElseThrow(() -> new ResolutionException("getCourseId"));
            boolean b = courseRepository.existsCoursesByNameEqualsIgnoreCase(courseDto.getName());
            if (!b) {
                course.setName(courseDto.getName());
                course.setPrice(courseDto.getPrice());
                course.setExpireDate(courseDto.getExpireDate());
                course.setDescription(courseDto.getDescription());
                courseRepository.save(course);
                return new ApiResponse<>("course saqlandi", true);
            }
            return new ApiResponse<>("course mavjud", false);
        } catch (Exception e) {
            return new ApiResponse<>("xatolik", false);
        }
    }

    @Override
    public ApiResponse<?> deleteCourse(Integer id) {
        try {
            Course course = courseRepository.findById(id).orElseThrow(() -> new ResolutionException("getCourseId"));
            courseRepository.delete(course);
            return new ApiResponse<>("course uchirildi",true);
        }catch (Exception e){
            return new ApiResponse<>("xatolik",false);
        }
    }
}
