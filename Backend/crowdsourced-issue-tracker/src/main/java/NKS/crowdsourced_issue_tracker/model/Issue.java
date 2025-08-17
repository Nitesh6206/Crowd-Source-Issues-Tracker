package NKS.crowdsourced_issue_tracker.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "issues")
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Issue {
    @Id
    private String id;

    private String title;
    private String description;
    private String photo; // Base64 encoded image
    private String location;

    private String city;
    private Category category;
    private String priorityLevel;

    @DBRef
    private User reportedBy;

    private IssueStatus status = IssueStatus.PENDING;

    private String resolvedPhoto; // Base64 encoded image

    @DBRef
    private User resolvedBy;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private List<String> likedBy = new ArrayList<>();
}
