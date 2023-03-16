package manager.sevice.player_sevice;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface ICoreService <T,E>{
    E listSalary(Long id1,Long id2);
    Page<T> primaryTeam(Pageable pageable);
    Page<T> secondaryTeam(Pageable pageable);
    Optional<T> findById(Long id);
    void save (T t);
    void delete(Long id);
}
