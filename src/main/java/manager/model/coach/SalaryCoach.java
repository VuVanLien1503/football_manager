package manager.model.coach;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import manager.model.SalaryType;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class  SalaryCoach {
    @EmbeddedId
    private SalaryCoachId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("coachId")
    private Coach coach;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("salaryTypeId")
    private SalaryType salaryType;
    private Long week;

    @Column(name = "value_salary")
    private Double valueSalary;

}
