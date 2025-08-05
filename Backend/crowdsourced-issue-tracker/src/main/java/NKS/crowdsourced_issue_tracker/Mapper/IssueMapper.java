package NKS.crowdsourced_issue_tracker.Mapper;


import NKS.crowdsourced_issue_tracker.dto.IssueDTO;
import NKS.crowdsourced_issue_tracker.model.Issue;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring") // Enables Spring @Component for DI
public interface IssueMapper {

    IssueMapper INSTANCE = Mappers.getMapper(IssueMapper.class);

    // Convert DTO to Entity
    Issue toEntity(IssueDTO dto);

    // Convert Entity to DTO
    IssueDTO toDTO(Issue issue);
}
