/*
 This file is part of the HeavenMS MapleStory Server
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

/**
 * @author: Ronan, Light, slasso
 * @event: Von Leon Battle
 */

importPackage(Packages.client);
importPackage(Packages.tools);
importPackage(Packages.server.life);


var isPq = true;
var minPlayers = 6, maxPlayers = 12;
var minLevel = 200, maxLevel = 255;

var exitMap = 82100;
var eventMapId = 82101;

var eventTime = 140;     // 140 minutes

var lobbyRange = [0, 0];
var map = 0;

function init() {
        setEventRequirements();
}

function setLobbyRange() {
        return lobbyRange;
}

function setEventRequirements() {
        var reqStr = "";

        reqStr += "\r\n    Number of players: ";
        if(maxPlayers - minPlayers >= 1) reqStr += minPlayers + " ~ " + maxPlayers;
        else reqStr += minPlayers;

        reqStr += "\r\n    Level range: ";
        if(maxLevel - minLevel >= 1) reqStr += minLevel + " ~ " + maxLevel;
        else reqStr += minLevel;

        reqStr += "\r\n    Time limit: ";
        reqStr += eventTime + " minutes";

        em.setProperty("party", reqStr);
}

function getEligibleParty(party) {      //selects, from the given party, the team that is allowed to attempt this event
}

function setEventRewards(eim) {
        var itemSet, itemQty, evLevel, expStages, mesoStages;

        evLevel = 1;    //Rewards at clear PQ
        itemSet = [4000313];
        itemQty = [5];
        eim.setEventRewards(evLevel, itemSet, itemQty);

        expStages = [];    //bonus exp given on CLEAR stage signal
        eim.setEventClearStageExp(expStages);

        mesoStages = [];    //bonus meso given on CLEAR stage signal
        eim.setEventClearStageMeso(mesoStages);
}

function setup(channel) {
    var eim = em.newInstance("Vonleon" + channel);
    map = eim.getMapInstance(eventMapId);
    eim.setProperty("defeatedBoss", 0);
	eim.setProperty("fallenPlayers", 0);
    eim.schedule("start", 10 * 1000);
    eim.createEventTimer(10 * 1000);
    eim.setIntProperty("finished", 0);
    eim.startEventTimer(eventTime * 60000);
    setEventRewards(eim);

    return eim;
}

function start(eim) {
    var mob = MapleLifeFactory.getMonster(8840000);
    map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(1500, -70));
    eim.startEventTimer(eventTime * 60000);
    eim.schedule("bomb", 60000);
}

function bomb(eim) {
    if (eim.getIntProperty("finished") < 1) {
        if (map.getSpawnedMonstersOnMap() < 20) {
            for (var i = 1; i <= 20; i++) {
                map.spawnMonsterOnGroundBelow(MapleLifeFactory.getMonster(8210006), new java.awt.Point(Randomizer.rand(-650, 2500), -70));
            }
            eim.schedule("bomb", 60000);
        }
    }
}

function playerEntry(eim, player) {
    player.changeMap(map, map.getPortal(0));
}

function scheduledTimeout(eim) {
    eim.exitParty(exitMap);
}

function playerUnregistered(eim, player) {
}

function playerExit(eim, player) {
    eim.unregisterPlayer(player);
    var map = eim.getMapFactory().getMap(82100);
    player.changeMap(map, map.getPortal(0));
}

function playerLeft(eim, player) {
    eim.exitPlayer(player, exitMap);
}

function changedMap(eim, player, mapid) {
    if (mapid != eventMapId) {
        eim.exitPlayer(player, exitMap);
    }
}

function changedLeader(eim, leader) {
    eim.changeEventLeader(leader);
}

function playerDead(eim, player) {
    var count = eim.getIntProperty("fallenPlayers");
    count = count + 1;
    
    eim.setIntProperty("fallenPlayers", count);
    
    if(count == 5) {
        eim.dropMessage(5, "[Expedition] Too many players have fallen, Von Leon is now deemed undefeatable; the expedition is over.");
        end(eim);
    } else if(count == 4) {
        eim.dropMessage(5, "[Expedition] Von Leon is growing stronger than ever, this is our last stand!");
    } else if(count == 3) {
        eim.dropMessage(5, "[Expedition] Casualty count is starting to get out of control. Battle with care.");
    }
}

function playerRevive(eim, player) { // player presses ok on the death pop up.
    //eim.exitPlayer(player, clearMap);
}

function playerDisconnected(eim, player) {
    eim.exitPlayer(player, exitMap);
}

function leftParty(eim, player) {
    eim.exitPlayer(player, exitMap);
}

function disbandParty(eim) {
    eim.exitParty(exitMap);
}

function monsterValue(eim, mobId) {
    return 1;
}

function end(eim) {
    var party = eim.getPlayers();
    for (var i = 0; i < party.size(); i++) {
        playerExit(eim, party.get(i));
    }
    eim.dispose();
}

/*function monsterKilled1(mob, eim) {
    if (mob.getId() == 8840000) {
        map.killAllMonsters();
        map.broadcastPinkBeanVictory();
        eim.setIntProperty("finished", 1);
        eim.victory("finish");
    }
}*/
function isVonLeon(mob) {
    var mobid = mob.getId();
    return (mobid == 8840000);
}

function monsterKilled(mob, eim) {
    if(isVonLeon(mob)) {
        eim.setIntProperty("defeatedBoss", 1);
        eim.showClearEffect(mob.getMap().getId());
        eim.clearPQ();
        map.killAllMonsters();
    }
}

function clearPQ(eim) {
    eim.stopEventTimer();
    eim.setEventCleared();
    var party = eim.getPlayers();
    for (var i = 0; i < party.size(); i++) {
        eim.giveEventReward(party.get(i));
    }
}

function finish(eim) {
    eim.exitParty(exitMap);
}

function allMonstersDead(eim) {
}

function giveRandomEventReward(eim, player) {
    //eim.giveEventReward(player);
}

function cancelSchedule() {
}

function dispose(eim) {
    if (!eim.isEventCleared()) {
    }
}

function monsterValue(eim, mobId) {
        return 1;
}

function afterSetup(eim) {
}
