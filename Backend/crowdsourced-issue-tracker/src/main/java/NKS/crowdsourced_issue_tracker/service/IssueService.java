package NKS.crowdsourced_issue_tracker.service;


import NKS.crowdsourced_issue_tracker.Mapper.IssueMapper;
import NKS.crowdsourced_issue_tracker.dto.IssueDTO;
import NKS.crowdsourced_issue_tracker.model.Issue;
import NKS.crowdsourced_issue_tracker.model.IssueStatus;
import NKS.crowdsourced_issue_tracker.model.User;
import NKS.crowdsourced_issue_tracker.repository.IssueRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class IssueService {

    private final IssueRepository issueRepository;

    private  final IssueMapper issueMapper;
    public Optional<List<Issue>> getUserCreatedIssues(String username){
        return issueRepository.findByReportedBy(username);
    }

    public IssueService(IssueRepository issueRepository,IssueMapper issueMapper) {
        this.issueRepository = issueRepository;
        this.issueMapper=issueMapper;
    }

    public IssueDTO createIssue(IssueDTO issueDTO) {
        System.out.println(issueDTO);
        Issue issue=issueMapper.toEntity(issueDTO);
        issue.setReportedBy(SecurityContextHolder.getContext().getAuthentication().getName());
        issue.setCreatedAt(LocalDateTime.now());
        issue.setUpdatedAt(LocalDateTime.now());
        Issue saved=issueRepository.save(issue);
        return issueMapper.toDTO(saved);
    }

    public IssueDTO resolveIssue(String issueId, IssueDTO issueDTO) {
        Issue issue = issueRepository.findById(issueId)
                .orElseThrow(() -> new RuntimeException("Issue not found"));
        String username=SecurityContextHolder.getContext().getAuthentication().getName();
        if(username.equals(issue.getReportedBy())) throw new RuntimeException("Not Created by same user");
        issue.setStatus(IssueStatus.RESOLVED);
        issue.setResolvedPhoto(issueDTO.getResolvedPhoto());
        issue.setResolvedBy(SecurityContextHolder.getContext().getAuthentication().getName());
        issue.setUpdatedAt(LocalDateTime.now());
        Issue saved= issueRepository.save(issue);
        return issueMapper.toDTO(saved);
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

    public List<Issue> getLatestIssues() {
        return issueRepository.findTop5ByOrderByCreatedAtDesc();
    }
}
