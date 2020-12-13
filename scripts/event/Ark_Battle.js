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
 * @author: Ronan
 * @event: Vs Dunas
 */

importPackage(Packages.client);
importPackage(Packages.tools);
importPackage(Packages.server.life);

var isPq = true;
var minPlayers = 1, maxPlayers = 12;
var minLevel = 220, maxLevel = 255;

var entryMap = 98007;
var exitMap = 272020110;
var recruitMap = 272020110;
var clearMap = 98006;

var eventMapId = 98007;

var tdBossId = 8220010;

var eventTime = 60;     // 10 minutes

var lobbyRange = [0, 0];

var mob;

function init() {
    setEventRequirements();
}

function setLobbyRange() {
    return lobbyRange;
}

function getEligibleParty(party) {      //selects, from the given party, the team that is allowed to attempt this event
    var eligible = [];
    var hasLeader = false;

    if(party.size() > 0) {
        var partyList = party.toArray();

        for(var i = 0; i < party.size(); i++) {
            var ch = partyList[i];
            if(ch.getMapId() == exitMap && ch.getLevel() >= minLevel && ch.getLevel() <= maxLevel) {
                if(ch.isLeader()) hasLeader = true;
                eligible.push(ch);
            }
        }
    }

    if(!(hasLeader && eligible.length >= minPlayers && eligible.length <= maxPlayers)) eligible = [];
    return eligible;
}

function setup(channel) {
    var eim = em.newInstance("Vonleon" + channel);
    map = eim.getMapInstance(eventMapId);
    eim.setProperty("defeatedBoss", 0);
	eim.setProperty("fallenPlayers", 0);
    eim.schedule("start", 10 * 1000);
    eim.createEventTimer(10 * 1000);
    eim.setIntProperty("finished", 0);
    eim.setIntProperty("firstWave", 1);
    eim.startEventTimer(eventTime * 60000);
    setEventRewards(eim);

    return eim;
}

function setEventRewards(eim) {
        var itemSet, itemQty, evLevel, expStages, mesoStages;

        evLevel = 1;    //Rewards at clear PQ
        itemSet = [4000313, 4000313, 4000313, 4000313, 4000313, 4000313, 4000313, 4000313, 4000313, 4000313, 4000313, 4000313, 4000313, 4000313, 4000313, 4000313];
        itemQty = [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35];
        eim.setEventRewards(evLevel, itemSet, itemQty);

        expStages = [];    //bonus exp given on CLEAR stage signal
        eim.setEventClearStageExp(expStages);

        mesoStages = [];    //bonus meso given on CLEAR stage signal
        eim.setEventClearStageMeso(mesoStages);
}

function start(eim) {
    mob = MapleLifeFactory.getMonster(8860000);
    map.spawnMonsterWithEffect(mob, 15, new java.awt.Point(130, -588));
    eim.startEventTimer(eventTime * 60000);
    eim.schedule("waves", 2 * 60 * 1000);
}

// first wave no heal
// healing stacks with all mobs that are alive
// healing happens 0, 20, 40, ... (every 20) seconds in (2% each time)

function waves(eim) {
    var count = eim.getMapInstance(eventMapId).getSpawnedMonstersOnMap();
    if (eim.getIntProperty("finished") < 1) {
        if (count < 40) {
            for (var i = 1; i <= 5; i++) {
                map.spawnMonsterWithEffect(MapleLifeFactory.getMonster(8860002), 15, new java.awt.Point(-380, -590));
            }
            for (var i = 1; i <= 5; i++) {
                map.spawnMonsterWithEffect(MapleLifeFactory.getMonster(8860002), 15, new java.awt.Point(650, -700));
            }
        }
        if (eim.getIntProperty("firstWave") == 0) // after first wave then heal
            eim.schedule("heal", 0);
        else
            eim.setIntProperty("firstWave", 0); // 1 means it's first wave, no healing (0 means its after 1st)

        eim.schedule("waves", 5 * 60 * 1000);
    }
}

function heal(eim) {
    var mobCount = eim.getMapInstance(eventMapId).getSpawnedMonstersOnMap() - 1; // mob count

    if (mobCount > 0) {
        mob.heal(mob.getMaxHp() * .002 * mobCount, 0);
        eim.schedule("heal", 20 * 1000);
    }
}

function playerEntry(eim, player) {
    var map = eim.getMapInstance(entryMap);
    player.changeMap(map, map.getPortal(0));
}

function scheduledTimeout(eim) {
    eim.exitParty(exitMap);
}

function playerUnregistered(eim, player) {
}

function playerExit(eim, player) {
    eim.unregisterPlayer(player);
    player.changeMap(exitMap, 0);
	eim.clearPQ();
}

function playerLeft(eim, player) {
    eim.exitPlayer(player, exitMap);
}

function changedMap(eim, player, mapid) {
    if (mapid != eventMapId) {
        eim.exitPlayer(player, exitMap);
		eim.stopEventTimer();
        eim.setEventCleared();
    }
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

function changedLeader(eim, leader) {
    eim.changeEventLeader(leader);
}

function playerDead(eim, player) {
}

function playerRevive(eim, player) { // player presses ok on the death pop up.
    eim.exitPlayer(player, exitMap);
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
    eim.exitParty(exitMap);
}
function isArk(mob) {
    var mobid = mob.getId();
    return (mobid == 8860000);
}

function monsterKilled(mob, eim) {
    if(isArk(mob)) {
        eim.setIntProperty("defeatedBoss", 1);
        eim.setIntProperty("finished", 1);
        eim.showClearEffect(mob.getMap().getId());
        eim.clearPQ();
        map.killAllMonsters();
        //mob.getMap().broadcastPinkBeanVictory();
    }
}
function clearPQ(eim) {
    eim.stopEventTimer();
    eim.setEventCleared();
    //updateGateState(0);
}
/*function monsterKilled(mob, eim) {
    if (mob.getId() == 8860000) {
        eim.setIntProperty("finish", 0);
        map.killAllMonsters();
        eim.victory("finish");
    }
}*/

function finish(eim) {
    eim.exitParty(exitMap);
}

function allMonstersDead(eim) {
}

function cancelSchedule() {
}

function dispose(eim) {
}

function afterSetup(eim) {
}
