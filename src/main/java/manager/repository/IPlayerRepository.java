package manager.repository;

import manager.model.Player;
import manager.model.player.salary.SalaryPlayer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IPlayerRepository extends JpaRepository<Player, Long> {
    @Query(value = "select p from Player p where p.status=true ")
    Page<Player> findByAll(Pageable pageable);

    @Query(value = "select p from Player p where p.status=true and p.formation=false and p.situation=true ")
    Page<Player> primaryTeam(Pageable pageable);

    @Query(value = "select p from Player p where p.status=true and p.formation=false and p.situation=false ")
    Page<Player> secondaryTeam(Pageable pageable);

    @Query(value = "select p from SalaryPlayer p where p.player.id=:id_player and p.week.id=:id_week")
    SalaryPlayer listSalary(@Param("id_player") Long id_player, @Param("id_week") Long id_week);
    @Query(value = "select p,i from IndexPlayer as i inner join Player as p on i.id = p.indexPlayer.id where p.id= :id")
    Player showIndexPlayer(@Param("id") Long id);
//    @Query(value = "select p,s,w from Player as p inner join SalaryPlayer as s on p.id = s.player.id inner join Week as w on s.week.id = w.id where s.week.id = :id_week")
//    List<Player> listSalaryByOneWeek(@Param("id_week") Long id_week);
    @Query(value = "select s from SalaryPlayer as s inner join Week as w on s.week.id = w.id inner join Player as p on s.player.id = p.id where s.week.id = :id")
    List<SalaryPlayer> listSalaryByOneWeek(@Param("id") Long id);
}
//select * from player
//        inner join salary_player as sp on player.id = sp.player_id
//        inner join week w on sp.week_id = w.id where week_id = 1;
//select * from salary_player
//        inner join week w on salary_player.week_id = w.id
//        inner join player p on salary_player.player_id = p.id
//        where week_id = 1;