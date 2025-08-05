package NKS.crowdsourced_issue_tracker.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Document(collection = "issues")
public class Issue {
    @Id
    private String id;
    private String title;
    private String description;
    private String photo; // Base64 encoded image
    private String location;
    private String city;
    private String category;
    private String priorityLevel;
    private String reportedBy;
    private IssueStatus status = IssueStatus.PENDING;
    private String resolvedPhoto; // Base64 encoded image
    private String resolvedBy;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<String> likedBy = new ArrayList<>();

}
