package NKS.crowdsourced_issue_tracker.dto;
import lombok.Data;

@Data
public class LoginResponse {
    private String token;
    private String username;
    private String role;
    private  String City;
}


