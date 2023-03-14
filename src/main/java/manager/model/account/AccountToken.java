package manager.model.account;

import lombok.Data;

import java.util.List;

@Data
public class AccountToken {
    private String username;
    private String avatar;
    private String token;

    private List<Role> roles;
}
