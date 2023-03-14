package manager.sevice.player.impl;

import manager.model.Player;
import manager.repository.player.IPlayer_Repository;
import manager.sevice.player.IPlayer_Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@Service
public class PlayerService_impl implements IPlayer_Service {

    @Value("${upload.path}")
    private String link;

    @Value("${display.path}")
    private String displayLink;

    @Autowired
    IPlayer_Repository player_repository;

    @Override
    public Page<Player> findAll(String name, Pageable pageable) {
        if (!name.equals("")) {
            return player_repository.findName("%" + name + "%", pageable);
        }
        return player_repository.findByAll(pageable);
    }

    @Override
    public void save(MultipartFile file, Player player) {

    }

    @Override
    public void delete(Long id) {

    }

    @Override
    public Optional<Player> findOne(Long id) {
        return Optional.empty();
    }
}
