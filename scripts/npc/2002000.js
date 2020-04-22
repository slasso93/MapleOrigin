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

/**
Rupi- Happyville Warp NPC
**/
/*
function start() {
    cm.sendYesNo("Do you want to get out of Happyville?");
}

function action(mode, type, selection) {
    if (mode < 1)
        cm.dispose();
    else {
        var map = cm.getPlayer().getSavedLocation("HAPPYVILLE");
        if (map == -1)
                map = 101000000;
        
        cm.warp(map, 0);
    }
    
    cm.dispose();
}
*/

var item;
var common = Array(1702352, 1702366, 1702427, 1702461, 1702485,1702503, 1702488, 1702526, 1702534, 1702541);
var normal = Array(1702560, 1702565, 1702571, 1702589, 1702616,1702377, 1702680, 1702793, 1702766, 1702840, 1702767); 
var rare = Array(1702639, 1702671, 1702676, 1702718, 1702719, 1702706, 1702728, 1702746, 1702733, 1702795, 1702876, 1702557  );
var rare1 = Array(1702748, 1702745, 1702753, 1702917, 1702724, 1702581);
var rare2 = Array(1702773, 1702887, 1702627, 1702672, 1702771);

function getRandom(min, max) {
    if (min > max) {
        return(-1);
    }

    if (min == max) {
        return(min);
    }

    return(min + parseInt(Math.random() * (max - min + 1)));
}

var icommon = common[getRandom(0, common.length - 1)];
var inormal = normal[getRandom(0, normal.length - 1)];
var irare = rare[getRandom(0, rare.length - 1)];
var irare1 = rare1[getRandom(0, rare1.length - 1)];
var irare2 = rare2[getRandom(0, rare2.length - 1)];

var chance = getRandom(0, 9);

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.sendOk("#rOkay, come back when you're ready to test your #eRNG!");
            cm.dispose();
            return;
        } else if (mode == 1) {
            status++;
        }

        if (status == 0) {
            cm.sendNext(" #i3991013##i3991023##i3991006##i3991000##i3991002##i3991007##i3991000##i3991015##i3991014##i3991013# \r\nHello #h #,\r\n\r\nWant to try your luck at the #r#eNX Gachapon?#n#k You can earn assorted up to date NX Weapons! \r\nRemember that each spin will cost you a\r\n\r\n#i05220020##t05220020#");
        } else if (status == 1) {
            if(!cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).isFull(2)){
                if(cm.haveItem(5220020,1)) {
                    if (chance > 0 && chance <= 1) {
                            cm.sendOk("#b#eCongratulations!#n#k You have obtained a #b#t" + cm.gainItem(icommon, 1) + "##k #v" + icommon + "#");
                             cm.gainItem(5220020, -1);
							cm.dispose(); 
                        
                        } else if (chance >= 2 && chance <= 3) {
                            cm.sendOk("#b#eCongratulations!#n#k You have obtained a #b#t" + cm.gainItem(inormal, 1) + "##k #v" + inormal + "#");
                             cm.gainItem(5220020, -1);
							cm.dispose();
                        
                        } else if (chance >=4 && chance <=5) {
                            cm.sendOk("#b#eCongratulations!#n#k You have obtained a #d#t" + cm.gainItem(irare, 1) + "##k #v" + irare + "#");
                             cm.gainItem(5220020, -1);
							cm.dispose();
                        
                        } else if (chance >= 6 && chance <= 7) {
                            cm.sendOk("#b#eCongratulations!#n#k You have obtained a #b#t" + cm.gainItem(irare1, 1) + "##k #v" + irare1 + "#");
                             cm.gainItem(5220020, -1);
							cm.dispose();
                        
                        } else if (chance >= 8 && chance <= 9) {
                            cm.sendOk("#b#eCongratulations!#n#k You have obtained a #b#t" + cm.gainItem(irare2, 1) + "##k #v" + irare2 + "#");
                            cm.gainItem(5220020, -1);
						   cm.dispose();
                        
                        } else {
                            cm.sendOk("Sorry you do not have a gachapon ticket");
                            cm.dispose();
                        }
                } else {
                    cm.sendOk("Sorry you do not have a gachapon ticket");
                    cm.dispose();               
                    }
            } else {
                cm.sendOk("Sorry your inventory is full");
                cm.dispose();
            }
        }
    }
}