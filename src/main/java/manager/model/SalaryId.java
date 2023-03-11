package manager.model;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class SalaryId  implements Serializable {
    @Column(name = "player_id")
    private Long playerId;
    @Column(name = "salary_type_id")
    private Long salaryTypeId;
}
