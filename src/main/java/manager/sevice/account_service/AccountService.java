package manager.sevice.account_service;

import manager.model.account.Account;
import manager.repository.IAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AccountService implements UserDetailsService {

    @Autowired
    private IAccountRepository accountRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Account account = accountRepository.findAccountByUsername(username);

        return new User(account.getUsername(),account.getPassword(),account.getRoles());
    }

    public Account findAccountByUserName(String username){
        return accountRepository.findAccountByUsername(username);
    }

    public void save(Account account){
        accountRepository.save(account);
    }

    public boolean checkRegister(String username){
        if(accountRepository.findAccountByUsername(username)!=null){
            return false;
        }
        return true;
    }

}
