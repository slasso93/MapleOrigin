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
import server.TimerManager;
import server.life.*;
import server.maps.MapleMapObject;

import java.text.NumberFormat;
import java.util.Locale;

public class CheckDpsCommand extends Command {
    {
        setDescription("Check your DPS, calculated from a 30 second interval");
    }

    @Override
    public void execute(MapleClient c, String[] params) {
        MapleCharacter player = c.getPlayer();

        if (params.length != 0 && params.length != 1)  {
            player.yellowMessage("Syntax: @checkdps <end OR weak>");
            return;
        }

        int mobId = 9400624;
        if (params.length == 1) {
            if (params[0].equals("end")) {
                if (player.isDpsCalcInProgress()) {
                    player.setDpsCalcInProgress(false);
                    player.getDpsCheckFuture().cancel(true);
                }
                return;
            } else if (params[0].equals("weak")) {
                mobId = 9400625;
            } else {
                player.yellowMessage("If you're trying to cancel the running dps check: @checkdps end");
                player.yellowMessage("If you want to check your dps with elemental weakness: @checkdps weak");
                return;
            }
        }

        if (player.isDpsCalcInProgress()) {
            player.yellowMessage("Please wait for your previous dps check to finish. or '@checkdps end' to end the currently running dps check");
            return;
        }

        if (player.getMap().getId() != 910000000) {
            player.yellowMessage("You can only use this command in the FM!");
            return;
        }

        int count = 0;
        for (MapleMapObject mMob : player.getMap().getMonsters()) {
            int mid = ((MapleMonster) mMob).getId();
            if (mid == 9400624 || mid == 9400625)
                count++;
        }
        if (count >= 5) {
            player.yellowMessage("Only 5 players can check their DPS at once, please wait a bit longer for someone to finish.");
            return;
        }

        player.setDpsCalcInProgress(true);

        MapleMonsterStats stats = new MapleMonsterStats(); // create simple stats
        stats.setName("Mesos Bag");
        stats.setHp(Integer.MAX_VALUE);
        stats.setBoss(true);

        MapleMonster monster = new MapleMonster(mobId, stats); // money sack stationary mob copied from leprechaun

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

            long deltaMs = player.getDpsStart() > 0 ? System.currentTimeMillis() - player.getDpsStart() : 0;

            if (deltaMs > 0) {
                double dps = (double) player.getDamageDealt() / (deltaMs / 1000.0);
                double dpm = dps * 60;

                String damageStr = NumberFormat.getNumberInstance(Locale.US).format(player.getDamageDealt());
                player.dropMessage(6, String.format("Attacked for %s seconds. Total damage dealt " + (monster.getId() == 9400625 ? "(Elemental weak)" : "") + ": %s", (deltaMs / 1000), damageStr));
                player.dropMessage(6, String.format("DPS: %,.0f", dps));
                player.dropMessage(6, String.format("DPM: %,.0f", dpm));
            }
            player.setDpsCalcInProgress(false);
            player.setDpsStart(-1);
            player.setDamageDealt(0);

            monster.getMap().killMonster(monster, null, false);
        }, 0));
    }

}
