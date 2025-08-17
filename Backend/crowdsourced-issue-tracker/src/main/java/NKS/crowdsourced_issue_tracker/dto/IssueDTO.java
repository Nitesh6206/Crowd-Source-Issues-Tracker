package NKS.crowdsourced_issue_tracker.dto;
import NKS.crowdsourced_issue_tracker.model.Category;
import NKS.crowdsourced_issue_tracker.model.IssueStatus;
import NKS.crowdsourced_issue_tracker.model.User;
import lombok.Data;

@Data
public class IssueDTO {
    private String title;
    private String description;
    private String photo;
    private String location;
    private Category category;
    private String priorityLevel;
    private String city;
    private IssueStatus status;
    private String resolvedPhoto;
//    private UserDTO reportedBy;
//    private UserDTO resolvedBy;
}


