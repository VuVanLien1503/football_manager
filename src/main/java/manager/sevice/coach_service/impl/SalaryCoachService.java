package manager.sevice.coach_service.impl;

import manager.model.coach.SalaryCoach;
import manager.repository.coach.ISalaryCoachRepository;
import manager.sevice.coach_service.my_interface.ISalaryCoachService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SalaryCoachService implements ISalaryCoachService {
    @Autowired
    private ISalaryCoachRepository salaryCoachRepository;
    @Override
    public List<SalaryCoach> findAll() {
        return salaryCoachRepository.listSalaryCoach();
    }

    @Override
    public Page<SalaryCoach> displayAll(Pageable pageable) {
        return salaryCoachRepository.displayAllSalaryCoach(pageable);
    }

    @Override
    public SalaryCoach save(SalaryCoach salaryCoach) {
        return salaryCoachRepository.save(salaryCoach);
    }

    @Override
    public SalaryCoach findById(Long id) {
        return null;
    }

    @Override
    public void delete(Long id) {

    }

    @Override
    public SalaryCoach findSalary(Long idCoach, Long idWeak) {
        return salaryCoachRepository.findSalaryCoachDoubleId(idCoach, idWeak);
    }

    @Override
    public void deleteSalary(Long idCoach, Long idWeak) {
        salaryCoachRepository.deleteSalaryDoubleId(idCoach,idWeak);
    }
}
