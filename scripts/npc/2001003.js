
var common = [1022176, 1012572, 1012685, 1012711, 1012713, 1102897, 1003958, 1003957, 1053130, 1001089, 1004454, 1004470];
var uncommon = [1022283, 1022258, 1012714, 1012717, 1102748, 1102705, 1004634, 1042381, 1052143, 1053537, 1004702, 1004706, 1050419, 1051488, 1082685];
var rare = [1004530, 1004706, 1005096, 1073261, 1042382, 1062249, 1005479, 1005480, 1053527, 1053528, 1073416, 1073417, 1005048, 1005047, 1053246, 1053245, 1073251, 1073250, 1032321, 1004589, 1004472, 1050154, 1051190, 1005539, 1050548, 1051618, 1082748, 1073443, 1103255];
var urare = [1102812, 1042378, 1051607, 1102901, 1102956, 1004834, 1053091, 1073167, 1004897, 1004898, 1050445, 1051513, 1070086, 1071103, 1005527, 1005528, 1050547, 1051617, 1073436, 1004884];


function getRandom(min, max) {
    if (min > max) {
        return(-1);
    }

    if (min == max) {
        return(min);
    }

    return(min + parseInt(Math.random() * (max - min + 1)));
}

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1)
		cm.dispose();
	else {
		if (mode == 0 && status == 0)
			cm.dispose();

		if (mode == 1)
			status++;
		else
			status--;

        
		if (status == 0) { // confirm selection with yes/no
			cm.sendYesNo("#i3991013##i3991023##i3991006##i3991000##i3991002##i3991007##i3991000##i3991015##i3991014##i3991013#\r\n" + 
						"Hello #h #!\r\n\r\nWant to try your luck at the #r#eNX Gachapon?#n#k You can earn assorted up to date NX EQUIPMENTS! \r\nRemember that each spin will cost you a\r\n\r\n#i5220020##t5220020#");
        } else if (status == 1) { // finalize the purchase
		    var vp = cm.getPlayer().getClient().getVotePoints();
            if (!cm.haveItem(5220020, 1)) {
				cm.sendOk("Sorry you do not have an #i5220020##e#b#z5220020##n#k! #i5220020##e#b#z5220020##k#n can be purchased from Mia in the FM.");
            } else if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).isFull(0)) {
                cm.sendOk("Your inventory is full! Please make room and try again.");
            } else {
				var roll = getRandom(0, 10); // random number from 0-10 to decide which array to choose from
				var item = -1;
				if (roll >= 0 && roll <= 4)
					item = common[getRandom(0, common.length - 1)];
				else if (roll >= 5 && roll <= 7)
					item = uncommon[getRandom(0, uncommon.length - 1)];
				else if (roll >= 8 && roll <= 9)
					item = rare[getRandom(0, rare.length - 1)];
				else if (roll == 10)
					item = urare[getRandom(0, urare.length - 1)];
				
				if (item != -1) {					
					cm.gainItem(5220020, -1);
					cm.gainItem(item, 1);
					cm.sendOk("#b#eCongratulations!#n#k You have obtained a #e#b#v" + item + "##z" + item + "#");
				}
            }
            cm.dispose();
        }
	}
}
