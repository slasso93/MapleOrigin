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
   @Author: slasso
*/
package client.command.commands.gm0;

import client.MapleCharacter;
import client.MapleClient;
import client.command.Command;
import tools.DatabaseConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class GroupInfoCommand extends Command {
    {
        setDescription("Shows your league group info");
    }

    @Override
    public void execute(MapleClient c, String[] params) {
        if (c.tryacquireClient()) {
            try {
                MapleCharacter player = c.getPlayer();
                if (!player.hasGroup())
                    player.message("You are not in a league group!");
                else {
                    List<String> lines = getGroupInfo(player);
                    player.message("Group name: " + player.getGroupId());
                    player.message("Players:");
                    lines.forEach(player::message);
                }
            } finally {
                c.releaseClient();
            }
        }
    }

    private List<String> getGroupInfo(MapleCharacter chr) {
        List<String> res = new ArrayList<>();
        try (Connection con = DatabaseConnection.getConnection()) {
            try (PreparedStatement ps = con.prepareStatement("SELECT * FROM characters where group_id=?")) {
                ps.setString(1, chr.getGroupId());
                try (ResultSet rs = ps.executeQuery()) {
                    while (rs.next()) {
                        res.add(rs.getString("name") + ": level " + rs.getString("level"));
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return res;
    }

}
