package manager.sevice.coach_service.my_interface;

import manager.model.coach.SalaryCoach;
import manager.sevice.coach_service.core.ICrudService;
import org.springframework.data.domain.Page;

public interface ISalaryCoachService extends ICrudService<SalaryCoach> {
    SalaryCoach findSalary(Long idCoach, Long idWeak);
    void deleteSalary(Long idCoach, Long idWeak);
}
