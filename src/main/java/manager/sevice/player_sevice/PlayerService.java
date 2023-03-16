package manager.sevice.player_sevice;

import manager.model.Player;
import manager.model.player.salary.SalaryPlayer;
import manager.repository.IPlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class PlayerService implements IPlayerService{
    @Autowired
    IPlayerRepository iPlayerRepository;

    @Override
    public SalaryPlayer listSalary(Long id1, Long id2) {
        return iPlayerRepository.listSalary(id1,id2);
    }

    @Override
    public Page<Player> primaryTeam(Pageable pageable) {
        return iPlayerRepository.primaryTeam(pageable);
    }

    @Override
    public Page<Player> secondaryTeam(Pageable pageable) {
        return iPlayerRepository.secondaryTeam(pageable);
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
