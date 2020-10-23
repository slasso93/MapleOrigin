/*
    This file is part of the HeavenMS MapleStory Server, commands OdinMS-based
    Copyleft (L) 2016 - 2018 RonanLana

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation version 3 as published by
    the Free Software Foundation. You may not use, modify or distribute
    this program under any other version of the GNU Affero General Public
    License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/*
   @Author: Arthur L - Refactored command content into modules
*/
package client.command.commands.gm2;

import client.MapleCharacter;
import client.MapleClient;
import client.command.Command;
import tools.DatabaseConnection;
import tools.FilePrinter;

import java.sql.Connection;
import java.sql.PreparedStatement;

public class GenderCommand extends Command {
    {
        setDescription("Change a player's gender (use for marriage)");
    }

    @Override
    public void execute(MapleClient c, String[] params) {
        MapleCharacter player = c.getPlayer();
        if (params.length < 1) {
            player.yellowMessage("Syntax: !gender [<playername>] [male|female]");
            return;
        }

        try {
            if (params.length == 1) {
                if (params[0].equals("male") || params[0].equals("female")) {
                    c.setGender((byte) (params[0].equals("male") ? 0 : 1));
                    player.setGender(params[0].equals("male") ? 0 : 1);
                    //c.announce(MaplePacketCreator.getAuthSuccess(c));
                    player.message("Your gender has been changed, please CC for it to take effect.");
                }
            } else {
                if (params[1].equals("male") || params[1].equals("female")) {
                    MapleCharacter victim = c.getChannelServer().getPlayerStorage().getCharacterByName(params[0]);
                    if (victim == null) {
                        player.yellowMessage(String.format("Player '%s' could not be found", params[0]));
                        return;
                    }

                    victim.getClient().setGender((byte) (params[1].equals("male") ? 0 : 1));
                    victim.setGender(params[1].equals("male") ? 0 : 1);
                    //MaplePacketCreator.getAuthSuccess(victim.getClient());
                    player.message(victim.getName() + "'s gender has been changed. Allow them to CC for it to take effect");
                    victim.message("Your gender has been changed, please CC for it to take effect.");
                }
            }
        } catch (Exception e) {
            FilePrinter.print(FilePrinter.COMMAND_BUG, e.getMessage());
        }
    }

    private void setGenderOffline(String name, int gender) {
        try (Connection con = DatabaseConnection.getConnection()) {
            try (PreparedStatement ps = con.prepareStatement("UPDATE characters set gender=? where name=?")) {
                ps.setInt(1, gender);
                ps.setString(2, name);

                ps.executeUpdate();
            }
        } catch (Exception e) {
            FilePrinter.print(FilePrinter.COMMAND_BUG, e.getMessage());
        }
    }

}
