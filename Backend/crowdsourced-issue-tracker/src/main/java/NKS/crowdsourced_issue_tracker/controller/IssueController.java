package NKS.crowdsourced_issue_tracker.controller;


import NKS.crowdsourced_issue_tracker.dto.IssueDTO;
import NKS.crowdsourced_issue_tracker.model.Issue;
import NKS.crowdsourced_issue_tracker.model.IssueStatus;
import NKS.crowdsourced_issue_tracker.service.IssueService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLOutput;
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
        IssueDTO issuedto = issueService.createIssue(issueDTO);
        return ResponseEntity.ok(issuedto);
    }

    @PutMapping("/{issueId}/resolve")
    public ResponseEntity<IssueDTO> resolveIssue(@PathVariable String issueId, @RequestBody IssueDTO issueDTO) {
        IssueDTO issue = issueService.resolveIssue(issueId, issueDTO);
        return ResponseEntity.ok(issue);
    }

//    @PostMapping("/{issueId}/like")
//    public ResponseEntity<Issue> likeIssue(@PathVariable String issueId) {
//        String username = SecurityContextHolder.getContext().getAuthentication().getName();
//        Issue issue = issueService.likeIssue(issueId, username);
//        return ResponseEntity.ok(issue);
//    }
    // Toggle Like/Unlike
    @PostMapping("/{issueId}/like")
    public ResponseEntity<Issue> toggleLike(@PathVariable String issueId) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Issue issue = issueService.toggleLike(issueId, username);
        return ResponseEntity.ok(issue);
    }
    @GetMapping("/latest/posts")
    public ResponseEntity<List<Issue>> recentPost(){
        List<Issue> issueses=issueService.getLatestIssues();
        return  ResponseEntity.ok(issueses);
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

    @GetMapping("/my-issues")
    public ResponseEntity<Optional<List<Issue>>> getUserCreatedIssues(){
        String username=SecurityContextHolder.getContext().getAuthentication().getName();
        return  ResponseEntity.ok(issueService.getUserCreatedIssues(username));
    }

    @PutMapping("/{issueId}/update-status")
    public ResponseEntity<String> updateIssuesStatus(@PathVariable String issueId, @RequestBody IssueDTO issueDTO) {
        System.out.println(issueDTO);
        String res = issueService.updateIssues(issueId, issueDTO);
        return ResponseEntity.ok(res);
    }

}
