package manager.sevice.player.my_interface;

import java.util.Optional;

public interface ISearch<E>{
    Optional<E> findOne(Long id);
}
