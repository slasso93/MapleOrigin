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
import client.inventory.Item;
import client.inventory.MapleInventoryType;
import client.inventory.manipulator.MapleInventoryManipulator;
import server.expeditions.MapleExpeditionBossLog;

import java.util.Map;

public class ClaimGmlCommand extends Command {
    {
        setDescription("Receive unclaimed GML from boss runs that you disconnected from at clear");
    }

    @Override
    public void execute(MapleClient c, String[] params) {
        MapleCharacter player = c.getPlayer();
        if (player.getEventInstance() != null) {
            player.dropMessage(1, "This command cannot be used in expeditions or special instances");
            return;
        }

        if (c.tryacquireClient()) {
            try {
                Map<MapleExpeditionBossLog.BossLogEntry, Short> unclaimedGML = c.getWorldServer().removeUnclaimedRewards(player.getId());
                if (unclaimedGML != null && !unclaimedGML.isEmpty()) {
                    if (player.getInventory(MapleInventoryType.ETC).isFull()) {
                        player.message("Please make room in your inventory first!");
                    } else {
                        int amount = unclaimedGML.values().stream().mapToInt(i -> i).sum();
                        MapleInventoryManipulator.addFromDrop(c, new Item(4000313, (byte) 0, (short) amount));
                        player.dropMessage(6, "You have claimed " + amount + " GML!");
                    }
                } else {
                    player.message("There's nothing for you to claim!");
                }
            } finally {
                c.releaseClient();
            }
        }
    }

}
