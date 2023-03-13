package manager.sevice.player_sevice;

import manager.model.Player;
import manager.repository.IPlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class PlayerService implements IPlayerService{
    @Autowired
    IPlayerRepository iPlayerRepository;
    @Override
    public Page<Player> findAll(Pageable pageable) {
        return iPlayerRepository.findAll(pageable);
    }

    @Override
    public Optional<Player> findById(Long id) {
        return iPlayerRepository.findById(id);
    }

    @Override
    public void save(Player player) {
        iPlayerRepository.save(player);
    }

    @Override
    public void delete(Long id) {
        iPlayerRepository.deleteById(id);
    }
}
