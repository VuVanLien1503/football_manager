package manager.controller;

import manager.model.Player;
import manager.model.player.salary.SalaryPlayer;
import manager.repository.IPlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class PlayerController {

    @Autowired
    private IPlayerRepository iPlayerRepository;
    @GetMapping("/player-primary-teams")
    public ResponseEntity<Page<Player>> primaryTeam(@PageableDefault(size = 11) Pageable pageable){
        return new ResponseEntity<>(iPlayerRepository.primaryTeam(pageable), HttpStatus.OK);
    }
    @GetMapping("/player-secondary-teams")
    public ResponseEntity<Page<Player>> secondaryTeam(@PageableDefault(size = 11) Pageable pageable){
        return new ResponseEntity<>(iPlayerRepository.secondaryTeam(pageable), HttpStatus.OK);
    }
    @GetMapping("/players/{id}")
    public ResponseEntity<Optional<Player>> findById(@PathVariable Long id){
        Optional<Player> player = iPlayerRepository.findById(id);
        if (player.isPresent()){
            return new ResponseEntity<>(player,HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @GetMapping("/salaries")
    public ResponseEntity <SalaryPlayer> findSalary(@RequestParam Long id1,
                                                         @RequestParam Long id2){
        SalaryPlayer list = iPlayerRepository.listSalary(id1,id2);
        return new ResponseEntity<>(list,HttpStatus.OK);
    }
}
