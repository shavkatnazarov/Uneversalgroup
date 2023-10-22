package uneversalgroup.uneversal.entity;

import lombok.*;
import uneversalgroup.uneversal.entity.template.AbsEntity;

import javax.persistence.Entity;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
public class PupilAttendanceMonth extends AbsEntity {
    private Integer nowMonth;
    private Double monthSum;
    private boolean isPay;
}
