package uneversalgroup.uneversal.entity;

import lombok.*;
import uneversalgroup.uneversal.entity.enums.DayTypeName;
import uneversalgroup.uneversal.entity.enums.WeekDaysName;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Day_type {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Enumerated(value = EnumType.STRING)
    private DayTypeName dayTypeName;

    public Day_type(DayTypeName dayTypeName) {
        this.dayTypeName =dayTypeName ;
    }
}
