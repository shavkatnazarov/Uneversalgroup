package uneversalgroup.uneversal.payload;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthDto {
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String password;
    private String prePassword;
}
