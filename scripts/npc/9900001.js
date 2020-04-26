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
 */

var purpose = "reload reactor drops"

var state = "INTRO";
importPackage(Packages.scripting.reactor);

function start() {
	cm.sendYesNo("Current purpose is #e#b" + purpose);
    //cm.sendYesNo("Hi #b#e#h ##n#k! I'm here to help you reserve a name for the server wipe. You can only reserve ONE name across all of your accounts. You can edit the name up until the wipe. Would you like to check on your name reservation?");
}

function action(mode, type, selection, message) {
    if (mode < 1)
        cm.dispose();
    else {
		cm.sendOk("Reactor drops reloaded");
		ReactorScriptManager.getInstance().clearDrops();
		cm.dispose();
        /*if (state == "INTRO") {
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
        }*/
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
