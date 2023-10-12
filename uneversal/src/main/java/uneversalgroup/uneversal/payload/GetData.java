package uneversalgroup.uneversal.payload;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import uneversalgroup.uneversal.entity.User;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetData {
    private User user;
    private ResToken resToken;
}
