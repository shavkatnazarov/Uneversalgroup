package uneversalgroup.uneversal.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SelectUserDto {
    private UUID value;
    private String label;
}
