package client.command.commands.gm0;

import client.MapleCharacter;
import client.MapleClient;
import client.command.Command;

public class PlaytimeCommand extends Command {
    {
        setDescription("Check how long you have played.");
    }

    @Override
    public void execute(MapleClient client, String[] params) {
        MapleCharacter player = client.getPlayer();
        long playTime = player.getActualPlayTime();
        long createdTime = player.getCreatedTime();

        int createdDay = (int) ((System.currentTimeMillis() - createdTime) / (1000 * 60 * 60 * 24));
        int days = (int) (playTime / (1000 * 60 * 60 * 24));
        int hours = (int) (playTime / (1000 * 60 * 60));
        int mins = (int) ((playTime / (1000 * 60)) % 60);

        player.dropMessage(6, String.format("Playtime: %d days, %d hours, %d minutes", days, hours, mins, createdDay));
        player.dropMessage(6, String.format("First Login: %d days ago", createdDay));
    }
}
