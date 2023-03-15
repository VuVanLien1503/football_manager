package manager.controller.coach;

import manager.model.coach.Coach;
import manager.model.coach.SalaryCoach;
import manager.sevice.coach_service.my_interface.ISalaryCoachService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/salaries")
@PropertySource("classpath:application.properties")
public class SalaryCoachController {
    @Autowired
    private ISalaryCoachService salaryCoachService;
    @GetMapping
    public ResponseEntity<Page<SalaryCoach>> displayAllSalary(@PageableDefault(size = 3) Pageable pageable){
        Page<SalaryCoach> salaryCoaches = salaryCoachService.displayAll(pageable);
        if (salaryCoaches.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(salaryCoaches,HttpStatus.OK);
    }
    @GetMapping("/{idCoach}/{idWeek}")
    public ResponseEntity<SalaryCoach> findById(@PathVariable("idCoach")Long idCoach,
                                                @PathVariable("idWeek") Long idWeek){
        SalaryCoach salaryCoach = salaryCoachService.findSalary(idCoach,idWeek);
        if (salaryCoach!=null){
            return new ResponseEntity<>(salaryCoach,HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/hard_salary_coach/{idCoach}")
    public ResponseEntity<Long> sumHardSalaryCoach(@PathVariable("idCoach")Long idCoach){
        Long sum = salaryCoachService.sumHardSalaryCoach(idCoach);
        if (sum == 0L){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        salaryCoachService.updateSumHardSalary(idCoach);
        return new ResponseEntity<>(sum,HttpStatus.OK);
    }

    @PostMapping("/bonus_salary_coach/{idCoach}")
    public ResponseEntity<Long> sumBonusSalaryCoach(@PathVariable("idCoach")Long idCoach){
        Long sum = salaryCoachService.sumBonusSalaryCoach(idCoach);
        if (sum == 0L){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        salaryCoachService.updateSumBonusSalary(idCoach);
        return new ResponseEntity<>(sum,HttpStatus.OK);
    }


}
