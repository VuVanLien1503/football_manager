package manager.sevice.player_sevice;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface ICoreService <T>{
    Page<T> findAll(Pageable pageable);
    Optional<T> findById(Long id);
    void save (T t);
    void delete(Long id);
}
