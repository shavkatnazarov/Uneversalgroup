package uneversalgroup.uneversal.payload;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ResToken {
    private final String tokenType = "Bearer ";
    private String body;
}
