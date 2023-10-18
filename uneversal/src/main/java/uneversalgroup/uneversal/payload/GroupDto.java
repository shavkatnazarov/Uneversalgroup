package uneversalgroup.uneversal.payload;

import lombok.*;
import uneversalgroup.uneversal.entity.Course;
import uneversalgroup.uneversal.entity.Day_type;
import uneversalgroup.uneversal.entity.User;
import uneversalgroup.uneversal.entity.Week_day;
import uneversalgroup.uneversal.entity.enums.DayTypeName;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GroupDto {
    private UUID id;
    private Integer courseId;
    private String dayType;
    private String end_date;
    private String name;
    private String start_date;
    private UUID teacherId;
    private User teacher;
    private Day_type day;
    private List<SelectDto>weekDays;
    private boolean active;
}
