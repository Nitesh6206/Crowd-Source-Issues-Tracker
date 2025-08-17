package NKS.crowdsourced_issue_tracker.service;

import NKS.crowdsourced_issue_tracker.Mapper.IssueMapper;
import NKS.crowdsourced_issue_tracker.dto.IssueDTO;
import NKS.crowdsourced_issue_tracker.model.Issue;
import NKS.crowdsourced_issue_tracker.model.IssueStatus;
import NKS.crowdsourced_issue_tracker.model.User;
import NKS.crowdsourced_issue_tracker.repository.IssueRepository;
import NKS.crowdsourced_issue_tracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class IssueService {

    private final IssueRepository issueRepository;
    private final UserRepository userRepository;
    private final IssueMapper issueMapper;
    private final JavaMailSender mailSender;

    @Value("${sendemail}")
    private String senderEmail;

    @Autowired
    public IssueService(IssueRepository issueRepository,
                        UserRepository userRepository,
                        IssueMapper issueMapper,
                        JavaMailSender mailSender) {
        this.issueRepository = issueRepository;
        this.userRepository = userRepository;
        this.issueMapper = issueMapper;
        this.mailSender = mailSender;
    }

    public Optional<List<IssueDTO>> getUserCreatedIssues(String username) {
        User user = getUserByUsername(username);
        List<IssueDTO> issuesList = issueRepository.findByReportedBy(user)
                .stream()
                .map(issueMapper::toDTO)
                .toList();
        return Optional.of(issuesList);
    }

    public IssueDTO createIssue(IssueDTO issueDTO) {
        Issue issue = issueMapper.toEntity(issueDTO);

        User reporter = getLoggedInUser();
        issue.setReportedBy(reporter);
        issue.setCreatedAt(LocalDateTime.now());
        issue.setUpdatedAt(LocalDateTime.now());

        // If needed: assign to department user
        User departmentUser = userRepository.findByCityAndCategory(reporter.getCity(), issueDTO.getCategory());
        // TODO: handle departmentUser usage if required

        return issueMapper.toDTO(issueRepository.save(issue));
    }

    public IssueDTO resolveIssue(String issueId, IssueDTO issueDTO) {
        Issue issue = getIssueById(issueId);
        User currentUser = getLoggedInUser();

        if (currentUser.getId().equals(issue.getReportedBy().getId())) {
            throw new RuntimeException("Reporter cannot resolve their own issue");
        }

        issue.setStatus(IssueStatus.RESOLVED);
        issue.setResolvedPhoto(issueDTO.getResolvedPhoto());
        issue.setResolvedBy(currentUser);
        issue.setUpdatedAt(LocalDateTime.now());

        return issueMapper.toDTO(issueRepository.save(issue));
    }

    public Issue toggleLike(String issueId, String username) {
        Issue issue = getIssueById(issueId);

        if (issue.getLikedBy().contains(username)) {
            issue.getLikedBy().remove(username);
        } else {
            issue.getLikedBy().add(username);
        }

        issue.setUpdatedAt(LocalDateTime.now());
        return issueRepository.save(issue);
    }

    public List<IssueDTO> getIssuesByCity(String city, IssueStatus status) {
        List<Issue> issues = (status != null)
                ? issueRepository.findByCityAndStatus(city, status)
                : issueRepository.findByCity(city);

        return issues.stream()
                .map(issueMapper::toDTO)
                .toList();
    }

    public List<Issue> getTopLikedIssues(String city, int limit) {
        return issueRepository.findByCity(city).stream()
                .sorted((a, b) -> b.getLikedBy().size() - a.getLikedBy().size())
                .limit(limit)
                .toList();
    }

    public Optional<List<IssueDTO>> getLatestIssues() {
        List<IssueDTO> issuesList= issueRepository.findTop5ByOrderByCreatedAtDesc()
                .stream()
                .map(issueMapper::toDTO)
                .toList();

        return Optional.of(issuesList);

    }

    public String updateIssues(String issueId, IssueDTO issueDTO) {
        Issue issue = getIssueById(issueId);
        issue.setStatus(issueDTO.getStatus());
        issueRepository.save(issue);

        sendNotification(issue.getReportedBy(), "Issue status updated", "Status updated on your reported issue");
        return "Issue Status Updated Successfully";
    }

    private void sendEmail(String email, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(senderEmail);
        message.setTo(email);
        message.setSubject(subject);
        message.setText(text);
        mailSender.send(message);
    }

    private void sendNotification(User user, String subject, String message) {
        sendEmail(user.getEmail(), subject, message);
    }

    // 🔹 Helper methods to reduce code duplication
    private User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    private User getLoggedInUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return getUserByUsername(username);
    }

    private Issue getIssueById(String issueId) {
        return issueRepository.findById(issueId)
                .orElseThrow(() -> new RuntimeException("Issue not found"));
    }
}
