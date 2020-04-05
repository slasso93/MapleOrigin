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

import client.MapleBuffStat;
import client.command.Command;
import client.MapleClient;
import client.MapleCharacter;
import server.TimerManager;
import server.maps.MapleMap;
import tools.MaplePacketCreator;
import tools.Pair;

import java.util.Collections;
import java.util.List;

public class ReachCommand extends Command {
    {
        setDescription("");
    }

    @Override
    public void execute(MapleClient c, String[] params) {
        MapleCharacter player = c.getPlayer();
        if (params.length < 1) {
            player.yellowMessage("Syntax: !reach <playername>");
            return;
        }

        MapleCharacter victim = c.getWorldServer().getPlayerStorage().getCharacterByName(params[0]);
        if (victim != null && victim.isLoggedin()) {
            if (player.getClient().getChannel() != victim.getClient().getChannel()) {
                player.dropMessage("Changing to target's channel");
                player.getClient().changeChannel(victim.getClient().getChannel());
                TimerManager tMan = TimerManager.getInstance();
                tMan.schedule(() -> {
                    while (!player.isLoggedinWorld()) {
                        try {
                            Thread.sleep(1777);
                        } catch (InterruptedException e) {
                            e.printStackTrace();
                        }
                    }
                    player.changeMap(victim.getMapId(), victim.getMap().findClosestPortal(victim.getPosition()));
                }, 0);
            }
            else {
                MapleMap map = victim.getMap();
                player.saveLocationOnWarp();
                player.forceChangeMap(map, map.findClosestPortal(victim.getPosition()));
            }

        } else {
            player.dropMessage(6, "Unknown player.");
        }
    }
}
