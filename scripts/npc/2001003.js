
var common = [1052596, 1052602, 1052672, 1052678, 1052685, 1052870, 1052872, 1052902, 1052922, 1052921, 1053033, 1053049, 1053116, 1053255, 1053328, 1004683, 1004533, 1004505, 1003541, 1003362, 1082592, 1072507, 1052773, 1052575, 1052894, 
				1052728, 1051410, 1022229, 1022048, 1053257, 1053379, 1053380, 1050383, 1053375, 1053082];
var uncommon = [1052603, 1052674, 1052727, 1052754, 1052779, 1052854, 1052911, 1052910, 1052951, 1052954, 1052970, 1053046, 1053045, 1053061, 1053060, 1053226, 1053225, 1053352, 1053378, 1053385, 1053389, 1053441, 1003837, 1003839, 1003846, 
				1003877, 1003910, 1082620, 1073046, 1053441, 1051235, 1051555, 1051389, 1042312, 1022259, 1022263,1042320, 1051209, 1050341, 1050365, 1051276, 1051540, 1003963, 1004787, 1004869, 1004876, 1005231, 1005232, 1082691, 1073047, 
				1042313, 1042315, 1042251, 1053352];
var rare = [1052605, 1052610, 1052671, 1052728, 1052774, 1052841, 1052895, 1052942, 1053001, 1053041, 1053042, 1053351, 1053353, 1053380, 1053379, 1053377, 1053412, 1053328, 1053351, 1053389, 1053386, 1053307, 1052210, 1022263, 1042349, 1082723, 
				1073150, 1050439, 1050479, 1050385, 1050430, 1050414, 1022279, 1092064,1053247, 1050504, 1050508, 1051578, 1042381, 1050335];
var urare = [1052661, 1052726, 1052865, 1052894, 1053016, 1053017, 1053018, 1053059, 1053082, 1053115, 1053346, 1053367, 1053375, 1053406, 1051405, 1053388, 1053387, 1042287, 1052923, 1042230, 1050492, 1051519, 1052329, 1052941, 1050247, 1050153, 
				1050464, 1053158, 1050484, 1051586, 1022266, 1702224, 1051528, 1051530, 1050468, 1051535, 1051514,1042330, 1062112, 1042162, 1051193, 1051483];


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
