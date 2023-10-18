package uneversalgroup.uneversal.entity;

import lombok.*;
import uneversalgroup.uneversal.entity.enums.DayTypeName;
import uneversalgroup.uneversal.entity.template.AbsEntity;

import javax.persistence.*;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "groupss")
public class Group extends AbsEntity {
    @Column(nullable = false)
    private String name;

    @ManyToOne(optional = false)
    private User teacher;

    @Column(nullable = false)
    private String start_date;

    @Column(nullable = false)
    private String end_date;

    @ManyToMany
    private List<Week_day> weekDays;

    @ManyToOne
    private Day_type dayType;

    private boolean active = true;

    @ManyToMany
    private List<User> pupil;

    @ManyToOne
    private Course course;
}
