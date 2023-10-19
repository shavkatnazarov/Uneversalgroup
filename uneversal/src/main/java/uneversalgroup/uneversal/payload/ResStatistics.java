package uneversalgroup.uneversal.payload;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ResStatistics {
    private Integer pupilSize;
    private Integer teacherSize;
    private Integer courseSize;
    private Integer groupSize;
}
