package manager.repository;

import manager.model.coach.Coach;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
@Transactional
public interface ICoachRepository extends JpaRepository<Coach, Long> {
    @Query(value = "select c from  Coach as c where c.status = true")
    Page<Coach> displayAllCoach(Pageable pageable);
    @Modifying
    @Query(value = "UPDATE Coach as c set c.status = false where c.id = :id")
    void deleteCoach(@Param("id") Long id);
}
