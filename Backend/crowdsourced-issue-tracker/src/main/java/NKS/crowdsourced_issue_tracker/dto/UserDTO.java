package NKS.crowdsourced_issue_tracker.dto;
import NKS.crowdsourced_issue_tracker.model.Role;
import lombok.Data;

@Data
public class UserDTO {
    private String username;
    private String email;
    private String password;
    private Role role;
    private String city;
    private String number;
    private String bio;
}


