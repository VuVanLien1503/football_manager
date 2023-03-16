package manager.controller.coach;

import manager.model.coach.Coach;
import manager.model.coach.WorkPosition;
import manager.sevice.coach_service.my_interface.ICoachService;
import manager.sevice.coach_service.my_interface.IWorkPositionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/admin")
@PropertySource("classpath:application.properties")
public class AdminCoachController {
    @Autowired
    private ICoachService coachService;
    @Autowired
    private IWorkPositionService workPositionService;

    //Truy xuất danh sách huấn luyện viên
    @GetMapping("/coaches")
    public ResponseEntity<Page<Coach>> displayAllCoach(@PageableDefault(size = 3) Pageable pageable){
        Page<Coach> coaches = coachService.displayAll(pageable);
        if (coaches.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(coaches,HttpStatus.OK);

    }
    @GetMapping("/coaches/typical")
    public ResponseEntity<List<Coach>> displayTypicalCoach(){
        List<Coach> coaches = coachService.displayTypicalCoach();
        if (coaches.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(coaches,HttpStatus.OK);
    }

    //Truy xuất chi tiết 1 HLV
    @GetMapping("/coaches/{id}")
    public ResponseEntity<Coach> findCoachById(@PathVariable("id")Long id){
        Coach coach = coachService.findById(id);
        if (coach!=null){
            return new ResponseEntity<>(coach, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    //Lưu, update HLV
    @PostMapping("/coaches/save")
    public ResponseEntity<Coach> saveCoach(@RequestPart(value = "file", required = false) MultipartFile file,
                                           @RequestPart("coach") Coach coach){
        return new ResponseEntity<>(coachService.saveCoach(file,coach),HttpStatus.OK);
    }

        //Xóa 1 HLV:

    @DeleteMapping("/coaches/{id}")
    public ResponseEntity<Coach> deleteCoach(@PathVariable("id") Long id){
        Coach coach = coachService.findById(id);
        if (coach!=null){
            coachService.delete(id);
            return new ResponseEntity<>(coach,HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

//    Truy xuất danh sách vị trí HLV

    @GetMapping("/coaches/positions")
    public ResponseEntity<List<WorkPosition>> listWorkPosition(){
        List<WorkPosition> workPositions = workPositionService.findAll();
        if (workPositions.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(workPositions, HttpStatus.OK);
    }
}

