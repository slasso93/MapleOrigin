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
 * @event: Ludibrium PQ
*/

var isPq = true;
var minPlayers = 5, maxPlayers = 6;
var minLevel = 35, maxLevel = 250;
var entryMap = 922010100;
var exitMap = 922010000;
var recruitMap = 221024500;
var clearMap = 922011000;

var minMapId = 922010100;
var maxMapId = 922011100;

var eventTime = 45;     // 45 minutes

var lobbyRange = [0, 0];

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

function setEventExclusives(eim) {
    var itemSet = [4001022, 4001023];
    eim.setExclusiveItems(itemSet);
}

function setEventRewards(eim) {
    var itemSet, itemQty, evLevel, expStages;

    evLevel = 1;    //Rewards at clear PQ
    itemSet = [4310000, 4310000, 4310000, 4310000, 4310000, 4310000, 4310000];
    itemQty = [15, 16, 17, 18, 19, 20, 21];
    eim.setEventRewards(evLevel, itemSet, itemQty);

    expStages = [2 * 210, 2 * 2520, 2 * 2940, 2 * 3360, 2 * 3770, 0, 2 * 4620, 2 * 5040, 2 * 5950];    //bonus exp given on CLEAR stage signal

    eim.setEventClearStageExp(expStages);
}

function getEligibleParty(party) {      //selects, from the given party, the team that is allowed to attempt this event
    var eligible = [];
    var hasLeader = false;

    if (party.size() > 0) {
        var partyList = party.toArray();

        for(var i = 0; i < party.size(); i++) {
            var ch = partyList[i];

            if(ch.getMapId() == recruitMap && ch.getLevel() >= minLevel && ch.getLevel() <= maxLevel) {
                if(ch.isLeader()) hasLeader = true;
                eligible.push(ch);
            }
        }
    }

    if(!(hasLeader && eligible.length >= minPlayers && eligible.length <= maxPlayers)) eligible = [];
    return eligible;
}

function setup(level, lobbyid) {
    var eim = em.newInstance("Ludi" + lobbyid);
    eim.setProperty("level", level);

    eim.setProperty("statusStg1", -1);
    eim.setProperty("statusStg2", -1);
    eim.setProperty("statusStg3", -1);
    eim.setProperty("statusStg4", -1);
    eim.setProperty("statusStg5", -1);
    eim.setProperty("statusStg6", -1);
    eim.setProperty("statusStg7", -1);
    eim.setProperty("statusStg8", -1);
    eim.setProperty("statusStg9", -1);

    eim.getInstanceMap(922010100).resetPQ(level);
    eim.getInstanceMap(922010200).resetPQ(level);
    eim.getInstanceMap(922010201).resetPQ(level);
    eim.getInstanceMap(922010300).resetPQ(level);
    eim.getInstanceMap(922010400).resetPQ(level);
    eim.getInstanceMap(922010401).resetPQ(level);
    eim.getInstanceMap(922010402).resetPQ(level);
    eim.getInstanceMap(922010403).resetPQ(level);
    eim.getInstanceMap(922010404).resetPQ(level);
    eim.getInstanceMap(922010405).resetPQ(level);
    eim.getInstanceMap(922010500).resetPQ(level);
    eim.getInstanceMap(922010500).resetPQ(level);
    eim.getInstanceMap(922010501).resetPQ(level);
    eim.getInstanceMap(922010502).resetPQ(level);
    eim.getInstanceMap(922010503).resetPQ(level);
    eim.getInstanceMap(922010504).resetPQ(level);
    eim.getInstanceMap(922010505).resetPQ(level);
    eim.getInstanceMap(922010506).resetPQ(level);
    eim.getInstanceMap(922010600).resetPQ(level);
    eim.getInstanceMap(922010700).resetPQ(level);
    eim.getInstanceMap(922010800).resetPQ(level);
    eim.getInstanceMap(922010900).resetPQ(level);
    eim.getInstanceMap(922011000).resetPQ(level);
    eim.getInstanceMap(922011100).resetPQ(level);

    respawnStages(eim);
    eim.startEventTimer(eventTime * 60000);
    setEventRewards(eim);
    setEventExclusives(eim);
    return eim;
}

function afterSetup(eim) {}

function respawnStages(eim) {}

function playerEntry(eim, player) {
    var map = eim.getMapInstance(entryMap);
    player.changeMap(map, map.getPortal(0));
}

function scheduledTimeout(eim) {
    if(eim.getProperty("9stageclear") != null) {
        var curStage = 922011000, toStage = 922011100;
        eim.warpEventTeam(curStage, toStage);
    } else {
        end(eim);
    }
}

function playerUnregistered(eim, player) {}

function playerExit(eim, player) {
    eim.unregisterPlayer(player);
    player.changeMap(exitMap, 0);
}

function playerLeft(eim, player) {
    if(!eim.isEventCleared()) {
        playerExit(eim, player);
    }
}

function changedMap(eim, player, mapid) {
    if (mapid < minMapId || mapid > maxMapId) {
        if (eim.isEventTeamLackingNow(true, minPlayers, player)) {
            eim.unregisterPlayer(player);
            end(eim);
        } else {
            eim.unregisterPlayer(player);
        }
    }
}

function changedLeader(eim, leader) {
    var mapid = leader.getMapId();
    if (!eim.isEventCleared() && (mapid < minMapId || mapid > maxMapId)) {
        end(eim);
    }
}

function playerDead(eim, player) {}

function playerRevive(eim, player) { // player presses ok on the death pop up.
    if (eim.isEventTeamLackingNow(true, minPlayers, player)) {
        eim.unregisterPlayer(player);
        end(eim);
    } else {
        eim.unregisterPlayer(player);
    }
}

function playerDisconnected(eim, player) {
    if (eim.isEventTeamLackingNow(true, minPlayers, player)) {
        eim.unregisterPlayer(player);
        end(eim);
    } else {
        eim.unregisterPlayer(player);
    }
}

function leftParty(eim, player) {
    if (eim.isEventTeamLackingNow(false, minPlayers, player)) {
        end(eim);
    } else {
        playerLeft(eim, player);
    }
}

function disbandParty(eim) {
    if (!eim.isEventCleared()) {
        end(eim);
    }
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

function giveRandomEventReward(eim, player) {
    eim.giveEventReward(player);
}

function clearPQ(eim) {
    eim.stopEventTimer();
    eim.setEventCleared();

    eim.startEventTimer(1 * 60000);
    eim.warpEventTeam(922011000);
}

function monsterKilled(mob, eim) {}

function allMonstersDead(eim) {}

function cancelSchedule() {}

function dispose(eim) {}
