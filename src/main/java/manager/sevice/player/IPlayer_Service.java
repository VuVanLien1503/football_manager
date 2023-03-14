package manager.sevice.player;

import manager.model.Player;
import manager.sevice.player.my_interface.ICrud;
import manager.sevice.player.my_interface.ISearch;

public interface IPlayer_Service extends ICrud<Player>, ISearch<Player> {
}
