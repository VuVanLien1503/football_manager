package manager.service.player;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface ICrudService <E>{
    Page<E> findAll(Pageable pageable);

    Optional<E> findById(Long id);

    void save(E e);

    void delete(Long id);
}
