package client.command.commands.gm0;

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
   @ Author: Jay Friestad - Player Teleport Commands lol
   @Author: Evol - FM command
   @Autho: slasso - changed to direct teleport. old command re-purposed for @mirror
*/

import client.MapleCharacter;
import client.command.Command;
import client.MapleClient;
import constants.game.GameConstants;

import java.util.ArrayList;
import java.util.Collections;

import server.maps.MaplePortal;
import server.maps.FieldLimit;
import server.maps.MapleMap;
import server.maps.MapleMapFactory;
import server.maps.MapleMiniDungeonInfo;

import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

public class FMCommand extends Command {
    {
        setDescription("Travel directly to FM");
    }

    @Override
    public void execute(MapleClient c, String[] params) {
        MapleCharacter player = c.getPlayer();

        if (!player.isAlive()) {
            player.dropMessage(1, "This command cannot be used when you're dead.");
            return;
        }

        MapleMap fm = c.getChannelServer().getMapFactory().getMap(GameConstants.GOTO_AREAS.get("fm"));
        if (player.getMap().getForcedReturnId() == 999999999) { // regular maps have this forced return value of 999999999
            player.saveLocation("FREE_MARKET");
        } else if (player.getMap().getId() != 910000000 && player.getMap().getId() != 76000) { // non normal maps and not fm/lost memories. ex: zakum's altar will return to forced location cave of passage
            player.saveLocation("FREE_MARKET", true);
        }
        player.changeMap(fm);
    }

}
