package NKS.crowdsourced_issue_tracker.repository;


import NKS.crowdsourced_issue_tracker.model.Issue;
import NKS.crowdsourced_issue_tracker.model.IssueStatus;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface IssueRepository extends MongoRepository<Issue, String> {
    List<Issue> findByCityAndStatus(String city, IssueStatus status);
    List<Issue> findByCity(String city);

    List<Issue> findTop5ByOrderByCreatedAtDesc();

    Optional<List<Issue>> findByReportedBy(String username);
}


