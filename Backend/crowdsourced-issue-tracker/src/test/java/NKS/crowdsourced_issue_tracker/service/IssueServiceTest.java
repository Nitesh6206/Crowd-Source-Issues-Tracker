//package NKS.crowdsourced_issue_tracker.service;
//
//import NKS.crowdsourced_issue_tracker.dto.IssueDTO;
//import NKS.crowdsourced_issue_tracker.model.Issue;
//import NKS.crowdsourced_issue_tracker.repository.IssueRepository;
//import org.junit.jupiter.api.Assertions;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.Mockito;
//import org.mockito.junit.jupiter.MockitoExtension;
//
//import static org.junit.jupiter.api.Assertions.*;
//
//
//@ExtendWith(MockitoExtension.class)
//class IssueServiceTest {
//
//    @Mock
//    private IssueRepository issueRepository;
//
//    @InjectMocks
//    private IssueService issueService;
//
//    @Test
//    void createNewIssue() {
//        IssueDTO issueDTO = new IssueDTO();
//        issueDTO.setTitle("Test Issue");
//        issueDTO.setDescription("This is a test");
//
//        // Create the Issue entity that the repo will save and return
//        Issue issueEntity = new Issue();
//        issueEntity.setTitle("Test Issue");
//        issueEntity.setDescription("This is a test");
//
//        Mockito.when(issueRepository.save(Mockito.any(Issue.class))).thenReturn(issueEntity);
//
//        IssueDTO result = issueService.createIssue(issueDTO);
//
//        assertNotNull(result);
//        assertEquals("Test Issue", result.getTitle());
//        assertEquals("This is a test", result.getDescription());
//    }
//}
