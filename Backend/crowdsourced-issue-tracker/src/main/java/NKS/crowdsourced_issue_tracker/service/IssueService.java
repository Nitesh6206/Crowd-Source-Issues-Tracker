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

    @Autowired
    private JavaMailSender mailSender;

    @Value("${sendemail}")
    private String senderEmail;



    private  final UserRepository userRepository;

    private  final IssueMapper issueMapper;
    public Optional<List<Issue>> getUserCreatedIssues(String username){
        return issueRepository.findByReportedBy(username);
    }

    public IssueService(IssueRepository issueRepository, UserRepository userRepository, IssueMapper issueMapper) {
        this.issueRepository = issueRepository;
        this.userRepository = userRepository;
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

    public String updateIssues(String issueId, IssueDTO issueDTO) {
        Issue issue=issueRepository.findById(issueId)
                .orElseThrow(()-> new RuntimeException("issues not found"));
        issue.setStatus(issueDTO.getStatus());
        issueRepository.save(issue);
        sendNotification(issueDTO,issue.getReportedBy());

        return "Issues Status Update Successfully";
    }


    public void sendEmail(String email,String subject,String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(senderEmail);
        message.setTo(email);
        message.setSubject(subject);
        message.setText(text);
        mailSender.send(message);
    }

    public void  sendNotification(IssueDTO issueDTO,String username){
        System.out.println(username);
        User user=userRepository.findByUsername(username)
                .orElseThrow(()-> new RuntimeException("Reported user not found"));
        String message="Status Updated on you issues reported";
        String  subject="status updated";

            sendEmail(user.getEmail(),subject,message);

    }
}
