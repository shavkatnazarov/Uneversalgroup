package uneversalgroup.uneversal.payload;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthDto {
    private UUID id;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String password;
    private String prePassword;
    private UUID groupId;
    private boolean pay;
}
