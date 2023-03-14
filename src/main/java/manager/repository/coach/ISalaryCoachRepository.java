package manager.repository.coach;

import manager.model.coach.Coach;
import manager.model.coach.SalaryCoach;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public interface ISalaryCoachRepository extends JpaRepository<SalaryCoach,Long> {
    @Query(value = "select s from  SalaryCoach as s where s.status = true")
    Page<SalaryCoach> displayAllSalaryCoach(Pageable pageable);

    @Query(value = "select s from  SalaryCoach as s where s.status = true")
    List<SalaryCoach> listSalaryCoach();
    @Query(value = "select  s from  SalaryCoach  as s where s.coach.id = :idCoach and  s.weekCoach.id = :idWeek ")
    SalaryCoach findSalaryCoachDoubleId(@Param("idCoach") Long idCoach, @Param("idWeek") Long idWeek);

    @Modifying
    @Query(value = "UPDATE SalaryCoach as s set s.status = false where s.coach.id = :idCoach and  s.weekCoach.id = :idWeek")
    void deleteSalaryDoubleId(@Param("idCoach") Long idCoach, @Param("idWeek") Long idWeek);
}
