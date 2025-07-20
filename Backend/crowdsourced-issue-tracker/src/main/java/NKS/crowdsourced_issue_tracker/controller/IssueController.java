package NKS.crowdsourced_issue_tracker.controller;


import NKS.crowdsourced_issue_tracker.dto.IssueDTO;
import NKS.crowdsourced_issue_tracker.model.Issue;
import NKS.crowdsourced_issue_tracker.model.IssueStatus;
import NKS.crowdsourced_issue_tracker.service.IssueService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/issues")
@CrossOrigin(origins = "*")
public class IssueController {

    private final IssueService issueService;

    public IssueController(IssueService issueService) {
        this.issueService = issueService;
    }

    @PostMapping
    public ResponseEntity<Issue> createIssue(@RequestBody IssueDTO issueDTO) {
        Issue issue = issueService.createIssue(issueDTO);
        return ResponseEntity.ok(issue);
    }

    @PutMapping("/{issueId}/resolve")
    public ResponseEntity<Issue> resolveIssue(@PathVariable String issueId, @RequestBody IssueDTO issueDTO) {
        Issue issue = issueService.resolveIssue(issueId, issueDTO);
        return ResponseEntity.ok(issue);
    }

    @PostMapping("/{issueId}/like")
    public ResponseEntity<Issue> likeIssue(@PathVariable String issueId) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Issue issue = issueService.likeIssue(issueId, username);
        return ResponseEntity.ok(issue);
    }

    @GetMapping("/public/city/{city}")
    public ResponseEntity<List<Issue>> getIssuesByCity(@PathVariable String city,
                                                       @RequestParam(required = false) IssueStatus status) {
        return ResponseEntity.ok(issueService.getIssuesByCity(city, status));
    }

    @GetMapping("/department/city/{city}")
    public ResponseEntity<List<Issue>> getDepartmentIssues(@PathVariable String city,
                                                           @RequestParam(required = false) IssueStatus status) {
        return ResponseEntity.ok(issueService.getIssuesByCity(city, status));
    }
}
