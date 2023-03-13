package manager.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Salary {
    @EmbeddedId
    private SalaryId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("playerId")
    private Player player;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("salaryTypeId")
    private SalaryType salaryType;

    @Column(name = "value_salary")
    private Double valueSalary;
}
