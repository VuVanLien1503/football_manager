package manager.sevice.player.my_interface;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;


public interface ICrud<E> {
    Page<E> findAll(String name, Pageable pageable);

    void save(MultipartFile file,E e);

    void delete(Long id);
}
