package NKS.crowdsourced_issue_tracker.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "user")
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    private String id;

    private String username;
    private String password;
    private String email;
    private Role role;
    private String city;
    private String number;
    private String bio;

    private List<Category> category;

    @DBRef
    private List<Issue> createdIssue = new ArrayList<>();

    @DBRef
    private List<Issue> assignedIssues = new ArrayList<>();

    private boolean enabled = true;
}
