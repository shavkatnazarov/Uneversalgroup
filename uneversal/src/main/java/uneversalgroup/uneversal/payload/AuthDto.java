package uneversalgroup.uneversal.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AuthDto {
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String password;
    private String prePassword;
}
