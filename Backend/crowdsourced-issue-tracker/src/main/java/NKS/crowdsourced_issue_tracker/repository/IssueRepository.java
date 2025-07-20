package NKS.crowdsourced_issue_tracker.repository;


import NKS.crowdsourced_issue_tracker.model.Issue;
import NKS.crowdsourced_issue_tracker.model.IssueStatus;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface IssueRepository extends MongoRepository<Issue, String> {
    List<Issue> findByCityAndStatus(String city, IssueStatus status);
    List<Issue> findByCity(String city);
}


