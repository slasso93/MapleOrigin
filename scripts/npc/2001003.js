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

/* 2001003 - Straw Hat Snowman
    @author Ronan


var status = -1;

function start() { 
    action(1, 0, 0);
} 
function action(mode, type, selection) { 
    if (mode < 0)
        cm.dispose();
    else {
        if (mode == 1)
            status++;
        else
            status--;
        
        if (status == 0) {
            cm.sendYesNo("We have a beautiful christmas tree.\r\nDo you want to see/decorate it?");
        } else if(status == 1) {
            cm.warp(209000003);
            cm.dispose();
        }
    }
} 
*/

var item;
var common = Array(1004683, 1004533, 1004505, 1003541, 1003362, 1082592, 1072507, 1052773, 1052575, 1052894, 1052728, 1051410, 1022229, 1022048);
var normal = Array(1003837, 1003839, 1003846, 1003877, 1003910, 1082620, 1073046, 1053441, 1051235, 1051555, 1051389, 1042312, 1022259, 1022263); 
var rare = Array(1003963, 1004787, 1004869, 1004876, 1005231, 1005232, 1082691, 1073047, 1042313, 1042315, 1042251, 1053352, 1053328, 1053351, 1053389, 1053386, 1053307, 1052210, 1022263);
var rare1 = Array(1082723, 1073150, 1050439, 1050479, 1050385, 1050430, 1050414, 1022279, 1092064);
var rare2 = Array(1050492, 1051519, 1052329, 1052941, 1050247, 1050153, 1050464, 1053158, 1050484, 1051586, 1022266, 1702224);

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
            cm.sendNext(" #i3991013##i3991023##i3991006##i3991000##i3991002##i3991007##i3991000##i3991015##i3991014##i3991013# \r\nHello #h #,\r\n\r\nWant to try your luck at the #r#eNX Gachapon?#n#k You can earn assorted up to date NX EQUIPMENTS! \r\nRemember that each spin will cost you a\r\n\r\n#i05220020##t05220020#");
        } else if (status == 1) {
            if(!cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).isFull(2)){
                if(cm.haveItem(5220020,1)) {
                    if (chance > 0 && chance <= 1) {
                            cm.sendOk("#b#eCongratulations!#n#k You have obtained a #b#t" + cm.gainItem(icommon, 1) + "##k #v" + icommon + "#");
                            cm.dispose(); 
                        (cm.gainItem(05220020, -1));
                        } else if (chance >= 2 && chance <= 3) {
                            cm.sendOk("#b#eCongratulations!#n#k You have obtained a #b#t" + cm.gainItem(inormal, 1) + "##k #v" + inormal + "#");
                            cm.dispose();
                        (cm.gainItem(05220020, -1));
                        } else if (chance >=4 && chance <=5) {
                            cm.sendOk("#b#eCongratulations!#n#k You have obtained a #d#t" + cm.gainItem(irare, 1) + "##k #v" + irare + "#");
                            cm.dispose();
                        (cm.gainItem(05220020, -1));
                        } else if (chance >= 6 && chance <= 7) {
                            cm.sendOk("#b#eCongratulations!#n#k You have obtained a #b#t" + cm.gainItem(irare1, 1) + "##k #v" + irare1 + "#");
                            cm.dispose();
                        (cm.gainItem(05220020, -1));
                        } else if (chance >= 8 && chance <= 9) {
                            cm.sendOk("#b#eCongratulations!#n#k You have obtained a #b#t" + cm.gainItem(irare2, 1) + "##k #v" + irare2 + "#");
                            cm.dispose();
                        (cm.gainItem(05220020, -1));
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