package manager.controller;

import manager.model.account.Account;
import manager.model.account.AccountToken;
import manager.sevice.account_service.AccountService;
import manager.sevice.account_service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@PropertySource("classpath:application.properties")
@RestController
@CrossOrigin("*")
@RequestMapping("/users")
public class AccountController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AccountService accountService;

    @Value("${upload.path}")
    private String upload;

    @PostMapping("/login")
    public AccountToken login(@RequestBody Account account){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(account.getUsername(), account.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtService.createToken(authentication);
        Account account1 = accountService.findAccountByUserName(account.getUsername());
        AccountToken accountToken = new AccountToken(account1.getUsername(),account1.getAvatar(),token,account1.getRoles());
        return accountToken;
    }

    @PostMapping("/upAvatar")
    public String upAvatar(@RequestParam MultipartFile fileImg){
        String nameImg = fileImg.getOriginalFilename();
        try {
            FileCopyUtils.copy(fileImg.getBytes(), new File(upload + nameImg));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

}