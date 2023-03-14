package manager.model.account;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.UniqueElements;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    @UniqueElements
    private String username;
    @NotNull
    private String password;
    private String avatar;
    private String fullName;
    private String address;
    private String phoneNumber;

    @ManyToMany(fetch = FetchType.EAGER)
    private List<Role> role;

    public Account(Long id, String username, String password) {
        this.id = id;
        this.username = username;
        this.password = password;
    }

    public Account(Long id, String username, String password, String avatar) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.avatar = avatar;
    }
}
