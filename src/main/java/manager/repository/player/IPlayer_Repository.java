package manager.repository.player;

import manager.model.Player;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
@Transactional
public interface IPlayer_Repository extends JpaRepository<Player,Long> {
    @Query(value = "select p from Player p where p.name like :name and p.status=true ")
    Page<Player> findName(@Param("name") String name, Pageable pageable);

    @Query(value = "select p from Player p where p.status=true ")
    Page<Player> findByAll(Pageable pageable);

    @Query(value = "select p from Player p where p.status=true and p.formation=false and p.situation=true ")
    Page<Player> mainLineup(Pageable pageable);

    @Query(value = "select p from Player p where p.status=true and p.formation=false and p.situation=false ")
    Page<Player> subLineup(Pageable pageable);

}
