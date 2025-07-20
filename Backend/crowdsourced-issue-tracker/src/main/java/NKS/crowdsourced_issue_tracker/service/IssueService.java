package NKS.crowdsourced_issue_tracker.service;


import NKS.crowdsourced_issue_tracker.dto.IssueDTO;
import NKS.crowdsourced_issue_tracker.model.Issue;
import NKS.crowdsourced_issue_tracker.model.IssueStatus;
import NKS.crowdsourced_issue_tracker.model.User;
import NKS.crowdsourced_issue_tracker.repository.IssueRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class IssueService {

    private final IssueRepository issueRepository;

    public IssueService(IssueRepository issueRepository) {
        this.issueRepository = issueRepository;
    }

    public Issue createIssue(IssueDTO issueDTO) {
        Issue issue = new Issue();
        issue.setTitle(issueDTO.getTitle());
        issue.setDescription(issueDTO.getDescription());
        issue.setPhoto(issueDTO.getPhoto());
        issue.setLatitude(issueDTO.getLatitude());
        issue.setLongitude(issueDTO.getLongitude());
        issue.setCity(issueDTO.getCity());
        issue.setReportedBy(SecurityContextHolder.getContext().getAuthentication().getName());
        issue.setCreatedAt(LocalDateTime.now());
        issue.setUpdatedAt(LocalDateTime.now());
        return issueRepository.save(issue);
    }

    public Issue resolveIssue(String issueId, IssueDTO issueDTO) {
        Issue issue = issueRepository.findById(issueId)
                .orElseThrow(() -> new RuntimeException("Issue not found"));
        String username=SecurityContextHolder.getContext().getAuthentication().getName();
        if(username.equals(issue.getReportedBy())) throw new RuntimeException("Not Created by same user");
        issue.setStatus(IssueStatus.RESOLVED);
        issue.setResolvedPhoto(issueDTO.getResolvedPhoto());
        issue.setResolvedBy(SecurityContextHolder.getContext().getAuthentication().getName());
        issue.setUpdatedAt(LocalDateTime.now());
        return issueRepository.save(issue);
    }

    public Issue likeIssue(String issueId, String username) {
        Issue issue = issueRepository.findById(issueId)
                .orElseThrow(() -> new RuntimeException("Issue not found"));
        if (!issue.getLikedBy().contains(username)) {
            issue.getLikedBy().add(username);
            issue.setUpdatedAt(LocalDateTime.now());
        }
        return issueRepository.save(issue);
    }

    public List<Issue> getIssuesByCity(String city, IssueStatus status) {
        if (status != null) {
            return issueRepository.findByCityAndStatus(city, status);
        }
        return issueRepository.findByCity(city);
    }

    public List<Issue> getTopLikedIssues(String city, int limit) {
        return issueRepository.findByCity(city).stream()
                .sorted((a, b) -> b.getLikedBy().size() - a.getLikedBy().size())
                .limit(limit)
                .toList();
    }
}
