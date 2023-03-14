package manager.controller;

import manager.model.Player;
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

import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/api")
@PropertySource("classpath:application.properties")
public class PlayerController {

    @Autowired
    private IPlayerRepository iPlayerRepository;
    @GetMapping("/players")
    public ResponseEntity<Page<Player>> findAll(@PageableDefault(size = 11) Pageable pageable){
        return new ResponseEntity<>(iPlayerRepository.findAll(pageable), HttpStatus.OK);
    }
    @GetMapping("/players/{id}")
    public ResponseEntity<Optional<Player>> findById(@PathVariable Long id){
        Optional<Player> player = iPlayerRepository.findById(id);
        if (player.isPresent()){
            return new ResponseEntity<>(player,HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
