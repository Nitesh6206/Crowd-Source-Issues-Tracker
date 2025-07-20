package NKS.crowdsourced_issue_tracker.dto;
import NKS.crowdsourced_issue_tracker.model.IssueStatus;
import lombok.Data;

@Data
public class IssueDTO {
    private String title;
    private String description;
    private String photo;
    private double latitude;
    private double longitude;
    private String city;
    private IssueStatus status;
    private String resolvedPhoto;
}


