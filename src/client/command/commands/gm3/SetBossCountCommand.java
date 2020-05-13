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
package client.command.commands.gm3;

import client.MapleCharacter;
import client.MapleClient;
import client.command.Command;
import server.expeditions.MapleExpedition;
import server.expeditions.MapleExpeditionBossLog;

import java.util.Map;

public class SetBossCountCommand extends Command {
    {
        setDescription("Set a player's boss count for a specific expedition");
    }

    @Override
    public void execute(MapleClient c, String[] params) {
        MapleCharacter player = c.getPlayer();
        if (params.length < 2 || params.length > 3) {
            player.yellowMessage("Syntax: !setbosscount [<playername>] <zakum | horntail | pinkbean | scarga | papulatus | vonleon> <newcount>");
            return;
        }

        MapleCharacter victim;
        MapleExpeditionBossLog.BossLogEntry bossType;
        int newCount;

        int target = 0; // 0 if self, 1 if other player
        if (params.length == 2) {
            victim = c.getWorldServer().getPlayerStorage().getCharacterByName(player.getName());
        } else {
            victim = c.getWorldServer().getPlayerStorage().getCharacterByName(params[0]);
            target = 1;
        }

        if (victim != null) {
            try {
                bossType = MapleExpeditionBossLog.BossLogEntry.valueOf(params[target].toUpperCase());
            } catch (Exception e) {
                player.yellowMessage("Boss type must be one of the following: zakum | horntail | pinkbean | scarga | papulatus | vonleon");
                return;
            }
            try {
                newCount = Integer.parseInt(params[1 + target]);
            } catch (Exception e) {
                player.yellowMessage("newcount must be an integer");
                return;
            }
            if (newCount >= 0) {
                int currentCount = MapleExpeditionBossLog.countPlayerEntries(victim.getId(), bossType);
                if (newCount < currentCount) { // remove entries
                    MapleExpeditionBossLog.removePlayerEntry(victim.getId(), bossType, currentCount - newCount);
                } else { // add entries
                    while (newCount-- > currentCount)
                        MapleExpeditionBossLog.insertPlayerEntry(victim.getId(), bossType);
                }
                player.message("New boss count set for player: '" + victim.getName());
            } else {
                player.yellowMessage("newcount must be >= 0");
            }
        } else {
            player.message("Player '" + params[0] + "' could not be found.");
        }
    }

}
