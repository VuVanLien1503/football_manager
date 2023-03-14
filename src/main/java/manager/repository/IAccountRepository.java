package manager.repository;

import manager.model.account.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public interface IAccountRepository extends JpaRepository<Account, Long> {
    Account findAccountByUsername(String username);
    Account findAccountById(Long id);
}
