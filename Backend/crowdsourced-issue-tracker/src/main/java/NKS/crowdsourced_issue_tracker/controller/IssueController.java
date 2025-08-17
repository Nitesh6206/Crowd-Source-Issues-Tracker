package NKS.crowdsourced_issue_tracker.controller;

import NKS.crowdsourced_issue_tracker.dto.IssueDTO;
import NKS.crowdsourced_issue_tracker.model.Issue;
import NKS.crowdsourced_issue_tracker.model.IssueStatus;
import NKS.crowdsourced_issue_tracker.service.IssueService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/issues")
@CrossOrigin(origins = "*")
public class IssueController {

    private final IssueService issueService;

    public IssueController(IssueService issueService) {
        this.issueService = issueService;
    }

    @PostMapping
    public ResponseEntity<IssueDTO> createIssue(@RequestBody IssueDTO issueDTO) {
        return ResponseEntity.ok(issueService.createIssue(issueDTO));
    }

    @PutMapping("/{issueId}/resolve")
    public ResponseEntity<IssueDTO> resolveIssue(@PathVariable String issueId, @RequestBody IssueDTO issueDTO) {
        return ResponseEntity.ok(issueService.resolveIssue(issueId, issueDTO));
    }

    @PostMapping("/{issueId}/like")
    public ResponseEntity<Issue> toggleLike(@PathVariable String issueId) {
        String username = getLoggedInUsername();
        return ResponseEntity.ok(issueService.toggleLike(issueId, username));
    }

    @GetMapping("/latest")
    public ResponseEntity<Optional<List<IssueDTO>>> getLatestIssues() {
        return ResponseEntity.ok(issueService.getLatestIssues());
    }

    @GetMapping("/public/city/{city}")
    public ResponseEntity<List<IssueDTO>> getPublicIssuesByCity(@PathVariable String city,
                                                                @RequestParam(required = false) IssueStatus status) {
        return ResponseEntity.ok(issueService.getIssuesByCity(city, status));
    }

    @GetMapping("/department/city/{city}")
    public ResponseEntity<List<IssueDTO>> getDepartmentIssues(@PathVariable String city,
                                                              @RequestParam(required = false) IssueStatus status) {
        return ResponseEntity.ok(issueService.getIssuesByCity(city, status));
    }

    @GetMapping("/my-issues")
    public ResponseEntity<List<IssueDTO>> getUserCreatedIssues() {
        String username = getLoggedInUsername();
        return issueService.getUserCreatedIssues(username)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{issueId}/status")
    public ResponseEntity<String> updateIssueStatus(@PathVariable String issueId, @RequestBody IssueDTO issueDTO) {
        return ResponseEntity.ok(issueService.updateIssues(issueId, issueDTO));
    }

    // 🔹 Utility method for logged-in user
    private String getLoggedInUsername() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }
}
