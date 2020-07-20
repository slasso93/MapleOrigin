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
var common = Array(1050293, 1050301, 1050337, 1050371, 1050387, 1050432, 1050469, 1051359, 1051406, 1051407, 1051409, 1051415, 1051430, 1051434, 1051440, 1051457);
var normal = Array(1072658, 1072843, 1072951, 1073302, 1051459, 1051499, 1052954, 1053200, 1053201, 1053202, 1053231, 1053232, 1053239, 1053316, 1053317, 1053324, 1053325, 1053412, 1053413, 1053209, 1053210, 1053194); 
var rare = Array(1012298, 1012450, 1012526, 1012534, 1012572, 1012686, 1012562, 1004471, 1004478, 1004499, 1004564, 1004565, 1004566, 1004577, 1004957, 1005021);
var rare1 = Array(1022230, 1022248, 1022282, 1022223, 1022048, 1003194, 1003264, 1003265, 1003367, 1003461, 1003594, 1003636, 1003807, 1003964, 1004124, 1004125);
var rare2 = Array(1102822, 1102707, 1102708, 1102674, 1102694, 1102712, 1102902, 1102951);

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
                            cm.gainItem(5220020, -1);
							cm.dispose(); 
                        //cm.gainItem(05220020, -1);
                        } else if (chance >= 2 && chance <= 3) {
                            cm.sendOk("#b#eCongratulations!#n#k You have obtained a #b#t" + cm.gainItem(inormal, 1) + "##k #v" + inormal + "#");
                            cm.dispose();
                        cm.gainItem(5220020, -1);
                        } else if (chance >=4 && chance <=5) {
                            cm.sendOk("#b#eCongratulations!#n#k You have obtained a #d#t" + cm.gainItem(irare, 1) + "##k #v" + irare + "#");
                            cm.gainItem(5220020, -1);
							cm.dispose();
                       // cm.gainItem(5220020, -1);
                        } else if (chance >= 6 && chance <= 7) {
                            cm.sendOk("#b#eCongratulations!#n#k You have obtained a #b#t" + cm.gainItem(irare1, 1) + "##k #v" + irare1 + "#");
                            cm.gainItem(5220020, -1);
							cm.dispose();
                        
                        } else if (chance >= 8 && chance <= 9) {
                            cm.sendOk("#b#eCongratulations!#n#k You have obtained a #b#t" + cm.gainItem(irare2, 1) + "##k #v" + irare2 + "#");
                            cm.gainItem(5220020, -1);
							cm.dispose();
                        //cm.gainItem(5220020, -1);
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