package manager.controller;

import org.springframework.context.annotation.PropertySource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@PropertySource("classpath:application.properties")
@RestController
@CrossOrigin("*")
@RequestMapping("/users")
public class AccountController {
}
