
importPackage(Packages.tools);
importPackage(Packages.constants.inventory);
importPackage(Packages.client.inventory);

/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
		       Matthias Butz <matze@odinms.de>
		       Jan Christian Meyer <vimes@odinms.de>

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
 * @Name         KIN
 * @Author:      slasso
 * @NPC:         9900001
 * @Purpose:     Name reservations.
 

var state = "INTRO";

function start() {
    cm.sendYesNo("Hi #b#e#h ##n#k! I'm here to help you reserve a name for the server wipe. You can only reserve ONE name across all of your accounts. You can edit the name up until the wipe. Would you like to check on your name reservation?");
}

function action(mode, type, selection, message) {
    if (mode < 1)
        cm.dispose();
    else {
        if (state == "INTRO") {
            displayReservedName();
        } else if (state == "CHOOSE") {
            if (selection == 1) // nothing
                cm.dispose();
            else if (selection == 2) // update name
                enterName(true);
            else if (selection == 3) // delete name
                deleteName();
        } else if (state == "CHANGE_NAME") { // enter name
            enterName();
        } else if (state == "RESERVE_INSERT") { // insert
            reserveName();
        } else if (state == "RESERVE_UPDATE") { // update
            updateName();
        } else {
            cm.dispose();
        }
    }
}

function displayReservedName() {
    var res = cm.getClient().getReservedName();
    if (res != null) {
        cm.sendSimple("You have reserved the name #b#e" + res.getRight() + "#n#k for account #b#e" + res.getLeft() + "#n#k. What would you like to do?\r\n#L1##bKeep this name#l\r\n#L2#Change reserved name#l\r\n#L3#Remove reserved name#l#k");
        state = "CHOOSE";
    } else {
        cm.sendYesNo("You currently do not have a name reserved. Would you like to reserve a name?");
        state = "CHANGE_NAME";
    }
}

function enterName(update) {
    state = update ? "RESERVE_UPDATE" : "RESERVE_INSERT";
    cm.sendGetText("What name would you like to reserve?");
}

function updateName() {
    var updated = cm.getClient().updateReservedName(cm.getText());
    if (updated) {
        cm.sendOk("Your reserved name has been updated. Talk to me again if you'd like to change your reservation.\r\n#rNOTE: We will remove unclaimed reservations 2 days after the server wipe!#k")
    } else {
        cm.sendOk("Unable to reserve this name. Either it does not following the naming guidelines or someone has already claimed this name.");
    }
    cm.dispose();
}

function deleteName() {
    var deleted = cm.getClient().deleteReservedName();
    if (deleted) {
        cm.sendOk("Your reserved name has been cleared. Talk to me again to reserve a new name.")
    } else {
        cm.sendOk("Couldn't clear reserved name, please try again. If the problem persists, please contact @slasso on discord.");
    }
    cm.dispose();
}

function reserveName() {
    var reserved = cm.getClient().reserveName(cm.getText());
    if (reserved) {
        cm.sendOk("Your name has been saved and will be reserved for the wipe.\r\n#rNOTE: We will remove unclaimed reservations 2 days after the server wipe!#k")
    } else {
        cm.sendOk("Unable to reserve this name. Either it does not following the naming guidelines or someone has already claimed this name.")
    }
    cm.dispose();
}
*/
// Corona Event NPC
var status = -1;

var item = 
[
	[1012315,1115041,1115130,1012644,1004136,1102682,1102684,1052749,1012631, 1000079,1050215,1051262,1702328,1702359,1052750, 1022027, 1102767, 1102549, 1102813], /*Nx Items*/
	[3010140, 1022048, 1092067, 1702585, 3010373, 3010577], /*Chairs,trans eye, trans shield, universal tranpsarent wep*/
	[2022179,2022273, 5220000, 2049003, 3010575, 3010576], /*ATK and MATK Pots and Gacha and css 20*/
	[2048010, 2048011, 2048012, 2048013, 2048001, 2048004,2048010, 2048011,2048010, 2048011, 2049001, -2500], /*Scrolls, CSS3%, */
	[1012684, 5220020, 3010301, 3010300]
]; /*Mask, NX Gacha*/
var rand = Math.floor(Math.random()*100);

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
		status++;
    } else {
		cm.dispose();
		return;
    }
    if (status == 0) {
        cm.sendSimple("Oh no! It appears the #rCoronavirus #khas spread to MapleOrigin. But have no fear your grinding will still go on! For the rest of September monsters will drop:\r\n\r\n #v4001332# - #z4001332#\r\n\r\nFind us some toilet paper and we'll reward you with some very interesting items \r\n#b#L0# Exchange 5 Toilet Rolls for an interesting item!#l\r\n");
    } else if (status == 1) {
		if (selection == 0) {
            if(!cm.getPlayer().getInventory(MapleInventoryType.EQUIP).isFull(0)) {
                if(!cm.getPlayer().getInventory(MapleInventoryType.SETUP).isFull(0)) {
                    if(!cm.getPlayer().getInventory(MapleInventoryType.USE).isFull(0)) {
                        if(cm.haveItem(4001332 , 5)) {
                            (cm.gainItem(4001332 , -5));
							
							var tier;
                            if ((rand >= 1) && (rand <= 60)) {
								tier = item[0];
                            } else if ((rand >= 61) && (rand <= 70 )) {
								tier = item[1];
                            } else if ((rand >= 71) && (rand <= 80)) {
								tier = item[2];
                            } else if ((rand >= 81) && (rand <= 95)) {
								tier = item[3];
                            } else {
								tier = item[4];
							}
                            var rand2 = Math.floor(Math.random() * tier.length);
							var reward = tier[rand2];
							if (reward < 0) { // nx is -amount
								cm.getPlayer().getCashShop().gainCash(1, -reward);
								cm.getPlayer().announce(MaplePacketCreator.earnTitleMessage("You have earned " + (formatNumber(-reward)) + " NX"));
								cm.getPlayer().dropMessage(6, "You have earned " + (formatNumber(-reward)) + " NX");
							} else {
								cm.gainItem(reward);
                            }
							cm.dispose();
                        } else {
                            cm.sendOk("You do not have enough #r#z4001332#!");
                        }
                    } else {
                        cm.sendOk("Please have atleast 1 spaces in your USE tab");
                    }
                } else {
                    cm.sendOk("Please have atleast 1 spaces in your SETUP tab");
                }
            } else {
                cm.sendOk("Please have atleast 1 spaces in your EQUIP tab");
            }
		} else {
            cm.sendOk("You do not have enough #r#z4001332#!");
            cm.dispose();
        }
    } else {
        cm.dispose();
    }
}

// https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript/25377176#25377176
function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}
