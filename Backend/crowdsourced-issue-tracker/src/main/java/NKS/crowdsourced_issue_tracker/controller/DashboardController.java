package NKS.crowdsourced_issue_tracker.controller;

import NKS.crowdsourced_issue_tracker.dto.IssueDTO;
import NKS.crowdsourced_issue_tracker.model.Issue;
import NKS.crowdsourced_issue_tracker.model.IssueStatus;
import NKS.crowdsourced_issue_tracker.service.IssueService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {

    private final IssueService issueService;

    public DashboardController(IssueService issueService) {
        this.issueService = issueService;
    }

    @GetMapping("/city/{city}")
    public ResponseEntity<Map<String, Object>> getDashboard(@PathVariable String city) {
        Map<String, Object> dashboard = new HashMap<>();

        // Fetch issues by status
        List<IssueDTO> allIssues = issueService.getIssuesByCity(city, null);
        List<IssueDTO> pendingIssues = issueService.getIssuesByCity(city, IssueStatus.PENDING);
        List<IssueDTO> resolvedIssues = issueService.getIssuesByCity(city, IssueStatus.RESOLVED);
        List<IssueDTO> inProgressIssues = issueService.getIssuesByCity(city, IssueStatus.IN_PROGRESS);
//        List<IssueDTO> topLikedIssues = issueService.getTopLikedIssues(city, 5);

        // Populate dashboard data
        dashboard.put("totalIssues", allIssues.size());
        dashboard.put("pendingIssues", pendingIssues.size());
        dashboard.put("resolvedIssues", resolvedIssues.size());
        dashboard.put("inProgressIssues", inProgressIssues.size());
//        dashboard.put("topLikedIssues", topLikedIssues); // optionally include full objects

        return ResponseEntity.ok(dashboard);
    }
}
