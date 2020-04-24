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


package client.command.commands.gm0;

import client.MapleCharacter;
import client.command.Command;
import client.MapleClient;
import net.server.Server;
import server.TimerManager;
import server.life.*;
import tools.Randomizer;

import java.awt.*;
import java.text.NumberFormat;
import java.util.Locale;

public class CheckDpsCommand extends Command {
    {
        setDescription("Check your DPS calculated from a 30 second interval");
    }

    @Override
    public void execute(MapleClient c, String[] params) {
        MapleCharacter player = c.getPlayer();

        if (params.length != 0 && params.length != 1)  {
            player.yellowMessage("Syntax: !checkdps [<end>]");
            return;
        }

        if (params.length == 1 && params[0].equals("end")) {
            if (player.isDpsCalcInProgress()) {
                player.setDpsCalcInProgress(false);
                player.setDamageDealt(0);
                player.getDpsCheckFuture().cancel(true);
                player.setDpsStart(-1);
            }
            return;
        }

        if (player.isDpsCalcInProgress()) {
            player.yellowMessage("Please wait for your previous dps check to finish. or '!checkdps end' to end the currently running check");
            return;
        }
        player.setDpsCalcInProgress(true);

        MapleMonsterStats stats = new MapleMonsterStats(); // create simple stats
        stats.setHp(Integer.MAX_VALUE);

        MapleMonster monster = new MapleMonster(9400584, stats); // leprechaun money sack mob so it's stationary

        monster.addListener(new MonsterListener() {
            @Override
            public void monsterDamaged(MapleCharacter from, int trueDmg) {
                if (from.getId() == player.getId()) {
                    if (player.getDpsStart() == -1) {
                        player.setDpsStart(System.currentTimeMillis());
                    }
                    player.setDamageDealt(player.getDamageDealt() + trueDmg);
                }
            }

            @Override
            public void monsterKilled(int aniTime) {}
            @Override
            public void monsterHealed(int trueHeal) {}
        });

        player.getMap().spawnMonsterOnGroundBelow(monster, player.getPosition());

        TimerManager tMan = TimerManager.getInstance();
        player.setDpsCheckFuture(tMan.schedule(() -> {
            try {
                Thread.sleep(30000);
            } catch (InterruptedException e) {

            }
            long deltaMs = System.currentTimeMillis() - player.getDpsStart();

            String dpsStr = NumberFormat.getNumberInstance(Locale.US).format(player.getDamageDealt()/(deltaMs/1000));
            String dpmStr = NumberFormat.getNumberInstance(Locale.US).format(60* player.getDamageDealt()/(deltaMs/1000));
            String damageStr = NumberFormat.getNumberInstance(Locale.US).format(player.getDamageDealt());

            player.getMap().damageMonster(player, monster, Integer.MAX_VALUE);

            player.dropMessage(6, String.format("Attacked for %s seconds. Total damage dealt: %s", (deltaMs/1000), damageStr));
            player.dropMessage(6, String.format("DPS: %s", dpsStr));
            player.dropMessage(6, String.format("DPM: %s", dpmStr));
            player.setDpsCalcInProgress(false);
            player.setDpsStart(-1);
            player.setDamageDealt(0);
        }, 0));

    }

}
